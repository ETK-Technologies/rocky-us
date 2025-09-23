import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const BASE_URL = process.env.BASE_URL;

// Function to format postcode based on country (USA-focused)
function formatPostcode(postcode, country) {
  if (!postcode) return "";

  // Remove all spaces and convert to uppercase
  let cleanPostcode = postcode.replace(/\s+/g, "").toUpperCase();

  switch (country) {
    case "US": // United States (primary)
      // US ZIP codes: 12345 or 12345-6789
      if (/^\d{5}$/.test(cleanPostcode)) {
        return cleanPostcode;
      }
      if (/^\d{9}$/.test(cleanPostcode)) {
        return `${cleanPostcode.slice(0, 5)}-${cleanPostcode.slice(5)}`;
      }
      // If it looks like a ZIP code with dash, keep it
      if (/^\d{5}-\d{4}$/.test(cleanPostcode)) {
        return cleanPostcode;
      }
      break;
    case "CA": // Canada (legacy support)
      // Canadian postal codes: A1A1A1 -> A1A 1A1
      if (
        cleanPostcode.length === 6 &&
        /^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(cleanPostcode)
      ) {
        return `${cleanPostcode.slice(0, 3)} ${cleanPostcode.slice(3)}`;
      }
      break;
    case "GB": // United Kingdom
      // UK postcodes have various formats, keep as is but ensure proper spacing
      if (cleanPostcode.length >= 5) {
        const outward = cleanPostcode.slice(0, -3);
        const inward = cleanPostcode.slice(-3);
        return `${outward} ${inward}`;
      }
      break;
    default:
      // For other countries, if it looks like US ZIP, format as US
      if (/^\d{5}$/.test(cleanPostcode) || /^\d{9}$/.test(cleanPostcode)) {
        if (cleanPostcode.length === 9) {
          return `${cleanPostcode.slice(0, 5)}-${cleanPostcode.slice(5)}`;
        }
        return cleanPostcode;
      }
      // Otherwise return cleaned version
      return cleanPostcode;
  }

  // If no specific formatting applies, return cleaned version
  return cleanPostcode;
}

export async function POST(req) {
  try {
    const requestData = await req.json();

    const {
      firstName,
      lastName,
      addressOne,
      addressTwo,
      city,
      state,
      postcode,
      country,
      phone,
      email,
      discreet,
      toMailBox,
      customerNotes,
      cardNumber,
      cardType,
      cardExpMonth,
      cardExpYear,
      cardCVD,
      savedCardToken,
      savedCardId,
      useSavedCard,
      shipToAnotherAddress,
      shippingFirstName,
      shippingLastName,
      shippingAddressOne,
      shippingAddressTwo,
      shippingCity,
      shippingState,
      shippingPostcode,
      shippingCountry,
      shippingPhone,
      totalAmount, // Ensure it's passed from the frontend
      isFreeOrder, // Flag for zero-amount orders
      paymentMethod, // Custom payment method for free orders
      payment_data, // Stripe payment data array
    } = requestData;

    const cookieStore = await cookies();
    const encodedCredentials = cookieStore.get("authToken");
    const cartNonce = cookieStore.get("cart-nonce");

    if (!encodedCredentials) {
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 401 }
      );
    }

    // Build checkout data for WooCommerce API
    const checkoutData = {
      billing_address: {
        first_name: firstName,
        last_name: lastName,
        address_1: addressOne,
        address_2: addressTwo,
        city: city,
        state: state,
        postcode: formatPostcode(postcode, country),
        country: country,
        email: email,
        phone: phone,
      },
      shipping_address: shipToAnotherAddress
        ? {
            first_name: shippingFirstName,
            last_name: shippingLastName,
            address_1: shippingAddressOne,
            address_2: shippingAddressTwo,
            city: shippingCity,
            state: shippingState,
            postcode: formatPostcode(shippingPostcode, shippingCountry),
            country: shippingCountry,
          }
        : {
            first_name: firstName,
            last_name: lastName,
            address_1: addressOne,
            address_2: addressTwo,
            city: city,
            state: state,
            postcode: formatPostcode(postcode, country),
            country: country,
          },
      payment_method: paymentMethod || "stripe_cc", // Use Stripe credit card payment method
      payment_data: payment_data || [],
      customer_note: customerNotes || "",
      meta_data: [
        {
          key: "_meta_discreet",
          value: discreet ? "1" : "0",
        },
        {
          key: "_meta_mail_box",
          value: toMailBox ? "1" : "0",
        },
        // Payment profile ID will be added after payment via order update
        // Add free order metadata
        ...(isFreeOrder
          ? [
              {
                key: "_payment_method_title",
                value: "Paid with 100% Coupon Discount",
              },
              {
                key: "_free_order_coupon_payment",
                value: "true",
              },
            ]
          : []),
      ],
    };

    // Handle payment data - use what's passed from frontend or set defaults for free orders
    if (isFreeOrder) {
      console.log("Processing free order with 100% coupon discount");
      checkoutData.payment_data = [
        {
          key: "free-order-coupon-payment",
          value: "true",
        },
      ];
    } else {
      // For regular payments, check if we have an existing PaymentIntent
      const existingPaymentIntent = payment_data?.find(
        (item) => item.key === "wc-stripe-payment-intent"
      );

      if (existingPaymentIntent) {
        console.log(
          "Using existing PaymentIntent:",
          existingPaymentIntent.value
        );
        // WooCommerce Stripe plugin will use the existing PaymentIntent
        // No need to modify payment_data - it's already correctly formatted
      } else {
        console.log(
          "No existing PaymentIntent found, WooCommerce will create one"
        );
        // WooCommerce Stripe plugin will create a new PaymentIntent
      }
    }

    // Call the WooCommerce Store API checkout endpoint
    const response = await axios.post(
      `${BASE_URL}/wp-json/wc/store/v1/checkout`,
      checkoutData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: encodedCredentials.value,
          Nonce: cartNonce?.value || "",
        },
      }
    );

    // Handle free orders (100% coupon payment)

    // Try to find order ID in different possible locations
    const orderId =
      response.data.id ||
      response.data.order_id ||
      response.data.order?.id ||
      response.data.data?.id ||
      null;

    if (isFreeOrder && orderId) {
      try {
        // Update order status to on-hold for free orders
        const orderUpdateData = {
          status: "on-hold",
          payment_method_title: "Paid with 100% Coupon Discount",
        };

        const updateResponse = await axios.put(
          `${BASE_URL}/wp-json/wc/v3/orders/${orderId}`,
          orderUpdateData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${Buffer.from(
                `${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`
              ).toString("base64")}`,
            },
          }
        );

        // Add order note for free orders
        const orderNoteData = {
          note: "✅ Order placed on-hold with 100% coupon discount. No payment processing required.",
          customer_note: false, // This is an admin note
        };

        await axios.post(
          `${BASE_URL}/wp-json/wc/v3/orders/${orderId}/notes`,
          orderNoteData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${Buffer.from(
                `${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`
              ).toString("base64")}`,
            },
          }
        );
      } catch (updateError) {
        console.error(
          "Error updating free order status or adding note:",
          updateError.message
        );
        console.error("Full error details:", updateError.response?.data);
        // Don't fail the order creation if status update fails
      }
    }

    // Return the response in a consistent format
    return NextResponse.json({
      success: true,
      data: {
        id: response.data.id || response.data.order_id,
        order_key: response.data.order_key,
        status: response.data.status,
        payment_result: response.data.payment_result,
        data_sent: checkoutData,
        order_data: response.data,
      },
    });
  } catch (error) {
    console.error("Error processing checkout:", error);

    // Enhanced error handling with more details
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "An error occurred during checkout";

    return NextResponse.json(
      {
        error: errorMessage,
        details: error.response?.data,
      },
      { status: error.response?.status || 500 }
    );
  }
}

import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const BASE_URL = process.env.BASE_URL;

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
      shippingPostCode,
      shippingCountry,
      shippingPhone,
      totalAmount, // Ensure it's passed from the frontend
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

    let token = "";
    let cardNumberLastFourNumbers = "";

    // Process payment token if using new card
    if (!useSavedCard && cardNumber) {
      cardNumberLastFourNumbers = cardNumber.slice(-4);
      try {
        token = await generateToken({
          cvd: cardCVD,
          expiry_month: cardExpMonth,
          expiry_year: cardExpYear,
          number: cardNumber,
        });
      } catch (error) {
        return NextResponse.json(
          { error: "Failed to process card. Check your details." },
          { status: 400 }
        );
      }
    }

    // Prepare WooCommerce Store API checkout payload
    const checkoutData = {
      billing_address: {
        first_name: firstName,
        last_name: lastName,
        company: "",
        address_1: addressOne,
        address_2: addressTwo || "",
        city,
        state,
        postcode,
        country,
        email,
        phone,
      },
      shipping_address: shipToAnotherAddress
        ? {
            first_name: shippingFirstName || firstName,
            last_name: shippingLastName || lastName,
            company: "",
            address_1: shippingAddressOne || addressOne,
            address_2: shippingAddressTwo || addressTwo || "",
            city: shippingCity || city,
            state: shippingState || state,
            postcode: shippingPostCode || postcode,
            country: shippingCountry || country,
            phone: shippingPhone || phone,
          }
        : {
            first_name: firstName,
            last_name: lastName,
            company: "",
            address_1: addressOne,
            address_2: addressTwo || "",
            city,
            state,
            postcode,
            country,
            phone,
          },
      customer_note: customerNotes || "",
      payment_method: "bambora_credit_card",
      payment_data: [],
      meta_data: [
        {
          key: "_meta_discreet",
          value: discreet ? "1" : "0",
        },
        {
          key: "_meta_mail_box",
          value: toMailBox ? "1" : "0",
        },
      ],
    };

    // Add appropriate payment data based on payment method
    if (useSavedCard && savedCardToken) {
      checkoutData.payment_data.push(
        {
          // The token parameter is for the customer profile code in Bambora
          key: "bambora_credit_card-customer-code",
          value: savedCardToken,
        },
        {
          // The card ID parameter
          key: "bambora_credit_card-card-id",
          value: savedCardId || "1",
        },
        {
          // This enables payment with saved cards
          key: "tokenize",
          value: "true",
        },
        {
          // Specify that we're using an existing saved card
          key: "wc-bambora_credit_card-payment-token",
          value: savedCardToken,
        },
        {
          // This indicates we're not saving a new card
          key: "wc-bambora_credit_card-new-payment-method",
          value: "0",
        }
      );

      // Add CVV if provided
      if (cardCVD) {
        checkoutData.payment_data.push({
          key: "wc-bambora-credit-card-cvv",
          value: cardCVD,
        });
      }
    } else {
      // For new cards, continue with the existing implementation
      checkoutData.payment_data.push(
        {
          key: "wc-bambora-credit-card-js-token",
          value: token,
        },
        {
          key: "wc-bambora-credit-card-account-number",
          value: cardNumberLastFourNumbers,
        },
        {
          key: "wc-bambora-credit-card-card-type",
          value: cardType,
        },
        {
          key: "wc-bambora-credit-card-exp-month",
          value: cardExpMonth,
        },
        {
          key: "wc-bambora-credit-card-exp-year",
          value: cardExpYear,
        },
        {
          key: "wc-bambora_credit_card-new-payment-method",
          value: "1",
        }
      );
    }

    // Debug the final checkout data with enhanced logging
    console.log("FINAL checkoutData", JSON.stringify(checkoutData, null, 2));

    // Write to server log file for debugging
    const fs = require("fs");
    const path = require("path");
    const logDir = path.join(process.cwd(), "tmp");

    try {
      // Create tmp directory if it doesn't exist
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }

      // Write checkout data to log file
      fs.writeFileSync(
        path.join(logDir, `checkout-log-${Date.now()}.json`),
        JSON.stringify(
          {
            timestamp: new Date().toISOString(),
            checkoutData,
            savedCardUsed: useSavedCard,
            totalAmount,
          },
          null,
          2
        )
      );
    } catch (logError) {
      console.error("Error writing debug log:", logError);
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

    // Return the response in a consistent format
    return NextResponse.json({
      success: true,
      data: {
        id: response.data.id || response.data.order_id,
        order_key: response.data.order_key,
        status: response.data.status,
        payment_result: response.data.payment_result,
      },
    });
  } catch (error) {
    // If checkout failed, try to refresh the cart nonce
    try {
      const cartResponse = await axios.get(
        `${BASE_URL}/wp-json/wc/store/cart`,
        {
          headers: {
            Authorization: encodedCredentials.value,
          },
        }
      );

      // Update the cart nonce if available
      if (cartResponse.headers && cartResponse.headers.nonce) {
        cookieStore.set("cart-nonce", cartResponse.headers.nonce);
      }
    } catch (refreshError) {
      console.error("Error refreshing cart nonce:", refreshError);
    }

    return NextResponse.json(
      {
        error: error.response?.data?.message || "Failed to checkout.",
        details: error.response?.data || null,
      },
      { status: error.response?.status || 500 }
    );
  }
}

async function generateToken({ cvd, expiry_month, expiry_year, number }) {
  const res = await axios.post(
    "https://www.beanstream.com/scripts/tokenization/tokens",
    { cvd, expiry_month, expiry_year, number },
    {
      headers: {
        "Content-Type": "application/json",
        Host: "www.beanstream.com",
        Origin: "https://libs.na.bambora.com",
        Referer: "https://libs.na.bambora.com",
      },
    }
  );

  if (!res.data || !res.data.token) {
    throw new Error("No token from Bambora API");
  }

  return res.data.token;
}

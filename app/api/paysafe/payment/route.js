import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

const BASE_URL = process.env.BASE_URL;
const PAYSAFE_ACCOUNT_ID = process.env.PAYSAFE_ACCOUNT_ID;
const PAYSAFE_API_USERNAME = process.env.PAYSAFE_API_USERNAME;
const PAYSAFE_API_PASSWORD = process.env.PAYSAFE_API_PASSWORD;
const PAYSAFE_ENVIRONMENT = process.env.PAYSAFE_ENVIRONMENT || "test";

const paysafeBaseUrl =
  PAYSAFE_ENVIRONMENT === "live"
    ? "https://api.paysafe.com"
    : "https://api.test.paysafe.com";

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken");
    const userId = cookieStore.get("userId");

    if (!authToken || !userId) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    const {
      order_id,
      amount,
      currency = "USD",
      cardNumber,
      cardExpMonth,
      cardExpYear,
      cardCVD,
      billing_address,
      saveCard = false,
    } = await req.json();

    if (
      !order_id ||
      !amount ||
      !cardNumber ||
      !cardExpMonth ||
      !cardExpYear ||
      !cardCVD
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required payment information" },
        { status: 400 }
      );
    }

    // Validate Paysafe credentials
    console.log("Paysafe environment check:", {
      PAYSAFE_ACCOUNT_ID: PAYSAFE_ACCOUNT_ID ? "✓ Set" : "✗ Missing",
      PAYSAFE_API_USERNAME: PAYSAFE_API_USERNAME ? "✓ Set" : "✗ Missing",
      PAYSAFE_API_PASSWORD: PAYSAFE_API_PASSWORD ? "✓ Set" : "✗ Missing",
      PAYSAFE_ENVIRONMENT: PAYSAFE_ENVIRONMENT,
      paysafeBaseUrl: paysafeBaseUrl,
    });

    console.log("Full Paysafe credentials (for debugging):", {
      accountId: PAYSAFE_ACCOUNT_ID,
      username: PAYSAFE_API_USERNAME,
      password: PAYSAFE_API_PASSWORD
        ? `${PAYSAFE_API_PASSWORD.substring(0, 20)}...`
        : "missing",
      environment: PAYSAFE_ENVIRONMENT,
    });

    if (!PAYSAFE_ACCOUNT_ID || !PAYSAFE_API_USERNAME || !PAYSAFE_API_PASSWORD) {
      const missingVars = [];
      if (!PAYSAFE_ACCOUNT_ID) missingVars.push("PAYSAFE_ACCOUNT_ID");
      if (!PAYSAFE_API_USERNAME) missingVars.push("PAYSAFE_API_USERNAME");
      if (!PAYSAFE_API_PASSWORD) missingVars.push("PAYSAFE_API_PASSWORD");

      console.error("Missing Paysafe environment variables:", missingVars);

      return NextResponse.json(
        {
          success: false,
          message: "Paysafe API not configured",
          missing_variables: missingVars,
        },
        { status: 500 }
      );
    }

    // Prepare Paysafe payment request
    const paymentData = {
      merchantRefNum: `order_${order_id}_${Date.now()}`,
      amount: Math.round(amount * 100), // Convert to cents
      settleWithAuth: true,
      currency: currency,
      card: {
        cardNum: cardNumber.replace(/\s/g, ""),
        cardExpiry: {
          month: parseInt(cardExpMonth),
          year: parseInt(
            cardExpYear.length === 2 ? `20${cardExpYear}` : cardExpYear
          ),
        },
        cvv: cardCVD,
      },
      billingDetails: {
        street: billing_address.address_1,
        city: billing_address.city,
        state: billing_address.state,
        country: billing_address.country,
        zip: billing_address.postcode,
        // firstName: billing_address.first_name,
        // lastName: billing_address.last_name,
        // email: billing_address.email,
        // phone: billing_address.phone,
      },
    };

    // Note: Profile functionality removed to match Paysafe API documentation
    // For saved cards, this would need to be handled separately

    console.log("Processing Paysafe payment for order:", order_id);
    console.log("Paysafe payment request data:", {
      merchantRefNum: paymentData.merchantRefNum,
      amount: paymentData.amount,
      currency: paymentData.currency,
      card: {
        cardNum: paymentData.card.cardNum
          ? `${paymentData.card.cardNum.slice(0, 4)}****`
          : "empty",
        cardExpiry: paymentData.card.cardExpiry,
        cvv: "***",
      },
      billingDetails: paymentData.billingDetails,
    });

    // Make payment request to Paysafe
    console.log(
      "Making request to Paysafe API:",
      `${paysafeBaseUrl}/cardpayments/v1/accounts/${PAYSAFE_ACCOUNT_ID}/auths`
    );

    // Try the exact endpoint from the documentation
    const paysafeResponse = await axios.post(
      `${paysafeBaseUrl}/cardpayments/v1/accounts/${PAYSAFE_ACCOUNT_ID}/auths`,
      paymentData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            Buffer.from(
              PAYSAFE_API_USERNAME + ":" + PAYSAFE_API_PASSWORD
            ).toString("base64"),
        },
      }
    );

    console.log("Paysafe payment response:", {
      status: paysafeResponse.data.status,
      id: paysafeResponse.data.id,
      merchantRefNum: paysafeResponse.data.merchantRefNum,
    });

    // Check if payment was successful
    if (paysafeResponse.data.status === "COMPLETED") {
      // Update WooCommerce order with payment information
      try {
        const orderUpdateResponse = await axios.put(
          `${BASE_URL}/wp-json/wc/v3/orders/${order_id}`,
          {
            status: "processing",
            transaction_id: paysafeResponse.data.id,
            meta_data: [
              {
                key: "_paysafe_payment_id",
                value: paysafeResponse.data.id,
              },
              {
                key: "_paysafe_merchant_ref",
                value: paysafeResponse.data.merchantRefNum,
              },
              {
                key: "_paysafe_auth_code",
                value: paysafeResponse.data.authCode,
              },
            ],
          },
          {
            headers: {
              Authorization: authToken.value,
              "Content-Type": "application/json",
            },
          }
        );

        return NextResponse.json({
          success: true,
          order_id: order_id,
          payment_id: paysafeResponse.data.id,
          status: "completed",
          message: "Payment processed successfully",
        });
      } catch (orderUpdateError) {
        console.error("Error updating WooCommerce order:", orderUpdateError);
        // Payment was successful but order update failed
        return NextResponse.json({
          success: true,
          order_id: order_id,
          payment_id: paysafeResponse.data.id,
          status: "completed",
          message: "Payment processed but order update failed",
        });
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          message: `Payment failed: ${paysafeResponse.data.status}`,
          paysafe_error: paysafeResponse.data.error,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(
      "Paysafe payment error:",
      error.response?.data || error.message
    );

    // Log the full error details for debugging
    if (error.response?.data?.error) {
      console.error("Paysafe API Error Details:", {
        code: error.response.data.error.code,
        message: error.response.data.error.message,
        links: error.response.data.error.links,
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Payment processing failed",
        error: error.response?.data || error.message,
        paysafe_error_code: error.response?.data?.error?.code,
        paysafe_error_message: error.response?.data?.error?.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}

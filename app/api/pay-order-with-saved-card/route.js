import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

const BASE_URL = process.env.BASE_URL;
const API_SECRET_KEY =
  process.env.SAVED_CARD_API_SECRET ||
  "+i/h/yeqsqqlEg9pA/niaDqS4WzRh7YTCFNwOma/rXQ=";

export async function POST(req) {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get("authToken");
    const userId = cookieStore.get("userId");

    // Check if user is authenticated
    if (!authToken || !userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }

    // Parse the request body
    const data = await req.json();
    const {
      order_id,
      savedCardToken,
      cardId = 1,
      cvv = "",
      billing_address = null, // Add billing address parameter
    } = data;

    // Validate required fields
    if (!order_id || !savedCardToken) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields: order_id and savedCardToken are required",
        },
        { status: 400 }
      );
    }

    // Call the WordPress custom endpoint to process the payment with a saved card
    const response = await axios.post(
      `${BASE_URL}/wp-json/custom/v1/pay-order-with-saved-card`,
      {
        order_id,
        savedCardToken,
        cardId,
        cvv,
        billing_address, // Pass the billing address to the WordPress endpoint
      },
      {
        headers: {
          Authorization: `${authToken.value}`,
          "x-api-secret": API_SECRET_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    // Return the response data
    return NextResponse.json({
      success: true,
      order_id: response.data.order_id,
      order_key: response.data.order_key,
      order_status: response.data.order_status,
      transaction_id: response.data.transaction_id,
      message: "Payment processed successfully",
    });
  } catch (error) {
    console.error(
      "Error processing payment with saved card:",
      error.response?.data || error.message
    );

    // If payment failed, try to refresh the cart nonce
    try {
      const cartResponse = await axios.get(
        `${BASE_URL}/wp-json/wc/store/cart`,
        {
          headers: {
            Authorization: authToken.value,
          },
        }
      );

      // Update the cart nonce if available
      if (cartResponse.headers && cartResponse.headers.nonce) {
        const cookieStore = cookies();
        cookieStore.set("cart-nonce", cartResponse.headers.nonce);
      }
    } catch (refreshError) {
      console.error("Error refreshing cart nonce:", refreshError);
    }

    return NextResponse.json(
      {
        success: false,
        message:
          error.response?.data?.message ||
          "Payment processing failed. Please try again.",
        error: error.response?.data || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}

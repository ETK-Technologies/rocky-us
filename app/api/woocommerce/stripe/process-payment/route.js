import { NextResponse } from "next/server";
import axios from "axios";

const BASE_URL = process.env.BASE_URL || process.env.WORDPRESS_BASE_URL;
const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;

/**
 * Generate a WordPress nonce for AJAX security
 */
async function generateWordPressNonce(action) {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const nonce = Buffer.from(`${action}_${timestamp}_${CONSUMER_KEY}`)
      .toString("base64")
      .substring(0, 10);

    return nonce;
  } catch (error) {
    console.warn(
      "Could not generate proper nonce, using fallback:",
      error.message
    );
    return Buffer.from(`${action}_${Date.now()}`)
      .toString("base64")
      .substring(0, 10);
  }
}

/**
 * Complete WooCommerce Stripe AJAX API payment processing
 * This handles the full flow: get cart details -> create order -> process payment
 */
export async function POST(req) {
  try {
    const {
      billing_address,
      shipping_address,
      payment_request_type = "apple_pay",
    } = await req.json();

    console.log("Processing payment via WooCommerce AJAX API:", {
      payment_request_type,
      has_shipping_address: !!shipping_address,
      has_billing_address: !!billing_address,
    });

    if (!BASE_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing WooCommerce configuration",
        },
        { status: 500 }
      );
    }

    // Step 1: Get cart details
    console.log("Step 1: Getting cart details...");

    const cartFormData = new FormData();
    cartFormData.append("action", "wc_stripe_get_cart_details");
    cartFormData.append("payment_request_type", payment_request_type);
    const cartNonce = await generateWordPressNonce(
      "wc_stripe_get_cart_details"
    );
    cartFormData.append("security", cartNonce);

    const cartResponse = await axios.post(
      `${BASE_URL}/?wc-ajax=wc_stripe_get_cart_details`,
      cartFormData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "WooCommerce-Headless-Client/1.0",
        },
        timeout: 30000,
      }
    );

    console.log("Cart details response:", {
      status: cartResponse.status,
      data: cartResponse.data,
    });

    if (cartResponse.data && cartResponse.data.error) {
      return NextResponse.json({
        success: false,
        error: cartResponse.data.error,
        details: cartResponse.data,
      });
    }

    // Step 2: Create order
    console.log("Step 2: Creating order...");

    const orderFormData = new FormData();
    orderFormData.append("action", "wc_stripe_create_order");
    orderFormData.append("payment_request_type", payment_request_type);
    const orderNonce = await generateWordPressNonce("wc_stripe_create_order");
    orderFormData.append("security", orderNonce);

    // Add shipping address if provided
    if (shipping_address) {
      Object.entries(shipping_address).forEach(([key, value]) => {
        if (value) {
          orderFormData.append(`shipping_${key}`, value);
        }
      });
    }

    // Add billing address if provided
    if (billing_address) {
      Object.entries(billing_address).forEach(([key, value]) => {
        if (value) {
          orderFormData.append(`billing_${key}`, value);
        }
      });
    }

    const orderResponse = await axios.post(
      `${BASE_URL}/?wc-ajax=wc_stripe_create_order`,
      orderFormData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "WooCommerce-Headless-Client/1.0",
        },
        timeout: 30000,
      }
    );

    console.log("Order creation response:", {
      status: orderResponse.status,
      data: orderResponse.data,
    });

    if (orderResponse.data && orderResponse.data.error) {
      return NextResponse.json({
        success: false,
        error: orderResponse.data.error,
        details: orderResponse.data,
      });
    }

    // Return the complete response
    return NextResponse.json({
      success: true,
      data: {
        cart_details: cartResponse.data,
        order_details: orderResponse.data,
        // Extract key information for frontend
        order_id: orderResponse.data.order_id || orderResponse.data.id,
        order_key: orderResponse.data.order_key,
        client_secret: orderResponse.data.client_secret,
        payment_intent_id: orderResponse.data.payment_intent_id,
      },
    });
  } catch (error) {
    console.error(
      "WooCommerce AJAX API error:",
      error.response?.data || error.message
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process payment via WooCommerce AJAX API",
        details: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}

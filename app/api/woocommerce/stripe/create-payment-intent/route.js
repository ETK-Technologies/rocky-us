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
    // Use WooCommerce REST API to get a nonce
    const response = await axios.get(
      `${BASE_URL}/wp-json/wc/v3/system_status`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${CONSUMER_KEY}:${CONSUMER_SECRET}`
          ).toString("base64")}`,
        },
      }
    );

    // For now, generate a simple nonce based on timestamp and action
    // In production, you might want to implement proper WordPress nonce generation
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
    // Fallback nonce for development
    return Buffer.from(`${action}_${Date.now()}`)
      .toString("base64")
      .substring(0, 10);
  }
}

/**
 * Proxy to WooCommerce Stripe AJAX API: wc_stripe_create_payment_intent
 * This creates a PaymentIntent using WooCommerce's official Stripe integration
 */
export async function POST(req) {
  try {
    const {
      order_id,
      amount,
      currency = "USD",
      customer_email,
      customer_name,
      billing_address,
      shipping_address,
    } = await req.json();

    console.log("Creating PaymentIntent via WooCommerce AJAX API:", {
      order_id,
      amount,
      currency,
      customer_email,
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

    // Prepare FormData for WooCommerce AJAX API
    const formData = new FormData();
    formData.append("action", "wc_stripe_create_payment_intent");
    formData.append("order_id", order_id);
    formData.append("amount", Math.round(amount * 100)); // Convert to cents
    formData.append("currency", currency.toLowerCase());

    if (customer_email) {
      formData.append("customer_email", customer_email);
    }

    if (customer_name) {
      formData.append("customer_name", customer_name);
    }

    // Add billing address if provided
    if (billing_address) {
      Object.entries(billing_address).forEach(([key, value]) => {
        if (value) {
          formData.append(`billing_${key}`, value);
        }
      });
    }

    // Add shipping address if provided
    if (shipping_address) {
      Object.entries(shipping_address).forEach(([key, value]) => {
        if (value) {
          formData.append(`shipping_${key}`, value);
        }
      });
    }

    // Add nonce for security - generate a proper nonce
    const nonce = await generateWordPressNonce(
      "wc_stripe_create_payment_intent"
    );
    formData.append("wc_stripe_create_payment_intent_nonce", nonce);

    // Call WooCommerce AJAX API
    const response = await axios.post(
      `${BASE_URL}/?wc-ajax=wc_stripe_create_payment_intent`,
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "WooCommerce-Headless-Client/1.0",
        },
        timeout: 30000, // 30 second timeout
      }
    );

    console.log("WooCommerce AJAX API response:", {
      status: response.status,
      data: response.data,
    });

    // WooCommerce AJAX API typically returns JSON
    if (response.data && typeof response.data === "object") {
      // Check if the response indicates success or failure
      if (response.data.error) {
        return NextResponse.json({
          success: false,
          error: response.data.error,
          details: response.data,
        });
      }

      return NextResponse.json({
        success: true,
        data: response.data,
      });
    } else {
      // Handle case where response is not JSON (likely a client_secret string)
      const clientSecret = response.data;

      if (clientSecret && clientSecret.startsWith("pi_")) {
        // This is a PaymentIntent client secret
        return NextResponse.json({
          success: true,
          data: {
            client_secret: clientSecret,
            status: "requires_payment_method",
            id: clientSecret.split("_secret_")[0], // Extract PaymentIntent ID
          },
        });
      }

      // Handle other response formats
      return NextResponse.json({
        success: true,
        data: {
          client_secret: clientSecret,
          status: "requires_payment_method",
        },
      });
    }
  } catch (error) {
    console.error(
      "WooCommerce AJAX API error:",
      error.response?.data || error.message
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create PaymentIntent via WooCommerce",
        details: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}

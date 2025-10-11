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
 * Proxy to WooCommerce Stripe AJAX API: wc_stripe_create_order
 * This creates an order using WooCommerce's official Stripe integration
 */
export async function POST(req) {
  try {
    const {
      payment_request_type = "apple_pay", // Default to apple_pay, can be google_pay, payment_request_api
      shipping_address,
      billing_address,
      security,
    } = await req.json();

    console.log("Creating order via WooCommerce AJAX API:", {
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

    // Prepare FormData for WooCommerce AJAX API
    const formData = new FormData();
    formData.append("action", "wc_stripe_create_order");
    formData.append("payment_request_type", payment_request_type);

    // Add security nonce
    const nonce =
      security || (await generateWordPressNonce("wc_stripe_create_order"));
    formData.append("security", nonce);

    // Add shipping address if provided
    if (shipping_address) {
      Object.entries(shipping_address).forEach(([key, value]) => {
        if (value) {
          formData.append(`shipping_${key}`, value);
        }
      });
    }

    // Add billing address if provided
    if (billing_address) {
      Object.entries(billing_address).forEach(([key, value]) => {
        if (value) {
          formData.append(`billing_${key}`, value);
        }
      });
    }

    // Call WooCommerce AJAX API
    const response = await axios.post(
      `${BASE_URL}/?wc-ajax=wc_stripe_create_order`,
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
      // Handle case where response is not JSON
      return NextResponse.json({
        success: true,
        data: {
          result: response.data,
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
        error: "Failed to create order via WooCommerce AJAX API",
        details: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}

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
 * Proxy to WooCommerce Stripe AJAX API: wc_stripe_get_cart_details
 * This gets cart details for Stripe payment requests
 */
export async function POST(req) {
  try {
    const { payment_request_type = "apple_pay", security } = await req.json();

    console.log("Getting cart details via WooCommerce AJAX API:", {
      payment_request_type,
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
    formData.append("action", "wc_stripe_get_cart_details");
    formData.append("payment_request_type", payment_request_type);

    // Add security nonce
    const nonce =
      security || (await generateWordPressNonce("wc_stripe_get_cart_details"));
    formData.append("security", nonce);

    // Call WooCommerce AJAX API
    const response = await axios.post(
      `${BASE_URL}/?wc-ajax=wc_stripe_get_cart_details`,
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "WooCommerce-Headless-Client/1.0",
        },
        timeout: 30000,
      }
    );

    console.log("WooCommerce AJAX API response:", {
      status: response.status,
      data: response.data,
    });

    if (response.data && typeof response.data === "object") {
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
        error: "Failed to get cart details via WooCommerce AJAX API",
        details: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}

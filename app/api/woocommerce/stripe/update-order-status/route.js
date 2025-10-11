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
 * Proxy to WooCommerce Stripe AJAX API: wc_stripe_update_order_status
 * This updates order status after payment using WooCommerce's official Stripe integration
 */
export async function POST(req) {
  try {
    const {
      order_id,
      payment_intent_id,
      payment_status,
      payment_method_id,
      customer_id,
    } = await req.json();

    console.log("Updating order status via WooCommerce AJAX API:", {
      order_id,
      payment_intent_id,
      payment_status,
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
    formData.append("action", "wc_stripe_update_order_status");
    formData.append("order_id", order_id);
    formData.append("payment_intent_id", payment_intent_id);
    formData.append("payment_status", payment_status || "requires_capture");

    if (payment_method_id) {
      formData.append("payment_method_id", payment_method_id);
    }

    if (customer_id) {
      formData.append("customer_id", customer_id);
    }

    // Add nonce for security
    const nonce = await generateWordPressNonce("wc_stripe_update_order_status");
    formData.append("wc_stripe_update_order_status_nonce", nonce);

    // Call WooCommerce AJAX API
    const response = await axios.post(
      `${BASE_URL}/?wc-ajax=wc_stripe_update_order_status`,
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("WooCommerce AJAX API response:", {
      status: response.status,
      data: response.data,
    });

    return NextResponse.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error(
      "WooCommerce AJAX API error:",
      error.response?.data || error.message
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update order status via WooCommerce",
        details: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}

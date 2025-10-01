import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";
import Stripe from "stripe";

const BASE_URL = process.env.BASE_URL || process.env.WORDPRESS_BASE_URL;
const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;

// Initialize Stripe
const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_placeholder"
);

export async function POST(req, { params }) {
  try {
    const { order_id } = params;
    const { payment_intent_id, order_key } = await req.json();

    console.log(
      `Confirming payment for order ${order_id} with PaymentIntent ${payment_intent_id}`
    );

    if (!BASE_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
      console.error("Missing configuration:", {
        BASE_URL: !!BASE_URL,
        CONSUMER_KEY: !!CONSUMER_KEY,
        CONSUMER_SECRET: !!CONSUMER_SECRET,
      });
      return NextResponse.json(
        { success: false, message: "Server configuration incomplete" },
        { status: 500 }
      );
    }

    // Use the same authentication as main checkout API (Basic Auth with CONSUMER_KEY/SECRET)
    const authHeader = `Basic ${Buffer.from(
      `${CONSUMER_KEY}:${CONSUMER_SECRET}`
    ).toString("base64")}`;
    console.log("Using REST API v3 authentication for order update");

    // Step 0: Retrieve PaymentIntent details from Stripe to get payment method
    let paymentIntent;
    let paymentMethodId = null;
    let stripeCustomerId = null;
    let captureMethod = "manual";

    try {
      console.log(`Retrieving PaymentIntent ${payment_intent_id} from Stripe`);
      paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);

      paymentMethodId = paymentIntent.payment_method;
      stripeCustomerId = paymentIntent.customer;
      captureMethod = paymentIntent.capture_method;

      console.log("✅ PaymentIntent retrieved:", {
        id: paymentIntent.id,
        status: paymentIntent.status,
        payment_method: paymentMethodId,
        customer: stripeCustomerId,
        capture_method: captureMethod,
        amount: paymentIntent.amount,
      });
    } catch (stripeError) {
      console.error(
        "❌ Failed to retrieve PaymentIntent:",
        stripeError.message
      );
      // Continue even if Stripe retrieval fails - we can still update the order
    }

    // Step 1: Add order note with payment details
    const orderNoteData = {
      note: `✅ Stripe payment authorized successfully!
Payment Intent ID: ${payment_intent_id}
Payment Method ID: ${paymentMethodId || "N/A"}
Customer ID: ${stripeCustomerId || "N/A"}
Payment Status: ${paymentIntent?.status || "authorized"}
Capture Method: ${captureMethod}
⚠️ Payment requires manual capture from WordPress admin
Confirmed At: ${new Date().toISOString()}`,
      customer_note: false, // Admin note
    };

    console.log(`Adding payment confirmation note to order ${order_id}`);

    try {
      await axios.post(
        `${BASE_URL}/wp-json/wc/v3/orders/${order_id}/notes`,
        orderNoteData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        }
      );
      console.log(`✅ Order note added successfully`);
    } catch (noteError) {
      console.warn("⚠️ Failed to add order note:", noteError.message);
      // Continue even if note fails
    }

    // Step 2: Update order status using the same authentication as Store API
    const metaDataArray = [
      {
        key: "_stripe_payment_intent_id",
        value: payment_intent_id,
      },
      {
        key: "_payment_method_title",
        value: "Stripe Credit Card",
      },
      {
        key: "_stripe_payment_confirmed",
        value: "true",
      },
      {
        key: "_stripe_payment_confirmed_at",
        value: new Date().toISOString(),
      },
      {
        key: "_payment_requires_capture",
        value: captureMethod === "manual" ? "yes" : "no",
      },
      {
        key: "_stripe_capture_method",
        value: captureMethod,
      },
    ];

    // Add payment method ID for subscription renewals (if available)
    if (paymentMethodId) {
      metaDataArray.push({
        key: "_stripe_payment_method_id",
        value: paymentMethodId,
      });
    }

    // Add Stripe customer ID for subscription management (if available)
    if (stripeCustomerId) {
      metaDataArray.push({
        key: "_stripe_customer_id",
        value: stripeCustomerId,
      });
    }

    // Add payment intent status
    if (paymentIntent?.status) {
      metaDataArray.push({
        key: "_stripe_payment_status",
        value: paymentIntent.status,
      });
    }

    const orderUpdateData = {
      status: "on-hold", // Awaiting manual capture
      meta_data: metaDataArray,
    };

    console.log(`Updating order ${order_id} status to on-hold`);

    const response = await axios.put(
      `${BASE_URL}/wp-json/wc/v3/orders/${order_id}`,
      orderUpdateData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      }
    );

    console.log(`✅ Order ${order_id} status updated to on-hold successfully`);

    return NextResponse.json({
      success: true,
      message: "Order payment confirmed and status updated successfully",
      data: {
        order_id: order_id,
        status: response.data.status,
        payment_intent_id: payment_intent_id,
        payment_method_id: paymentMethodId,
        customer_id: stripeCustomerId,
        capture_method: captureMethod,
        requires_capture: captureMethod === "manual",
        payment_status: paymentIntent?.status || "authorized",
        updated_at: new Date().toISOString(),
        note_added: true,
      },
    });
  } catch (error) {
    console.error(
      "Error confirming order payment:",
      error.response?.data || error.message
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to confirm payment and update order",
        error: error.response?.data?.message || error.message,
        details: error.response?.data || null,
      },
      { status: 500 }
    );
  }
}

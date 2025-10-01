import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import axios from "axios";

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("STRIPE_SECRET_KEY environment variable is not set");
}

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_placeholder"
);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const BASE_URL = process.env.BASE_URL || process.env.WORDPRESS_BASE_URL;
const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;

export async function POST(req) {
  try {
    const body = await req.text();
    const headersList = headers();
    const signature = headersList.get("stripe-signature");

    if (!signature || !webhookSecret) {
      console.error("Missing Stripe signature or webhook secret");
      return NextResponse.json(
        { error: "Missing signature or webhook secret" },
        { status: 400 }
      );
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    console.log("Stripe webhook event received:", event.type);

    // Handle the event
    switch (event.type) {
      case "payment_intent.created":
        const createdIntent = event.data.object;
        console.log("PaymentIntent created:", {
          id: createdIntent.id,
          amount: createdIntent.amount,
          currency: createdIntent.currency,
          status: createdIntent.status,
          capture_method: createdIntent.capture_method,
          order_id: createdIntent.metadata?.order_id,
        });
        break;

      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log("PaymentIntent succeeded:", {
          id: paymentIntent.id,
          status: paymentIntent.status,
          captured: paymentIntent.captured,
          order_id: paymentIntent.metadata?.order_id,
        });

        // Only update order if payment was automatically captured
        // Manual capture is handled separately in WordPress
        if (
          paymentIntent.captured &&
          paymentIntent.capture_method === "automatic" &&
          paymentIntent.metadata?.order_id
        ) {
          await updateOrderStatus(
            paymentIntent.metadata.order_id,
            "processing",
            `Payment automatically captured via Stripe. Payment Intent: ${paymentIntent.id}`
          );
        }
        break;

      case "payment_intent.amount_capturable_updated":
        const capturableIntent = event.data.object;
        console.log("PaymentIntent amount_capturable_updated:", {
          id: capturableIntent.id,
          status: capturableIntent.status,
          amount_capturable: capturableIntent.amount_capturable,
          order_id: capturableIntent.metadata?.order_id,
        });

        // Payment is authorized and ready for capture
        if (
          capturableIntent.amount_capturable > 0 &&
          capturableIntent.metadata?.order_id
        ) {
          await addOrderNote(
            capturableIntent.metadata.order_id,
            `⚠️ Payment authorized and ready for capture. Amount: $${
              capturableIntent.amount_capturable / 100
            }. Capture manually from WordPress admin.`
          );
        }
        break;

      case "charge.captured":
        const capturedCharge = event.data.object;
        console.log("Charge captured:", {
          id: capturedCharge.id,
          amount: capturedCharge.amount,
          payment_intent: capturedCharge.payment_intent,
        });

        // Retrieve the PaymentIntent to get order_id from metadata
        if (capturedCharge.payment_intent) {
          try {
            const pi = await stripe.paymentIntents.retrieve(
              capturedCharge.payment_intent
            );
            if (pi.metadata?.order_id) {
              await updateOrderStatus(
                pi.metadata.order_id,
                "processing",
                `✅ Payment captured successfully! Charge ID: ${
                  capturedCharge.id
                }. Amount: $${capturedCharge.amount / 100}`
              );
            }
          } catch (err) {
            console.error(
              "Error retrieving PaymentIntent for captured charge:",
              err
            );
          }
        }
        break;

      case "payment_intent.canceled":
        const canceledIntent = event.data.object;
        console.log("PaymentIntent canceled:", {
          id: canceledIntent.id,
          order_id: canceledIntent.metadata?.order_id,
        });

        if (canceledIntent.metadata?.order_id) {
          await updateOrderStatus(
            canceledIntent.metadata.order_id,
            "cancelled",
            `Payment canceled. Payment Intent: ${canceledIntent.id}`
          );
        }
        break;

      case "payment_intent.payment_failed":
        const failedPayment = event.data.object;
        console.log("PaymentIntent failed:", {
          id: failedPayment.id,
          last_payment_error: failedPayment.last_payment_error?.message,
          order_id: failedPayment.metadata?.order_id,
        });

        if (failedPayment.metadata?.order_id) {
          await updateOrderStatus(
            failedPayment.metadata.order_id,
            "failed",
            `Payment failed: ${
              failedPayment.last_payment_error?.message || "Unknown error"
            }`
          );
        }
        break;

      case "payment_method.attached":
        const paymentMethod = event.data.object;
        console.log("PaymentMethod attached:", {
          id: paymentMethod.id,
          type: paymentMethod.type,
          customer: paymentMethod.customer,
        });
        break;

      case "customer.created":
        const customer = event.data.object;
        console.log("Customer created:", {
          id: customer.id,
          email: customer.email,
        });
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

// Helper function to update order status
async function updateOrderStatus(orderId, status, note = null) {
  if (!orderId || orderId === "pending") {
    console.log("Skipping order update - order ID not available");
    return { success: false, error: "Order ID not available" };
  }

  if (!BASE_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
    console.error("Missing WooCommerce credentials for order update");
    return { success: false, error: "Missing WooCommerce credentials" };
  }

  try {
    console.log(`Updating order ${orderId} to status: ${status}`);

    const authHeader = `Basic ${Buffer.from(
      `${CONSUMER_KEY}:${CONSUMER_SECRET}`
    ).toString("base64")}`;

    // Add order note first if provided
    if (note) {
      await addOrderNote(orderId, note);
    }

    // Update order status
    const response = await axios.put(
      `${BASE_URL}/wp-json/wc/v3/orders/${orderId}`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      }
    );

    console.log(`✅ Order ${orderId} updated to ${status} successfully`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(
      `Error updating order ${orderId} status:`,
      error.response?.data || error.message
    );
    return { success: false, error: error.message };
  }
}

// Helper function to add order note
async function addOrderNote(orderId, note) {
  if (!orderId || orderId === "pending") {
    return { success: false, error: "Order ID not available" };
  }

  if (!BASE_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
    return { success: false, error: "Missing WooCommerce credentials" };
  }

  try {
    const authHeader = `Basic ${Buffer.from(
      `${CONSUMER_KEY}:${CONSUMER_SECRET}`
    ).toString("base64")}`;

    await axios.post(
      `${BASE_URL}/wp-json/wc/v3/orders/${orderId}/notes`,
      {
        note: note,
        customer_note: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      }
    );

    console.log(`✅ Note added to order ${orderId}`);
    return { success: true };
  } catch (error) {
    console.error(`Error adding note to order ${orderId}:`, error.message);
    return { success: false, error: error.message };
  }
}

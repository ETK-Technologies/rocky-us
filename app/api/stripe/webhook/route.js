import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("STRIPE_SECRET_KEY environment variable is not set");
}

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_placeholder"
);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

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
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log("PaymentIntent succeeded:", paymentIntent.id);

        // Here you would update your order status to "paid"
        // await updateOrderStatus(paymentIntent.metadata.order_id, "processing");
        break;

      case "payment_intent.payment_failed":
        const failedPayment = event.data.object;
        console.log("PaymentIntent failed:", failedPayment.id);

        // Here you would update your order status to "failed"
        // await updateOrderStatus(failedPayment.metadata.order_id, "failed");
        break;

      case "payment_method.attached":
        const paymentMethod = event.data.object;
        console.log("PaymentMethod attached:", paymentMethod.id);
        break;

      case "customer.created":
        const customer = event.data.object;
        console.log("Customer created:", customer.id);
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

// Helper function to update order status (you would implement this)
async function updateOrderStatus(orderId, status) {
  try {
    // Update order in WooCommerce
    console.log(`Would update order ${orderId} to status: ${status}`);

    // Example implementation:
    // const response = await axios.put(
    //   `${process.env.BASE_URL}/wp-json/wc/v3/orders/${orderId}`,
    //   { status },
    //   {
    //     headers: {
    //       Authorization: `Basic ${Buffer.from(
    //         `${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`
    //       ).toString("base64")}`,
    //     },
    //   }
    // );

    return { success: true };
  } catch (error) {
    console.error("Error updating order status:", error);
    return { success: false, error: error.message };
  }
}

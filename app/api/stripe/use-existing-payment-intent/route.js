import { NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("STRIPE_SECRET_KEY environment variable is not set");
}

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_placeholder"
);

export async function POST(req) {
  try {
    const { payment_intent_id, order_id } = await req.json();

    if (!payment_intent_id || !order_id) {
      return NextResponse.json(
        { success: false, error: "Missing payment_intent_id or order_id" },
        { status: 400 }
      );
    }

    console.log(
      `Using existing PaymentIntent ${payment_intent_id} for order ${order_id}`
    );

    // Retrieve the existing PaymentIntent to verify it exists and get its status
    const paymentIntent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );

    console.log("Existing PaymentIntent status:", {
      id: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    });

    // Check if the PaymentIntent is in a valid state for order processing
    if (
      paymentIntent.status !== "requires_capture" &&
      paymentIntent.status !== "succeeded"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: `PaymentIntent is in invalid state: ${paymentIntent.status}`,
        },
        { status: 400 }
      );
    }

    // Return the PaymentIntent data that WooCommerce can use
    return NextResponse.json({
      success: true,
      data: {
        payment_intent_id: paymentIntent.id,
        client_secret: paymentIntent.client_secret,
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        capture_method: paymentIntent.capture_method,
      },
    });
  } catch (error) {
    console.error("Error using existing PaymentIntent:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stripe_error_code: error.code,
        stripe_error_type: error.type,
      },
      { status: 400 }
    );
  }
}




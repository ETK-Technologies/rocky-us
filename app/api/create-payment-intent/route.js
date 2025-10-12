import { NextResponse } from "next/server";
import Stripe from "stripe";
import { logger } from "@/utils/devLogger";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(req) {
  try {
    const requestData = await req.json();

    const {
      orderId,
      amount, // Amount in cents
      customerEmail,
      customerName,
      billingDetails,
      metadata = {},
    } = requestData;

    // Validation
    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "Order ID is required" },
        { status: 400 }
      );
    }

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, error: "Valid amount is required" },
        { status: 400 }
      );
    }

    logger.log("=== CREATING PAYMENT INTENT ===");
    logger.log("Order ID:", orderId);
    logger.log("Amount:", amount, "cents");
    logger.log("Customer:", customerEmail);
    logger.log("================================");

    // Create PaymentIntent with manual capture (authorization only)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: "usd",
      capture_method: "manual", // Authorization only - manual capture later
      description: `Order #${orderId}`,
      receipt_email: customerEmail || undefined,
      metadata: {
        order_id: orderId,
        customer_name: customerName,
        ...metadata,
      },
      // Automatic payment methods for Apple Pay, Google Pay, etc.
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never", // We'll handle redirects manually if needed
      },
    });

    logger.log("✅ PaymentIntent created:", {
      id: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      client_secret: paymentIntent.client_secret.substring(0, 20) + "...",
    });

    return NextResponse.json({
      success: true,
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      chargeId: null, // Will be available after confirmation
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    });
  } catch (error) {
    logger.error("❌ PaymentIntent creation failed:", error);

    // Handle Stripe-specific errors
    let userFriendlyMessage = "Failed to initialize payment. Please try again.";
    if (error.type === "StripeCardError") {
      userFriendlyMessage = error.message;
    } else if (error.type === "StripeInvalidRequestError") {
      userFriendlyMessage =
        "Invalid payment request. Please check your details and try again.";
    } else if (error.type === "StripeAPIError") {
      userFriendlyMessage =
        "Payment service unavailable. Please try again later.";
    }

    return NextResponse.json(
      {
        success: false,
        error: userFriendlyMessage,
        details: {
          message: error.message,
          type: error.type,
          code: error.code,
        },
      },
      { status: error.statusCode || 500 }
    );
  }
}

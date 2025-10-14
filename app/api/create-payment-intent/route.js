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
      paymentMethodId, // Payment method ID from PaymentElement
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

    if (!paymentMethodId) {
      return NextResponse.json(
        { success: false, error: "Payment method is required" },
        { status: 400 }
      );
    }

    logger.log("=== CREATING PAYMENT INTENT ===");
    logger.log("Order ID:", orderId);
    logger.log("Amount:", amount, "cents");
    logger.log("Payment Method:", paymentMethodId);
    logger.log("Customer:", customerEmail);
    logger.log("================================");

    // Create PaymentIntent with manual capture for authorization-only payments
    // This will create an "uncaptured" payment in Stripe dashboard
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: "usd",
      payment_method: paymentMethodId,
      capture_method: "manual", // Authorization only - payment remains uncaptured
      confirm: true, // Confirm immediately to authorize the payment
      description: `Order #${orderId}`,
      receipt_email: customerEmail || undefined,
      return_url: `${
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      }/checkout/order-received/${orderId}`,
      metadata: {
        order_id: orderId,
        customer_name: customerName,
        ...metadata,
      },
      // Configure automatic payment methods to not allow redirects
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    logger.log("✅ PaymentIntent created and confirmed:", {
      id: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      capture_method: paymentIntent.capture_method,
      captured: paymentIntent.captured,
    });

    // Handle successful authorization (requires_capture)
    if (paymentIntent.status === "requires_capture") {
      const chargeId = paymentIntent.latest_charge || null;

      return NextResponse.json({
        success: true,
        paymentIntent: paymentIntent,
        chargeId: chargeId,
      });
    }

    // Handle payments requiring action (e.g., 3D Secure)
    if (paymentIntent.status === "requires_action") {
      return NextResponse.json({
        success: true,
        paymentIntent: paymentIntent,
        clientSecret: paymentIntent.client_secret,
      });
    }

    // Handle successful payment (if capture_method was automatic)
    if (paymentIntent.status === "succeeded") {
      const chargeId = paymentIntent.latest_charge || null;

      return NextResponse.json({
        success: true,
        paymentIntent: paymentIntent,
        chargeId: chargeId,
      });
    }

    // Handle failed payment
    if (
      paymentIntent.status === "canceled" ||
      paymentIntent.status === "requires_payment_method"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: paymentIntent.last_payment_error?.message || "Payment failed",
          paymentIntent: paymentIntent,
        },
        { status: 400 }
      );
    }

    // Handle other statuses
    return NextResponse.json(
      {
        success: false,
        error: `Unexpected payment status: ${paymentIntent.status}`,
        paymentIntent: paymentIntent,
      },
      { status: 400 }
    );
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

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { logger } from "@/utils/devLogger";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(req) {
  try {
    const requestData = await req.json();

    const {
      orderId,
      cardNumber,
      cardExpMonth,
      cardExpYear,
      cardCvc,
      amount, // Amount in cents
      currency = "usd",
      description,
      customerEmail,
      customerName,
      billingDetails,
      metadata = {},
    } = requestData;

    // Validate required fields
    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    if (!cardNumber || !cardExpMonth || !cardExpYear || !cardCvc) {
      return NextResponse.json(
        { error: "Card details are required" },
        { status: 400 }
      );
    }

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Valid amount is required" },
        { status: 400 }
      );
    }

    logger.log("=== STRIPE PAYMENT PROCESSING ===");
    logger.log("Order ID:", orderId);
    logger.log("Amount:", amount, currency);
    logger.log("=====================================");

    // STEP 1: Create Source on backend (respects raw card data API setting)
    logger.log("Creating Stripe Source on backend...");
    let source;
    try {
      source = await stripe.sources.create({
        type: "card",
        card: {
          number: cardNumber,
          exp_month: parseInt(cardExpMonth),
          exp_year: parseInt(cardExpYear),
          cvc: cardCvc,
        },
        owner: billingDetails || {
          name: customerName,
          email: customerEmail,
        },
      });

      logger.log("Source created successfully:", source.id);
      logger.log("Card details:", {
        brand: source.card?.brand,
        last4: source.card?.last4,
      });
    } catch (error) {
      logger.error("Failed to create Stripe Source:", error.message);
      return NextResponse.json(
        {
          error: "Failed to process card details",
          details: error.message,
        },
        { status: 400 }
      );
    }

    // STEP 2: Create Charge with manual capture using the Source
    // The Charges API works perfectly with Sources and supports capture: false
    logger.log("Creating Stripe Charge with Source...");
    const charge = await stripe.charges.create({
      amount: Math.round(amount), // Ensure it's an integer
      currency: currency.toLowerCase(),
      source: source.id, // Use the Source we just created
      capture: false, // IMPORTANT: Don't capture immediately (authorization only)
      description: description || `Order #${orderId}`,
      receipt_email: customerEmail || undefined,
      metadata: {
        order_id: orderId,
        customer_name: customerName,
        ...metadata,
      },
    });

    logger.log("Charge created successfully:", {
      id: charge.id,
      status: charge.status,
      amount: charge.amount,
      captured: charge.captured,
      paid: charge.paid,
    });

    // Check if charge succeeded (authorized)
    if (charge.status === "succeeded" && !charge.captured) {
      logger.log("Payment authorized successfully - ready for manual capture");

      return NextResponse.json({
        success: true,
        chargeId: charge.id,
        paymentIntentId: charge.payment_intent || charge.id, // Use charge ID as reference
        status: "requires_capture",
        amount: charge.amount,
        currency: charge.currency,
        cardBrand: charge.source?.brand,
        cardLast4: charge.source?.last4,
        message: "Payment authorized successfully",
      });
    }

    // Handle failed charges
    if (charge.status === "failed") {
      logger.error("Charge failed:", charge.failure_message);
      return NextResponse.json({
        success: false,
        status: "failed",
        message: charge.failure_message || "Payment failed",
      });
    }

    // Handle other statuses
    logger.warn("Unexpected charge status:", charge.status);
    return NextResponse.json({
      success: false,
      status: charge.status,
      message: `Payment status: ${charge.status}`,
    });
  } catch (error) {
    logger.error("Stripe payment processing failed:", error);
    logger.error("Error details:", {
      message: error.message,
      type: error.type,
      code: error.code,
      decline_code: error.decline_code,
    });

    // Return user-friendly error message
    let errorMessage = "Payment processing failed";

    if (error.type === "StripeCardError") {
      errorMessage = error.message || "Your card was declined";
    } else if (error.type === "StripeInvalidRequestError") {
      errorMessage = "Invalid payment request";
    } else if (error.type === "StripeAPIError") {
      errorMessage = "Payment service temporarily unavailable";
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: {
          type: error.type,
          code: error.code,
          decline_code: error.decline_code,
        },
      },
      { status: 400 }
    );
  }
}

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
    const { payment_intent_id, card_details, billing_details } =
      await req.json();

    if (
      !process.env.STRIPE_SECRET_KEY ||
      process.env.STRIPE_SECRET_KEY === "sk_test_placeholder"
    ) {
      return NextResponse.json(
        { success: false, message: "Stripe is not configured." },
        { status: 500 }
      );
    }

    console.log(
      `Updating PaymentIntent ${payment_intent_id} with card details`
    );

    // For testing, we'll use Stripe's test payment method tokens
    // In production, you would integrate with Stripe Elements on the frontend
    let paymentMethodId;

    // Check if this is the test card number
    if (card_details.number === "4242424242424242") {
      // Use Stripe's test payment method for successful payments
      const paymentMethod = await stripe.paymentMethods.create({
        type: "card",
        card: {
          token: "tok_visa", // Stripe test token
        },
        billing_details: billing_details,
      });
      paymentMethodId = paymentMethod.id;
      console.log(`Test PaymentMethod created: ${paymentMethodId}`);
    } else {
      // For other card numbers, create a generic test payment method
      // Note: In production, this should be handled differently
      const paymentMethod = await stripe.paymentMethods.create({
        type: "card",
        card: {
          token: "tok_visa", // Default to successful test token
        },
        billing_details: billing_details,
      });
      paymentMethodId = paymentMethod.id;
      console.log(`Default test PaymentMethod created: ${paymentMethodId}`);
    }

    // Update the PaymentIntent with the PaymentMethod
    const paymentIntent = await stripe.paymentIntents.update(
      payment_intent_id,
      {
        payment_method: paymentMethodId,
      }
    );

    console.log(`PaymentIntent ${payment_intent_id} updated successfully`);

    return NextResponse.json({
      success: true,
      data: {
        payment_intent: paymentIntent,
        payment_method_id: paymentMethodId,
      },
    });
  } catch (error) {
    console.error("Error updating PaymentIntent:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update PaymentIntent",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

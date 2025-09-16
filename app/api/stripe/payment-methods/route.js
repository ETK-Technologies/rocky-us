import { NextResponse } from "next/server";
import Stripe from "stripe";
import { cookies } from "next/headers";

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("STRIPE_SECRET_KEY environment variable is not set");
}

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_placeholder"
);

export async function GET(req) {
  try {
    // Check if Stripe is properly configured
    if (
      !process.env.STRIPE_SECRET_KEY ||
      process.env.STRIPE_SECRET_KEY === "sk_test_placeholder"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Stripe is not configured. Please add STRIPE_SECRET_KEY to your environment variables.",
          cards: [],
        },
        { status: 500 }
      );
    }

    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken");
    const userId = cookieStore.get("userId");
    const stripeCustomerId = cookieStore.get("stripeCustomerId");

    // Check if user is authenticated
    if (!authToken || !userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated",
          cards: [],
        },
        { status: 401 }
      );
    }

    // Check if we have a Stripe customer ID
    if (!stripeCustomerId) {
      return NextResponse.json({
        success: true,
        message: "No saved cards found",
        cards: [],
      });
    }

    console.log(
      "Fetching saved payment methods for customer:",
      stripeCustomerId.value
    );

    // Get saved payment methods from Stripe
    const paymentMethods = await stripe.paymentMethods.list({
      customer: stripeCustomerId.value,
      type: "card",
    });

    const cards = paymentMethods.data.map((pm) => ({
      id: pm.id,
      last4: pm.card.last4,
      brand: pm.card.brand,
      expMonth: pm.card.exp_month,
      expYear: pm.card.exp_year,
      holderName: pm.billing_details?.name || "",
      isDefault: false, // Stripe doesn't have a default concept, you'd track this separately
      token: pm.id, // Use payment method ID as token
    }));

    console.log(`Found ${cards.length} saved payment method(s)`);

    return NextResponse.json({
      success: true,
      cards: cards,
    });
  } catch (error) {
    console.error("Error fetching saved payment methods:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch saved payment methods",
        error: error.message,
        cards: [],
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken");
    const userId = cookieStore.get("userId");

    // Check if user is authenticated
    if (!authToken || !userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }

    const data = await req.json();
    const { paymentMethodId } = data;

    if (!paymentMethodId) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment method ID is required",
        },
        { status: 400 }
      );
    }

    console.log("Detaching payment method:", paymentMethodId);

    // Detach payment method from customer
    await stripe.paymentMethods.detach(paymentMethodId);

    return NextResponse.json({
      success: true,
      message: "Payment method removed successfully",
    });
  } catch (error) {
    console.error("Error removing payment method:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to remove payment method",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

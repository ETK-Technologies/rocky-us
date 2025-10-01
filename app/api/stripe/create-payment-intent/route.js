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
    const {
      amount,
      currency = "USD",
      cardData,
      billingAddress,
      customerId,
      saveCard = false,
      description,
      orderId, // Order ID for metadata tracking
      orderKey, // Order key for reference
      userId, // WordPress user ID
      products, // Array of products: [{id, name, quantity}]
      ipAddress, // Customer IP address
      userAgent, // User agent string
    } = await req.json();

    console.log("Creating Stripe PaymentIntent:", {
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      saveCard,
      customerId: customerId ? `${customerId.substring(0, 10)}...` : "none",
      orderId: orderId || "pending",
      userId: userId || "guest",
    });

    // Build metadata object with required fields
    const metadata = {
      gateway_id: "stripe_cc",
      order_id: orderId ? orderId.toString() : "pending",
      partner: "PaymentPlugins",
      user_id: userId ? userId.toString() : "0",
      ip_address: ipAddress || "",
      user_agent: userAgent || "",
    };

    // Add product information to metadata
    // Format: product_{product_id}: "{product_name} x {quantity}"
    if (products && Array.isArray(products)) {
      products.forEach((product) => {
        if (product.id && product.name) {
          const quantity = product.quantity || 1;
          metadata[`product_${product.id}`] = `${product.name} x ${quantity}`;
        }
      });
    }

    // Create payment intent with manual capture and off_session setup
    const paymentIntentData = {
      amount: Math.round(amount * 100), // Stripe expects amount in cents
      currency: currency.toLowerCase(),
      description: orderId
        ? `headless Order ${orderId} from myrocky.com`
        : "headless Order from myrocky.com",
      capture_method: "manual", // Manual capture for pre-authorization
      setup_future_usage: "off_session", // Always save cards for future use (subscriptions)
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never", // Disable redirect-based payment methods
      },
      metadata: metadata,
    };

    // Add customer if provided (for saving cards)
    if (customerId) {
      paymentIntentData.customer = customerId;
    }

    // Add billing address if provided
    if (billingAddress) {
      paymentIntentData.shipping = {
        name: `${billingAddress.first_name} ${billingAddress.last_name}`,
        address: {
          line1: billingAddress.address_1,
          line2: billingAddress.address_2 || undefined,
          city: billingAddress.city,
          state: billingAddress.state,
          postal_code: billingAddress.postcode,
          country: billingAddress.country || "US",
        },
      };

      // Add customer email for Link authentication
      if (billingAddress.email) {
        paymentIntentData.receipt_email = billingAddress.email;
      }
    }

    // setup_future_usage is already set above for all payments
    // This ensures cards can be saved for future use

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentData);

    console.log("Stripe PaymentIntent created:", {
      id: paymentIntent.id,
      client_secret: paymentIntent.client_secret ? "***" : "none",
      status: paymentIntent.status,
    });

    return NextResponse.json({
      success: true,
      data: {
        paymentIntent: {
          id: paymentIntent.id,
          client_secret: paymentIntent.client_secret,
          status: paymentIntent.status,
        },
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      },
    });
  } catch (error) {
    console.error("Stripe PaymentIntent creation error:", error);

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

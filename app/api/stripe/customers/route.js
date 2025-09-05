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
    const { email, name, phone, address } = await req.json();

    console.log("Creating Stripe customer:", { email, name });

    const customerData = {
      email,
      name,
      phone: phone || undefined,
    };

    // Add address if provided
    if (address) {
      customerData.address = {
        line1: address.address_1,
        line2: address.address_2 || undefined,
        city: address.city,
        state: address.state,
        postal_code: address.postcode,
        country: address.country || "US",
      };
    }

    const customer = await stripe.customers.create(customerData);

    console.log("Stripe customer created:", customer.id);

    return NextResponse.json({
      success: true,
      data: {
        customerId: customer.id,
        email: customer.email,
      },
    });
  } catch (error) {
    console.error("Stripe customer creation error:", error);

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

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get("customerId");
    const email = searchParams.get("email");

    if (!customerId && !email) {
      return NextResponse.json(
        { success: false, error: "customerId or email is required" },
        { status: 400 }
      );
    }

    let customer;

    if (customerId) {
      customer = await stripe.customers.retrieve(customerId);
    } else if (email) {
      const customers = await stripe.customers.list({
        email: email,
        limit: 1,
      });
      customer = customers.data[0];
    }

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          error: "Customer not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        customerId: customer.id,
        email: customer.email,
        name: customer.name,
      },
    });
  } catch (error) {
    console.error("Stripe customer retrieval error:", error);

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

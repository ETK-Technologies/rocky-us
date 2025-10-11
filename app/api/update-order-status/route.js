import { NextResponse } from "next/server";
import axios from "axios";
import { logger } from "@/utils/devLogger";

const BASE_URL = process.env.BASE_URL;
const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;

export async function POST(req) {
  try {
    const requestData = await req.json();

    const {
      orderId,
      status,
      paymentIntentId,
      chargeId,
      paymentMethod,
      cardBrand,
      cardLast4,
      errorMessage, // For failed status
    } = requestData;

    if (!orderId || !status) {
      return NextResponse.json(
        { error: "Order ID and status are required" },
        { status: 400 }
      );
    }

    logger.log("=== UPDATING ORDER STATUS ===");
    logger.log("Order ID:", orderId);
    logger.log("Status:", status);
    logger.log("Payment Intent:", paymentIntentId);
    logger.log("Charge ID:", chargeId);
    logger.log("==============================");

    const metaData = [];

    // Add Stripe metadata
    if (paymentIntentId) {
      metaData.push({ key: "_stripe_intent_id", value: paymentIntentId });
    }
    if (chargeId) {
      metaData.push({ key: "_stripe_charge_id", value: chargeId });
      metaData.push({ key: "_transaction_id", value: chargeId });
    }
    if (paymentMethod) {
      metaData.push({ key: "_payment_method", value: paymentMethod });
      metaData.push({ key: "_payment_method_title", value: "Stripe" });
    }
    if (cardBrand) {
      metaData.push({ key: "_stripe_card_brand", value: cardBrand });
    }
    if (cardLast4) {
      metaData.push({ key: "_stripe_card_last4", value: cardLast4 });
    }

    const updateData = {
      status: status,
      payment_method: paymentMethod || "stripe_cc",
      payment_method_title: "Stripe",
    };

    // Add metadata to update
    if (metaData.length > 0) {
      updateData.meta_data = metaData;
    }

    // Prepare order note based on status
    let orderNote = "";
    if (status === "on-hold" && (chargeId || paymentIntentId)) {
      const reference = chargeId || paymentIntentId;
      orderNote = `Payment authorized via Stripe (${reference}). Awaiting manual capture.`;
    } else if (status === "processing" && (chargeId || paymentIntentId)) {
      const reference = chargeId || paymentIntentId;
      orderNote = `Payment captured via Stripe (${reference}).`;
    } else if (status === "failed") {
      orderNote = `Payment failed: ${errorMessage || "Unknown error"}`;
    }

    logger.log("Update payload:", JSON.stringify(updateData, null, 2));

    // Update order using WooCommerce REST API
    const response = await axios.put(
      `${BASE_URL}/wp-json/wc/v3/orders/${orderId}`,
      updateData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${CONSUMER_KEY}:${CONSUMER_SECRET}`
          ).toString("base64")}`,
        },
      }
    );

    logger.log("Order updated:", response.data.id, response.data.status);

    // Add order note
    if (orderNote) {
      await axios.post(
        `${BASE_URL}/wp-json/wc/v3/orders/${orderId}/notes`,
        {
          note: orderNote,
          customer_note: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(
              `${CONSUMER_KEY}:${CONSUMER_SECRET}`
            ).toString("base64")}`,
          },
        }
      );
      logger.log("Order note added");
    }

    return NextResponse.json({
      success: true,
      order: {
        id: response.data.id,
        status: response.data.status,
        order_key: response.data.order_key,
        total: response.data.total,
      },
    });
  } catch (error) {
    logger.error("❌ Failed to update order status:", error);
    logger.error("Error details:", error.response?.data || error.message);

    return NextResponse.json(
      {
        error: "Failed to update order status",
        details: error.response?.data || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}

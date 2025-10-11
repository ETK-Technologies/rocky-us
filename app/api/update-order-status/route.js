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
      status, // 'processing', 'on-hold', 'completed', 'failed', etc.
      paymentIntentId,
      chargeId,
      transactionId,
      paymentMethod = "stripe",
      cardBrand,
      cardLast4,
      errorMessage,
    } = requestData;

    // Validate required fields
    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      );
    }

    logger.log("=== UPDATING ORDER STATUS ===");
    logger.log("Order ID:", orderId);
    logger.log("New Status:", status);
    logger.log("Payment Intent:", paymentIntentId);
    logger.log("=============================");

    // Prepare update data
    const updateData = {
      status: status,
    };

    // Add payment metadata
    const metaData = [];

    if (paymentIntentId) {
      metaData.push({
        key: "_stripe_intent_id",
        value: paymentIntentId,
      });
    }

    if (chargeId) {
      metaData.push({
        key: "_stripe_charge_id",
        value: chargeId,
      });
    }

    if (transactionId) {
      metaData.push({
        key: "_transaction_id",
        value: transactionId,
      });
      updateData.transaction_id = transactionId;
    }

    if (paymentMethod) {
      metaData.push({
        key: "_payment_method",
        value: paymentMethod,
      });
      updateData.payment_method = paymentMethod;
      updateData.payment_method_title =
        paymentMethod === "stripe" ? "Stripe" : paymentMethod;
    }

    if (cardBrand && cardLast4) {
      metaData.push(
        {
          key: "_stripe_card_brand",
          value: cardBrand,
        },
        {
          key: "_stripe_card_last4",
          value: cardLast4,
        }
      );
    }

    if (errorMessage) {
      metaData.push({
        key: "_payment_error",
        value: errorMessage,
      });
    }

    // Add metadata to update
    if (metaData.length > 0) {
      updateData.meta_data = metaData;
    }

    // Add order note based on status
    let orderNote = "";
    if (status === "on-hold" && chargeId) {
      orderNote = `Payment authorized via Stripe (Charge: ${chargeId}). Awaiting manual capture.`;
    } else if (status === "on-hold" && paymentIntentId) {
      orderNote = `Payment authorized via Stripe (Intent: ${paymentIntentId}). Awaiting manual capture.`;
    } else if (status === "processing" && chargeId) {
      orderNote = `Payment captured via Stripe (Charge: ${chargeId}).`;
    } else if (status === "processing" && paymentIntentId) {
      orderNote = `Payment captured via Stripe (Intent: ${paymentIntentId}).`;
    } else if (status === "failed") {
      orderNote = `Payment failed: ${errorMessage || "Unknown error"}`;
    }

    logger.log("Update data:", JSON.stringify(updateData, null, 2));

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

    logger.log("Order updated successfully:", {
      order_id: response.data.id,
      status: response.data.status,
    });

    // Add order note if we have one
    if (orderNote) {
      try {
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
        logger.log("Order note added successfully");
      } catch (noteError) {
        logger.error("Failed to add order note:", noteError.message);
        // Don't fail the whole request if note addition fails
      }
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
    logger.error("Failed to update order status:", error);
    logger.error("Error details:", error.response?.data);

    return NextResponse.json(
      {
        error: "Failed to update order status",
        details: error.response?.data || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}

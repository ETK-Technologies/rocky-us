import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PaymentService } from "@/lib/services/PaymentService";
import { OrderService } from "@/lib/services/OrderService";

const paymentService = new PaymentService();
const orderService = new OrderService();

export async function POST(req) {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get("authToken");
    const userId = cookieStore.get("userId");
    const paysafeProfileId = cookieStore.get("paysafeProfileId");

    // Check if user is authenticated
    if (!authToken || !userId || !paysafeProfileId) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated or missing Paysafe profile",
        },
        { status: 401 }
      );
    }

    // Parse the request body
    const data = await req.json();
    const { order_id, cardId, cvv = "", billing_address = null } = data;

    // Validate required fields
    if (!order_id || !cardId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: order_id and cardId are required",
        },
        { status: 400 }
      );
    }

    // Get order details to get the amount
    const orderDetails = await orderService.getOrder(order_id);
    if (!orderDetails.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to get order details",
          error: orderDetails.error,
        },
        { status: 500 }
      );
    }

    // Process payment with saved card
    const paymentResult = await paymentService.processSavedCardPayment({
      order_id,
      amount: orderDetails.data.total,
      currency: "USD", // Using USD as per memory
      profileId: paysafeProfileId.value,
      cardToken: cardId, // Updated parameter name
      cvv,
      billing_address,
    });

    if (!paymentResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment processing failed",
          error: paymentResult.error,
          paysafe_error_code: paymentResult.paysafe_error_code,
          paysafe_error_message: paymentResult.paysafe_error_message,
        },
        { status: 400 }
      );
    }

    // Update order status
    const orderUpdateResult = await orderService.updateOrder(order_id, {
      status: "processing",
      transaction_id: paymentResult.data.id,
      payment_method: "paysafe",
      payment_method_title: "Credit Card (Paysafe)",
    });

    if (!orderUpdateResult.success) {
      console.error("Failed to update order status:", orderUpdateResult.error);
      // Payment succeeded but order update failed - should be handled by webhook
    }

    // Return the response data
    return NextResponse.json({
      success: true,
      order_id: order_id,
      order_key: orderDetails.data.order_key,
      order_status: "processing",
      transaction_id: paymentResult.data.id,
      message: "Payment processed successfully",
    });
  } catch (error) {
    console.error(
      "Error processing payment with saved card:",
      error.response?.data || error.message
    );

    return NextResponse.json(
      {
        success: false,
        message: "Payment processing failed. Please try again.",
        error: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}

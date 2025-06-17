import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

const BASE_URL = process.env.BASE_URL;

export async function GET(req) {
  try {
    const order_id = req.nextUrl.searchParams.get("id");
    if (!order_id) {
      return NextResponse.json(
        { success: false, message: "Order ID is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken");

    if (!authToken) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    // Get order status from WooCommerce
    const response = await axios.get(
      `${BASE_URL}/wp-json/wc/v3/orders/${order_id}?consumer_key=${process.env.CONSUMER_KEY}&consumer_secret=${process.env.CONSUMER_SECRET}`,
      {
        headers: {
          Authorization: `${authToken.value}`,
        },
      }
    );

    // Return just the necessary status information
    return NextResponse.json({
      success: true,
      id: response.data.id,
      status: response.data.status,
      payment_method: response.data.payment_method,
      transaction_id: response.data.transaction_id,
      total: response.data.total,
    });
  } catch (error) {
    console.error("Error checking order status:", error.response?.data || error.message);
    return NextResponse.json(
      {
        success: false,
        message: error.response?.data?.message || "Failed to check order status",
      },
      { status: error.response?.status || 500 }
    );
  }
}
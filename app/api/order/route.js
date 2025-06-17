import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

const BASE_URL = process.env.BASE_URL;

export async function GET(req) {
  try {
    const order_id = req.nextUrl.searchParams.get("order_id");
    const order_key = req.nextUrl.searchParams.get("order_key");
    const cookieStore = await cookies();

    const encodedCredentials = cookieStore.get("authToken");

    if (!encodedCredentials) {
      return NextResponse.json(
        {
          error: "Not authenticated..",
        },
        { status: 500 }
      );
    }

    const response = await axios.get(
      `${BASE_URL}/wp-json/wc/v3/orders/${order_id}?consumer_key=${process.env.CONSUMER_KEY}&consumer_secret=${process.env.CONSUMER_SECRET}`,
      {
        headers: {
          Authorization: `${encodedCredentials.value}`,
          nonce: cookieStore.get("cart-nonce")?.value,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(
      "Error getting order:",
      error.response?.data || error.message
    );

    return NextResponse.json(
      {
        error: error.response?.data?.message || "Failed to get order",
      },
      { status: error.response?.status || 500 }
    );
  }
}

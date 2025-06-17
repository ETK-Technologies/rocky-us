import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";
import { clearLocalCart } from "@/lib/cart/cartService";

const BASE_URL = process.env.BASE_URL;

export async function POST() {
  try {
    const cookieStore = await cookies();
    const encodedCredentials = cookieStore.get("authToken");
    const nonce = cookieStore.get("cart-nonce")?.value;

    if (!encodedCredentials) {
      // For unauthenticated users, we'll clear the local cart
      // Since this is server-side code, we need to clear the cookie but can't directly access localStorage
      cookieStore.set("localCart", "", {
        maxAge: -1,
        path: "/",
      });

      return NextResponse.json({
        success: true,
        message: "Local cart emptied",
        items: [],
        total_items: 0,
        total_price: "0.00",
      });
    }

    // For authenticated users, call the WordPress REST API endpoint
    const response = await axios.post(
      `${BASE_URL}/wp-json/custom/v1/empty-cart`,
      {},
      {
        headers: {
          Authorization: `${encodedCredentials.value}`,
          "X-WP-Nonce": nonce,
        },
      }
    );

    // Update the cart nonce if available
    if (response.headers && response.headers.nonce) {
      cookieStore.set("cart-nonce", response.headers.nonce);
    }

    return NextResponse.json({
      success: true,
      message: "Cart emptied successfully",
      items: [],
      total_items: 0,
      total_price: "0.00",
    });
  } catch (error) {
    console.error(
      "Error emptying cart:",
      error.response?.data || error.message
    );

    return NextResponse.json(
      {
        success: false,
        error: error.response?.data?.message || "Failed to empty cart",
        items: [],
        total_items: 0,
        total_price: "0.00",
      },
      { status: error.response?.status || 500 }
    );
  }
}

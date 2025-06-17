import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

const BASE_URL = process.env.BASE_URL;

export async function POST(req) {
  try {
    const { code } = await req.json();
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

    const response = await axios.post(
      `${BASE_URL}/wp-json/wc/store/cart/apply-coupon`,
      { code: code },
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
      "Error adding to cart:",
      error.response?.data || error.message
    );

    return NextResponse.json(
      {
        error: error.response?.data?.message || "Failed to add to cart",
      },
      { status: error.response?.status || 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { code } = await req.json();
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

    const response = await axios.post(
      `${BASE_URL}/wp-json/wc/store/cart/remove-coupon`,
      { code: code },
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
      "Error adding to cart:",
      error.response?.data || error.message
    );

    return NextResponse.json(
      {
        error: error.response?.data?.message || "Failed to add to cart",
      },
      { status: error.response?.status || 500 }
    );
  }
}

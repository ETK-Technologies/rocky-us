import { NextResponse } from "next/server";
import axios from "axios";
import { logger } from "@/utils/devLogger";
import { cookies } from "next/headers";

const BASE_URL = process.env.BASE_URL;

// Helper function to decode HTML entities in error messages
const decodeHtmlEntities = (text) => {
  if (typeof text !== "string") return text;
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
};

export async function POST(req) {
  let couponCode = "";
  try {
    const { code } = await req.json();
    couponCode = code;
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
    const errorData = error.response?.data || error.message;
    const errorMessage =
      typeof errorData === "object" && errorData?.message
        ? decodeHtmlEntities(errorData.message)
        : typeof errorData === "string"
        ? decodeHtmlEntities(errorData)
        : errorData;

    logger.error("Error applying coupon:", {
      couponCode,
      error: errorMessage,
      rawError: errorData,
    });

    return NextResponse.json(
      {
        error: error.response?.data?.message || "Failed to add to cart",
      },
      { status: error.response?.status || 500 }
    );
  }
}

export async function DELETE(req) {
  let couponCode = "";
  try {
    const { code } = await req.json();
    couponCode = code;
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
    const errorData = error.response?.data || error.message;
    const errorMessage =
      typeof errorData === "object" && errorData?.message
        ? decodeHtmlEntities(errorData.message)
        : typeof errorData === "string"
        ? decodeHtmlEntities(errorData)
        : errorData;

    logger.error("Error removing coupon:", {
      couponCode,
      error: errorMessage,
      rawError: errorData,
    });

    return NextResponse.json(
      {
        error: error.response?.data?.message || "Failed to add to cart",
      },
      { status: error.response?.status || 500 }
    );
  }
}

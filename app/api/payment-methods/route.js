import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

const BASE_URL = process.env.BASE_URL;

export async function GET() {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get("authToken");
    const userId = cookieStore.get("userId");

    // Check if user is authenticated
    if (!authToken || !userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated",
          cards: [],
        },
        { status: 401 }
      );
    }

    // Call the custom endpoint in WordPress
    const response = await axios.get(
      `${BASE_URL}/wp-json/custom/v1/payment_tokens?customer_id=${userId.value}`,
      {
        headers: {
          Authorization: `${authToken.value}`,
        },
      }
    );

    const raw = response.data;

    const savedCards = Array.isArray(raw.cards)
      ? raw.cards.map((card) => ({
        id: card.id.toString(),
        last4: card.last4,
        brand: card.brand?.toLowerCase() ?? "unknown",
        exp_month: parseInt(card.expiry_month),
        exp_year: parseInt(card.expiry_year),
        is_default: card.is_default,
        token: card.token,
      }))
      : [];

    return NextResponse.json({
      success: true,
      message: response.message,
      data: response.data,
      cards: savedCards,
    });
  } catch (error) {
    console.error(
      "Error fetching saved payment methods:",
      error.response?.data || error.message
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch saved payment methods",
        error: error.message,
        respone: error.response?.data,
        cards: [],
      },
      { status: 500 }
    );
  }
}

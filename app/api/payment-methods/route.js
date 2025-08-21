import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PaymentService } from "@/lib/services/PaymentService";

const paymentService = new PaymentService();

export async function GET() {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get("authToken");
    const userId = cookieStore.get("userId");
    const paysafeProfileId = cookieStore.get("paysafeProfileId");

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

    // Check if we have a Paysafe profile ID
    if (!paysafeProfileId) {
      return NextResponse.json({
        success: true,
        message: "No saved cards found",
        cards: [],
      });
    }

    // Get saved cards directly from Paysafe vault
    const result = await paymentService.getSavedCards(paysafeProfileId.value);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch saved cards",
          error: result.error,
          cards: [],
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      cards: result.data,
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
        cards: [],
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
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

    const data = await req.json();
    const { cardId } = data;

    if (!cardId) {
      return NextResponse.json(
        {
          success: false,
          message: "Card ID is required",
        },
        { status: 400 }
      );
    }

    // Delete card from Paysafe vault
    const result = await paymentService.deleteCard(
      paysafeProfileId.value,
      cardId
    );

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete card",
          error: result.error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Card deleted successfully",
    });
  } catch (error) {
    console.error(
      "Error deleting card:",
      error.response?.data || error.message
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete card",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

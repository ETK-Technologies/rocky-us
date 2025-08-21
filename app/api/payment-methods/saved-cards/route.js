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
      return NextResponse.json(
        {
          success: false,
          message: "No saved cards found",
          cards: [],
        },
        { status: 200 }
      );
    }

    // Get saved cards from Paysafe vault
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
    console.error("Error fetching saved cards:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch saved cards",
        error: error.message,
        cards: [],
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
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
        },
        { status: 401 }
      );
    }

    const data = await req.json();
    const { cardNumber, cardExpMonth, cardExpYear, cardCVD, holderName } = data;

    // Create customer profile if it doesn't exist
    let profileId = paysafeProfileId?.value;
    if (!profileId) {
      const profileResult = await paymentService.createCustomerProfile({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      if (!profileResult.success) {
        return NextResponse.json(
          {
            success: false,
            message: "Failed to create customer profile",
            error: profileResult.error,
          },
          { status: 500 }
        );
      }

      profileId = profileResult.data.id;

      // Store profile ID in cookie
      cookies().set("paysafeProfileId", profileId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    }

    // Add card directly to vault (working method)
    const result = await paymentService.addCardDirectlyToVault(profileId, {
      cardNumber,
      cardExpMonth,
      cardExpYear,
      cardCVD,
      holderName,
      billingAddress: data.billingAddress,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to save card",
          error: result.error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      card: result.data,
    });
  } catch (error) {
    console.error("Error saving card:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to save card",
        error: error.message,
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
          message: "Not authenticated",
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

    // Delete card from vault
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
    console.error("Error deleting card:", error);
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

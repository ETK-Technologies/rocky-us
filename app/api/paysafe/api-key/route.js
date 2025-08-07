import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken");
    const userId = cookieStore.get("userId");

    // Check if user is authenticated
    if (!authToken || !userId) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    // Get API credentials from environment
    const username = process.env.PAYSAFE_API_USERNAME;
    const password = process.env.PAYSAFE_API_PASSWORD;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Paysafe API credentials not configured" },
        { status: 500 }
      );
    }

    // Create Base64-encoded API key
    const apiKey = Buffer.from(username + ":" + password).toString("base64");
    const accountId = process.env.PAYSAFE_ACCOUNT_ID;

    return NextResponse.json({
      success: true,
      apiKey: apiKey,
      accountId: accountId,
    });
  } catch (error) {
    console.error("Error generating API key:", error);
    return NextResponse.json(
      { success: false, message: "Failed to generate API key" },
      { status: 500 }
    );
  }
}

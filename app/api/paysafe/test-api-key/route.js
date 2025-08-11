import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get API credentials from environment
    const username = process.env.PAYSAFE_API_USERNAME;
    const password = process.env.PAYSAFE_API_PASSWORD;

    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Paysafe API credentials not configured",
          hasUsername: !!username,
          hasPassword: !!password,
        },
        { status: 500 }
      );
    }

    // Create Base64-encoded API key
    const apiKey = Buffer.from(username + ":" + password).toString("base64");

    return NextResponse.json({
      success: true,
      message: "API key generated successfully",
      apiKeyLength: apiKey.length,
      usernameLength: username.length,
      passwordLength: password.length,
      // Don't return the actual API key for security
    });
  } catch (error) {
    console.error("Error generating API key:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate API key",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

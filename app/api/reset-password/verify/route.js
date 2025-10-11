import { NextResponse } from "next/server";
import axios from "axios";
import { logger } from "@/utils/devLogger";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");
    const login = searchParams.get("login");

    if (!key || !login) {
      return NextResponse.json(
        { success: false, message: "Reset key and login are required" },
        { status: 400 }
      );
    }

    // Connect to WordPress REST API to verify the token
    try {
      const response = await axios.get(
        `${process.env.BASE_URL}/wp-json/custom/v1/reset-password/verify?key=${key}&login=${login}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${process.env.ADMIN_TOKEN}`,
          },
        }
      );

      return NextResponse.json(
        {
          success: true,
          message: "Token is valid",
          login: login,
        },
        { status: 200 }
      );
    } catch (apiError) {
      logger.error("API token verification error:", apiError.response?.data);
      return NextResponse.json(
        {
          success: false,
          message:
            apiError.response?.data?.message ||
            apiError.response?.data?.error?.message ||
            "Invalid or expired token",
        },
        { status: apiError.response?.status || 400 }
      );
    }
  } catch (error) {
    logger.error("Token verification error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while verifying the token",
      },
      { status: 500 }
    );
  }
}

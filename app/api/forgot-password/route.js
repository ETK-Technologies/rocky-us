import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Connect to WordPress REST API for password reset
    try {
      const response = await axios.post(
        `${process.env.BASE_URL}/wp-json/custom/v1/forgot-password`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${process.env.ADMIN_TOKEN}`,
          },
        }
      );

      const { success, message, reset_url } = response.data;

      // Return the success response from WordPress
      return NextResponse.json(
        {
          success: success,
          message:
            message ||
            "Password reset instructions have been sent to your email",
          reset_url: reset_url,
        },
        { status: 200 }
      );
    } catch (apiError) {
      console.error("API error:", apiError.response?.data);
      return NextResponse.json(
        {
          success: false,
          message:
            apiError.response?.data?.message ||
            apiError.response?.data?.error?.message ||
            "Failed to process password reset request",
        },
        { status: apiError.response?.status || 400 }
      );
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request",
      },
      { status: 500 }
    );
  }
}

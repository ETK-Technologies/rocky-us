import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

const BASE_URL = process.env.BASE_URL;

export async function POST(req) {
  try {
    const { user_id, phone, date_of_birth, province, gender } =
      await req.json();

    // Get the auth token from cookies
    const cookieStore = cookies();
    const authToken = cookieStore.get("authToken")?.value;

    if (!authToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required",
        },
        { status: 401 }
      );
    }

    // Update user metadata
    const response = await axios.post(
      `${BASE_URL}/wp-json/rockyhealth/v1/update-user-meta`,
      {
        user_id,
        phone_number: phone,
        date_of_birth,
        province,
        gender,
      },
      {
        headers: {
          Authorization: authToken,
        },
      }
    );

    if (response.data?.success) {
      return NextResponse.json({
        success: true,
        message: "User metadata updated successfully",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: response.data?.message || "Failed to update user metadata",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(
      "Error updating user metadata:",
      error.response?.data || error.message
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error.response?.data?.message ||
          "Failed to update user metadata. Please try again.",
      },
      { status: error.response?.status || 500 }
    );
  }
}

import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

const BASE_URL = process.env.BASE_URL;

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const encodedCredentials = btoa(`${username}:${password}`);

    const response = await axios.post(
      `${BASE_URL}/wp-json/jwt-auth/v1/token`,
      {
        username,
        password,
      },
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      }
    );

    console.log("Login response:", response.data);

    const { token } = response.data;

    if (!token) {
      return NextResponse.json(
        {
          error: response.data?.message || "Login failed. Please try again.",
        },
        { status: 401 }
      );
    }

    // Extract user ID from the token
    const tokenParts = token.split(".");
    const payload = JSON.parse(atob(tokenParts[1]));
    const userId = payload.data.user.id;

    // Get user display name and email from response
    const userDisplayName = response.data.user_display_name || "";
    const userEmail = response.data.user_email || username;

    // Extract first and last name if available
    const firstName =
      response.data.user_firstname || userDisplayName.split(" ")[0] || "";
    const lastName =
      response.data.user_lastname ||
      (userDisplayName.split(" ").length > 1
        ? userDisplayName.split(" ").slice(1).join(" ")
        : "");
    const fullName = `${firstName} ${lastName}`.trim();

    const cookieStore = await cookies();
    cookieStore.set("authToken", `Basic ${encodedCredentials}`);
    cookieStore.set("userId", userId);
    cookieStore.set("userName", fullName);
    cookieStore.set("userEmail", userEmail);
    // Store just the first name in displayName to avoid disturbing the design
    cookieStore.set("displayName", firstName || userDisplayName.split(" ")[0]);

    const authToken = cookieStore.get("authToken");

    if (!authToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }

    const wpResponse = await axios.get(
      `${BASE_URL}/wp-json/custom/v1/user-profile`,
      {
        headers: {
          Authorization: authToken.value,
        },
      }
    );

    const phone = wpResponse.data.custom_meta.phone_number;
    const province = wpResponse.data.custom_meta.province;
    const dob = wpResponse.data.custom_meta.date_of_birth;
    cookieStore.set("pn", phone);
    cookieStore.set("province", province);
    cookieStore.set("dob", dob);

    // Verify the cookies were set correctly
    const storedUserId = cookieStore.get("userId");
    if (!storedUserId || storedUserId.value !== userId) {
      console.error("Failed to store userId in cookies");
      return NextResponse.json(
        {
          error: "Failed to store user session. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      userId: userId,
      userDisplayName: firstName || userDisplayName.split(" ")[0],
    });
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);

    return NextResponse.json(
      {
        error:
          error.response?.data?.message || "Login failed. Please try again.",
      },
      { status: error.response?.status || 500 }
    );
  }
}

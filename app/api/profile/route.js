import { NextResponse } from "next/server";
import axios from "axios";
import { logger } from "@/utils/devLogger";
import { cookies } from "next/headers";

const BASE_URL = process.env.BASE_URL;

export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken");

    // Check if user is authenticated
    if (!authToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }

    // Fetch user profile data from WordPress API
    const response = await axios.get(
      `${BASE_URL}/wp-json/custom/v1/user-profile`,
      {
        headers: {
          Authorization: authToken.value,
        },
      }
    );

    // Extract the profile data
    const profileData = response.data;

    if (profileData.error) {
      return NextResponse.json(
        {
          success: false,
          message: profileData.message || "Failed to get user profile",
        },
        { status: 400 }
      );
    }

    // Format the response for our frontend
    return NextResponse.json({
      success: true,
      // Merge user data with billing data
      first_name:
        profileData.user_data.first_name ||
        profileData.billing_data.first_name ||
        "",
      last_name:
        profileData.user_data.last_name ||
        profileData.billing_data.last_name ||
        "",
      email:
        profileData.user_data.email || profileData.billing_data.email || "",
      phone:
        profileData.billing_data.phone ||
        profileData.custom_meta.phone_number ||
        "",

      // Custom meta
      gender: profileData.custom_meta.gender || "",
      date_of_birth: profileData.custom_meta.date_of_birth || "",
      province:
        profileData.custom_meta.province ||
        profileData.billing_data.state ||
        "",

      // Billing address fields
      billing_address_1: profileData.billing_data.address_1 || "",
      billing_address_2: profileData.billing_data.address_2 || "",
      billing_city: profileData.billing_data.city || "",
      billing_state:
        profileData.billing_data.state ||
        profileData.custom_meta.province ||
        "",
      billing_postcode: profileData.billing_data.postcode || "",
      billing_country: profileData.billing_data.country || "CA",

      // Shipping address fields
      shipping_address_1: profileData.shipping_data.address_1 || "",
      shipping_address_2: profileData.shipping_data.address_2 || "",
      shipping_city: profileData.shipping_data.city || "",
      shipping_state:
        profileData.shipping_data.state ||
        profileData.billing_data.state ||
        profileData.custom_meta.province ||
        "",
      shipping_postcode: profileData.shipping_data.postcode || "",
      shipping_country: profileData.shipping_data.country || "CA",

      // Include the raw data for debugging or additional use cases
      raw_profile_data: profileData,
    });
  } catch (error) {
    logger.error(
      "Error fetching user profile:",
      error.response?.data || error.message
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch user profile",
        error: error.response?.data?.message || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}

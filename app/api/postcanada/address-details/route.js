import { NextResponse } from "next/server";
import { logger } from "@/utils/devLogger";

const POSTCANADA_API_KEY = process.env.POSTCANADA_API_KEY;
const POSTCANADA_API_URL =
  "https://ws1.postescanada-canadapost.ca/AddressComplete/Interactive/Retrieve/v2.10/json3.ws";

export async function POST(request) {
  try {
    const { addressId, searchTerm } = await request.json();

    if (!addressId) {
      return NextResponse.json(
        { error: "Address ID is required" },
        { status: 400 }
      );
    }

    logger.log(
      "Making request to Post Canada API with addressId:",
      addressId,
      "and searchTerm:",
      searchTerm
    );
    logger.log("API Key present:", !!POSTCANADA_API_KEY);

    const url = new URL(POSTCANADA_API_URL);
    url.searchParams.append("Key", POSTCANADA_API_KEY);
    url.searchParams.append("Id", addressId);

    // Set origin based on environment
    const origin =
      process.env.NODE_ENV === "production"
        ? "https://www.myrocky.com"
        : "http://localhost:3000";

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Origin: origin,
        Referer: origin,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error("Post Canada API error response:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(
        `Post Canada API error: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    logger.log("Post Canada API response:", JSON.stringify(data, null, 2));

    // Check for API errors first
    if (data.Error) {
      logger.error("Post Canada API error:", data);
      return NextResponse.json(
        {
          error: "Post Canada API Error",
          details: data.Description || data.Cause || "Unknown error",
          resolution: data.Resolution || "Please check your API configuration",
        },
        { status: 400 }
      );
    }

    if (!data.Items || !Array.isArray(data.Items) || data.Items.length === 0) {
      logger.error("Invalid response format from Post Canada:", data);
      return NextResponse.json(
        { error: "Invalid response format from Post Canada" },
        { status: 500 }
      );
    }

    // Get the first address from the response
    const addressData = data.Items[0];
    logger.log("Full API response:", JSON.stringify(data, null, 2));
    logger.log("Address data:", JSON.stringify(addressData, null, 2));

    if (!addressData) {
      logger.error("Invalid address data format:", addressData);
      return NextResponse.json(
        { error: "Invalid address data format" },
        { status: 500 }
      );
    }

    // Helper function to convert to proper case (title case)
    const toTitleCase = (str) => {
      if (!str) return "";
      return str.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
    };

    // Transform the address data with proper capitalization
    // Post Canada AddressComplete API field mapping
    const address = {
      street: toTitleCase(addressData.Line1 || ""),
      unit: toTitleCase(addressData.Line2 || ""),
      city: toTitleCase(addressData.City || ""),
      province: addressData.ProvinceName || addressData.Province || "",
      postalCode: addressData.PostalCode || "",
      country: addressData.Country || "CAN",
    };

    logger.log("Transformed address:", address);

    return NextResponse.json({ address });
  } catch (error) {
    logger.error("Post Canada address details error:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: "Failed to fetch address details", details: error.message },
      { status: 500 }
    );
  }
}

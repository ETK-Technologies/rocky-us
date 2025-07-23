import { NextResponse } from "next/server";

const POSTGRID_API_KEY = process.env.POSTGRID_API_KEY;
const POSTGRID_API_URL = "https://api.postgrid.com/v1/addver/completions";

export async function POST(request) {
  try {
    const { addressId, searchTerm } = await request.json();

    if (!addressId || !searchTerm) {
      return NextResponse.json(
        { error: "Address ID and search term are required" },
        { status: 400 }
      );
    }

    console.log(
      "Making request to PostGrid API with addressId:",
      addressId,
      "and searchTerm:",
      searchTerm
    );
    console.log("API Key present:", !!POSTGRID_API_KEY);

    const response = await fetch(POSTGRID_API_URL, {
      method: "POST",
      headers: {
        "x-api-key": POSTGRID_API_KEY,
        "Content-Type": "application/json",
        Origin: "https://www.myrocky.ca",
        Referer: "https://www.myrocky.ca",
      },
      body: JSON.stringify({
        partialStreet: searchTerm,
        index: addressId,
        countryFilter: "US",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("PostGrid API error response:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(`PostGrid API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("PostGrid API response:", data);

    if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
      console.error("Invalid response format from PostGrid:", data);
      return NextResponse.json(
        { error: "Invalid response format from PostGrid" },
        { status: 500 }
      );
    }

    // Get the first address from the response
    const addressData = data.data[0];
    console.log("Address data:", addressData);

    if (!addressData || !addressData.address) {
      console.error("Invalid address data format:", addressData);
      return NextResponse.json(
        { error: "Invalid address data format" },
        { status: 500 }
      );
    }

    // Transform the address data
    const address = {
      street: addressData.address.address || "",
      city: addressData.address.city || "",
      province: addressData.address.prov || "",
      postalCode: addressData.address.pc || "",
      country: addressData.address.country || "",
    };

    console.log("Transformed address:", address);

    return NextResponse.json({ address });
  } catch (error) {
    console.error("PostGrid address details error:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: "Failed to fetch address details", details: error.message },
      { status: 500 }
    );
  }
}

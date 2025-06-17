import { NextResponse } from "next/server";

const POSTGRID_API_KEY = process.env.POSTGRID_API_KEY;
const POSTGRID_API_URL = "https://api.postgrid.com/v1/addver/completions";

export async function POST(request) {
  try {
    const { query } = await request.json();

    if (!query || query.length < 3) {
      return NextResponse.json(
        { error: "Query must be at least 3 characters long" },
        { status: 400 }
      );
    }

    if (!POSTGRID_API_KEY) {
      console.error("PostGrid API key is missing");
      return NextResponse.json(
        { error: "PostGrid API key is not configured" },
        { status: 500 }
      );
    }

    console.log("Making request to PostGrid API with query:", query);
    console.log("API Key present:", !!POSTGRID_API_KEY);

    const url = new URL(POSTGRID_API_URL);
    url.searchParams.append("partialStreet", query);
    url.searchParams.append("countryFilter", "CA");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "x-api-key": POSTGRID_API_KEY,
        "Content-Type": "application/json",
        Origin: "https://www.myrocky.ca",
        Referer: "https://www.myrocky.ca",
      },
    });

    console.log("PostGrid API response status:", response.status);

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
    console.log("PostGrid API response data:", data);

    if (!data.data || !Array.isArray(data.data)) {
      console.error("Invalid response format from PostGrid:", data);
      return NextResponse.json(
        { error: "Invalid response format from PostGrid" },
        { status: 500 }
      );
    }

    // Transform PostGrid response to match our expected format
    const addresses = data.data.map((item, index) => ({
      id: index.toString(), // Using index as ID since PostGrid doesn't provide one
      formattedAddress: `${item.preview.address}, ${item.preview.city}, ${item.preview.pc}`,
    }));

    console.log("Transformed addresses:", addresses);

    return NextResponse.json({ addresses });
  } catch (error) {
    console.error("PostGrid address autocomplete error:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: "Failed to fetch address suggestions", details: error.message },
      { status: 500 }
    );
  }
}

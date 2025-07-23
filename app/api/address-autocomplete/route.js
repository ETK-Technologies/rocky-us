import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      {
        error: "Query parameter is required",
      },
      { status: 400 }
    );
  }

  try {
    // Use the provided API key (same service, different country)
    const apiKey = process.env.CANADA_POST_API_KEY;

    // Call the Addressy Find API for USA addresses
    const response = await fetch(
      `https://api.addressy.com/Capture/Interactive/Find/v1.1/json3.ws?Key=${apiKey}&Country=USA&text=${encodeURIComponent(
        query
      )}&LanguagePreference=en&LastId=&SearchFor=Everything&OrderBy=UserLocation&$block=true&$cache=true`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Address API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching address suggestions:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch address suggestions",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        {
          error: "Address ID is required",
        },
        { status: 400 }
      );
    }

    // Use the provided API key
    const apiKey = process.env.CANADA_POST_API_KEY || "ebfe36937452667d";

    // Call the Addressy Retrieve API to get address details
    const response = await fetch(
      `https://api.addressy.com/Capture/Interactive/Retrieve/v1.1/json3.ws?Key=${apiKey}&Id=${id}&$cache=true`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Address API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error retrieving address details:", error);
    return NextResponse.json(
      {
        error: "Failed to retrieve address details",
      },
      { status: 500 }
    );
  }
}

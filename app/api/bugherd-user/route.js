import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.BUGHERD_API_KEY || "2ljo6j4hnysoj9vljebdiq";

    const response = await fetch(
      `https://www.bugherd.com/users/current?apikey=${apiKey}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        // Cache the response for 5 minutes
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch BugHerd user data", status: response.status },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      status: response.status,
      data: data,
    });
  } catch (error) {
    console.error("BugHerd API error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}

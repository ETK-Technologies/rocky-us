import { NextResponse } from "next/server";

// Email validation function
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function POST(request) {
  try {
    // Parse the request body
    const { email } = await request.json();
    console.log("Received subscription request for email:", email);

    // Validate the email
    if (!email || !isValidEmail(email)) {
      console.log("Invalid email format:", email);
      return NextResponse.json(
        { success: false, error: "Invalid or missing email" },
        { status: 400 }
      );
    }

    // Make a request to the Attentive API
    console.log("Making request to Attentive API...");
    const response = await fetch(
      "https://api.attentivemobile.com/v1/subscriptions",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer Y291T2NERzVQWldHMU1oRmUxNjU4N1lmSE04TlZ5U1JKVFQ1",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: email,
          },
          // locale: {
          //   language: "en",
          //   country: "CA",
          // },
          signUpSourceId:"948633",
          singleOptIn : false,
          subscriptionType: "MARKETING",
        }),
      }
    );

    // Parse the response
    const data = await response.json();
    console.log("Attentive API response:", { status: response.status, data });

    // Check if the API request was successful
    if (!response.ok) {
      console.log("Attentive API error:", data);
      return NextResponse.json(
        { success: false, error: data.message || "Subscription failed" },
        { status: response.status }
      );
    }

    console.log("Subscription successful");
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

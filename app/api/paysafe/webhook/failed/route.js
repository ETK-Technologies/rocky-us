import { NextResponse } from "next/server";

/**
 * Webhook endpoint for failed payment handle callbacks
 */
export async function POST(req) {
  try {
    const data = await req.json();

    console.log("Paysafe webhook failure received:", {
      timestamp: new Date().toISOString(),
      data: data,
    });

    // Return success response to Paysafe
    return NextResponse.json({
      success: true,
      message: "Webhook received successfully",
    });
  } catch (error) {
    console.error("Error processing Paysafe failure webhook:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process webhook",
      },
      { status: 500 }
    );
  }
}

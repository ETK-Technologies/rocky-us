import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { logger } from "@/utils/devLogger";

export async function POST(req) {
  try {
    // Clear server-side cookies
    const cookieStore = await cookies();
    cookieStore.delete("authToken");
    cookieStore.delete("userName");
    cookieStore.delete("userEmail");
    cookieStore.delete("userId");
    cookieStore.delete("displayName");
    cookieStore.delete("lastName");
    cookieStore.delete("province");
    cookieStore.delete("phone");
    cookieStore.delete("DOB");
    cookieStore.delete("stripeCustomerId");

    // Set a flag in cookies to trigger client-side cache clearing
    cookieStore.set("clearCache", "true", {
      maxAge: 10, // Short lifespan, just enough for the client to detect it
      path: "/",
    });

    // Return success without redirect
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error(
      "Error during patient portal logout:",
      error.response?.data || error.message
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error.response?.data?.message || "Logout failed. Please try again.",
      },
      { status: error.response?.status || 500 }
    );
  }
}

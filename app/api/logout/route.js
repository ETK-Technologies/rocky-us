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

    // Set a flag in cookies to trigger client-side cache clearing
    // This is needed because server-side code cannot directly access localStorage
    cookieStore.set("clearCache", "true", {
      maxAge: 10, // Short lifespan, just enough for the client to detect it
      path: "/",
    });

    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  } catch (error) {
    logger.error("Error logging out:", error.response?.data || error.message);

    return NextResponse.json(
      {
        error:
          error.response?.data?.message || "Logout failed. Please try again.",
      },
      { status: error.response?.status || 500 }
    );
  }
}

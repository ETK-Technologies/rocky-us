import { NextResponse } from "next/server";
import { logger } from "@/utils/devLogger";

/**
 * GET /api/v1/auth/google/callback
 * Catch backend callback path if it redirects to frontend domain
 * Redirect to the correct frontend callback route
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    
    logger.log("=== Backend Callback Path on Frontend Domain ===");
    logger.log("URL:", req.url);
    logger.log("Redirecting to frontend callback route...");

    // Build the correct frontend callback URL with all parameters
    const frontendCallbackUrl = new URL("/api/auth/google/callback", req.nextUrl.origin);
    
    // Copy all search parameters to the frontend callback
    searchParams.forEach((value, key) => {
      frontendCallbackUrl.searchParams.set(key, value);
    });

    logger.log("Redirecting to:", frontendCallbackUrl.toString());
    return NextResponse.redirect(frontendCallbackUrl);
  } catch (error) {
    logger.error("Error in backend callback redirect:", error);
    
    // Fallback: redirect to login page
    return NextResponse.redirect(
      new URL("/login-register?viewshow=login&error=callback_redirect_error", req.nextUrl.origin)
    );
  }
}


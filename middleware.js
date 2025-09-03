import { NextResponse } from "next/server";
import { layoutExemptRoutes } from "./utils/layoutConfig";

export function middleware(req) {
  // Skip middleware for static files and API routes
  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith("/_next/") ||
    pathname.includes(".") ||
    pathname.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  // Check if the path is blocked (hashed in navbar)
  if (isBlockedRoute(pathname)) {
    const blockedUrl = new URL("/blocked", req.url);
    blockedUrl.searchParams.set("path", pathname);
    return NextResponse.redirect(blockedUrl);
  }

  const authToken = req.cookies.get("authToken")?.value;
  const isLoginPage = pathname === "/login-register";
  const isPatientPortalLogout =
    req.nextUrl.searchParams.get("pp-logout") === "1";

  // Add the current pathname to the request headers for use in the layout
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", pathname);

  // Check if there are cart parameters in the URL
  const hasCartParams = req.nextUrl.searchParams.has("onboarding-add-to-cart");
  const isEdFlow = req.nextUrl.searchParams.get("ed-flow") === "1";
  const isWlFlow = req.nextUrl.searchParams.get("wl-flow") === "1";
  const isHairFlow = req.nextUrl.searchParams.get("hair-flow") === "1";
  const isMhFlow = req.nextUrl.searchParams.get("mh-flow") === "1";
  const isOnboarding = req.nextUrl.searchParams.get("onboarding") === "1";

  // Case 1: If this is the login page and user is already authenticated AND has cart parameters,
  // redirect directly to checkout instead of home page
  if (isLoginPage && authToken && hasCartParams) {
    // Preserve the onboarding-add-to-cart parameters and flow indicators in the redirect
    const checkoutUrl = new URL("/checkout", req.url);

    // Transfer all relevant parameters to the checkout URL
    if (hasCartParams) {
      const cartItems = req.nextUrl.searchParams.get("onboarding-add-to-cart");
      checkoutUrl.searchParams.set("onboarding-add-to-cart", cartItems);
    }

    if (isEdFlow) {
      checkoutUrl.searchParams.set("ed-flow", "1");
    }

    if (isWlFlow) {
      checkoutUrl.searchParams.set("wl-flow", "1");
    }

    if (isHairFlow) {
      checkoutUrl.searchParams.set("hair-flow", "1");
    }

    if (isMhFlow) {
      checkoutUrl.searchParams.set("mh-flow", "1");
    }

    if (isOnboarding) {
      checkoutUrl.searchParams.set("onboarding", "1");
    }
    return NextResponse.redirect(checkoutUrl);
  }

  // Special Case: If this is the login page with patient portal logout parameter,
  // allow access regardless of authentication status to process the logout
  if (isLoginPage && isPatientPortalLogout) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Case 2: If this is the login page, user is authenticated, and there are NO cart parameters,
  // proceed with the normal redirect to home
  if (isLoginPage && authToken && !hasCartParams) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Case 3: If user is not authenticated and trying to access protected routes, redirect to login
  if (!authToken && !isLoginPage && shouldProtectRoute(pathname)) {
    // Create login URL
    const loginUrl = new URL("/login-register", req.nextUrl.origin);

    // Preserve all query parameters in the redirect_to URL
    const redirectUrl = new URL(req.nextUrl.pathname, req.nextUrl.origin);
    // Copy all search params to the redirect URL
    req.nextUrl.searchParams.forEach((value, key) => {
      redirectUrl.searchParams.set(key, value);
    });

    // Set the redirect_to parameter with the full URL including all query params
    loginUrl.searchParams.set("redirect_to", redirectUrl.toString());

    return NextResponse.redirect(loginUrl);
  }

  // Return the response with the modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Helper function to determine which routes should be protected
function shouldProtectRoute(pathname) {
  // List of routes that require authentication
  const protectedRoutes = [
    "/checkout",
    "/cart",
    "/profile",
    "/ed-consultation-quiz",
    "/hair-main-questionnaire",
    "/wl-consultation",
    "/mh-quiz",
    "/my-account",
    "/ed-pre-consultation-quiz",
    "/wl-pre-consultation",
    "/hair-pre-consultation-quiz",



    // Add other routes that should require authentication
  ];

  // Check if the current path should be protected
  return protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

// Helper function to determine which routes are blocked (hashed in navbar)
function isBlockedRoute(pathname) {
  // List of routes that are hashed/blocked in the navbar
  const blockedRoutes = [
    "/mental-health",
    "/product/dhm-blend",
    "/zonnic",
    "/product/zonnic",
    "/hair",
    // Add other routes that are hashed in navbar
  ];

  // Check if the current path should be blocked
  return blockedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

// Create a simpler, statically analyzable config export
export const config = {
  matcher: [
    "/checkout/:path*",
    "/cart/:path*",
    "/login-register/:path*",
    "/profile/:path*",
    "/mental-health/:path*",
    "/product/dhm-blend/:path*",
    "/zonnic/:path*",
    "/product/zonnic/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

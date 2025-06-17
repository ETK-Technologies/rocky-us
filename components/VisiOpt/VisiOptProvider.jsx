"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import VisiOptScript from "./VisiOptScript";
import { VisiOptConfig } from "./config";

/**
 * Provider component that determines which VisiOpt script to load based on current page and URL parameters
 */
function VisiOptProviderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { debug } = VisiOptConfig;

  // Log that the provider is checking the current page
  if (debug) console.log(`VisiOptProvider checking page: ${pathname}`);

  // Determine which PID to use based on current page and parameters
  const getPid = () => {
    // Hair-related pages
    if (pathname === "/hair") {
      return 40; // Hair main page
    }
    if (pathname === "/hair-pre-consultation-quiz") {
      return 41; // Hair pre-consultation
    }
    if (pathname === "/hair-flow") {
      return 42; // Hair flow
    }
    if (
      pathname === "/login-register" &&
      searchParams.get("hair-flow") === "1"
    ) {
      return 42; // Hair flow login
    }

    // Checkout page scripts
    if (pathname === "/checkout") {
      if (searchParams.get("smoking-flow") === "1") {
        return 27; // Smoking flow checkout
      }

      // ED flow checkout
      if (
        searchParams.get("ed-flow") === "1" &&
        searchParams.get("consultation-required") === "1" &&
        searchParams.get("onboarding") === "1" &&
        searchParams.get("view") === "checkout"
      ) {
        return 7;
      }

      // Default regular checkout
      // We need to exclude "order-received" which would match in WordPress
      // with is_checkout() && !is_order_received_page()
      if (!pathname.includes("/order-received")) {
        return 14;
      }
    }

    // Order received page (Thank you page)
    if (pathname === "/checkout/order-received") {
      return 15;
    }

    // WL pre-consultation page
    if (pathname === "/wl-pre-consultation") {
      return 17;
    }

    // Zonnic product page
    if (pathname === "/zonnic-product") {
      return 25;
    }

    // BO2 page
    if (pathname === "/bo2") {
      return 29;
    }

    // ED Prelander pages
    if (pathname === "/ed-prelander2") {
      return 32;
    }
    if (pathname === "/ed-prelander3") {
      return 34;
    }
    if (pathname === "/ed-prelander4") {
      return 35;
    }
    if (pathname === "/ed-prelander5") {
      return 37;
    }

    // ED pre-consultation page
    if (pathname === "/ed-pre-consultation") {
      return 36;
    }

    // ED flow page
    if (pathname === "/ed-flow") {
      const showonly = searchParams.get("showonly")?.toLowerCase();
      if (showonly === "viagra") return 20;
      if (showonly === "cialis") return 19;
      if (!showonly) return 18;
    }

    // Login register page
    if (pathname === "/login-register") {
      // WL Flow parameters
      if (
        searchParams.get("wl-flow") === "1" &&
        searchParams.get("consultation-required") === "1" &&
        searchParams.get("onboarding") === "1" &&
        searchParams.get("view") === "account" &&
        searchParams.get("viewshow") === "register"
      ) {
        return 30;
      }

      // Smoking flow checkout
      const redirectTo = searchParams.get("redirect_to");
      if (
        searchParams.get("viewshow")?.toLowerCase() === "login" &&
        searchParams.get("view")?.toLowerCase() === "account" &&
        redirectTo &&
        decodeURIComponent(redirectTo).includes("/checkout/") &&
        decodeURIComponent(redirectTo).includes("smoking-flow=1")
      ) {
        return 26;
      }
    }

    // Smoking consultation page
    if (
      pathname === "/smoking-consultation" &&
      searchParams.get("checked-out") === "1"
    ) {
      return 28;
    }

    // No matching page/conditions
    return null;
  };
  const pid = getPid();

  if (pid === null) {
    console.log(
      "VisiOptProvider: No matching conditions found for current page"
    );
    return null;
  }
  console.log(
    `VisiOptProvider: Loading script with PID ${pid} for page ${pathname}`
  );
  return <VisiOptScript pid={pid} />;
}

/**
 * Main export that wraps the provider in a Suspense boundary
 * This fixes the "useSearchParams() should be wrapped in a suspense boundary" error
 */
export default function VisiOptProvider() {
  return (
    <Suspense fallback={null}>
      <VisiOptProviderContent />
    </Suspense>
  );
}

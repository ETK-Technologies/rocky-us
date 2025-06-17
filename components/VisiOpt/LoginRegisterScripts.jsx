"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import VisiOptScript from "./VisiOptScript";

/**
 * Inner component for loading VisiOpt scripts on Login/Register pages
 */
function LoginRegisterScriptsContent() {
  const searchParams = useSearchParams();

  // WL Flow parameters
  const isWlFlow =
    searchParams.get("wl-flow") === "1" &&
    searchParams.get("consultation-required") === "1" &&
    searchParams.get("onboarding") === "1" &&
    searchParams.get("view") === "account" &&
    searchParams.get("viewshow") === "register";

  // Smoking flow checkout redirect
  const redirectTo = searchParams.get("redirect_to");
  const isSmokingFlowRedirect =
    searchParams.get("viewshow")?.toLowerCase() === "login" &&
    searchParams.get("view")?.toLowerCase() === "account" &&
    redirectTo &&
    decodeURIComponent(redirectTo).includes("/checkout/") &&
    decodeURIComponent(redirectTo).includes("smoking-flow=1");
  return (
    <>
      {isWlFlow && <VisiOptScript pid={30} />}
      {isSmokingFlowRedirect && <VisiOptScript pid={26} />}
    </>
  );
}

/**
 * Wrapper component with Suspense boundary
 */
export default function LoginRegisterScripts() {
  return (
    <Suspense fallback={null}>
      <LoginRegisterScriptsContent />
    </Suspense>
  );
}

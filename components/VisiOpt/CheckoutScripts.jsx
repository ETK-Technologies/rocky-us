"use client";

import { useSearchParams } from "next/navigation";
import VisiOptScript from "./VisiOptScript";

/**
 * Component for loading VisiOpt scripts on checkout page based on URL parameters
 */
export default function CheckoutScripts() {
  const searchParams = useSearchParams();

  // Smoking flow checkout
  const isSmokingFlow = searchParams.get("smoking-flow") === "1";

  // ED flow checkout
  const isEdFlow =
    searchParams.get("ed-flow") === "1" &&
    searchParams.get("consultation-required") === "1" &&
    searchParams.get("onboarding") === "1" &&
    searchParams.get("view") === "checkout";

  // Default checkout (only load if not on thank you page and no special flows)
  const isRegularCheckout = !isSmokingFlow && !isEdFlow;

  return (
    <>
      {isRegularCheckout && <VisiOptScript pid={14} />}
      {isSmokingFlow && <VisiOptScript pid={27} />}
      {isEdFlow && <VisiOptScript pid={7} />}
    </>
  );
}

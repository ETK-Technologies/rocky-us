"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import VisiOptScript from "./VisiOptScript";

/**
 * Inner component for loading VisiOpt scripts on Smoking Consultation pages
 */
function SmokingConsultationScriptsContent() {
  const searchParams = useSearchParams();
  // Post-checkout script for smoking consultation
  const isPostCheckout = searchParams.get("checked-out") === "1";

  return <>{isPostCheckout && <VisiOptScript pid={28} />}</>;
}

/**
 * Wrapper component with Suspense boundary
 */
export default function SmokingConsultationScripts() {
  return (
    <Suspense fallback={null}>
      <SmokingConsultationScriptsContent />
    </Suspense>
  );
}

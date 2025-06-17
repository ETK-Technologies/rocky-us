"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import VisiOptScript from "./VisiOptScript";

/**
 * Inner component for loading VisiOpt scripts on Hair-related pages
 */
function HairScriptsContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Hair Main Page
  const isHairMain = pathname === "/hair";

  // Hair Pre Consultation
  const isHairPreConsultation = pathname === "/hair-pre-consultation-quiz";

  // Hair Flow
  const isHairFlow = pathname === "/hair-flow";

  // Login/Register with hair flow
  const isHairFlowLogin =
    pathname === "/login-register" && searchParams.get("hair-flow") === "1";

  return (
    <>
      {isHairMain && <VisiOptScript pid={40} />}
      {isHairPreConsultation && <VisiOptScript pid={41} />}
      {isHairFlow && <VisiOptScript pid={42} />}
      {isHairFlowLogin && <VisiOptScript pid={42} />}
    </>
  );
}

/**
 * Wrapper component with Suspense boundary
 */
export default function HairScripts() {
  return (
    <Suspense fallback={null}>
      <HairScriptsContent />
    </Suspense>
  );
}

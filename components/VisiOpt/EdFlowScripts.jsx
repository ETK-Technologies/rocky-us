"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import VisiOptScript from "./VisiOptScript";

/**
 * Component for loading VisiOpt scripts on ED Flow pages
 */
function EdFlowScriptsContent() {
  const searchParams = useSearchParams();
  const showonly = searchParams.get("showonly")?.toLowerCase();

  // Base ED flow (when no variant is specified)
  const isBaseFlow = !showonly;

  // Viagra variant
  const isViagra = showonly === "viagra";

  // Cialis variant
  const isCialis = showonly === "cialis";
  return (
    <>
      {isBaseFlow && <VisiOptScript pid={18} />}
      {isViagra && <VisiOptScript pid={20} />}
      {isCialis && <VisiOptScript pid={19} />}
    </>
  );
}

/**
 * Wrapper component with Suspense boundary
 */
export default function EdFlowScripts() {
  return (
    <Suspense fallback={null}>
      <EdFlowScriptsContent />
    </Suspense>
  );
}

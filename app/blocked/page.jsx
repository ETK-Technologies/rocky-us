"use client";
import { Suspense } from "react";
import BlockedPage from "@/components/BlockedPage";
import { useSearchParams } from "next/navigation";

const BlockedPageContent = () => {
  // Get the blocked path from URL parameters
  const searchParams = useSearchParams();
  const blockedPath = searchParams.get("path") || "unknown";

  return <BlockedPage blockedPath={blockedPath} />;
};

const BlockedPageWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlockedPageContent />
    </Suspense>
  );
};

export default BlockedPageWrapper;

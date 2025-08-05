"use client";
import BlockedPage from "@/components/BlockedPage";
import { useSearchParams } from "next/navigation";

const BlockedPageWrapper = () => {
  // Get the blocked path from URL parameters
  const searchParams = useSearchParams();
  const blockedPath = searchParams.get("path") || "unknown";

  return <BlockedPage blockedPath={blockedPath} />;
};

export default BlockedPageWrapper; 
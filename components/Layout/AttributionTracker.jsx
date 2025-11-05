"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initializeAttribution, captureAttribution } from "@/utils/sourceAttribution";
import { logger } from "@/utils/devLogger";

/**
 * AttributionTracker Component
 * Initializes and captures traffic source attribution data
 * Tracks UTM parameters, click IDs, AWIN affiliate tracking, and referrers
 */
export default function AttributionTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize attribution tracking on mount
  useEffect(() => {
    try {
      initializeAttribution();
      logger.log("[Attribution] Tracker initialized");
    } catch (error) {
      logger.error("[Attribution] Failed to initialize:", error);
    }
  }, []);

  // Capture attribution on route changes (for SPA navigation)
  useEffect(() => {
    try {
      captureAttribution();
    } catch (error) {
      logger.error("[Attribution] Failed to capture on navigation:", error);
    }
  }, [pathname, searchParams]);

  // This component doesn't render anything
  return null;
}


"use client";

import { useEffect, useRef } from "react";
import { logger } from "@/utils/devLogger";
import { hitCronEndpoint } from "../cron/cronService";

export const useCronHit = () => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    logger.log("useCronHit hook mounted");

    const triggerCronHit = () => {
      logger.log("Setting up cron hit");

      // Use requestIdleCallback for better performance
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        logger.log("Using requestIdleCallback");
        window.requestIdleCallback(() => {
          logger.log("Idle callback triggered, hitting cron endpoint");
          hitCronEndpoint();
        });
      } else {
        logger.log("Using setTimeout fallback");
        // Fallback for browsers that don't support requestIdleCallback
        setTimeout(() => {
          logger.log("Timeout triggered, hitting cron endpoint");
          hitCronEndpoint();
        }, 0);
      }
    };

    // Skip the first render to avoid double execution
    if (isInitialMount.current) {
      logger.log("Skipping initial mount");
      isInitialMount.current = false;
      // Trigger the cron hit after skipping initial mount
      triggerCronHit();
      return;
    }

    // For subsequent mounts
    triggerCronHit();
  }, []);
};

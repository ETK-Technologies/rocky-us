"use client";

import { useEffect, useRef } from "react";
import { hitCronEndpoint } from "@/lib/cron/cronService";

const CronHitHandler = () => {
  const retryCount = useRef(0);
  const MAX_RETRIES = 3;

  useEffect(() => {
    console.log("CronHitHandler component mounted");

    const triggerCronHit = async () => {
      console.log("Setting up cron hit");

      try {
        // Use requestIdleCallback for better performance
        if (typeof window !== "undefined" && "requestIdleCallback" in window) {
          console.log("Using requestIdleCallback");
          window.requestIdleCallback(async () => {
            console.log("Idle callback triggered, hitting cron endpoint");
            await hitCronEndpoint();
            retryCount.current = 0; // Reset retry count on success
          });
        } else {
          console.log("Using setTimeout fallback");
          // Fallback for browsers that don't support requestIdleCallback
          setTimeout(async () => {
            console.log("Timeout triggered, hitting cron endpoint");
            await hitCronEndpoint();
            retryCount.current = 0; // Reset retry count on success
          }, 0);
        }
      } catch (error) {
        console.error("Error in triggerCronHit:", error);
        retryCount.current += 1;

        // If we haven't exceeded max retries, try again after a delay
        if (retryCount.current < MAX_RETRIES) {
          console.log(
            `Retrying cron hit (${retryCount.current}/${MAX_RETRIES})...`
          );
          setTimeout(triggerCronHit, 5000); // Retry after 5 seconds
        } else {
          console.log("Max retries reached, stopping cron hits");
        }
      }
    };

    // Initial hit
    triggerCronHit();

    // Set up interval for subsequent hits
    const intervalId = setInterval(() => {
      if (retryCount.current < MAX_RETRIES) {
        triggerCronHit();
      }
    }, 30000); // 30 seconds

    // Cleanup
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array means this runs once on mount

  return null; // This component doesn't render anything
};

export default CronHitHandler;

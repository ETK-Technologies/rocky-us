import { useEffect, useRef } from "react";
import { hitCronEndpoint } from "../cron/cronService";

export const useCronHit = () => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    console.log("useCronHit hook mounted");

    const triggerCronHit = () => {
      console.log("Setting up cron hit");

      // Use requestIdleCallback for better performance
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        console.log("Using requestIdleCallback");
        window.requestIdleCallback(() => {
          console.log("Idle callback triggered, hitting cron endpoint");
          hitCronEndpoint();
        });
      } else {
        console.log("Using setTimeout fallback");
        // Fallback for browsers that don't support requestIdleCallback
        setTimeout(() => {
          console.log("Timeout triggered, hitting cron endpoint");
          hitCronEndpoint();
        }, 0);
      }
    };

    // Skip the first render to avoid double execution
    if (isInitialMount.current) {
      console.log("Skipping initial mount");
      isInitialMount.current = false;
      // Trigger the cron hit after skipping initial mount
      triggerCronHit();
      return;
    }

    // For subsequent mounts
    triggerCronHit();
  }, []);
};

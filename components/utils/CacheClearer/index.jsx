"use client";

import { useEffect } from "react";
import { logger } from "@/utils/devLogger";
import { usePathname } from "next/navigation";
import { clearSessionId } from "@/services/sessionService";

const CacheClearer = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Function to check for the clearCache cookie and clear localStorage if found
    const checkAndClearCache = () => {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith("clearCache=true")) {
          logger.log("Clearing all cached data due to logout");

          // Clear all cached data from localStorage
          localStorage.removeItem("userProfileData");
          localStorage.removeItem("cartData");
          localStorage.removeItem("savedCards");
          localStorage.removeItem("userDetails");

          // Clear sessionId using the session service
          clearSessionId();

          // Clear any other cached data that might be stored
          // You can add more specific items here as needed

          // Delete the clearCache cookie itself
          document.cookie = "clearCache=; max-age=0; path=/;";

          logger.log("All cached data and sessionId cleared");

          break;
        }
      }
    };

    // Run the check when the component mounts and when path changes
    checkAndClearCache();
  }, [pathname]); // Re-run when pathname changes to ensure it works after navigation

  // This component doesn't render anything
  return null;
};

export default CacheClearer;

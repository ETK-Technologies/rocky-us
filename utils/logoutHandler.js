"use client";

import { clearSessionId } from "@/services/sessionService";
import { logger } from "@/utils/devLogger";
import { toast } from "react-toastify";

/**
 * Client-side logout handler
 * Calls the logout API and handles cleanup with smooth navigation
 */
export const handleLogout = async (router) => {
  try {
    logger.log("Starting logout process...");

    // Call the logout API
    const response = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok && data.success) {
      logger.log("Logout API call successful");

      // Clear sessionId from localStorage
      clearSessionId();

      // Clear other localStorage items
      localStorage.removeItem("userProfileData");
      localStorage.removeItem("cartData");
      localStorage.removeItem("savedCards");
      localStorage.removeItem("userDetails");

      // Dispatch cart updated event
      const cartUpdatedEvent = new CustomEvent("cart-updated");
      document.dispatchEvent(cartUpdatedEvent);

      logger.log("All client-side data cleared");

      // Show success message
      toast.success("You have been logged out successfully");

      // Use Next.js router for smooth navigation
      if (router) {
        // Small delay to show toast
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 500);
      } else {
        // Fallback if router is not provided
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      }

      return { success: true };
    } else {
      logger.error("Logout API error:", data.error);
      toast.error(data.error || "Logout failed. Please try again.");
      return { success: false, error: data.error || "Logout failed" };
    }
  } catch (error) {
    logger.error("Logout exception:", error);
    
    // Even on error, try to clear local data
    clearSessionId();
    localStorage.removeItem("userProfileData");
    localStorage.removeItem("cartData");
    localStorage.removeItem("savedCards");
    localStorage.removeItem("userDetails");

    toast.error("An error occurred during logout. Please try again.");
    return { success: false, error: "An error occurred during logout" };
  }
};


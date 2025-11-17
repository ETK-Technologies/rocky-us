"use client";

import { clearSessionId } from "@/services/sessionService";
import { logger } from "@/utils/devLogger";
import { toast } from "react-toastify";

/**
 * Client-side logout handler
 * Calls the logout API and handles cleanup with smooth navigation
 * @param {Object} router - Next.js router instance
 * @returns {Promise<{success: boolean, error?: string}>}
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

      // Dispatch multiple events to ensure all components update
      // 1. Cart updated event (for cart components)
      const cartUpdatedEvent = new CustomEvent("cart-updated");
      document.dispatchEvent(cartUpdatedEvent);

      // 2. User logged out event (for auth-dependent components)
      const userLoggedOutEvent = new CustomEvent("user-logged-out");
      document.dispatchEvent(userLoggedOutEvent);

      // 3. Trigger cart refresher to force immediate UI update
      const refresher = document.getElementById("cart-refresher");
      if (refresher) {
        refresher.setAttribute("data-refreshed", Date.now().toString());
        refresher.click();
      }

      logger.log("All client-side data cleared and events dispatched");

      // Show success message
      toast.success("You have been logged out successfully");

      // Use Next.js router for smooth navigation
      if (router) {
        // Small delay to show toast and allow UI updates
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

    // Dispatch events even on error to update UI
    document.dispatchEvent(new CustomEvent("cart-updated"));
    document.dispatchEvent(new CustomEvent("user-logged-out"));

    toast.error("An error occurred during logout. Please try again.");
    return { success: false, error: "An error occurred during logout" };
  }
};


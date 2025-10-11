"use client";

import { useState, useEffect } from "react";
import QuebecRestrictionPopup from "./Popups/QuebecRestrictionPopup";

const GlobalQuebecPopup = () => {
  const [showQuebecPopup, setShowQuebecPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    // Function to check and show popup
    const checkAndShowPopup = () => {
      const shouldShowPopup = localStorage.getItem("showQuebecPopup");
      const message = localStorage.getItem("quebecPopupMessage");

      if (shouldShowPopup === "true" && message) {
        // Wait for page to fully load, then show popup after 1 second
        const timer = setTimeout(() => {
          setShowQuebecPopup(true);
          setPopupMessage(message);
          // Clear the localStorage flags
          localStorage.removeItem("showQuebecPopup");
          localStorage.removeItem("quebecPopupMessage");
        }, 1000);

        return timer;
      }
      return null;
    };

    // Check immediately on mount
    let timer = checkAndShowPopup();

    // Listen for storage changes (when localStorage is set from registration)
    const handleStorageChange = (e) => {
      if (e.key === "showQuebecPopup" && e.newValue === "true") {
        const message = localStorage.getItem("quebecPopupMessage");
        if (message) {
          // Clear any existing timer
          if (timer) clearTimeout(timer);
          // Set new timer
          timer = setTimeout(() => {
            setShowQuebecPopup(true);
            setPopupMessage(message);
            // Clear the localStorage flags
            localStorage.removeItem("showQuebecPopup");
            localStorage.removeItem("quebecPopupMessage");
          }, 1000);
        }
      }
    };

    // Add event listener for storage changes
    window.addEventListener("storage", handleStorageChange);

    // Also check periodically for the first few seconds (in case localStorage was set before component mounted)
    const interval = setInterval(() => {
      const shouldShowPopup = localStorage.getItem("showQuebecPopup");
      if (shouldShowPopup === "true") {
        const message = localStorage.getItem("quebecPopupMessage");
        if (message) {
          clearInterval(interval);
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            setShowQuebecPopup(true);
            setPopupMessage(message);
            localStorage.removeItem("showQuebecPopup");
            localStorage.removeItem("quebecPopupMessage");
          }, 1000);
        }
      }
    }, 500);

    // Cleanup
    return () => {
      if (timer) clearTimeout(timer);
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleClose = () => {
    setShowQuebecPopup(false);
  };

  return (
    <QuebecRestrictionPopup
      isOpen={showQuebecPopup}
      onClose={handleClose}
      message={popupMessage}
    />
  );
};

export default GlobalQuebecPopup;

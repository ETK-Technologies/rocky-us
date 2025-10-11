"use client";
import { useEffect, useRef, useState } from "react";
import TrustpilotReviewBanner from "../ui/trustpilotFallback/TrustpilotReviewBanner";

const Trustpilot = () => {
  const widgetRef = useRef(null);
  const [showFallback, setShowFallback] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Check if Trustpilot script is already loaded
    const existingScript = document.querySelector(
      'script[src*="widget.trustpilot.com/bootstrap"]'
    );

    const loadScript = () => {
      const script = document.createElement("script");
      script.src =
        "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
      script.async = true;
      
      script.onload = () => {
        // Clear the timeout since script loaded successfully
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
      
      script.onerror = () => {
        setShowFallback(true);
      };
      
      document.body.appendChild(script);
    };

    if (!existingScript) {
      loadScript();
    } else {
      // Re-load the widget if the script is already there
      if (window.Trustpilot) {
        window.Trustpilot.loadFromElement(widgetRef.current, true);
        // Clear timeout since Trustpilot is available
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      } else {
        setShowFallback(true);
      }
    }

    // Only show fallback if script completely fails to load after 10 seconds
    timeoutRef.current = setTimeout(() => {
      setShowFallback(true);
    }, 10000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-black text-white py-2 text-center ">
      {showFallback ? (
        <TrustpilotReviewBanner />
      ) : (
        <div
          ref={widgetRef}
          className="trustpilot-widget relative scale-[.9]"
          data-locale="en-US"
          data-template-id="5419b6ffb0d04a076446a9af"
          data-businessunit-id="637cea41a90e1b4641b56036"
          data-style-height="20px"
          data-style-width="100%"
          data-theme="dark"
        >
          <a
            href="https://www.trustpilot.com/review/myrocky.ca"
            target="_blank"
            rel="noopener noreferrer"
          >
            Trustpilot
          </a>
        </div>
      )}
    </div>
  );
};

export default Trustpilot;

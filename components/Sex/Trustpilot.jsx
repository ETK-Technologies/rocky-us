"use client";
import { useEffect, useRef } from "react";

const Trustpilot = () => {
  const widgetRef = useRef(null);

  useEffect(() => {
    // Check if Trustpilot script is already loaded
    const existingScript = document.querySelector(
      'script[src*="widget.trustpilot.com/bootstrap"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      // Re-load the widget if the script is already there
      if (window.Trustpilot) {
        window.Trustpilot.loadFromElement(widgetRef.current, true);
      }
    }
  }, []);

  return (
    <div className="text-black text-center ">
      <div
        ref={widgetRef}
        className="trustpilot-widget text-black relative scale-[.9]"
        data-locale="en-US"
        data-template-id="5419b6ffb0d04a076446a9af"
        data-businessunit-id="637cea41a90e1b4641b56036"
        data-style-height="20px"
        data-style-width="100%"
      >
        <a
          href="https://www.trustpilot.com/review/myrocky.ca"
          target="_blank"
          rel="noopener noreferrer"
        >
          Trustpilot
        </a>
      </div>
    </div>
  );
};

export default Trustpilot;

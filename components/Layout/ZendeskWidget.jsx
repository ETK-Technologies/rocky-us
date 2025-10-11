"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { logger } from "@/utils/devLogger";

const ZENDESK_KEY =
  process.env.NEXT_PUBLIC_ZENDESK_KEY || "51c9f4e2-65bd-4b2d-a1bf-ecbe181728cf";

/**
 * ZendeskWidget Component
 * Loads the Zendesk Web Widget (Messenger) and authenticates users via JWT
 *
 * How it works:
 * 1. Loads the Zendesk snippet script
 * 2. Once loaded, attempts to fetch a JWT token for the current user
 * 3. If user is authenticated, logs them into Zendesk Messenger
 * 4. If not authenticated, the widget still loads but as an anonymous user
 */
export default function ZendeskWidget() {
  const [isZendeskLoaded, setIsZendeskLoaded] = useState(false);

  /**
   * Fetches JWT token from our API endpoint
   * @returns {Promise<string|null>} The JWT token or null if failed
   */
  async function getJwt() {
    try {
      const response = await fetch("/api/zendesk/get-jwt", {
        method: "GET",
        credentials: "include", // Include cookies in the request
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      // Check if user is authenticated and token is provided
      if (!data.success || !data.token) {
        logger.log("Zendesk: User not authenticated or no token provided");
        return null;
      }

      return data.token;
    } catch (error) {
      logger.error("Zendesk: Error fetching JWT:", error);
      return null;
    }
  }

  /**
   * Initializes Zendesk with user authentication
   * Called after the Zendesk script is loaded
   */
  async function initializeZendesk() {
    if (typeof window === "undefined" || !window.zE) {
      logger.error("Zendesk: zE object not found");
      return;
    }

    try {
      const token = await getJwt();

      if (token) {
        // User is authenticated, log them into Zendesk
        logger.log("Zendesk: Logging in user with JWT");
        window.zE("messenger", "loginUser", function (callback) {
          callback(token);
        });
      } else {
        // User is not authenticated, widget will load anonymously
        logger.log(
          "Zendesk: User not authenticated, loading widget anonymously"
        );
      }
    } catch (error) {
      logger.error("Zendesk: Error initializing:", error);
    }
  }

  /**
   * Effect hook to initialize Zendesk when the script loads
   */
  useEffect(() => {
    if (isZendeskLoaded) {
      initializeZendesk();
    }
  }, [isZendeskLoaded]);

  return (
    <>
      {/* Load Zendesk Web Widget script */}
      <Script
        id="ze-snippet"
        src={`https://static.zdassets.com/ekr/snippet.js?key=${ZENDESK_KEY}`}
        strategy="lazyOnload"
        onLoad={() => {
          logger.log("Zendesk: Script loaded successfully");
          setIsZendeskLoaded(true);
        }}
        onError={(e) => {
          logger.error("Zendesk: Failed to load script:", e);
        }}
      />

      {/* Hide any conflicting live chat buttons */}
      <style jsx global>{`
        .livechat_button {
          display: none !important;
        }
      `}</style>
    </>
  );
}

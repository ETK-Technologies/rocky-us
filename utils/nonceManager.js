/**
 * Centralized Cart Nonce Management Utility
 * Provides consistent nonce handling across all cart operations
 */

import axios from "axios";
import { logger } from "@/utils/devLogger";

const BASE_URL = process.env.BASE_URL;

/**
 * Refresh cart nonce by fetching cart endpoint
 * This is the canonical way to get a fresh, valid nonce for cart operations
 *
 * @param {Object} cookieStore - Next.js cookies() store
 * @param {Object} encodedCredentials - Auth credentials from cookies
 * @returns {Promise<string|null>} - The fresh nonce or null if failed
 */
export async function refreshCartNonce(cookieStore, encodedCredentials) {
  try {
    logger.log("🔄 Refreshing cart nonce...");

    if (!encodedCredentials?.value) {
      logger.warn("⚠️ No auth credentials provided for nonce refresh");
      return null;
    }

    const cartResponse = await axios.get(`${BASE_URL}/wp-json/wc/store/cart`, {
      headers: {
        Authorization: encodedCredentials.value,
      },
    });

    const freshNonce = cartResponse.headers?.nonce;
    if (freshNonce) {
      cookieStore.set("cart-nonce", freshNonce);
      logger.log("✅ Cart nonce refreshed successfully");
      return freshNonce;
    } else {
      logger.warn("⚠️ No nonce returned from cart response");
      return null;
    }
  } catch (error) {
    logger.error("❌ Error refreshing cart nonce:", error.message);
    return null;
  }
}

/**
 * Get current cart nonce, with optional refresh if missing
 *
 * @param {Object} cookieStore - Next.js cookies() store
 * @param {Object} encodedCredentials - Auth credentials (optional, for refresh)
 * @param {boolean} refreshIfMissing - Whether to fetch fresh nonce if not found
 * @returns {Promise<string|null>} - Current nonce or null
 */
export async function getCurrentCartNonce(
  cookieStore,
  encodedCredentials = null,
  refreshIfMissing = true
) {
  let currentNonce = cookieStore.get("cart-nonce")?.value;

  if (!currentNonce && refreshIfMissing && encodedCredentials) {
    logger.log("🔍 No current nonce found, attempting refresh...");
    currentNonce = await refreshCartNonce(cookieStore, encodedCredentials);
  }

  return currentNonce;
}

/**
 * Update cart nonce from API response headers
 * Call this after any cart API operation that might return a new nonce
 *
 * @param {Object} cookieStore - Next.js cookies() store
 * @param {Object} responseHeaders - API response headers
 * @param {string} source - Source of the update (for logging)
 */
export function updateCartNonceFromResponse(
  cookieStore,
  responseHeaders,
  source = "API"
) {
  const newNonce = responseHeaders?.nonce;
  if (newNonce) {
    cookieStore.set("cart-nonce", newNonce);
    logger.log(
      `🔄 Updated cart nonce from ${source}: ${newNonce.substring(0, 8)}...`
    );
  }
}

/**
 * Client-side nonce refresh utility
 * For use in frontend components when server-side refresh isn't available
 *
 * @returns {Promise<boolean>} - Success status
 */
export async function refreshCartNonceClient() {
  try {
    logger.log("🔄 Client-side cart nonce refresh...");

    const response = await fetch("/api/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      logger.log("✅ Client-side cart nonce refreshed successfully");
      return true;
    } else {
      logger.warn(
        "⚠️ Failed to refresh client-side cart nonce:",
        response.statusText
      );
      return false;
    }
  } catch (error) {
    logger.error("❌ Error refreshing client-side cart nonce:", error);
    return false;
  }
}

/**
 * Prepare headers for cart API requests with nonce
 *
 * @param {Object} cookieStore - Next.js cookies() store
 * @param {Object} encodedCredentials - Auth credentials
 * @param {Object} additionalHeaders - Any additional headers
 * @returns {Object} - Complete headers object
 */
export async function prepareCartHeaders(
  cookieStore,
  encodedCredentials,
  additionalHeaders = {}
) {
  const nonce = await getCurrentCartNonce(
    cookieStore,
    encodedCredentials,
    true
  );

  const headers = {
    Authorization: encodedCredentials?.value,
    "Content-Type": "application/json",
    ...additionalHeaders,
  };

  if (nonce) {
    headers.Nonce = nonce;
    headers["X-WC-Store-API-Nonce"] = nonce;
  }

  return headers;
}

/**
 * Standard nonce management strategy for cart operations
 *
 * @param {Object} cookieStore - Next.js cookies() store
 * @param {Object} encodedCredentials - Auth credentials
 * @returns {Promise<Object>} - { nonce, headers }
 */
export async function ensureValidCartNonce(cookieStore, encodedCredentials) {
  // Always refresh nonce for critical operations
  const freshNonce = await refreshCartNonce(cookieStore, encodedCredentials);

  const headers = await prepareCartHeaders(cookieStore, encodedCredentials);

  return {
    nonce: freshNonce,
    headers,
    isValid: !!freshNonce,
  };
}

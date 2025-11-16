/**
 * Cart API Helper
 * Provides a unified way to fetch cart with automatic sessionId handling
 */

/**
 * Fetch cart with automatic sessionId handling for guest users
 * @returns {Promise<string>} URL with sessionId if available
 */
export const getCartUrl = async () => {
  try {
    // Only get sessionId on client side
    if (typeof window !== "undefined") {
      const { getSessionId } = await import("@/services/sessionService");
      const sessionId = getSessionId();
      if (sessionId) {
        return `/api/cart?sessionId=${sessionId}`;
      }
    }
  } catch (error) {
    // If sessionService fails, continue without sessionId
    console.log("Could not get sessionId, fetching cart without it");
  }
  return "/api/cart";
};

/**
 * Fetch cart with automatic sessionId handling
 * @returns {Promise<Response>} Fetch response
 */
export const fetchCartWithSession = async (options = {}) => {
  const url = await getCartUrl();
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      ...options.headers,
    },
    ...options,
  });
};


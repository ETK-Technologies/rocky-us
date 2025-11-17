/**
 * Cart Merge API
 * Merges guest cart into authenticated user's cart
 */

/**
 * Merge guest cart into user cart
 * @param {string} sessionId - Session ID from guest cart (from localStorage)
 * @returns {Promise<Object>} Merge result with merged cart
 */
export async function mergeGuestCart(sessionId) {
  try {
    if (!sessionId || !sessionId.trim()) {
      return {
        success: false,
        error: "SessionId is required",
      };
    }

    const response = await fetch("/api/cart/merge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId: sessionId.trim() }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to merge cart",
        details: errorData.details,
      };
    }

    const data = await response.json();
    return {
      success: true,
      message: data.message || "Cart merged successfully",
      cart: data.cart,
      merged: data.merged !== false,
    };
  } catch (error) {
    console.error("Error merging cart:", error);
    return {
      success: false,
      error: error.message || "Failed to merge cart",
    };
  }
}

export default {
  mergeGuestCart,
};


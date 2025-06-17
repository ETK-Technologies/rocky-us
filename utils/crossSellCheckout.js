"use client";

import { createCartUrl, getProductIdMapping } from "./urlCartHandler";
import { emptyCart } from "../lib/cart/cartService";

/**
 * Check if user is authenticated
 * @returns {boolean} true if user is authenticated, false otherwise
 */
export const isUserAuthenticated = () => {
  if (typeof window === "undefined") return false;

  // Check for auth cookie since that's what the middleware is using
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  // Check for authToken cookie which is used by the application
  const authToken = getCookie("authToken");
  return !!authToken;
};

/**
 * Save selected products to localStorage for retrieval after login
 * @param {Object} mainProduct - The main selected product
 * @param {Array} addons - Array of addon product objects
 * @param {String} flowType - Type of flow (ed, wl, hair, etc.)
 */
export const saveProductsForCheckout = (
  mainProduct,
  addons,
  flowType = "ed"
) => {
  if (typeof window === "undefined") return;

  const savedProducts = {
    mainProduct,
    addons,
    flowType,
    timestamp: new Date().getTime(),
  };

  localStorage.setItem("cross_sell_products", JSON.stringify(savedProducts));
};

/**
 * Get saved products from localStorage
 * @returns {Object|null} The saved products or null if none exist
 */
export const getSavedProducts = () => {
  if (typeof window === "undefined") return null;

  const savedProducts = localStorage.getItem("cross_sell_products");
  if (!savedProducts) return null;

  return JSON.parse(savedProducts);
};

/**
 * Clear saved products from localStorage
 */
export const clearSavedProducts = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem("cross_sell_products");
};

/**
 * Add products to cart and redirect to appropriate page
 * @param {Object} mainProduct - The main selected product
 * @param {Array} addons - Array of addon product objects
 * @param {String} flowType - Type of flow (ed, wl, hair, etc.)
 * @returns {void}
 */
export const addToCartAndRedirect = async (
  mainProduct,
  addons,
  flowType = "ed"
) => {
  try {
    const isAuthenticated = isUserAuthenticated();

    // If this is the WL flow, clear the cart first before adding new items
    if (flowType === "wl") {
      console.log("WL pre-consultation flow detected. Clearing cart first...");
      try {
        await emptyCart();
        console.log("Cart cleared successfully for WL pre-consultation flow");
      } catch (clearError) {
        console.error("Error clearing cart:", clearError);
        // Continue with the checkout process even if clearing fails
      }
    }

    // Using the centralized URL cart handler to create the redirect URL
    // Since createCartUrl is now async, we need to await the result
    const redirectUrl = await createCartUrl(
      mainProduct,
      addons,
      flowType, // Pass the flowType parameter instead of hardcoding "ed"
      isAuthenticated
    );

    // Save products for retrieval after login if user is not authenticated
    if (!isAuthenticated) {
      saveProductsForCheckout(mainProduct, addons, flowType);
    }

    // Log the final URL
    console.log(`Redirecting to ${flowType} checkout:`, redirectUrl);

    // Redirect to the appropriate page
    window.location.href = redirectUrl;
  } catch (error) {
    console.error(`Error in addToCartAndRedirect for ${flowType} flow:`, error);
    alert("There was an issue processing your checkout. Please try again.");
  }
};

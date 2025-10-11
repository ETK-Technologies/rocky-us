/**
 * Weight Loss Products Configuration Utility
 * Centralized configuration for WL Flow and WL Pre-Consultation
 */

import wlProductsData from "../config/wlProducts.json";

/**
 * Get all WL products
 * @returns {Object} Products object
 */
export const getWlProducts = () => {
  const { wlProducts } = wlProductsData;
  return wlProducts;
};

/**
 * Get WL product by key
 * @param {string} productKey - Product key (OZEMPIC, MOUNJARO, etc.)
 * @returns {Object|null} Product object or null if not found
 */
export const getWlProduct = (productKey) => {
  const { wlProducts } = wlProductsData;
  return wlProducts[productKey] || null;
};

/**
 * Get available WL products
 * @returns {Array} Array of product keys
 */
export const getAvailableWlProducts = () => {
  const { availableProducts } = wlProductsData;
  return availableProducts;
};

/**
 * Get default WL product
 * @returns {Object} Default product object
 */
export const getDefaultWlProduct = () => {
  const { defaultProduct } = wlProductsData;
  return getWlProduct(defaultProduct);
};

/**
 * Hook for backwards compatibility with existing WL components
 * @returns {Object} Products and loading state
 */
export function useProductsWithAvailability() {
  return {
    products: getWlProducts(),
    loading: false,
  };
}

// Named exports for backwards compatibility
export const PRODUCTS = getWlProducts();

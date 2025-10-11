/**
 * Mental Health Products Configuration Utility
 * Centralized configuration for MH Flow and MH Pre-Consultation
 */

import mhProductsData from "../config/mhProducts.json";

/**
 * Get MH product by name
 * @param {string} productName - Product name (cialis, viagra)
 * @returns {Object|null} Product object or null if not found
 */
export const getMhProduct = (productName) => {
  const { mhProducts } = mhProductsData;
  return mhProducts[productName] || null;
};

/**
 * Get all available MH products
 * @returns {Array} Array of product names
 */
export const getAvailableMhProducts = () => {
  const { availableProducts } = mhProductsData;
  return availableProducts;
};

/**
 * Get default MH product
 * @returns {Object} Default product object
 */
export const getDefaultMhProduct = () => {
  const { defaultProduct } = mhProductsData;
  return getMhProduct(defaultProduct);
};

// For backwards compatibility with existing MH components
export const cialisProduct = getMhProduct("cialis");
export const viagraProduct = getMhProduct("viagra");

/**
 * ED Products Configuration Utility
 * Centralized configuration for ED Flow and ED Pre-Consultation
 */

import edProductsData from "../config/edProducts.json";

/**
 * Get ED product by name
 * @param {string} productName - Product name (cialis, viagra)
 * @returns {Object|null} Product object or null if not found
 */
export const getEdProduct = (productName) => {
  const { edProducts } = edProductsData;
  return edProducts[productName] || null;
};

/**
 * Get all available ED products
 * @returns {Array} Array of product names
 */
export const getAvailableEdProducts = () => {
  const { availableProducts } = edProductsData;
  return availableProducts;
};

/**
 * Get default ED product
 * @returns {Object} Default product object
 */
export const getDefaultEdProduct = () => {
  const { defaultProduct } = edProductsData;
  return getEdProduct(defaultProduct);
};

/**
 * Get pill options for specific product and frequency
 * @param {string} productName - Product name
 * @param {string} frequency - Frequency (monthly-supply, quarterly-supply)
 * @returns {Array} Array of pill options
 */
export const getPillOptions = (productName, frequency) => {
  const product = getEdProduct(productName);
  if (!product || !product.pillOptions || !product.pillOptions[frequency]) {
    return [];
  }
  return product.pillOptions[frequency];
};

/**
 * Get product frequencies
 * @param {string} productName - Product name
 * @returns {Object} Frequencies object
 */
export const getProductFrequencies = (productName) => {
  const product = getEdProduct(productName);
  return product ? product.frequencies : {};
};

// For backwards compatibility with existing ED components
export const cialisProduct = getEdProduct("cialis");
export const viagraProduct = getEdProduct("viagra");
export const varietyPackProduct = getEdProduct("varietyPack");

/**
 * ED Products Data - Bridge to Centralized Config
 * This file now imports from the centralized configuration
 */

import {
  cialisProduct as centralizedCialis,
  viagraProduct as centralizedViagra,
  varietyPackProduct as centralizedVarietyPack,
} from "../../utils/edProductsConfig";

// Export products from centralized config for backwards compatibility
export const cialisProduct = centralizedCialis;
export const viagraProduct = centralizedViagra;
export const varietyPackProduct = centralizedVarietyPack;

// Export any other functions that components might be using
export {
  getEdProduct,
  getAvailableEdProducts,
  getDefaultEdProduct,
  getPillOptions,
  getProductFrequencies,
} from "../../utils/edProductsConfig";

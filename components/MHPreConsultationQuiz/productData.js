/**
 * MH Products Data - Bridge to Centralized Config
 * This file now imports from the centralized configuration
 */

import {
  cialisProduct as centralizedCialis,
  viagraProduct as centralizedViagra,
} from "../../utils/mhProductsConfig";

// Export products from centralized config for backwards compatibility
export const cialisProduct = centralizedCialis;
export const viagraProduct = centralizedViagra;

// Export any other functions that components might be using
export {
  getMhProduct,
  getAvailableMhProducts,
  getDefaultMhProduct,
} from "../../utils/mhProductsConfig";

/**
 * WL Products Data - Bridge to Centralized Config
 * This file now imports from the centralized configuration
 */

import {
  PRODUCTS,
  useProductsWithAvailability,
  getWlProducts,
  getWlProduct,
  getAvailableWlProducts,
  getDefaultWlProduct,
} from "../../utils/wlProductsConfig";

// Export products from centralized config for backwards compatibility
export { PRODUCTS };

// Export the hook for backwards compatibility
export { useProductsWithAvailability };

// Export utility functions
export {
  getWlProducts,
  getWlProduct,
  getAvailableWlProducts,
  getDefaultWlProduct,
};

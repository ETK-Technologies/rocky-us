/**
 * Hair Products Data - Bridge to Centralized Config
 * This file now imports from the centralized configuration
 * Note: Hair Pre-Consultation now uses hairProductsConfig.js directly
 */

import {
  getHairFlowProducts,
  getConsultationProduct,
  getHairProductById,
  getConsultationOptions,
  isValidHairProduct,
} from "../../utils/hairProductsConfig";

// Export Hair product functions for backwards compatibility
export {
  getHairFlowProducts,
  getConsultationProduct,
  getHairProductById,
  getConsultationOptions,
  isValidHairProduct,
};

// Legacy exports (if any components still reference these)
// Note: Hair consultation should use getConsultationProduct() instead
export const hairProducts = getHairFlowProducts();

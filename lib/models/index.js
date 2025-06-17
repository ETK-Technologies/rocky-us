/**
 * Product System Models Index
 * Central entry point for the product system
 */

// Product models
export { default as ProductBase } from "./products/ProductBase";
export { default as SimpleProduct } from "./products/SimpleProduct";
export { default as VariableProduct } from "./products/VariableProduct";
export { default as ProductBundle } from "./products/ProductBundle";
export { default as VariableSubscription } from "./products/VariableSubscription";

// Category handlers
export { default as CategoryHandler } from "./categories/CategoryHandler";
export { default as EdCategoryHandler } from "./categories/EdCategoryHandler";
export { default as HairCategoryHandler } from "./categories/HairCategoryHandler";
export { default as SmokingCategoryHandler } from "./categories/SmokingCategoryHandler";
export { default as WeightLossCategoryHandler } from "./categories/WeightLossCategoryHandler";
export { default as DhmBlendCategoryHandler } from "./categories/DhmBlendCategoryHandler";

// Factories and managers
export { default as ProductFactory } from "./ProductFactory";
export { default as CategoryHandlerFactory } from "./CategoryHandlerFactory";
export { default as VariationManager } from "./VariationManager";

// Configuration and adapters
export { default as productConfig, getProductConfig } from "./productConfig";
export {
  default as productAdapters,
  adaptForProductClient,
  adaptForProductPage,
  adaptRelatedProducts,
} from "./productAdapters";

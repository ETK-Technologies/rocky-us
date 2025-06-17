/**
 * Category Handler Factory
 * Factory for creating category handlers based on product categories
 */
import CategoryHandler from "./categories/CategoryHandler";
import EdCategoryHandler from "./categories/EdCategoryHandler";
import HairCategoryHandler from "./categories/HairCategoryHandler";
import SmokingCategoryHandler from "./categories/SmokingCategoryHandler";
import WeightLossCategoryHandler from "./categories/WeightLossCategoryHandler";
import DhmBlendCategoryHandler from "./categories/DhmBlendCategoryHandler";

/**
 * Creates a category handler based on product categories
 * @param {Object} product - Product model instance
 * @returns {CategoryHandler} - The appropriate category handler instance
 */
export function createCategoryHandler(product) {
  if (!product) return new CategoryHandler(null);

  // Helper function to check category
  const hasCategory = (category) => {
    if (typeof product.hasCategory === "function") {
      return product.hasCategory(category);
    }

    // Fallback if hasCategory method is not available
    const categories = product.getCategories?.() || [];
    return categories.some((cat) => cat.slug === category);
  };

  // Determine the appropriate category handler based on product categories
  if (hasCategory("ed")) {
    return new EdCategoryHandler(product);
  } else if (hasCategory("hair")) {
    return new HairCategoryHandler(product);
  } else if (hasCategory("smoking")) {
    return new SmokingCategoryHandler(product);
  } else if (hasCategory("weight-loss")) {
    return new WeightLossCategoryHandler(product);
  } else if (hasCategory("dhm-blend")) {
    return new DhmBlendCategoryHandler(product);
  }

  // Default category handler if no specific category is matched
  return new CategoryHandler(product);
}

export default createCategoryHandler;

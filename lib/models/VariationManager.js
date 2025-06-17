/**
 * Variation Manager
 * Handles variation logic for products across different categories
 */
import { VARIATION_TYPES } from "../constants/productTypes";

export class VariationManager {
  /**
   * Constructor
   * @param {Object} product - Product model instance
   * @param {Object} categoryHandler - Category handler instance
   */
  constructor(product, categoryHandler) {
    this.product = product;
    this.categoryHandler = categoryHandler;
  }

  /**
   * Get variation type for this product
   * @returns {string} Variation type constant
   */
  getVariationType() {
    // First, check if the category handler has a method to determine variation type
    if (typeof this.categoryHandler.getVariationType === "function") {
      return this.categoryHandler.getVariationType();
    }

    // If not, determine based on product properties
    const hasSubscriptions = this.product.hasSubscriptions?.() || false;
    const hasVariations = this.product.getVariations?.()?.length > 0 || false;

    // Check for special product types
    const name = this.product.getName()?.toLowerCase() || "";
    if (name.includes("lidocaine")) {
      return VARIATION_TYPES.SUBSCRIPTION;
    }

    // Default logic
    if (hasSubscriptions) return VARIATION_TYPES.SUBSCRIPTION;
    if (!hasVariations) return VARIATION_TYPES.SIMPLE;

    // Get product type from category handler
    const productType = this.categoryHandler.getProductType();

    switch (productType) {
      case "ED":
        return VARIATION_TYPES.QUANTITY;
      case "DHM_BLEND":
      case "SMOKING":
        return VARIATION_TYPES.FREQUENCY;
      default:
        return VARIATION_TYPES.SIMPLE;
    }
  }

  /**
   * Format variations based on variation type
   * @returns {Object|Array|null} Formatted variations data
   */
  formatVariations() {
    const variationType = this.getVariationType();

    switch (variationType) {
      case VARIATION_TYPES.SUBSCRIPTION:
        return this.formatSubscriptionVariations();
      case VARIATION_TYPES.QUANTITY:
        return this.formatQuantityVariations();
      case VARIATION_TYPES.FREQUENCY:
        return this.formatFrequencyVariations();
      default:
        return null;
    }
  }

  /**
   * Format subscription variations
   * @returns {Array} Formatted subscription variations
   */
  formatSubscriptionVariations() {
    // Check if category handler has special handling for subscriptions
    if (this.categoryHandler.hasSpecialSubscriptionHandling()) {
      return this.categoryHandler.formatSubscriptionVariations(this.product);
    }

    // Standard subscription handling
    const subscriptions = this.product.getSubscriptionOptions?.() || [];

    return subscriptions.map((sub) => ({
      id: sub.id,
      label: sub.name,
      price: sub.price,
      description: sub.description,
    }));
  }

  /**
   * Format quantity variations
   * @returns {Object} Formatted quantity variations
   */
  formatQuantityVariations() {
    // Delegate to category handler if available
    if (typeof this.categoryHandler.formatQuantityVariations === "function") {
      return this.categoryHandler.formatQuantityVariations(this.product);
    }

    // Default implementation
    return {};
  }

  /**
   * Format frequency variations
   * @returns {Object} Formatted frequency variations
   */
  formatFrequencyVariations() {
    // Delegate to category handler if available
    if (typeof this.categoryHandler.formatFrequencyVariations === "function") {
      return this.categoryHandler.formatFrequencyVariations(this.product);
    }

    // Default implementation
    return {
      frequency: [
        { value: "monthly-supply", label: "Monthly Supply" },
        { value: "quarterly-supply", label: "Quarterly Supply" },
      ],
    };
  }
}

export default VariationManager;

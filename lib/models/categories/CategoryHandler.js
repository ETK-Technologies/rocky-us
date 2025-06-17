/**
 * Base Category Handler
 * Handles common functionality for all product categories
 */
export class CategoryHandler {
  constructor(product) {
    this.product = product;
    this.categoryName = "default";
  }

  /**
   * Get the product object
   * @returns {Object} The product object
   */
  getProduct() {
    return this.product;
  }

  /**
   * Get the category name
   * @returns {string} Category name
   */
  getCategoryName() {
    return this.categoryName;
  }

  /**
   * Check if the handler has special subscription handling
   * @returns {boolean} True if special subscription handling is needed
   */
  hasSpecialSubscriptionHandling() {
    return false;
  }

  /**
   * Format subscription variations (default implementation)
   * @param {Object} product - The product object
   * @returns {Array} Formatted subscription variations
   */
  formatSubscriptionVariations(product) {
    return [];
  }

  /**
   * Format frequency variations (default implementation)
   * @param {Object} product - The product object
   * @returns {Object} Formatted frequency variations
   */
  formatFrequencyVariations(product) {
    return {
      frequency: [
        { value: "monthly-supply", label: "Monthly Supply" },
        { value: "quarterly-supply", label: "Quarterly Supply" },
      ],
    };
  }

  /**
   * Format quantity variations (default implementation)
   * @param {Object} product - The product object
   * @returns {Object} Formatted quantity variations
   */
  formatQuantityVariations(product) {
    return {};
  }

  /**
   * Get consultation link based on product category
   * @returns {string} Consultation link
   */
  getConsultationLink() {
    return "/consultation";
  }

  /**
   * Get product type for display
   * @returns {string} Product type
   */
  getProductType() {
    return "default";
  }
}

export default CategoryHandler;

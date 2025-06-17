/**
 * Product Bundle Model
 * Represents a WooCommerce product bundle (group of products sold together)
 */
import ProductBase from "./ProductBase";

export class ProductBundle extends ProductBase {
  constructor(productData) {
    super(productData);
    this.type = "bundle";
  }

  /**
   * Get the product type
   * @returns {string} Product type
   */
  getType() {
    return this.type;
  }

  /**
   * Get bundled products
   * @returns {Array} Bundled products
   */
  getBundledProducts() {
    return this.data.bundled_items || [];
  }

  /**
   * Get subscription schemes for the bundle
   * @returns {Array} Subscription schemes
   */
  getSubscriptionSchemes() {
    return this.data.subscriptions || [];
  }

  /**
   * Check if bundle has subscription options
   * @returns {boolean} True if bundle has subscription options
   */
  hasSubscriptions() {
    const schemes = this.getSubscriptionSchemes();
    return Array.isArray(schemes) && schemes.length > 0;
  }

  /**
   * Format product data for display on product page
   * @returns {Object} Formatted product data
   */
  formatForDisplay() {
    return {
      id: this.getId(),
      name: this.getName(),
      price: this.getPrice(),
      description: this.getShortDescription(),
      imageUrl: this.getMainImageUrl(),
      bundledProducts: this.getBundledProducts(),
      subscriptionSchemes: this.getSubscriptionSchemes(),
      hasSubscriptions: this.hasSubscriptions(),
    };
  }
}

export default ProductBundle;

/**
 * Simple Product Model
 * Represents a WooCommerce simple product (no variations or subscriptions)
 */
import ProductBase from "./ProductBase";

export class SimpleProduct extends ProductBase {
  constructor(productData) {
    super(productData);
    this.type = "simple";
  }

  /**
   * Get the product type
   * @returns {string} Product type
   */
  getType() {
    return this.type;
  }

  /**
   * Check if product is purchasable
   * @returns {boolean} True if product is purchasable
   */
  isPurchasable() {
    return this.data.purchasable !== false;
  }

  /**
   * Check if product is in stock
   * @returns {boolean} True if product is in stock
   */
  isInStock() {
    return this.data.in_stock !== false;
  }

  /**
   * Get stock quantity
   * @returns {number} Stock quantity
   */
  getStockQuantity() {
    return this.data.stock_quantity || 0;
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
      purchasable: this.isPurchasable(),
      inStock: this.isInStock(),
    };
  }
}

export default SimpleProduct;

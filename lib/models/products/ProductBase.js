/**
 * Base Product Model
 * Serves as the foundation for all product types with common functionality
 */
export class ProductBase {
  constructor(productData) {
    this.data = productData || {};
  }

  /**
   * Get the raw product data
   * @returns {Object} The product data
   */
  getData() {
    return this.data;
  }

  /**
   * Get the product ID
   * @returns {number} Product ID
   */
  getId() {
    return this.data.id;
  }

  /**
   * Get the product name
   * @returns {string} Product name
   */
  getName() {
    return this.data.name || "";
  }

  /**
   * Get the product slug
   * @returns {string} Product slug
   */
  getSlug() {
    return this.data.slug || "";
  }

  /**
   * Get the product description
   * @returns {string} Product description
   */
  getDescription() {
    return this.data.description || "";
  }

  /**
   * Get the product short description
   * @returns {string} Product short description
   */
  getShortDescription() {
    return this.data.short_description || this.data.description || "";
  }

  /**
   * Get the product price
   * @returns {number} Product price
   */
  getPrice() {
    return parseFloat(this.data.price) || 0;
  }

  /**
   * Get the product regular price
   * @returns {number} Product regular price
   */
  getRegularPrice() {
    return parseFloat(this.data.regular_price) || this.getPrice();
  }

  /**
   * Get the product sale price
   * @returns {number} Product sale price
   */
  getSalePrice() {
    return parseFloat(this.data.sale_price) || this.getPrice();
  }

  /**
   * Get product images
   * @returns {Array} Product images
   */
  getImages() {
    return this.data.images || [];
  }

  /**
   * Get the main product image URL
   * @returns {string} Main product image URL
   */
  getMainImageUrl() {
    const images = this.getImages();
    return images.length > 0 ? images[0].src : "";
  }

  /**
   * Get product categories
   * @returns {Array} Product categories
   */
  getCategories() {
    return this.data.categories || [];
  }

  /**
   * Check if the product belongs to a specific category
   * @param {string} categorySlug - The category slug to check
   * @returns {boolean} True if product belongs to the category
   */
  hasCategory(categorySlug) {
    const categories = this.getCategories();
    return categories.some((category) => category.slug === categorySlug);
  }

  /**
   * Get product variations
   * @returns {Array} Product variations
   */
  getVariations() {
    // Check multiple possible locations where variations might be stored
    return this.data.variations_data || this.data.variations || [];
  }

  /**
   * Get formatted FAQs data from product
   * @returns {Array} Formatted FAQs
   */
  getFormattedFaqs() {
    const productFaqs =
      this.data?.meta_data?.find((meta) => meta.key === "faqs")?.value || [];
    return Array.isArray(productFaqs) ? productFaqs : [];
  }
}

export default ProductBase;

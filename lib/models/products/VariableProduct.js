/**
 * Variable Product Model
 * Represents a WooCommerce variable product with multiple variations
 */
import ProductBase from "./ProductBase";

export class VariableProduct extends ProductBase {
  constructor(productData) {
    super(productData);
    this.type = "variable";
  }

  /**
   * Get the product type
   * @returns {string} Product type
   */
  getType() {
    return this.type;
  }

  /**
   * Get product variations
   * @returns {Array} Product variations
   */
  getVariations() {
    return this.data.variations_data || [];
  }

  /**
   * Get default variation
   * @returns {Object|null} Default variation or null if none found
   */
  getDefaultVariation() {
    const variations = this.getVariations();
    if (variations.length === 0) return null;

    // Find variation marked as default, or use the first one
    const defaultVariation =
      variations.find((v) => v.is_default === true) || variations[0];
    return defaultVariation;
  }

  /**
   * Get variation by ID
   * @param {number} variationId - The variation ID to find
   * @returns {Object|null} Variation object or null if not found
   */
  getVariationById(variationId) {
    const variations = this.getVariations();
    return variations.find((v) => v.variation_id === variationId) || null;
  }

  /**
   * Get price range (min and max prices across all variations)
   * @returns {Object} Price range with min and max values
   */
  getPriceRange() {
    const variations = this.getVariations();
    if (variations.length === 0) {
      return { min: this.getPrice(), max: this.getPrice() };
    }

    const prices = variations.map((v) => parseFloat(v.display_price));
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }

  /**
   * Get available attributes and their options
   * @returns {Object} Attributes and their options
   */
  getAttributes() {
    return this.data.attributes || [];
  }

  /**
   * Get variations grouped by a specific attribute
   * @param {string} attributeName - The attribute to group by (e.g., 'attribute_pa_subscription-type')
   * @returns {Object} Variations grouped by attribute value
   */
  getVariationsByAttribute(attributeName) {
    const variations = this.getVariations();
    const grouped = {};

    variations.forEach((variation) => {
      const attributeValue = variation.attributes[attributeName];
      if (!attributeValue) return;

      if (!grouped[attributeValue]) {
        grouped[attributeValue] = [];
      }

      grouped[attributeValue].push(variation);
    });

    return grouped;
  }

  /**
   * Format product data for display on product page
   * @returns {Object} Formatted product data
   */
  formatForDisplay() {
    const priceRange = this.getPriceRange();

    return {
      id: this.getId(),
      name: this.getName(),
      priceRange: priceRange,
      description: this.getShortDescription(),
      imageUrl: this.getMainImageUrl(),
      variations: this.getVariations(),
      attributes: this.getAttributes(),
    };
  }
}

export default VariableProduct;

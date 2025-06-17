/**
 * Smoking Category Handler
 * Handles specific logic for Smoking cessation products
 */
import CategoryHandler from "./CategoryHandler";
import { PRODUCT_TYPES, VARIATION_TYPES } from "../../constants/productTypes";

export class SmokingCategoryHandler extends CategoryHandler {
  constructor(product) {
    super(product);
    this.categoryName = "smoking";
  }

  /**
   * Get product type for display
   * @returns {string} Product type constant
   */
  getProductType() {
    return PRODUCT_TYPES.SMOKING;
  }

  /**
   * Get variation type for this category
   * @returns {string} Variation type constant
   */
  getVariationType() {
    const product = this.getProduct();
    const hasSubscriptions = product.hasSubscriptions?.() || false;
    const hasVariations = product.getVariations?.()?.length > 0 || false;

    if (hasSubscriptions) return VARIATION_TYPES.SUBSCRIPTION;
    if (!hasVariations) return VARIATION_TYPES.SIMPLE;

    return VARIATION_TYPES.FREQUENCY;
  }

  /**
   * Format frequency variations for Smoking products
   * @param {Object} product - The product object
   * @returns {Object} Formatted frequency variations
   */
  formatFrequencyVariations(product) {
    const variations = product.getVariations();
    if (!variations || variations.length === 0) return {};

    // Group variations by frequency
    const variationsByFrequency = {};
    variations.forEach((variation) => {
      // Get attribute values for smoking products
      const attrName = "attribute_pa_subscription-type";
      const frequency = variation.attributes[attrName];
      const packName = "attribute_pa_zonnic-packs";
      const packs = variation.attributes[packName];

      if (!frequency || !packs) return;

      if (!variationsByFrequency[frequency]) {
        variationsByFrequency[frequency] = [];
      }

      variationsByFrequency[frequency].push({
        value: packs,
        label: `${packs.replace(/-/g, " ")} packs`,
        price: variation.display_price,
        variation_id: variation.variation_id,
      });
    });

    return {
      frequency: [
        { value: "monthly-supply", label: "Monthly Supply" },
        { value: "quarterly-supply", label: "Quarterly Supply" },
      ],
      quantities: variationsByFrequency,
    };
  }

  /**
   * Format subscription variations for Smoking products
   * @param {Object} product - The product object
   * @returns {Array} Formatted subscription variations
   */
  formatSubscriptionVariations(product) {
    const subscriptions = product.getSubscriptionOptions?.() || [];

    return subscriptions.map((sub) => ({
      id: sub.id,
      label: sub.name,
      price: sub.price,
      description: sub.description,
    }));
  }

  /**
   * Get consultation link for Smoking products
   * @returns {string} Consultation link
   */
  getConsultationLink() {
    return "/smoking-consultation";
  }

  /**
   * Format data for display on product page
   * @returns {Object} Formatted data for Smoking products
   */
  formatForProductDisplay() {
    const product = this.getProduct();
    const variationType = this.getVariationType();
    let variations = null;

    switch (variationType) {
      case VARIATION_TYPES.FREQUENCY:
        variations = this.formatFrequencyVariations(product);
        break;
      case VARIATION_TYPES.SUBSCRIPTION:
        variations = this.formatSubscriptionVariations(product);
        break;
      default:
        variations = null;
    }

    return {
      product: product.getData(),
      productType: this.getProductType(),
      variationType: variationType,
      variations: variations,
      consultationLink: this.getConsultationLink(),
    };
  }
}

export default SmokingCategoryHandler;

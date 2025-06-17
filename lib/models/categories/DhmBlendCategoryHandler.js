/**
 * DHM Blend Category Handler
 * Handles specific logic for DHM Blend products
 */
import CategoryHandler from "./CategoryHandler";
import { PRODUCT_TYPES, VARIATION_TYPES } from "../../constants/productTypes";

export class DhmBlendCategoryHandler extends CategoryHandler {
  constructor(product) {
    super(product);
    this.categoryName = "dhm-blend";
  }

  /**
   * Get product type for display
   * @returns {string} Product type constant
   */
  getProductType() {
    return PRODUCT_TYPES.DHM_BLEND;
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
   * Format frequency variations for DHM Blend products
   * @param {Object} product - The product object
   * @returns {Object} Formatted frequency variations
   */
  formatFrequencyVariations(product) {
    const variations = product.getVariations();
    if (!variations || variations.length === 0) return {};

    // Group variations by frequency
    const variationsByFrequency = {};
    variations.forEach((variation) => {
      // Check both standard and legacy attribute names for site compatibility
      const subscriptionTypeKey = "attribute_pa_subscription-type";
      const legacySubscriptionTypeKey = "attribute_subscription-type";
      const frequency =
        variation.attributes[subscriptionTypeKey] ||
        variation.attributes[legacySubscriptionTypeKey];

      const packsKey = "attribute_dhm-packs";
      const packs = variation.attributes[packsKey];

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
        { value: "one-time-purchase", label: "One-time Purchase" },
      ],
      quantities: variationsByFrequency,
    };
  }

  /**
   * Format subscription variations for DHM Blend products
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
   * Get frequency description text based on selected frequency
   * @param {string} frequency - Selected frequency value
   * @returns {string} Description text
   */
  getFrequencyDescription(frequency) {
    if (frequency === "monthly-supply") {
      return "Delivered monthly • Cancel Anytime • Free Shipping";
    } else if (frequency === "quarterly-supply") {
      return "Delivered quarterly • Cancel Anytime • Free Shipping";
    }
    return "Free Shipping";
  }

  /**
   * Get consultation link for DHM Blend products
   * @returns {string} Consultation link
   */
  getConsultationLink() {
    return "/consultation";
  }

  /**
   * Format data for display on product page
   * @returns {Object} Formatted data for DHM Blend products
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
      frequencyDescriptions: {
        "monthly-supply": this.getFrequencyDescription("monthly-supply"),
        "quarterly-supply": this.getFrequencyDescription("quarterly-supply"),
        "one-time-purchase": this.getFrequencyDescription("one-time-purchase"),
      },
    };
  }
}

export default DhmBlendCategoryHandler;

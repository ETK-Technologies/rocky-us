/**
 * ED Category Handler
 * Handles specific logic for ED (Erectile Dysfunction) products
 */
import CategoryHandler from "./CategoryHandler";
import { PRODUCT_TYPES, VARIATION_TYPES } from "../../constants/productTypes";

export class EdCategoryHandler extends CategoryHandler {
  constructor(product) {
    super(product);
    this.categoryName = "ed";
  }

  /**
   * Get product type for display
   * @returns {string} Product type constant
   */
  getProductType() {
    return PRODUCT_TYPES.ED;
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

    return VARIATION_TYPES.QUANTITY;
  }

  /**
   * Format quantity variations for ED products
   * @param {Object} product - The product object
   * @returns {Object} Formatted quantity variations
   */
  formatQuantityVariations(product) {
    const variations = product.getVariations();
    if (!variations || variations.length === 0) return {};

    // Group variations by frequency, then by quantity to deduplicate
    const variationsByFrequency = {};
    const seenQuantitiesByFrequency = {}; // Track seen quantity values per frequency

    variations.forEach((variation) => {
      const frequency = variation.attributes["attribute_pa_subscription-type"];
      const quantity =
        variation.attributes["attribute_pa_tabs-frequency"] ||
        variation.attributes["attribute_tabs-frequency"] ||
        variation.attributes["attribute_pa_capsules"] ||
        variation.attributes["attribute_capsules"];

      if (!frequency || !quantity) return;

      // Filter out 4-tabs variation for ED products only
      if (quantity === "4-tabs") return;

      // Initialize frequency group if needed
      if (!variationsByFrequency[frequency]) {
        variationsByFrequency[frequency] = [];
        seenQuantitiesByFrequency[frequency] = new Set();
      }

      // Only add if we haven't seen this quantity value for this frequency
      // This prevents redundant options (e.g., multiple "6-tabs" options)
      if (!seenQuantitiesByFrequency[frequency].has(quantity)) {
        seenQuantitiesByFrequency[frequency].add(quantity);
        variationsByFrequency[frequency].push({
          value: quantity,
          label: `${quantity.replace(/-/g, " ")} pills`,
          price: variation.display_price,
          variation_id: variation.variation_id,
        });
      }
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
   * Get consultation link for ED products
   * @returns {string} Consultation link
   */
  getConsultationLink() {
    return "/ed-consultation-quiz";
  }

  /**
   * Format data for display on product page
   * @returns {Object} Formatted data for ED products
   */
  formatForProductDisplay() {
    const product = this.getProduct();
    const variationType = this.getVariationType();
    let variations = null;

    switch (variationType) {
      case VARIATION_TYPES.QUANTITY:
        variations = this.formatQuantityVariations(product);
        break;
      case VARIATION_TYPES.SUBSCRIPTION:
        variations = product.getSubscriptionOptions?.() || [];
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

export default EdCategoryHandler;

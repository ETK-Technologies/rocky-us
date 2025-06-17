/**
 * Weight Loss Category Handler
 * Handles specific logic for Weight Loss products
 */
import CategoryHandler from "./CategoryHandler";
import { PRODUCT_TYPES, VARIATION_TYPES } from "../../constants/productTypes";

export class WeightLossCategoryHandler extends CategoryHandler {
  constructor(product) {
    super(product);
    this.categoryName = "weight-loss";
  }

  /**
   * Get product type for display
   * @returns {string} Product type constant
   */
  getProductType() {
    return PRODUCT_TYPES.WEIGHT_LOSS;
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
   * Check if this is a lidocaine product
   * @param {Object} product - The product object
   * @returns {boolean} True if it's a lidocaine product
   */
  isLidocaineProduct(product) {
    const name = product.getName()?.toLowerCase() || "";
    return name.includes("lidocaine");
  }

  /**
   * Format subscription variations for Weight Loss products
   * @param {Object} product - The product object
   * @returns {Array} Formatted subscription variations
   */
  formatSubscriptionVariations(product) {
    // Special handling for lidocaine products
    if (this.isLidocaineProduct(product)) {
      const basePrice = product.getPrice() || 0;
      const oneTimePrice = parseFloat(basePrice);
      const monthlyPrice = Math.round(oneTimePrice * 0.85); // 15% discount
      const quarterlyPrice = 80; // Fixed price as specified

      return [
        {
          id: "one-time",
          label: "One Time Purchase",
          price: oneTimePrice,
          description: "",
        },
        {
          id: "monthly",
          label: "Monthly Subscription (30g)",
          price: monthlyPrice,
          description: "",
        },
        {
          id: "quarterly",
          label: "Quarterly Subscription (90g)",
          price: quarterlyPrice,
          description: "",
        },
      ];
    }

    const subscriptions = product.getSubscriptionOptions?.() || [];

    return subscriptions.map((sub) => ({
      id: sub.id,
      label: sub.name,
      price: sub.price,
      description: sub.description,
    }));
  }

  /**
   * Format quantity variations for Weight Loss products
   * @param {Object} product - The product object
   * @returns {Object} Formatted quantity variations
   */
  formatQuantityVariations(product) {
    const variations = product.getVariations();
    if (!variations || variations.length === 0) return {};

    // Group variations by frequency
    const variationsByFrequency = {};
    variations.forEach((variation) => {
      const frequency = variation.attributes["attribute_pa_subscription-type"];
      const quantity =
        variation.attributes["attribute_pa_capsules"] ||
        variation.attributes["attribute_capsules"];

      if (!frequency || !quantity) return;

      if (!variationsByFrequency[frequency]) {
        variationsByFrequency[frequency] = [];
      }

      variationsByFrequency[frequency].push({
        value: quantity,
        label: `${quantity.replace(/-/g, " ")} capsules`,
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
   * Get consultation link for Weight Loss products
   * @returns {string} Consultation link
   */
  getConsultationLink() {
    return "/wl-consultation";
  }

  /**
   * Format data for display on product page
   * @returns {Object} Formatted data for Weight Loss products
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

export default WeightLossCategoryHandler;

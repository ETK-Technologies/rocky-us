/**
 * Hair Category Handler
 * Handles specific logic for Hair products
 */
import CategoryHandler from "./CategoryHandler";
import { PRODUCT_TYPES, VARIATION_TYPES } from "../../constants/productTypes";

export class HairCategoryHandler extends CategoryHandler {
  constructor(product) {
    super(product);
    this.categoryName = "hair";
  }

  /**
   * Get product type for display
   * @returns {string} Product type constant
   */
  getProductType() {
    return PRODUCT_TYPES.HAIR;
  }

  /**
   * Check if this handler has special subscription handling
   * @returns {boolean} True for hair products
   */
  hasSpecialSubscriptionHandling() {
    return true;
  }

  /**
   * Get variation type for this category
   * @returns {string} Variation type constant
   */
  getVariationType() {
    const product = this.getProduct();
    const hasVariations = product.getVariations?.()?.length > 0 || false;

    if (hasVariations) {
      return VARIATION_TYPES.SUBSCRIPTION;
    }

    return VARIATION_TYPES.SIMPLE;
  }

  /**
   * Gets the custom frequency label based on product slug
   * @param {string} slug - Product slug
   * @returns {string} Frequency label
   */
  getFrequencyLabel(slug) {
    if (slug.includes("finasteride-minoxidil-topical-foam")) {
      return "$185.00 every 2 months";
    } else if (slug.includes("finasteride")) {
      return "every 3 months for 24 months";
    } else if (slug.includes("minoxidil")) {
      return "every 3 months for 24 months";
    } else if (slug.includes("essential-ix")) {
      return "every 3 months for 24 months";
    } else if (slug.includes("essential-v")) {
      return "every 3 months for 24 months";
    }

    return "every 3 months for 24 months";
  }

  /**
   * Format subscription variations for Hair products
   * @param {Object} product - The product object
   * @returns {Array} Formatted subscription variations
   */
  formatSubscriptionVariations(product) {
    const variations = product.getVariations();
    if (!variations || variations.length === 0) return [];

    const slug = product.getSlug();
    const frequencyLabel = this.getFrequencyLabel(slug);

    // Check if it's a special hair product (finasteride or minoxidil)
    const isMinoxidil = slug.includes("minoxidil");
    const isFinasteride = slug.includes("finasteride");
    const isSpecialHairProduct = isFinasteride || isMinoxidil;

    // Format variations according to display requirements
    let subscriptionOptions = [];

    if (isSpecialHairProduct && variations.length >= 1) {
      if (isMinoxidil) {
        // For minoxidil, we want to select the variation that matches the live site
        // Specifically we want the variation with the quarterly subscription at $101.25

        // First look for variations with quarterly subscription attribute
        let quarterlyVariations = variations.filter((v) => {
          const attrs = v.attributes || {};
          return Object.entries(attrs).some(
            ([key, value]) =>
              key.includes("subscription") &&
              (String(value).includes("quarterly") ||
                String(value).includes("3-month"))
          );
        });

        // If we found quarterly variations, sort by price (descending) and take the first
        if (quarterlyVariations.length > 0) {
          const variationToUse = quarterlyVariations.sort(
            (a, b) => b.display_price - a.display_price
          )[0];

          // Make sure we're using the sale price if it exists
          const price =
            variationToUse.display_regular_price &&
            variationToUse.display_price < variationToUse.display_regular_price
              ? variationToUse.display_price // This is the sale price
              : variationToUse.price || variationToUse.display_price;

          const singleOption = {
            id: variationToUse.variation_id.toString(),
            label: "every 3 months for 24 months",
            originalLabel: frequencyLabel,
            price: price,
            regularPrice: variationToUse.display_regular_price || null,
            variation_id: variationToUse.variation_id,
            isHairProduct: true,
          };
          subscriptionOptions = [singleOption];
        } else {
          // If we couldn't find a quarterly variation, look for the most expensive variation
          // This is a fallback that should match the pricing on the live site
          const variationToUse = [...variations].sort(
            (a, b) => b.display_price - a.display_price
          )[0];

          // Make sure we're using the sale price if it exists
          const price =
            variationToUse.display_regular_price &&
            variationToUse.display_price < variationToUse.display_regular_price
              ? variationToUse.display_price // This is the sale price
              : variationToUse.price || variationToUse.display_price;

          const singleOption = {
            id: variationToUse.variation_id.toString(),
            label: "every 3 months for 24 months",
            originalLabel: frequencyLabel,
            price: price,
            regularPrice: variationToUse.display_regular_price || null,
            variation_id: variationToUse.variation_id,
            isHairProduct: true,
          };
          subscriptionOptions = [singleOption];
        }
      } else {
        // For finasteride and other hair products, keep the existing logic
        const variationToUse = variations[0];

        // Make sure we're using the sale price if it exists
        const price =
          variationToUse.display_regular_price &&
          variationToUse.display_price < variationToUse.display_regular_price
            ? variationToUse.display_price // This is the sale price
            : variationToUse.price || variationToUse.display_price;

        const singleOption = {
          id: variationToUse.variation_id.toString(),
          label: "every 3 months for 24 months",
          originalLabel: frequencyLabel,
          price: price,
          regularPrice: variationToUse.display_regular_price || null,
          variation_id: variationToUse.variation_id,
          isHairProduct: true,
        };

        subscriptionOptions = [singleOption];
      }
    } else {
      // For other hair products, show all available variations
      subscriptionOptions = variations.map((variation) => {
        // Make sure we're using the sale price if it exists
        const price =
          variation.display_regular_price &&
          variation.display_price < variation.display_regular_price
            ? variation.display_price // This is the sale price
            : variation.price || variation.display_price;

        // Get the subscription type from attributes
        const subscriptionType =
          variation.attributes["attribute_pa_subscription-type"];

        // Determine the appropriate label based on subscription type
        let label;
        if (subscriptionType) {
          if (subscriptionType.includes("quarterly")) {
            label = "Quarterly Subscription";
          } else if (subscriptionType.includes("monthly")) {
            label = "Monthly Subscription";
          } else {
            label = "One Time Purchase";
          }
        } else {
          label = "One Time Purchase";
        }

        return {
          id: variation.variation_id.toString(),
          label: label,
          originalLabel: label, // Use the determined label as originalLabel
          price: price,
          regularPrice: variation.display_regular_price || null,
          variation_id: variation.variation_id,
          isHairProduct: true,
        };
      });
    }

    return subscriptionOptions;
  }

  /**
   * Get consultation link for Hair products
   * @returns {string} Consultation link
   */
  getConsultationLink() {
    return "/hair-main-questionnaire";
  }

  /**
   * Format data for display on product page
   * @returns {Object} Formatted data for Hair products
   */
  formatForProductDisplay() {
    const product = this.getProduct();
    const variationType = this.getVariationType();
    let variations = null;

    variations = this.formatSubscriptionVariations(product);

    return {
      product: product.getData(),
      productType: this.getProductType(),
      variationType: variationType,
      variations: variations,
      consultationLink: this.getConsultationLink(),
    };
  }
}

export default HairCategoryHandler;

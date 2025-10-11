/**
 * Hair Products Configuration Utility
 * Centralized configuration for Hair Flow and Hair Pre-Consultation
 */

import hairProductsData from "../config/hairProducts.json";

/**
 * Get all hair products for the Hair Flow page
 * @returns {Array} Array of hair products formatted for HairProductCard
 */
export const getHairFlowProducts = () => {
  const { hairProducts, flowProducts } = hairProductsData;

  return flowProducts.map((productId) => {
    const product = hairProducts[productId];

    return {
      id: product.id,
      variationId: product.id, // Use the ID as variation ID since they're now the same
      label: product.label,
      bestFor: product.bestFor,
      benefits: product.benefits,
      image: product.image,
      badge: product.badge,
      title: product.title,
      description: product.description,
      tooltip: product.tooltip,
      supply: product.supply,
      price: product.price,
      regularPrice: product.regularPrice,
      isSubscription: product.isSubscription,
      subscriptionPeriod: product.subscriptionPeriod,
      addToCartLink: `/login-register/?onboarding=1&view=account&viewshow=login&consultation-required=1&onboarding-add-to-cart=${
        product.baseProductId || product.id
      }`,
    };
  });
};

/**
 * Get hair product for consultation based on user's answer
 * @param {string} resultDesired - User's desired result from consultation
 * @returns {Object} Product object formatted for cart addition
 */
export const getConsultationProduct = (resultDesired) => {
  const { hairProducts, consultationMapping } = hairProductsData;
  const productId = consultationMapping[resultDesired];

  if (!productId) {
    throw new Error(`No product mapping found for result: ${resultDesired}`);
  }

  const product = hairProducts[productId];

  return {
    id: product.id,
    variationId: product.id, // Use the ID as variation ID since they're now the same
    name: product.name,
    title: product.title,
    image: product.consultationImage || product.image,
    price: product.price,
    frequency: product.frequency,
    pills: product.pills || "",
    quantity: product.quantity,
    subscriptionPeriod: product.subscriptionPeriod,
    isSubscription: product.isSubscription,
  };
};

/**
 * Get specific hair product by ID
 * @param {string} productId - Product ID
 * @returns {Object|null} Product object or null if not found
 */
export const getHairProductById = (productId) => {
  const { hairProducts } = hairProductsData;
  return hairProducts[productId] || null;
};

/**
 * Get all available consultation options
 * @returns {Array} Array of consultation option strings
 */
export const getConsultationOptions = () => {
  const { consultationMapping } = hairProductsData;
  return Object.keys(consultationMapping);
};

/**
 * Validate if a product ID exists in the configuration
 * @param {string} productId - Product ID to validate
 * @returns {boolean} True if product exists
 */
export const isValidHairProduct = (productId) => {
  const { hairProducts } = hairProductsData;
  return !!hairProducts[productId];
};

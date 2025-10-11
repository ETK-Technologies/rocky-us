/**
 * Utility functions for Zonnic product Quebec province validation
 */

/**
 * Check if a province is Quebec
 * @param {string} province - The province to check
 * @returns {boolean} - True if the province is Quebec
 */
export const isQuebecProvince = (province) => {
  if (!province) return false;

  // Check for various Quebec representations
  const quebecVariations = ["Quebec", "QC", "Québec", "quebec", "qc"];

  return quebecVariations.includes(province.trim());
};

/**
 * Check if cart contains Zonnic products
 * @param {Array} cartItems - Array of cart items
 * @returns {boolean} - True if cart contains Zonnic products
 */
export const hasZonnicProducts = (cartItems) => {
  if (!cartItems || !Array.isArray(cartItems)) {
    return false;
  }

  return cartItems.some((item) => {
    // Check if the product name contains "zonnic" (case insensitive)
    return (
      item &&
      item.name &&
      typeof item.name === "string" &&
      item.name.toLowerCase().includes("zonnic")
    );
  });
};

/**
 * Check if user can purchase Zonnic products based on province
 * @param {string} province - The user's province
 * @returns {boolean} - True if user can purchase Zonnic products
 */
export const canPurchaseZonnic = (province) => {
  return !isQuebecProvince(province);
};

/**
 * Get the Quebec restriction message
 * @returns {string} - The restriction message
 */
export const getQuebecRestrictionMessage = () => {
  return "Sorry, zonnic product is currently not available in your selected province.";
};

/**
 * Check if checkout should be blocked due to Quebec province and Zonnic products
 * @param {Array} cartItems - Array of cart items
 * @param {string} shippingProvince - The shipping province
 * @param {string} billingProvince - The billing province (fallback)
 * @returns {Object} - Object with blocked status and message
 */
export const checkQuebecZonnicRestriction = (
  cartItems,
  shippingProvince,
  billingProvince = null
) => {
  const hasZonnic = hasZonnicProducts(cartItems);
  const province = shippingProvince || billingProvince;
  const isQuebec = isQuebecProvince(province);

  return {
    blocked: hasZonnic && isQuebec,
    message: hasZonnic && isQuebec ? getQuebecRestrictionMessage() : null,
    hasZonnic,
    isQuebec,
    province,
  };
};

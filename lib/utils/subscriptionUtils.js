/**
 * Utility functions for handling subscription products
 */

/**
 * Checks if a product requires subscription (has forced subscription)
 * @param {Object} product - The product object from the API
 * @returns {Boolean} - True if the product requires subscription
 */
export const isForcedSubscriptionProduct = (product) => {
  if (!product || !product.meta_data) return false;

  // Find the _wcsatt_force_subscription metadata field
  const forcedSubscriptionMeta = product.meta_data.find(
    (meta) => meta.key === "_wcsatt_force_subscription" && meta.value === "yes"
  );

  return !!forcedSubscriptionMeta;
};

/**
 * Get subscription schemes from product metadata
 * @param {Object} product - The product object from the API
 * @returns {Array} - Array of subscription schemes or empty array
 */
export const getSubscriptionSchemes = (product) => {
  if (!product || !product.meta_data) return [];

  // Find the _wcsatt_schemes metadata field
  const schemesMeta = product.meta_data.find(
    (meta) => meta.key === "_wcsatt_schemes"
  );

  return schemesMeta?.value || [];
};

/**
 * Format subscription options for display
 * @param {Object} product - The product object
 * @param {Array} variations - The product variations
 * @returns {Array} - Formatted subscription options
 */
export const formatSubscriptionOptions = (product, variations) => {
  if (!isForcedSubscriptionProduct(product)) return variations;

  const schemes = getSubscriptionSchemes(product);
  if (!schemes.length) return variations;

  // Format the subscription options
  return schemes.map((scheme) => {
    const {
      subscription_period_interval,
      subscription_period,
      subscription_length,
      subscription_price,
      subscription_regular_price,
      subscription_sale_price,
    } = scheme;

    // Determine if there's a sale price
    const hasSale =
      subscription_sale_price &&
      Number(subscription_sale_price) < Number(subscription_regular_price);

    // Create a title based on subscription details
    let subscriptionTitle = "One Time Purchase";

    if (
      subscription_period_interval === "1" &&
      subscription_period === "month" &&
      subscription_length === "12"
    ) {
      subscriptionTitle = "Monthly Subscription";
    } else if (
      subscription_period_interval === "3" &&
      subscription_period === "month" &&
      subscription_length === "12"
    ) {
      subscriptionTitle = "Quarterly Subscription";
    }

    // Create the subscription option
    return {
      id: `${subscription_period_interval}_${subscription_period}_${subscription_length}`,
      label: subscriptionTitle,
      price: hasSale ? subscription_sale_price : subscription_price,
      regular_price: subscription_regular_price,
      sale_price: subscription_sale_price,
      isHairProduct: true,
      originalLabel: subscriptionTitle,
      // Include required data for cart
      variation_id:
        variations && variations.length > 0 ? variations[0].variation_id : null,
      attributes:
        variations && variations.length > 0 ? variations[0].attributes : {},
    };
  });
};

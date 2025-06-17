/**
 * Product Adapters
 * Transforms model data into formats expected by UI components
 */

/**
 * Adapts product data for ProductClient component
 * @param {Object} product - Product model instance
 * @param {Object} categoryHandler - Category handler instance
 * @param {Object} variationManager - Variation manager instance
 * @returns {Object} Data formatted for ProductClient component
 */
export function adaptForProductClient(
  product,
  categoryHandler,
  variationManager
) {
  if (!product || !categoryHandler || !variationManager) {
    return {
      product: {},
      productType: null,
      variationType: null,
      variations: null,
    };
  }

  const productType = categoryHandler.getProductType();
  const variationType = variationManager.getVariationType();
  const variations = variationManager.formatVariations();

  return {
    product: product.getData(),
    productType,
    variationType,
    variations,
    consultationLink: categoryHandler.getConsultationLink(),
  };
}

/**
 * Adapts product data for ProductPage component
 * @param {Object} product - Product model instance
 * @param {Object} categoryHandler - Category handler instance
 * @param {Object} variationManager - Variation manager instance
 * @returns {Object} Data formatted for ProductPage component
 */
export function adaptForProductPage(
  product,
  categoryHandler,
  variationManager
) {
  const clientProps = adaptForProductClient(
    product,
    categoryHandler,
    variationManager
  );
  const faqs = product.getFormattedFaqs();

  return {
    clientProps,
    faqs,
  };
}

/**
 * Creates data for "You may also like" related products section
 * @param {Array} relatedProducts - Array of related product data
 * @returns {Array} Formatted related products data
 */
export function adaptRelatedProducts(relatedProducts) {
  if (!relatedProducts || !Array.isArray(relatedProducts)) return [];

  return relatedProducts.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    imageUrl: product.images?.[0]?.src || "",
    shortDescription: product.short_description || "",
  }));
}

export default {
  adaptForProductClient,
  adaptForProductPage,
  adaptRelatedProducts,
};

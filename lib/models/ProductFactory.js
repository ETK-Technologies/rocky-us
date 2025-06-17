/**
 * Product Factory
 * Factory for creating product models based on WooCommerce product type
 */
import ProductBase from "./products/ProductBase";
import SimpleProduct from "./products/SimpleProduct";
import VariableProduct from "./products/VariableProduct";
import ProductBundle from "./products/ProductBundle";
import VariableSubscription from "./products/VariableSubscription";

/**
 * Creates a product model based on WooCommerce product data
 * @param {Object} productData - Raw WooCommerce product data
 * @returns {ProductBase} - The appropriate product model instance
 */
export function createProduct(productData) {
  if (!productData) return new ProductBase({});

  // Determine product type based on WooCommerce data
  const type = productData.type || "";

  // Check if product has variations
  const hasVariations = productData.variations?.length > 0 || false;

  // Check if product is a bundle
  const isBundle = productData.is_bundle || false;

  // Check if product is a subscription
  const isSubscription =
    productData.is_subscription ||
    (productData.subscriptions && productData.subscriptions.length > 0) ||
    false;

  // Create the appropriate product model
  if (isBundle) {
    return new ProductBundle(productData);
  } else if (isSubscription && hasVariations) {
    return new VariableSubscription(productData);
  } else if (hasVariations) {
    return new VariableProduct(productData);
  } else {
    return new SimpleProduct(productData);
  }
}

export default createProduct;

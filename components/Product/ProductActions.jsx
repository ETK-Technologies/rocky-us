"use client";

import { useState } from "react";
import Link from "next/link";
import CartPopup from "../Cart/CartPopup";
import { addItemToCart } from "@/lib/cart/cartService";

const ProductActions = ({
  price = 90,
  selectedVariationPrice = null,
  productType = null,
  product = null,
  selectedVariation = null,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);

  // Use the selectedVariationPrice if available, otherwise fall back to the default price
  const displayPrice =
    selectedVariationPrice !== null ? selectedVariationPrice : price;

  // Check if there's a sale price available
  const hasSalePrice =
    selectedVariation &&
    selectedVariation.sale_price &&
    Number(selectedVariation.sale_price) <
      Number(selectedVariation.regular_price);

  // If there's a sale price, use it, otherwise use the regular price
  const finalPrice = hasSalePrice
    ? Number(selectedVariation.sale_price)
    : displayPrice;

  // Format price to always show 2 decimal places
  const formatPrice = (value) => {
    if (typeof value !== "number") {
      value = parseFloat(value) || 0;
    }
    return value.toFixed(2);
  };

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);

      if (!product || !product.id) {
        console.error("No product ID available for adding to cart");
        return;
      }

      // Make sure we have the correct product image URL
      const productImageUrl =
        product.images && product.images.length > 0
          ? product.images[0].src
          : product.image || "";

      console.log("Adding product to cart with details:", {
        id: product.id,
        name: product.name,
        price: finalPrice,
        image: productImageUrl,
      });

      // Prepare data for the cart addition with complete product details
      const cartData = {
        productId: product.id,
        quantity: 1,
        name: product.name || "Product",
        price: finalPrice,
        // Include product image if available - with fallback options
        image: productImageUrl,
        // Include product type
        product_type: product.type || "",
      };

      // Add variation information if selected
      if (selectedVariation) {
        cartData.variationId = selectedVariation.variation_id;

        // Add variation attributes for display
        if (selectedVariation.attributes) {
          cartData.variation = Object.entries(selectedVariation.attributes).map(
            ([name, value]) => ({
              name: name.replace("attribute_", "").replace("pa_", ""),
              value: value,
            })
          );
        }

        // Special handling for variable products where the variation ID should be used as product ID
        const isVariableProduct =
          product.type === "variable" ||
          product.type === "variable-subscription";

        // For variable products that aren't being converted to subscriptions,
        // use the variation ID as the product ID
        if (isVariableProduct && !cartData.convertToSub) {
          console.log(
            `Variable product detected, using variation ID ${
              selectedVariation.variation_id
            } as productId for ${product.name || product.id}`
          );
          cartData.productId = selectedVariation.variation_id;
        }
      }

      // Use the cart service instead of direct API call
      await addItemToCart(cartData);

      // Refresh the cart in the navbar
      document.getElementById("cart-refresher")?.click();

      // Show the cart popup on success
      setShowCartPopup(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Error adding to cart: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Create button text with sale price if available
  const buttonText = `$${formatPrice(finalPrice)} Add to Cart`;

  // For displaying regular price strikethrough when on sale
  const regularPriceDisplay = hasSalePrice ? (
    <span className="text-gray-500 line-through text-sm ml-2">
      ${formatPrice(selectedVariation.regular_price)}
    </span>
  ) : null;

  return (
    <div>
      <button
        onClick={handleAddToCart}
        disabled={isLoading}
        className="w-full bg-black text-white py-[12px] px-4 text-base rounded-full hover:bg-gray-900 transition-colors duration-200 font-medium"
      >
        {isLoading ? "Adding to Cart..." : buttonText}
        {regularPriceDisplay}
      </button>

      <p className="text-gray-500 text-xs mt-2 text-center">
        *Only available if prescribed after an online consultation with a
        healthcare provider.
      </p>

      {/* Cart Popup */}
      <CartPopup
        isOpen={showCartPopup}
        onClose={() => setShowCartPopup(false)}
        productType={productType}
      />
    </div>
  );
};

export default ProductActions;

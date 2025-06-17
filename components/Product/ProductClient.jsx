"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ProductInfo from "./ProductInfo";
import ProductVariations from "./ProductVariations";
import ProductActions from "./ProductActions";
import { VARIATION_TYPES, PRODUCT_TYPES } from "@/lib/constants/productTypes";

const ProductClient = ({ product, productType, variationType, variations }) => {
  console.log(product);
  // Initialize with the first variation price if available
  const initialVariation =
    Array.isArray(variations) && variations.length > 0 ? variations[0] : null;
  const initialPrice = initialVariation?.price || product?.price || 90;

  // Use a single state for price, initialized with the correct initial price
  const [variationPrice, setVariationPrice] = useState(initialPrice);

  // Track the selected variation, initialized with the first variation if available
  const [selectedVariation, setSelectedVariation] = useState(initialVariation);

  // Format description for lidocaine products if needed
  useEffect(() => {
    if (
      product?.name?.toLowerCase().includes("lidocaine") &&
      !product.short_description
    ) {
      // If lidocaine product doesn't have a short description, use the full description
      product.short_description = product.description;
    }
  }, [product]);

  // Set initial variation on component mount
  useEffect(() => {
    if (initialVariation) {
      setSelectedVariation(initialVariation);
      setVariationPrice(initialPrice);
    }
  }, [initialVariation, initialPrice]);

  // Variation change handler
  const handleVariationChange = (variationData) => {
    // Skip if no data is provided
    if (!variationData) return;

    // Update price based on variation type
    if (variationData.subscription) {
      setVariationPrice(variationData.subscription.price);
      setSelectedVariation(variationData.subscription);
    } else if (variationData.quantity) {
      setVariationPrice(variationData.quantity.price);
      setSelectedVariation(variationData.quantity);
    }
  };

  // Customize the consultation link based on product type
  const getConsultationLink = () => {
    if (productType === PRODUCT_TYPES.HAIR) {
      return "/hair-main-questionnaire";
    }
    return "/consultation";
  };

  // Check if variations contain hair product indicators
  const isHairProductVariation =
    Array.isArray(variations) &&
    variations.length > 0 &&
    variations[0].isHairProduct;

  return (
    <div className="flex flex-col space-y-6 w-full max-w-md">
      <ProductInfo
        name={product?.name || ""}
        description={product?.short_description || product?.description || ""}
      />

      {variationType !== VARIATION_TYPES.SIMPLE && (
        <ProductVariations
          type={variationType}
          variations={variations}
          productType={productType}
          onVariationChange={handleVariationChange}
          product={product} // Pass entire product object for subscription detection
        />
      )}

      <ProductActions
        price={product?.price || 90}
        selectedVariationPrice={variationPrice}
        productType={productType}
        product={product}
        selectedVariation={selectedVariation}
      />

      <div className="w-full flex justify-center mx-auto my-4 border border-[#E2E2E1] rounded-lg py-2 px-4">
        <img
          loading="lazy"
          src="/OCP-IMGS.webp"
          alt="Logos"
          className="max-w-[240px] max-h-[40px] lg:max-w-[320px] lg:max-h-[48px]"
        />
      </div>
    </div>
  );
};

export default ProductClient;

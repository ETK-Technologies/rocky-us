"use client";

import { useState } from "react";
import Link from "next/link";
import CustomImage from "../utils/CustomImage";
import { FaCheckCircle } from "react-icons/fa";

const RecommendCard = ({ product }) => {
  // Extract product data with fallbacks (updated for new API structure)
  const productName = product?.name || "Product";
  const productImage = product?.images?.[0]?.src || "/supplements/product.png";
  const productPrice = product?.price || "0.00";
  const productSlug = product?.slug;
  const productLink = productSlug ? `/product/${productSlug}` : "#";

  // Extract key benefits from product metadata (updated for new structure)
  const getProductBenefits = () => {
    const metaData = product?.meta_data;

    if (!metaData) {
      return ["Premium Quality", "Doctor-Backed Formula", "Made in Canada"];
    }

    const benefits = [];

    // Look for benefit fields in metadata
    for (let i = 1; i <= 4; i++) {
      const benefitKey = `key_benefits_0_benefit_${i}`;
      const benefitMeta = metaData.find((meta) => meta.key === benefitKey);
      if (benefitMeta && benefitMeta.value && benefitMeta.value.trim()) {
        benefits.push(benefitMeta.value);
      }
    }

    // Limit to 3 benefits for card display
    const limitedBenefits = benefits.slice(0, 3);

    // Fallback to default benefits if none found
    if (limitedBenefits.length === 0) {
      return ["Premium Quality", "Doctor-Backed Formula", "Made in Canada"];
    }

    // Pad with default benefits if we have less than 3
    while (limitedBenefits.length < 3) {
      const defaults = [
        "Premium Quality",
        "Doctor-Backed Formula",
        "Made in Canada",
      ];
      const nextDefault = defaults[limitedBenefits.length];
      if (nextDefault && !limitedBenefits.includes(nextDefault)) {
        limitedBenefits.push(nextDefault);
      } else {
        break;
      }
    }

    return limitedBenefits;
  };

  const productDescription = getProductBenefits();

  return (
    <div className="bg-[#F6F6F5] relative rounded-2xl p-6 border-[0.5px] border-[#E2E2E1] w-[280px] h-[480px] flex-shrink-0 flex flex-col">
      <div className="text-center">
        <CustomImage
          src={productImage}
          width={200}
          height={200}
          className="w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] rounded-full mx-auto mb-[16px]"
          alt={productName}
        />
      </div>

      <h2 className="font-[550] headers-font  text-[17px] lg:text-[20px] leading-[110%] tracking-[-2%] mb-[16px]">
        {productName}
      </h2>

      {/* Description - flex-grow to take up available space */}
      <div className="mb-[24px] flex-grow">
        {productDescription.map((desc, index) => (
          <div
            key={index}
            className="flex gap-[8px] justify-start items-center mb-2"
          >
            <FaCheckCircle className="text-[#AE7E56] text-[14px] flex-shrink-0" />
            <div>
              <span className="font-[POPPINS] text-[14px]">{desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* View Product Button - always at bottom */}
      <Link
        href={productLink}
        className="bg-white absolute mx-auto left-[5%] w-[90%] bottom-[15px]  p-3 rounded-full flex justify-between hover:bg-gray-50 transition-colors"
      >
        <span className="font-[POPPINS] font-semibold text-[14px] lg:text-[16px] text-[#000000]">
          View
        </span>
        <span className="font-[POPPINS] font-semibold text-[14px] lg:text-[16px] text-[#000000]">
          $
          {typeof productPrice === "number"
            ? productPrice.toFixed(2)
            : productPrice}
        </span>
      </Link>
    </div>
  );
};

export default RecommendCard;

"use client";

import { useRef } from "react";
import ScrollArrows from "../ScrollArrows";
import HairProductCard from "./HairProductCard";
import { getHairFlowProducts } from "../../utils/hairProductsConfig";

// Get products from centralized configuration
const products = getHairFlowProducts();

const HairProducts = ({ pageType }) => {
  const scrollContainerRef = useRef(null);

  return (
    <>
      <div className="text-start mb-[23px] md:mb-[31px]">
        <h2 className="text-[32px] md:text-[48px] leading-[36.8px] md:leading-[53.52px] font-[550] tracking-[-0.01em] md:tracking-[-0.02em] headers-font mb-23 md:mb-[16px]">
          Choose Your Plan
        </h2>
        <p className="text-[18px] md:text-[20px] leading-[25.2px] md:leading-[30px] font-[400] ">
          Pause or cancel at any time
        </p>
      </div>
      <div className="overflow-x-auto !no-scrollbar relative">
        <div className=" mx-auto ">
          <div className="relative">
            <ScrollArrows scrollContainerRef={scrollContainerRef} />

            <div
              ref={scrollContainerRef}
              className="flex gap-2 md:gap-4 items-start overflow-x-auto snap-x snap-mandatory no-scrollbar"
            >
              {products.map((product, index) => (
                <HairProductCard key={index} {...product} pageType={pageType} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HairProducts;

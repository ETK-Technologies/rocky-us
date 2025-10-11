"use client";
import CustomImage from "@/components/utils/CustomImage";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import CustomContainImage from "./CustomContainImage";
import BrimaryButton from "../ui/buttons/BrimaryButton";

const ProductCards = ({ cards }) => {
  return (
    <div className=" flex gap-4 flex-nowrap ">
      {/* Leading Product Card */}
      <div
        className={`relative w-[240px] md:w-[384px] h-[328px] md:h-[512px] p-4 md:p-6 rounded-2xl overflow-hidden ${cards.LeadingProductCard.image} bg-cover bg-center`}
      >
        <div className="absolute w-full h-full top-0 left-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0.8)_0%,_rgba(0,0,0,0)_31.98%)] z-10"></div>
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20 max-w-[208px] md:max-w-[264px]">
          <h2 className="text-[14px] md:text-[16px] leading-[14px] md:leading-[16px] mb-2 md:mb-3 text-[#FFFFFF]">
            {cards.LeadingProductCard.title}
          </h2>
          <p className="text-[22px] md:text-[30px] leading-[25.3px] md:leading-[33px] md:tracking-[-0.02em] font-[450] text-[#FFFFFF] headers-font text-wrap">
            {cards.LeadingProductCard.subtitle}
          </p>
        </div>

        <BrimaryButton href={cards.LeadingProductCard.link} arrowIcon={true}
          className="absolute z-30 bottom-4 md:bottom-6 text-[14px] leading-[19.6px] text-black py-[12px] text-center h-[44px] flex items-center justify-center gap-2 bg-[#FFFFFF] w-[208px] md:w-[336px] rounded-[64px]">Learn More</BrimaryButton>
      </div>

      {/* Product Cards */}
      {cards.ProductCard.map((product, index) => (
        <div
          key={index}
          className="z-50 w-[240px] md:w-[384px] h-[328px] md:h-[512px] rounded-2xl overflow-hidden bg-[#EBE7E4] md:shadow-[0px_1px_1px_0px_#E2E2E1] md:border-[0.5px] md:border-solid md:border-[#E2E2E1] md:bg-[linear-gradient(#FFFFFF_0%,#F3F2ED_100%)]"
        >
          <div className="relative rounded-2xl overflow-hidden w-full h-full p-4 md:p-6">
            <CustomContainImage
              src={product.image}
              alt={product.title}
              className="!w-[208px] !h-[165px] md:!w-[336px] md:!h-[252px] object-contain !top-2/4 !-translate-y-2/4 !-translate-x-2/4 !left-2/4"
              fill
            />
            <div className="absolute top-4 left-4 md:top-6 md:left-6">
              <h2 className="text-[18px] md:text-[24px] leading-[20.7px] md:leading-[27.6px] mb-[4px] md:mb-2 text-wrap">
                {product.title}
              </h2>
              {product.description && (
                <p className="text-[14px] leading-[19.6px] font-[400] text-[#212121]">
                  {product.description}
                </p>
              )}
            </div>
            {product.note && (
              <p className="absolute -translate-x-2/4 w-full text-center left-2/4 bottom-[62px] md:bottom-20 text-[12px] text-[#212121]">
                {product.note}
              </p>
            )}
            <BrimaryButton href={product.link}
              className="absolute bottom-4 md:bottom-6 text-[14px] leading-[19.6px] text-[#FFFFFF] py-[12px] text-center h-[44px] flex items-center justify-center bg-black w-[208px] md:w-[336px] rounded-[64px]"
            > {product.bottonName || "Buy Now"}</BrimaryButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;

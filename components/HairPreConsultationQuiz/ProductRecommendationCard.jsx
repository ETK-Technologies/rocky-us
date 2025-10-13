import React from "react";
import Image from "next/image";

const ProductRecommendationCard = ({ product, onAddToCart, isLoading }) => {
  console.log(product);
  return (
    <div className="bg-white rounded-lg shadow-lg  mx-auto w-[335px] ">
      {/* Recommended Banner */}
      <div className="bg-[#AE7E56] text-white text-center w-full py-[2px] px-[8px] rounded-t-2xl  -mt-6 mb-4v h-[25px]">
        <span className="text-xs font-normal">Recommended</span>
      </div>
        <div className="p-6 h-[409px] w-[335px] flex flex-col items-center rounded-2xl ">
      {/* Rating and Trustpilot */}
      <div className="flex justify-between items-center mb-4 w-[220px] h-[20px]">
        <div className="text-black text-[12px] font-medium">
            <span className="font-medium">4.4 out of 5 • Excellent</span>
        </div>
       <Image src="/hair-consultation/trust.png" alt="trustpilot" width={74} height={18} />
      </div>

      {/* Product Image and Guarantee Badge */}
      <div className="relative flex justify-center items-center mb-4 w-full h-[189px]"> 
            <div className="absolute left-[7px] top-0 z-10"> 
         <Image src="/hair-consultation/badge.png" alt="guarantee" width={72} height={72} />
        </div>
        

        {/* Product Image */}
        <div className="flex justify-center items-center w-[200px] h-[140px]">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>
      </div> 

      {/* Product Information */}
      <div className="text-center ">
        {/* Product Name */}
        <h3 className="text-[16px] font-medium leading-[140%] tracking-[0%] text-black mb-[2px]">
          {product.pills}
          </h3>
        <p className="text-[12px] font-normal leading-[140%] tracking-[0%] text-[#212121] mb-2">
          {product.title}
        </p>
        <p className="text-[16px] font-medium leading-[140%] tracking-[0%] text-black mb-3">
          ${product.price}
          </p>
        {/* Product Description */}
          <p className="text-[#212121] text-[14px] font-normal leading-[140%] tracking-[0%] mb-3">
          A 2 in 1 topical foam combining Health Canada Approved ingredients to help prevent hair loss and regrow hair.
          </p>
          <div className="w-full ">
            <span className="w-[116px] px-[8px] text-[12px] font-normal leading-[140%] tracking-[0%] text-[#098C60] bg-[#F7F7F7] rounded-full py-[2px] text-center">Supply available</span>
          </div>
      </div> 
    </div>
    </div>
  );
};

export default ProductRecommendationCard;

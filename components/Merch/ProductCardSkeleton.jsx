import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="cursor-pointer h-full flex flex-col w-full md:w-[378px] items-center">
      {/* Product Image Skeleton */}
   
      {/* Product Info Skeleton */}
      <div className="w-full">
        <div className="text-center mb-4">
          {/* Product Name Skeleton */}
          <div className="h-6 bg-gray-200 rounded mb-2 w-3/4 mx-auto animate-pulse"></div>
          {/* Price Skeleton */}
          <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto animate-pulse"></div>
        </div>

        {/* Button Skeleton */}
        <div className="w-full h-[48px] bg-gray-200 border border-gray-300 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;

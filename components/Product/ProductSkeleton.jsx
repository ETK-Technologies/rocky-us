"use client";

const ProductSkeleton = () => {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Product Image Skeleton */}
          <div className="flex justify-center">
            <div className="w-full max-w-md rounded-lg overflow-hidden bg-gray-200 aspect-square animate-pulse"></div>
          </div>

          {/* Product Info Skeleton */}
          <div className="flex justify-center lg:justify-start">
            <div className="flex flex-col space-y-6 max-w-md w-full">
              {/* Title */}
              <div className="h-8 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded-lg w-1/4 animate-pulse"></div>

              {/* Description */}
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>

              {/* Button */}
              <div className="h-12 bg-gray-200 rounded-full w-full animate-pulse"></div>

              {/* Logo section */}
              <div className="w-full h-[40px] mt-4 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;

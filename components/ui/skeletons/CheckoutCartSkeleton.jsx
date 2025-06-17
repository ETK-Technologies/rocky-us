import React from "react";
import Skeleton from "./Skeleton";

const CheckoutCartSkeleton = () => {
  return (
    <div className="bg-[#f7f7f7] h-full justify-self-start w-full px-4 mt-8 lg:mt-0 lg:pl-[80px] lg:pt-[50px] pb-10">
      {/* Your Order title (hidden on mobile) */}
      <Skeleton className="hidden lg:block w-[120px] h-[24px] mb-[24px]" />

      {/* Cart items container */}
      <div className="bg-white w-full lg:max-w-[512px] p-4 md:p-6 py-0 md:py-0 rounded-[16px] shadow-[0px_1px_1px_0px_#E2E2E1] border border-[#E2E2E1] mt-8 lg:mt-0">
        {/* Cart items */}
        <div className="py-6 border-b border-[#E2E2E1]">
          {/* Cart item 1 */}
          <div className="flex gap-4 mb-6">
            <Skeleton className="w-[70px] h-[70px] rounded-[8px]" />
            <div className="flex-1">
              <Skeleton className="w-[180px] h-[20px] mb-2" />
              <Skeleton className="w-[100px] h-[16px] mb-2" />
              <div className="flex justify-between">
                <Skeleton className="w-[60px] h-[16px]" />
                <Skeleton className="w-[60px] h-[16px]" />
              </div>
            </div>
          </div>

          {/* Cart item 2 */}
          <div className="flex gap-4">
            <Skeleton className="w-[70px] h-[70px] rounded-[8px]" />
            <div className="flex-1">
              <Skeleton className="w-[150px] h-[20px] mb-2" />
              <Skeleton className="w-[100px] h-[16px] mb-2" />
              <div className="flex justify-between">
                <Skeleton className="w-[60px] h-[16px]" />
                <Skeleton className="w-[60px] h-[16px]" />
              </div>
            </div>
          </div>
        </div>

        {/* Coupon section */}
        <div className="py-4 border-b border-[#E2E2E1]">
          <div className="flex items-center gap-2 mb-3">
            <Skeleton className="w-[140px] h-[18px]" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="flex-1 h-[44px] rounded-[8px]" />
            <Skeleton className="w-[100px] h-[44px] rounded-[8px]" />
          </div>
        </div>

        {/* Order summary */}
        <div className="py-4">
          <div className="flex justify-between mb-3">
            <Skeleton className="w-[80px] h-[16px]" />
            <Skeleton className="w-[60px] h-[16px]" />
          </div>
          <div className="flex justify-between mb-3">
            <Skeleton className="w-[100px] h-[16px]" />
            <Skeleton className="w-[60px] h-[16px]" />
          </div>
          <div className="flex justify-between mb-3">
            <Skeleton className="w-[120px] h-[16px]" />
            <Skeleton className="w-[60px] h-[16px]" />
          </div>
          <div className="flex justify-between mb-3">
            <Skeleton className="w-[100px] h-[20px] font-bold" />
            <Skeleton className="w-[70px] h-[20px] font-bold" />
          </div>
        </div>
      </div>

      {/* Payment section */}
      <div className="mt-8 bg-white w-full lg:max-w-[512px] p-4 md:p-6 rounded-[16px] shadow-[0px_1px_1px_0px_#E2E2E1] border border-[#E2E2E1]">
        <Skeleton className="w-[150px] h-[24px] mb-[16px]" />

        {/* Credit card field */}
        <Skeleton className="w-full h-[24px] mb-2" />
        <Skeleton className="w-full h-[44px] mb-6 rounded-[8px]" />

        {/* Expiry and CVC */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Skeleton className="w-full h-[24px] mb-2" />
            <Skeleton className="w-full h-[44px] rounded-[8px]" />
          </div>
          <div>
            <Skeleton className="w-full h-[24px] mb-2" />
            <Skeleton className="w-full h-[44px] rounded-[8px]" />
          </div>
        </div>
      </div>

      {/* Place order button */}
      <Skeleton className="h-[44px] rounded-full w-full lg:max-w-[512px] mt-6" />
    </div>
  );
};

export default CheckoutCartSkeleton;

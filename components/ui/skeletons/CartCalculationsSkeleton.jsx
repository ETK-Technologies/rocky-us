import React from "react";
import Skeleton from "./Skeleton";

const CartCalculationsSkeleton = () => {
  return (
    <div className="bg-[#f7f7f7] h-full justify-self-start w-full px-4 mt-8 lg:mt-0 lg:pl-[80px] lg:pt-[50px] pb-10">
      <div className="bg-white lg:w-[384px] p-4 md:p-6 rounded-[16px] shadow-[0px_1px_1px_0px_#E2E2E1] border border-[#E2E2E1] mt-8 lg:mt-0">
        {/* Cart Totals title */}
        <Skeleton className="w-[120px] h-[24px] mb-[12px]" />

        {/* Coupon section */}
        <div className="py-4 border-b border-[#E2E2E1] mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Skeleton className="w-[140px] h-[18px]" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="flex-1 h-[44px] rounded-[8px]" />
            <Skeleton className="w-[100px] h-[44px] rounded-[8px]" />
          </div>
        </div>

        {/* Subtotal */}
        <div className="flex justify-between items-start py-[6px] md:py-0 mb-3">
          <Skeleton className="w-[80px] h-[16px]" />
          <Skeleton className="w-[60px] h-[16px]" />
        </div>

        {/* Shipping */}
        <div className="flex justify-between items-start mb-3 mt-2">
          <Skeleton className="w-[80px] h-[16px]" />
          <div className="flex flex-col items-end gap-[2px]">
            <Skeleton className="w-[100px] h-[16px]" />
          </div>
        </div>

        {/* Tax */}
        <div className="flex justify-between items-start mb-3">
          <Skeleton className="w-[50px] h-[16px]" />
          <Skeleton className="w-[60px] h-[16px]" />
        </div>

        {/* Total */}
        <div className="flex justify-between items-start mb-6">
          <Skeleton className="w-[50px] h-[20px]" />
          <Skeleton className="w-[70px] h-[20px]" />
        </div>

        {/* Recurring totals section (if applicable) */}
        <Skeleton className="w-[170px] h-[24px] mb-[12px]" />
        <div className="border-b border-[#E2E2E1] mb-4"></div>

        {/* Recurring Subtotal */}
        <div className="flex justify-between items-start py-[6px] md:py-0 mb-3">
          <Skeleton className="w-[80px] h-[16px]" />
          <Skeleton className="w-[60px] h-[16px]" />
        </div>

        {/* Recurring Shipping */}
        <div className="flex justify-between items-start mb-3 mt-2">
          <Skeleton className="w-[80px] h-[16px]" />
          <Skeleton className="w-[100px] h-[16px]" />
        </div>

        {/* Recurring Tax */}
        <div className="flex justify-between items-start mb-3">
          <Skeleton className="w-[50px] h-[16px]" />
          <Skeleton className="w-[60px] h-[16px]" />
        </div>

        {/* Recurring Total */}
        <div className="flex justify-between items-start mb-[24px]">
          <Skeleton className="w-[120px] h-[20px]" />
          <Skeleton className="w-[70px] h-[20px]" />
        </div>

        {/* Proceed to checkout button */}
        <Skeleton className="w-full h-[52px] rounded-[64px]" />
      </div>
    </div>
  );
};

export default CartCalculationsSkeleton;

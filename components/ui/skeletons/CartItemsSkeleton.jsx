import React from "react";
import Skeleton from "./Skeleton";

const CartItemsSkeleton = () => {
  return (
    <div className="w-full lg:max-w-[640px] h-full justify-self-end px-4 mt-8 lg:mt-0 lg:pr-[80px] lg:pt-[50px]">
      {/* Cart title */}
      <Skeleton className="w-[150px] h-[32px] mb-[16px]" />

      {/* Cart headers (hidden on mobile) */}
      <div className="hidden md:grid grid-cols-4 items-center justify-between border-b border-[#E2E2E1] py-4 pl-8 text-[12px] font-[500] pr-[16px]">
        <Skeleton className="col-span-2 h-[16px] w-[80px]" />
        <Skeleton className="justify-self-end h-[16px] w-[70px]" />
        <Skeleton className="justify-self-end h-[16px] w-[50px]" />
      </div>

      {/* Cart items */}
      {[1, 2, 3].map((item) => (
        <div key={item} className="border-b border-[#E2E2E1]">
          <div className="grid grid-cols-4 md:items-center justify-between py-4 md:py-[24px] md:pr-[16px]">
            <div className="flex items-center gap-[14px] col-span-3 md:col-span-2">
              <Skeleton className="w-[20px] h-[20px] rounded-full" />
              <div className="flex items-center gap-3">
                <Skeleton className="min-w-[70px] min-h-[70px] rounded-[12px]" />
                <div>
                  <Skeleton className="w-[150px] h-[20px] mb-[8px]" />
                  <Skeleton className="w-[80px] h-[16px]" />
                </div>
              </div>
            </div>

            <Skeleton className="justify-self-end w-[104px] h-[40px] rounded-full" />
            <Skeleton className="w-[60px] h-[20px] justify-self-end" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItemsSkeleton;

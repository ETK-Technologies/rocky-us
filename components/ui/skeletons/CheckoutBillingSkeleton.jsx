import React from "react";
import Skeleton from "./Skeleton";

const CheckoutBillingSkeleton = () => {
  return (
    <div className="w-full lg:max-w-[640px] h-full justify-self-end px-4 mt-8 lg:mt-0 lg:pr-[80px] lg:pt-[50px]">
      {/* Back button */}
      <div className="pb-[16px] md:pb-[32px]">
        <div className="flex gap-[8px] items-center w-fit">
          <Skeleton className="w-[32px] h-[32px] md:w-[40px] md:h-[40px] rounded-full" />
          <Skeleton className="w-[80px] h-[20px]" />
        </div>
      </div>

      {/* Checkout title */}
      <Skeleton className="w-[150px] h-[32px] mb-[16px]" />

      {/* Billing details title */}
      <Skeleton className="w-[120px] h-[24px] mb-[16px] md:mb-[40px]" />

      {/* Billing form container */}
      <div className="p-4 md:p-6 lg:w-[512px] rounded-[16px] border border-solid border-[#E2E2E1] mb-4">
        {/* Billing form fields */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Skeleton className="h-[24px] w-full col-span-2 mb-1" />
          <Skeleton className="h-[48px] w-full col-span-1" />
          <Skeleton className="h-[48px] w-full col-span-1" />

          <Skeleton className="h-[24px] w-full col-span-2 mb-1 mt-4" />
          <Skeleton className="h-[48px] w-full col-span-2" />

          <Skeleton className="h-[24px] w-full col-span-2 mb-1 mt-4" />
          <Skeleton className="h-[48px] w-full col-span-2" />

          <Skeleton className="h-[24px] w-full col-span-2 mb-1 mt-4" />
          <Skeleton className="h-[48px] w-full col-span-1" />
          <Skeleton className="h-[48px] w-full col-span-1" />

          <Skeleton className="h-[24px] w-full col-span-2 mb-1 mt-4" />
          <Skeleton className="h-[48px] w-full col-span-2" />
        </div>

        {/* Shipping address checkbox */}
        <div className="mt-8 mb-6">
          <Skeleton className="h-[24px] w-[200px] mb-4" />
          <Skeleton className="h-[24px] w-[240px] mb-2" />
        </div>

        {/* Order notes */}
        <div className="mt-8">
          <Skeleton className="h-[24px] w-[120px] mb-4" />
          <Skeleton className="h-[100px] w-full" />
        </div>

        {/* Delivery options */}
        <div className="mt-8">
          <Skeleton className="h-[24px] w-[150px] mb-4" />
          <div className="flex items-center gap-2 mb-3">
            <Skeleton className="h-[20px] w-[20px] rounded" />
            <Skeleton className="h-[20px] w-[180px]" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-[20px] w-[20px] rounded" />
            <Skeleton className="h-[20px] w-[220px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutBillingSkeleton;

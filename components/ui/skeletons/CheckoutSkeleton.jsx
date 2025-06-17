import React from "react";
import CheckoutBillingSkeleton from "./CheckoutBillingSkeleton";
import CheckoutCartSkeleton from "./CheckoutCartSkeleton";

const CheckoutSkeleton = () => {
  return (
    <div className="grid lg:grid-cols-2 min-h-[calc(100vh-100px)] border-t">
      <CheckoutBillingSkeleton />
      <CheckoutCartSkeleton />
    </div>
  );
};

export default CheckoutSkeleton;

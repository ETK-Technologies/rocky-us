import React from "react";
import CartItemsSkeleton from "./CartItemsSkeleton";
import CartCalculationsSkeleton from "./CartCalculationsSkeleton";

const CartSkeleton = () => {
  return (
    <div className="grid lg:grid-cols-2 min-h-[calc(100vh-100px)] border-t">
      <CartItemsSkeleton />
      <CartCalculationsSkeleton />
    </div>
  );
};

export default CartSkeleton;

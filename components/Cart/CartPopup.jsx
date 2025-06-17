"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const CartPopup = ({ isOpen, onClose, productType }) => {
  if (!isOpen) return null;

  // Determine the correct checkout URL based on product type
  const getCheckoutUrl = () => {
    if (productType === "hair") {
      return "/checkout?hair-flow=1";
    } else if (productType === "ed") {
      return "/checkout?ed-flow=1";
    } else {
      return "/checkout";
    }
  };

  const checkoutUrl = getCheckoutUrl();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <span className="text-xl font-bold">&times;</span>
        </button>

        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Item Added to Cart</h3>
          <p className="text-gray-600 mb-6">
            Your item has been added to your cart successfully.
          </p>

          <div className="flex flex-col space-y-3">
            <Link href={checkoutUrl} className="w-full">
              <button className="w-full bg-black text-white py-2.5 px-4 rounded-full hover:bg-gray-900 transition-colors">
                Proceed to Checkout
              </button>
            </Link>

            <button
              onClick={onClose}
              className="w-full bg-white text-black py-2.5 px-4 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;

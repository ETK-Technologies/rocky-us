"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

const CartPopup = ({ isOpen, onClose, productType }) => {
  // Remove cart items state and fetching since we're not displaying them
  // const [cartItems, setCartItems] = useState([]);
  // const [isRemoving, setIsRemoving] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

  // Remove cart fetching useEffect since we're not displaying cart items
  // useEffect(() => {
  //   if (!isOpen) return;
  //   setIsLoading(true);
  //   const fetchCartItems = async () => {
  //     try {
  //       const res = await fetch("/api/cart", {
  //         headers: {
  //           "Cache-Control": "no-cache",
  //           Pragma: "no-cache",
  //         },
  //       });
  //       const data = await res.json();
  //       setCartItems(data.items || []);
  //     } catch (error) {
  //       setCartItems([]);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchCartItems();
  // }, [isOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Remove item handler since we're not displaying cart items
  // const handleRemoveItem = async (item) => {
  //   // ... removed
  // };

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
    <>
      {/* Responsive Modal - Works on both Desktop and Mobile */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-4 md:p-6 max-w-md w-full mx-4 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-10"
          >
            <IoClose size={24} />
          </button>

          <div className="text-center">
            <h3 className="text-lg md:text-xl font-semibold mb-2">
              Item Added to Cart
            </h3>
            <p className="text-gray-600 text-sm md:text-base mb-6">
              Your item has been added to your cart successfully.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3">
              <Link href={checkoutUrl} className="w-full">
                <button className="w-full bg-black text-white py-2.5 px-4 rounded-full hover:bg-gray-900 transition-colors text-sm md:text-base">
                  Proceed to Checkout
                </button>
              </Link>

              <button
                onClick={onClose}
                className="w-full bg-white text-black py-2.5 px-4 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors text-sm md:text-base"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sheet - COMMENTED OUT */}
      {/* 
      <div className="md:hidden fixed inset-0 z-[9999] flex flex-col justify-end">
        <div
          className="absolute inset-0 bg-black bg-opacity-30"
          onClick={onClose}
        ></div>
        <div className="relative w-full max-h-[450px] bg-white rounded-t-2xl shadow-lg flex flex-col animate-slideUp">
          <div className="flex items-center justify-between px-5 pt-5 pb-2">
            <span className="font-semibold text-[#454545] text-base">CART</span>
            <button onClick={onClose}>
              <IoClose size={32} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 pb-2">
            {isLoading ? (
              <>
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 mb-4 animate-pulse"
                  >
                    <div className="min-w-[60px] min-h-[60px] w-[60px] h-[60px] bg-gray-200 rounded-md" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                      <div className="h-3 bg-gray-100 rounded w-1/3" />
                    </div>
                    <div className="w-9 h-9 bg-gray-200 rounded-full" />
                  </div>
                ))}
              </>
            ) : cartItems && cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.key} className="flex items-center gap-3 mb-4">
                  <div className="min-w-[60px] min-h-[60px] w-[60px] h-[60px] bg-gray-100 rounded-md flex items-center justify-center">
                    {item.images && item.images[0]?.thumbnail ? (
                      <img
                        src={item.images[0]?.thumbnail}
                        alt={item.name}
                        className="rounded-md w-full h-full object-cover"
                        width={60}
                        height={60}
                      />
                    ) : (
                      <div className="text-gray-400">No Image</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-[#212121] text-sm">
                      <span
                        dangerouslySetInnerHTML={{ __html: item.name }}
                      ></span>
                    </div>
                    <div className="text-[#212121] text-sm">
                      $
                      {item.prices?.sale_price
                        ? item.prices.sale_price / 100
                        : item.prices?.regular_price / 100 || item.price}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item)}
                    className="bg-[#EBEBEB] rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-60"
                    title="Remove item"
                    disabled={isRemoving === item.key}
                  >
                    {isRemoving === item.key ? (
                      <span className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <IoClose size={22} />
                    )}
                  </button>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Your cart is empty
              </div>
            )}
          </div>
          <div className="px-5 pb-5 pt-2 flex flex-col gap-3">
            <Link href={checkoutUrl} className="w-full">
              <button
                className="w-full py-3 rounded-full bg-black text-white text-center font-medium text-base disabled:opacity-60"
                disabled={!!isRemoving}
              >
                View Cart
              </button>
            </Link>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-full border border-black text-black text-center font-medium text-base"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
      */}
    </>
  );
};

export default CartPopup;

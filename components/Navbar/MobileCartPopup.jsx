import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";

export default function MobileCartPopup({
  open,
  onClose,
  cartItems,
  isLocalCart,
  onRemoveItem,
  onEmptyCart,
  isEmptyingCart,
}) {
  const [isRemoving, setIsRemoving] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.innerWidth < 768;
    if (open && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const isLoading = cartItems === undefined || cartItems === null;

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end md:hidden">
      <div className="relative  w-full h-full bg-white shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-6 ">
          <span className="font-semibold text-[#454545] text-sm">CART</span>
          <button onClick={onClose}>
            <IoClose size={32} />
          </button>
        </div>
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
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
                    <Image
                      width={60}
                      height={60}
                      src={item.images[0]?.thumbnail}
                      alt={item.name}
                      className="rounded-md"
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
                  onClick={async (e) => {
                    e.stopPropagation();
                    setIsRemoving(item.key);
                    await onRemoveItem(item);
                    setIsRemoving(null);
                  }}
                  className="bg-[#EBEBEB] rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-300 transition-colors"
                  title="Remove item"
                  disabled={isRemoving === item.key || isEmptyingCart}
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
        {/* Buttons */}
        <div className="p-4 flex flex-col gap-3">
          <Link
            href="/cart"
            className="w-full py-3 rounded-full bg-black text-white text-center font-medium text-sm disabled:opacity-60"
            onClick={onClose}
          >
            <button disabled={isEmptyingCart || !!isRemoving}>View Cart</button>
          </Link>
          <button
            className="w-full py-3 rounded-full border border-black text-black text-center font-semibold text-sm flex items-center justify-center disabled:opacity-60"
            onClick={onEmptyCart}
            disabled={
              isEmptyingCart ||
              !!isRemoving ||
              !cartItems ||
              cartItems.length === 0
            }
          >
            {isEmptyingCart ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                Emptying...
              </>
            ) : (
              "Empty Cart"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

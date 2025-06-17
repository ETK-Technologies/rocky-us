import Link from "next/link";

const EmptyCart = () => {
  return (
    <div
      id="empty-cart"
      className="flex empty-cart-message text-center items-center justify-center px-4 h-[calc(100vh-100px)]"
    >
      <div className="text-center flex flex-col items-center">
        <p className="text-[24px] text-[#251F20] md:text-[32px] tracking-[-0.01em] md:tracking-[-0.02em]  font-[450] leading-[33.6px] md:leading-[44.8px] mb-2 headers-font">
          Your cart is currently empty.
        </p>
        <p className="text-[14px] md:text-[16px] leading-[19.6px] md:leading-[22.4px] font-[400] mb-[32px]">
          Looks like you haven't added anything to your cart yet.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="flex items-center justify-center gap-3 bg-black text-white px-5 py-3 rounded-[64px] hover:bg-gray-800 transition w-full md:w-[168px] h-[44px]"
        >
          <span className="text-[14px] font-[500] leading-[19.6px] text-[#FFFFFF] poppins-font">
            Return to Shop
          </span>
        </button>
      </div>
    </div>
  );
};

export default EmptyCart;

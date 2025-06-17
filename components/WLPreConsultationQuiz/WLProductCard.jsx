import React from "react";

const WLProductCard = ({ product, isRecommended, onSelect, isSelected }) => {
  return (
    <div
      className={`bg-[#FFFFFF] flex flex-col gap-2 rounded-2xl p-6 
        ${
          isSelected
            ? "border border-[#A7885A]"
            : "border border-transparent drop-shadow-lg"
        } 
         cursor-pointer transition-all duration-200 ease-in-out 
        hover:shadow-xl hover:scale-[1.01] ${
          product.supplyAvailable ? "" : "opacity-75"
        }`}
      onClick={() => product.supplyAvailable && onSelect && onSelect(product)}
    >
      <div className="flex justify-between">
        {product.supplyAvailable ? (
          <p className="text-[#047000] w-fit bg-[#D0FDD0] rounded-full py-[2px] px-[10px] font-normal text-sm">
            Supply available
          </p>
        ) : (
          <p className="text-[#C53030] w-fit bg-red-400 rounded-full py-[2px] px-[10px] font-normal text-sm">
            Out of stock
          </p>
        )}
        {isSelected && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[#A7885A]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <h2 className="text-xl md:text-2xl text-[#000000] font-medium">
        {product.name}
        <span className="text-sm md:text-base align-top">®</span>
      </h2>
      <p className="text-sm md:text-base text-[#212121]">
        {product.description}
      </p>
      <div className="w-full h-full mt-2 relative">
        <img
          src={product.url}
          alt={product.name}
          className="w-full h-full object-contain rounded-2xl"
        />
      </div>

      <p className="text-sm text-[#212121] mt-1">{product.details}</p>
    </div>
  );
};

export default WLProductCard;

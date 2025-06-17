import { useState } from "react";

const CheckBox = ({
  text,
  price,
  oldPrice = null,
  saveLabelText = null,
  isSelected = false,
  onSelect,
  value,
}) => {
  return (
    <div
      className={`w-full mb-3 flex bg-white border-[2px] p-4 rounded-lg cursor-pointer ${
        isSelected ? "border-[#AE7E56]" : "border-gray-300"
      }`}
      onClick={() => onSelect(value)}
      role="radio"
      aria-checked={isSelected}
    >
      <div className="w-3/4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <div
            className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center
              transition-colors duration-200
              ${
                isSelected ? "bg-[#AE7E56] border-[#AE7E56]" : "border-gray-300"
              }
            `}
          >
            {isSelected && (
              <svg
                className="w-3 h-3 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <circle cx="10" cy="10" r="8" />
              </svg>
            )}
          </div>
          <span className="select-none text-[14px] lg:text-[16px] font-semibold">
            {text}
          </span>
          {saveLabelText ? (
            <span className="bg-[#AE7E56] text-white text-[14px] lg:text-[16px] px-2 rounded-lg">
              <small>{saveLabelText}</small>
            </span>
          ) : null}
        </label>
      </div>
      <div className="w-1/4">
        <span className="float-end text-[14px] lg:text-[16px]">
          {price}{" "}
          {oldPrice ? (
            <span className="text-gray-400 pl-1 lg:pl-3 line-through text-[14px] lg:text-[16px]">
              {oldPrice}
            </span>
          ) : null}
        </span>
      </div>
    </div>
  );
};

export default CheckBox;

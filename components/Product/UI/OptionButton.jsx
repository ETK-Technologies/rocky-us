"use client";

/**
 * OptionButton Component
 * Reusable button component for product variation selection
 */
const OptionButton = ({
  selected,
  onClick,
  children,
  disabled = false,
  className = "",
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full py-1 px-3 text-sm rounded-[8px] border-2 transition-all duration-200 ${
      disabled
        ? "border-[#CECECE] text-gray-400 cursor-not-allowed"
        : selected
        ? "border-[#AE7E56] text-[#AE7E56]"
        : "border-[#CECECE] hover:border-gray-400"
    } ${className}`}
    type="button"
  >
    {children}
  </button>
);

export default OptionButton;

"use client";

/**
 * PriceDisplay Component
 * Standardized component for displaying product prices
 */
const PriceDisplay = ({
  price,
  regularPrice,
  showCurrency = true,
  size = "medium",
  className = "",
}) => {
  // Format price to always show 2 decimal places
  const formatPrice = (value) => {
    if (typeof value !== "number") {
      value = parseFloat(value) || 0;
    }
    return value.toFixed(2);
  };

  // Determine if there's a discount
  const hasDiscount = regularPrice && regularPrice > price;

  // Size classes
  const sizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg font-semibold",
    xlarge: "text-xl font-bold",
  };

  const sizeClass = sizeClasses[size] || sizeClasses.medium;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={`text-[#AE7E56] ${sizeClass}`}>
        {showCurrency && "$"}
        {formatPrice(price)}
      </span>

      {hasDiscount && (
        <span className="text-gray-400 line-through text-sm">
          {showCurrency && "$"}
          {formatPrice(regularPrice)}
        </span>
      )}
    </div>
  );
};

export default PriceDisplay;

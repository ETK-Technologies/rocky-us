"use client";

import PriceDisplay from "./PriceDisplay";

/**
 * SubscriptionOptions Component
 * Displays subscription options for products with subscription variations
 */
const SubscriptionOptions = ({
  options,
  selectedOption,
  onSelect,
  title = "Please choose one",
}) => {
  if (!options || !Array.isArray(options) || options.length === 0) {
    return null;
  }

  // Check if this is a hair product by looking for isHairProduct flag
  const isHairProduct = options.some((option) => option.isHairProduct === true);

  // Check if this is a lidocaine product by the label format
  const isLidocaineProduct = options.some(
    (option) =>
      option.label.includes("(30g)") ||
      option.label.includes("(90g)") ||
      option.label === "One Time Purchase"
  );

  // Render layout for hair products (special case)
  if (isHairProduct) {
    return (
      <div className="space-y-4">
        <h3 className="text-base font-medium">Select frequency</h3>
        <div className="flex flex-col space-y-2">
          {options.map((option) => {
            // Hair products may have originalLabel which should be displayed with nowrap
            const displayLabel = option.originalLabel || option.label;

            return (
              <div
                key={option.id}
                className={`flex justify-between items-center p-3 rounded-lg border-2 transition-all duration-200 ${
                  selectedOption?.id === option.id
                    ? "border-[#A55255]"
                    : "border-[#CECECE] hover:border-gray-400"
                }`}
                onClick={() => onSelect(option)}
              >
                <span className="font-medium text-sm whitespace-nowrap">
                  {displayLabel}
                </span>

                {/* Display price information for minoxidil products */}
                {option.regularPrice && (
                  <PriceDisplay
                    price={option.price}
                    regularPrice={option.regularPrice}
                    size="medium"
                    className="subscription-price font-semibold"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Render grid layout for lidocaine products (special case)
  if (isLidocaineProduct) {
    return (
      <div className="space-y-4">
        <h3 className="text-base font-medium">{title}</h3>
        <div className="grid grid-cols-2 gap-2">
          {options.map((option) => (
            <button
              key={option.id}
              className={`flex-1 px-3 py-2 border rounded-lg transition-all ${
                selectedOption?.id === option.id
                  ? "border-[#AE7E56] border-2 bg-white text-[#AE7E56]"
                  : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
              }`}
              onClick={() => onSelect(option)}
              type="button"
            >
              <div className="flex flex-col items-center">
                <span
                  className={`font-medium text-sm ${
                    selectedOption?.id === option.id ? "text-[#AE7E56]" : ""
                  }`}
                >
                  {option.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Default subscription layout (standard case)
  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium">{title}</h3>
      <div className="flex flex-col space-y-2">
        {options.map((option) => (
          <div
            key={option.id}
            className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200 ${
              selectedOption?.id === option.id
                ? "border-[#AE7E56]"
                : "border-gray-300 text-gray-500"
            }`}
          >
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="subscription-type"
                value={option.id}
                checked={selectedOption?.id === option.id}
                onChange={() => onSelect(option)}
                className="w-4 h-4"
              />
              <span className="font-semibold text-[#AE7E56]">
                {option.label}
              </span>
            </label>
            <PriceDisplay
              price={option.price}
              regularPrice={option.regularPrice}
              size="medium"
              className="subscription-price text-black font-semibold"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionOptions;

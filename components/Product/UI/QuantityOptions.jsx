"use client";

import OptionButton from "./OptionButton";

/**
 * QuantityOptions Component
 * Displays quantity selection options for products with quantity-based variations
 */
const QuantityOptions = ({
  options,
  selectedOption,
  onSelect,
  title = "How many pills?",
  gridCols = 4,
}) => {
  if (!options || !Array.isArray(options) || options.length === 0) {
    return null;
  }

  // Determine if this is for pills, packs, etc. based on the first option
  const firstOptionLabel = options[0]?.label || "";
  const isTabs =
    firstOptionLabel.includes("pill") || firstOptionLabel.includes("tab");
  const isPacks = firstOptionLabel.includes("pack");

  // Create appropriate title based on content type
  let displayTitle = title;
  if (isTabs && title === "How many pills?") {
    displayTitle = "How many pills?";
  } else if (isPacks && title === "How many pills?") {
    displayTitle = "How many packs?";
  }

  // Sort options by quantity (numeric value)
  const sortedOptions = [...options].sort((a, b) => {
    // Extract number from label (e.g., "4 pills" -> 4)
    const aMatch = a.label.match(/^(\d+)/);
    const bMatch = b.label.match(/^(\d+)/);

    const aNum = aMatch ? parseInt(aMatch[1]) : 0;
    const bNum = bMatch ? parseInt(bMatch[1]) : 0;
    return aNum - bNum; // Ascending order
  });

  return (
    <div className="space-y-2">
      <h3 className="text-base font-medium">{displayTitle}</h3>
      <div className={`grid grid-cols-${gridCols} gap-2`}>
        {sortedOptions.map((option) => {
          // Extract just the number for display
          const numberMatch = option.label.match(/^(\d+)/);
          const number = numberMatch ? numberMatch[1] : option.label;

          // Determine the unit (pills, tabs, packs)
          let unit = "tabs";
          if (option.label.includes("pill")) unit = "pills";
          if (option.label.includes("pack")) unit = "packs";

          return (
            <OptionButton
              key={option.value}
              selected={selectedOption?.value === option.value}
              onClick={() => onSelect(option)}
            >
              {number} {unit}
            </OptionButton>
          );
        })}
      </div>
    </div>
  );
};

export default QuantityOptions;

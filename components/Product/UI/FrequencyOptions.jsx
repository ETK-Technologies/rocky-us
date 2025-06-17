"use client";

import OptionButton from "./OptionButton";

/**
 * FrequencyOptions Component
 * Displays frequency selection options for products with frequency-based variations
 */
const FrequencyOptions = ({
  options,
  selectedValue,
  onSelect,
  title = "Select frequency",
}) => {
  if (!options || !Array.isArray(options) || options.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h3 className="text-base font-medium">{title}</h3>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <OptionButton
            key={option.value}
            selected={selectedValue === option.value}
            onClick={() => onSelect(option)}
          >
            {option.label}
          </OptionButton>
        ))}
      </div>
    </div>
  );
};

export default FrequencyOptions;

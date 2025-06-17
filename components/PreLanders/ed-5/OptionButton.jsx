import { memo } from "react";

const OptionButton = memo(({ option, isSelected, onClick }) => (
  <button
    key={option.id}
    onClick={onClick}
    className={`w-full p-4 border rounded-full text-center transition-colors ${
      isSelected
        ? "bg-green-50 border-green-500 text-green-700"
        : "border-gray-300 hover:bg-gray-50"
    }`}
  >
    {option.label}
  </button>
));
OptionButton.displayName = "OptionButton";

export default OptionButton;

import React, { useState, useEffect } from "react";

const CheckboxQuestion = ({
  config,
  userData,
  onToggle,
  isValid,
  onContinue,
  onSubmitData,
  textInput,
  setTextInput,
  onTextSubmit,
}) => {
  const selectedValues = userData[config.field] || [];
  const [showTextField, setShowTextField] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if we should show the text field
  useEffect(() => {
    if (config.conditionalTextField) {
      const shouldShow = selectedValues.includes(
        config.conditionalTextField.triggerValue
      );
      setShowTextField(shouldShow);
    }
  }, [selectedValues, config.conditionalTextField]);

  const handleContinue = async () => {
    if (isValid && onContinue && !isSubmitting) {
      setIsSubmitting(true);
      try {
        // Submit data first, then continue
        if (onSubmitData) {
          await onSubmitData();
        }
        onContinue();
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleTextSubmit = () => {
    if (textInput.trim() && onTextSubmit) {
      onTextSubmit();
    }
  };

  return (
    <>
      <div className="space-y-4">
        {config.options.map((option) => (
          <button
            key={option.id}
            className={`w-full text-left px-4 py-5 md:py-6 border-[1px] rounded-lg flex items-center gap-3 ${
              selectedValues.includes(option.id)
                ? "border-[#A7885A] bg-[#FFFBF7]"
                : "border-[#E2E2E1]"
            }`}
            onClick={() => onToggle(option.id, option)}
          >
            <div
              className={`w-5 h-5 border rounded flex items-center justify-center ${
                selectedValues.includes(option.id)
                  ? "border-[#A7885A] bg-[#A7885A]"
                  : "border-gray-300"
              }`}
            >
              {selectedValues.includes(option.id) && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 6L4.5 8.5L10 3"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <span className="text-[14px] md:text-[16px] font-medium leading-[140%] tracking-[0%] text-black">
                {option.label}
              </span>
              {option.metadata && (
                <div className="text-[12px] text-gray-500 mt-1">
                  ({option.metadata})
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Conditional text field */}
      {showTextField && config.conditionalTextField && (
        <div className="mt-6">
          <textarea
            value={textInput || ""}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder={config.conditionalTextField.placeholder}
            className="w-full p-4 border border-gray-300 rounded-lg min-h-[100px] text-[14px] md:text-[16px] focus:outline-none focus:border-[#A7885A]"
          />

          {/* Continue button removed - now rendered at top level */}
        </div>
      )}

      {/* Continue button removed - now rendered at top level */}
    </>
  );
};

export default CheckboxQuestion;

import React, { useState } from "react";

const RadioQuestion = ({
  config,
  userData,
  onSelect,
  onContinue,
  onSubmitData,
  isValid,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <>
      <div className="space-y-4">
        {config.options.map((option) => (
          <button
            key={option.id}
            className={`w-full text-left px-4 py-5 md:py-6 border-[1px] rounded-lg flex items-center gap-3 ${
              userData[config.field] === option.id
                ? "border-[#A7885A] bg-[#FFFBF7]"
                : "border-[#E2E2E1]"
            }`}
            onClick={() => onSelect(option.id, option)}
          >
            <div
              className={`w-5 h-5 rounded-full border ${
                userData[config.field] === option.id
                  ? "border-[#A7885A] bg-[#A7885A]"
                  : "border-gray-300"
              }`}
            >
              {userData[config.field] === option.id && (
                <div className="w-3 h-3 bg-white rounded-full m-[3px]"></div>
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

      {/* Continue button removed - now rendered at top level */}
    </>
  );
};

export default RadioQuestion;

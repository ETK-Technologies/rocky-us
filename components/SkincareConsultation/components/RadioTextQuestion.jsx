import React, { useState } from "react";

const RadioTextQuestion = ({
  config,
  userData,
  onSelect,
  textInput,
  setTextInput,
  onTextSubmit,
  onContinue,
  onSubmitData,
  isValid,
  setUserData,
}) => {
  const selectedOption = config.options.find(
    (opt) => opt.id === userData[config.field]
  );
  const showTextInput = selectedOption?.showTextInput;
  const [isSubmitting, setIsSubmitting] = useState(false);

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
            <span className="text-[14px] md:text-[16px] font-medium leading-[140%] tracking-[0%] text-black">
              {option.label}
            </span>
          </button>
        ))}
      </div>

      {showTextInput && (
        <div className="mt-6">
          <textarea
            value={textInput}
            onChange={(e) => {
              const newValue = e.target.value;
              setTextInput(newValue);
              // Save to quiz state in real-time for validation
              if (setUserData && config.textField) {
                setUserData((prev) => ({
                  ...prev,
                  [config.textField]: newValue,
                }));
              }
            }}
            placeholder={selectedOption?.textPlaceholder || "Please specify..."}
            className="w-full p-4 border border-gray-300 rounded-lg min-h-[100px] text-[14px] md:text-[16px] focus:outline-none focus:border-[#A7885A]"
          />
        </div>
      )}
    </>
  );
};

export default RadioTextQuestion;

import React from "react";

export const QuestionOption = ({
  id,
  name,
  value,
  checked,
  onChange,
  type = "checkbox",
  isNoneOption = false,
  isOtherOption = false,
  otherField = null,
  className = "",
  label,
}) => {
  return (
    <div
      className={`quiz-option text-left block w-full mb-4 ${className}`}
      suppressHydrationWarning={true}
    >
      <input
        id={id}
        className={`hidden 
                    ${type === "radio" ? "" : "quiz-option-input-" + name}
                    ${isNoneOption ? "none-of-these" : ""} 
                    ${isOtherOption ? "other-input-show" : ""}`}
        type={type}
        name={name}
        data-other-field={otherField}
        value={value}
        checked={checked}
        onChange={onChange}
        suppressHydrationWarning={true}
      />
      <label
        htmlFor={id}
        className={`quiz-option-label cursor-pointer text-left p-5 border-2
                    ${checked ? "border-[#A7885A]" : "border-gray-300"}
                    rounded-[12px] block flex justify-between items-center
            h-[60px] md:h-[70px] text-[14px] md:text-[16px] shadow-none`}
        suppressHydrationWarning={true}
      >
        {" "}        <span>{label || value}</span>
        {type === "checkbox" && (
          <div
            className={`relative flex-shrink-0 w-5 h-5 rounded-md ${
              checked ? "bg-[#A7885A]" : "bg-gray-300"
            }`}
          >
            {checked && (
              <svg
                className="absolute top-0 left-0 w-full h-full text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            )}
          </div>
        )}
      </label>
    </div>
  );
};
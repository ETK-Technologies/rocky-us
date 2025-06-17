"use client";

import QuestionnaireNavbar from "../EdQuestionnaire/QuestionnaireNavbar";
import { useEffect } from "react";

export const WarningPopup = ({
  isOpen,
  onClose,
  title = "Please Read",
  message,
  onAcknowledge,
  acknowledgeLabel = "I hereby understand and consent to the above waiver",
  isAcknowledged = true,
  showCheckbox = true,
  buttonText = "Continue",
  afterButtonContent,
  additionalContent,
  backgroundColor = "bg-[#F5F4EF]",
  titleColor = "text-[#C19A6B]",
  currentPage,
  hideDefaultButton = false,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      const handleEscKey = (e) => {
        if (e.key === "Escape") {
          onClose(true);
        }
      };

      window.addEventListener("keydown", handleEscKey);

      const form = document.getElementById("quiz-form");
      if (form) {
        const onSubmit = form.onsubmit;
        form.onsubmit = (e) => {
          e.preventDefault();
          return false;
        };

        return () => {
          document.body.style.overflow = "auto";
          window.removeEventListener("keydown", handleEscKey);
          form.onsubmit = onSubmit;
        };
      }

      return () => {
        document.body.style.overflow = "auto";
        window.removeEventListener("keydown", handleEscKey);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 ${backgroundColor} !z-[999999] flex flex-col overflow-auto`}
      style={{
        animation: "fadeIn 0.3s ease-in-out",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose(true);
        }
      }}
    >
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>

      <QuestionnaireNavbar
        onBackClick={() => onClose(true)}
        currentPage={currentPage}
      />
      <div className="flex-1 flex items-start justify-center py-4 overflow-auto">
        <div className="w-full md:w-[520px] max-w-xl mx-auto px-5 md:px-0 py-4 relative flex flex-col">
          <h3
            className={`text-[26px] md:text-[32px] ${titleColor} font-semibold mb-8`}
          >
            {title}
          </h3>

          <p className="text-[20px] md:text-[24px] mb-8 text-[#000000] max-w-lg mx-auto text-left leading-relaxed headers-font">
            {message}
          </p>

          {showCheckbox && (
            <div className="mb-8">
              <label className="flex items-start cursor-pointer">
                <div
                  className={`rounded-md flex items-center justify-center w-6 h-6 mr-3 mt-1 flex-shrink-0 ${
                    isAcknowledged ? "bg-[#C19A6B]" : "bg-gray-400"
                  }`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="20"
                      height="20"
                      rx="4"
                      fill={isAcknowledged ? "#C19A6B" : "#9CA3AF"}
                    />
                    {isAcknowledged && (
                      <path
                        d="M5 10L8.5 13.5L15 7"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                  </svg>
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isAcknowledged}
                  onChange={onAcknowledge}
                />
                <span className="text-xl">{acknowledgeLabel}</span>
              </label>
            </div>
          )}
          {additionalContent}
          <div className="fixed bottom-0 left-0 w-full px-4 pb-4 flex items-center justify-center z-50">
            {!hideDefaultButton && (
              <button
                className="bg-black text-white w-full max-w-[335px] md:max-w-[520px] py-4 px-4 rounded-full font-medium text-lg"
                onClick={() => onClose(true)}
                disabled={showCheckbox && !isAcknowledged}
              >
                {buttonText}
              </button>
            )}
            {afterButtonContent}
          </div>
        </div>
      </div>
    </div>
  );
};

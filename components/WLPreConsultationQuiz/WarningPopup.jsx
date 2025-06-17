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
      const form = document.getElementById("quiz-form");
      if (form) {
        const onSubmit = form.onsubmit;
        form.onsubmit = (e) => {
          e.preventDefault();
          return false;
        };

        return () => {
          form.onsubmit = onSubmit;
        };
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup when unmounting
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 ${backgroundColor} !z-[999999] flex flex-col overflow-auto`}
      style={{
        animation: isOpen
          ? "fadeIn 0.3s ease-in-out"
          : "fadeOut 0.3s ease-in-out",
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

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>

      <QuestionnaireNavbar
        onBackClick={() => onClose(false)}
        currentPage={currentPage}
      />
      <div className="flex-1 flex items-start justify-center py-4 overflow-auto">
        <div className="w-full md:w-[520px] max-w-xl mx-auto px-6 py-4 relative flex flex-col">
          <h3
            className={`text-[26px] md:text-[32px] headers-font ${titleColor} leading-[115%] mb-8`}
          >
            {title}
          </h3>

          <p className="text-[20px] md:text-[24px] mb-8 text-[#000000] max-w-lg mx-auto text-left leading-[140%]">
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
            <div className="w-[335px] md:w-[520px] max-w-xl">
              {!hideDefaultButton && (
                <button
                  onClick={() => onClose(true)}
                  className="w-full py-3 bg-black text-white rounded-full font-medium"
                >
                  {buttonText}
                </button>
              )}
              {afterButtonContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect } from "react";
import QuestionnaireNavbar from "../../EdQuestionnaire/QuestionnaireNavbar";

const GenericPopup = ({
  isOpen,
  onClose,
  popupData,
  onAction,
  isSubmitting = false,
}) => {
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

  if (!isOpen || !popupData) return null;

  const handleButtonClick = (button) => {
    switch (button.action) {
      case "redirect":
        window.location.href = button.url;
        break;
      case "continue":
        onAction("continue");
        break;
      case "close":
      default:
        onClose();
        break;
    }
  };

  const getTitleColor = () => {
    if (popupData.titleColor === "red") return "text-red-600";
    return "text-[#C19A6B]"; // Use WL title color as default
  };

  return (
    <div
      className="fixed inset-0 bg-[#F5F4EF] !z-[999999] flex flex-col overflow-auto"
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

      {/* QuestionnaireNavbar - matches WL popup design */}
      <QuestionnaireNavbar onBackClick={() => onClose()} />

      <div className="flex-1 flex items-start justify-center py-4 overflow-auto">
        <div className="w-full md:w-[520px] max-w-xl mx-auto px-6 py-4 relative flex flex-col">
          <h3
            className={`text-[26px] md:text-[32px] headers-font ${getTitleColor()} leading-[115%] mb-8`}
          >
            {popupData.title}
          </h3>

          <div className="text-[20px] md:text-[24px] mb-8 text-[#000000] max-w-lg mx-auto text-left leading-[140%]">
            {popupData.message.split("\n").map((line, index) => (
              <p key={index} className={index > 0 ? "mt-4" : ""}>
                {line}
              </p>
            ))}
          </div>

          {/* Fixed bottom button area - matches WL design */}
          <div className="fixed bottom-0 left-0 w-full px-4 pb-4 flex items-center justify-center z-50">
            <div className="w-[335px] md:w-[520px] max-w-xl flex flex-col gap-3">
              {popupData.buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => handleButtonClick(button)}
                  disabled={isSubmitting && button.action === "continue"}
                  className={`w-full py-3 rounded-full font-medium transition-colors relative ${
                    button.primary
                      ? "bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  }`}
                >
                  {isSubmitting && button.action === "continue" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    button.label
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericPopup;

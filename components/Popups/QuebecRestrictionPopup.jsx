"use client";

import { useEffect } from "react";

const QuebecRestrictionPopup = ({ isOpen, onClose, message }) => {
  // Close popup when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when popup is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Popup Content */}
        <div
          className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <span className="text-xl font-bold">&times;</span>
          </button>

          {/* Content */}
          <div className="text-center">
            {/* Icon */}
            <div className="mx-auto mb-4 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Product Not Available
            </h3>

            {/* Message */}
            <p className="text-gray-600 mb-6">
              {message ||
                "Sorry, zonnic product is currently not available in your selected province."}
            </p>

            {/* Action Button */}
            <button
              onClick={onClose}
              className="w-full bg-black text-white py-3 px-6 rounded-full font-medium text-lg hover:bg-gray-800 transition-colors"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuebecRestrictionPopup;

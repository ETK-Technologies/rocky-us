"use client";

import { useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const LidocaineInfoPopup = ({ isOpen, onClose, onContinue }) => {
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

  if (!isOpen) return null;

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[99999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full mx-4 relative shadow-2xl border border-gray-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10 p-1"
        >
          <IoIosCloseCircleOutline className="text-3xl" />
        </button>

        {/* Content */}
        <div className="p-8 pt-10">
          <h3 className="text-xl font-bold text-gray-900 mb-5 text-center headers-font">
            Just a Quick Note
          </h3>

          <div className="text-gray-700 text-sm leading-relaxed space-y-3 text-left">
            <p>
              You may be experiencing <b>premature ejaculation</b> — this is
              when ejaculation happens too quickly during sex{" "}
              <b>(usually within 1–2 minutes)</b>.
            </p>

            <p>
              This treatment can help by <b>reducing sensitivity</b>, giving you{" "}
              <b>more control and helping delay ejaculation</b>.
            </p>

            <p className="text-gray-800">
              <b>Please note:</b> This treatment is intended to improve timing,
              not increase desire or arousal.
            </p>

            <p>
              Please use as directed to avoid reduced sensation for your
              partner.
            </p>
          </div>

          {/* Continue Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleContinue}
              className="bg-black text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LidocaineInfoPopup;

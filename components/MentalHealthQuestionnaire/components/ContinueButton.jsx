import React from "react";

export const ContinueButton = ({
  showContinueButton,
  currentPage,
  photoIdAcknowledged,
  photoIdFile,
  handlePhotoIdUpload,
  moveToNextSlide,
}) => {
  const isPHQ9orGAD7Question = currentPage >= 11 && currentPage <= 26;
  if (showContinueButton === false && !isPHQ9orGAD7Question) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 z-[9999] bg-white shadow-lg flex items-center justify-center">
      <button
        type="button"
        onClick={currentPage === 35 ? handlePhotoIdUpload : moveToNextSlide}
        className="bg-black text-white w-full  md:max-w-[520px] py-4 px-4 rounded-full font-medium text-lg quiz-continue-button"        disabled={
          (currentPage === 34 && !photoIdAcknowledged) ||
          (currentPage === 35 && !photoIdFile)
        }
      >        {currentPage === 35 ? (
          "Upload and Continue"
        ) : currentPage === 34 ? (
          "I acknowledge"
        ) : (
          "Continue"
        )}
      </button>
    </div>
  );
};

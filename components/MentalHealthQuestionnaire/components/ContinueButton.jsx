import React from "react";
import { useRouter } from "next/navigation";

export const ContinueButton = ({
  showContinueButton,
  currentPage,
  photoIdAcknowledged,
  photoIdFile,
  handlePhotoIdUpload,
  moveToNextSlide,
}) => {
  const router = useRouter();
  const isPHQ9orGAD7Question = currentPage >= 11 && currentPage <= 26;
  if (currentPage === 37) return null;
  
  if (showContinueButton === false && !isPHQ9orGAD7Question) return null;

  const handleGoToHome = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("mh-quiz-form-data");
      localStorage.removeItem("mh-quiz-form-data-expiry");
    }
    window.location.href = "/";
  };

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 z-[9999] bg-white shadow-lg flex items-center justify-center">
      <button
        type="button"
        onClick={
          currentPage === 37 
            ? handleGoToHome 
            : currentPage === 36 
              ? handlePhotoIdUpload 
              : moveToNextSlide
        }
        className="bg-black text-white w-full  md:max-w-[520px] py-4 px-4 rounded-full font-medium text-lg quiz-continue-button"        disabled={
          (currentPage === 35 && !photoIdAcknowledged) ||
          (currentPage === 36 && !photoIdFile)
        }
      >        {currentPage === 37 ? (
          "Go To Home"
        ) : currentPage === 36 ? (
          "Upload and Continue"
        ) : currentPage === 35 ? (
          "I acknowledge"
        ) : (
          "Continue"
        )}
      </button>
    </div>
  );
};

import { useState, useRef, useCallback } from "react";
import { QUESTION_CONFIG } from "../constants";      
const { uploadFileToS3WithProgress } = await import("@/utils/s3/frontend-upload");

export const usePhotoIdHandling = (
  formData,
  handleFormChange,
  submitFormData,
  clearError,
  setUploadProgress
) => {
  const [photoIdFile, setPhotoIdFile] = useState(null);
  const [photoIdAcknowledged, setPhotoIdAcknowledged] = useState(
    formData.photoIdAcknowledged || false
  );
  const [showPhotoIdPopup, setShowPhotoIdPopup] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handlePhotoIdAcknowledge = (e) => {
    const isChecked = e.target.checked;
    setPhotoIdAcknowledged(isChecked);
    handleFormChange("photoIdAcknowledged", isChecked);
  };

  const handleTapToUpload = () => {
    fileInputRef.current?.click();
  };
  const handlePhotoIdFileSelect = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    if (clearError) clearError();

    const file = e.target.files[0];

    const fileType = file.type;
    if (fileType !== "image/jpeg" && fileType !== "image/png") {
      const errorBox = document.querySelector(".error-box");
      if (errorBox) {
        errorBox.classList.remove("hidden");
        errorBox.textContent = "Only JPEG and PNG images are supported";
      }
      e.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      const errorBox = document.querySelector(".error-box");
      if (errorBox) {
        errorBox.classList.remove("hidden");
        errorBox.textContent = "Maximum file size is 10MB";
      }
      e.target.value = "";
      const preview = document.getElementById("photo-id-preview");
      if (preview) {
        preview.src = "";
      }
      setPhotoIdFile(null);
      return;
    }

    setPhotoIdFile(file);

    const reader = new FileReader();
    reader.onload = function (e) {
      const preview = document.getElementById("photo-id-preview");
      if (preview) {
        preview.src = e.target?.result;
      }
    };
    reader.readAsDataURL(file);
  };

  const showLoader = () => {
    if (setUploadProgress) setUploadProgress(0);
    const loader = document.getElementById("please-wait-loader-overlay");
    if (loader) {
      loader.classList.remove("hidden");
    }
  };

  const hideLoader = () => {
    if (setUploadProgress) setUploadProgress(0);
    const loader = document.getElementById("please-wait-loader-overlay");
    if (loader) {
      loader.classList.add("hidden");
    }
  };

  const handlePhotoIdUpload = async (
    showError,
    setCurrentPage,
    setQuestionsStack,
    questionsStack,
    currentPage,
    setProgress,
    setCameFromBack,
    setIsMovingForward
  ) => {
    if (!photoIdFile) {
      showError("Please upload a photo ID");
      return false;
    }

    try {
      setIsUploading(true);
      showLoader();

      try {
        await fetch("/api/s3/configure-cors");
      } catch (corsError) {
        console.log(
          "CORS configuration check failed, continuing with upload:",
          corsError
        );
      }
      
      const s3Url = await uploadFileToS3WithProgress(
        photoIdFile,
        "questionnaire/mental-health-photo-ids",
        "mh",
        (progress) => {
          if (setUploadProgress) setUploadProgress(progress);
        }
      );

      const photoUrl = s3Url;

      handleFormChange("196", photoUrl);
      handleFormChange("photo_id", photoUrl);

      const submissionData = {
        196: photoUrl,
        photo_id: photoUrl,
        completion_state: "Full",
        completion_percentage: 100,
        stage: "photo-id-upload",
      };

      const { photo_id_upload, ...cleanSubmissionData } = submissionData;

      await submitFormData(cleanSubmissionData);

      setCameFromBack(false);
      setIsMovingForward(true);
      const nextPage =
        QUESTION_CONFIG[currentPage]?.nextQuestion || currentPage + 1;

      const updatedStack = [...questionsStack, currentPage];
      setQuestionsStack(updatedStack);

      setCurrentPage(nextPage);
      setProgress(100);

      setIsUploading(false);
      hideLoader();

      return true;
    } catch (error) {
      console.error("Error uploading ID:", error);

      if (error.message && error.message.includes("File size exceeds")) {
        showError(
          "The file size exceeds the maximum allowed size of 10MB. Please select a smaller image."
        );
      } else if (error.message && error.message.includes("Only JPEG and PNG")) {
        showError(
          "Only JPEG and PNG images are supported. Please select a different image."
        );
      } else if (error.message && error.message.includes("presigned")) {
        showError(
          "Failed to get upload permission. Please try again or contact support."
        );
      } else if (error.message && error.message.includes("CORS")) {
        showError(
          "Upload failed due to security restrictions. Please contact support and mention 'CORS error'."
        );
      } else {
        showError("Failed to upload ID. Please try again.");
      }
      setIsUploading(false);
      hideLoader();
      return false;
    }
  };

  return {
    photoIdFile,
    photoIdAcknowledged,
    showPhotoIdPopup,
    isUploading,
    fileInputRef,
    handlePhotoIdAcknowledge,
    handleTapToUpload,
    handlePhotoIdFileSelect,
    handlePhotoIdUpload,
  };
};

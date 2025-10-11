"use client";

import React, { useEffect } from "react";
import { useWLFlowOne } from "./hooks/useWLFlowOne";
import { quizConfig } from "./config/quizConfig";
import GenericPopup from "../components/GenericPopup";
import QuestionnaireNavbar from "../../../EdQuestionnaire/QuestionnaireNavbar";
import { ProgressBar } from "../../../EdQuestionnaire/ProgressBar";
import QuizStepRenderer from "./QuizStepRenderer";

const getPopupConfigWithChosenValue = (popupKey, userData) => {
  if (popupKey !== "YourGoalIs") {
    return quizConfig.popups[popupKey] || null;
  }
  const popupConfig = quizConfig.popups[popupKey];
  if (!popupConfig) return null;
  let message = popupConfig.message;
  if (userData.weightLossGoal) {
    let chosenLabel = userData.weightLossGoal;
    if (userData.weightLossGoal === "not-sure") {
      chosenLabel = "Weight";
    } else {
      const chosenOption = quizConfig.steps[3].options.find(
        (opt) => opt.id === userData.weightLossGoal
      );
      if (chosenOption) {
        chosenLabel = chosenOption.label;
      }
    }
    message = message.replace("{chosen}", chosenLabel);
  }
  return { ...popupConfig, message };
};

const WLFlowOne = () => {
  const {
    currentStep,
    progressPercent,
    userData,
    setUserData,
    selectedProduct,
    setSelectedProduct,
    activePopup,
    handleContinue,
    handleBack,
    handleAction,
    closePopup,
    handleRecommendationContinue,
  } = useWLFlowOne();

  // scroll to top when the page mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.scrollTo(0, 0);
      } catch (e) {
        /* ignore */
      }
    }
  }, []);

  // If a popup is active and we want it as a page, render only the popup
  const activePopupConfig = (() => {
    if (!activePopup) return null;
    // activePopup may be a string key or a full popup config object
    if (typeof activePopup === "string") {
      return getPopupConfigWithChosenValue(activePopup, userData);
    }
    // assume it's a popup config object already
    return activePopup;
  })();

  if (activePopup && (activePopupConfig?.asPage ?? true)) {
    return (
      <GenericPopup
        isOpen={!!activePopup}
        onClose={closePopup}
        popupConfig={activePopupConfig}
        asPage={activePopupConfig?.asPage ?? true}
        onAction={handleAction}
        currentPage={currentStep}
        progressBar={progressPercent}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-black text-white text-[14px] leading-[140%] font-medium items-center text-center p-2 ">
        Lose Weight or Your Money Back
      </div>
      {/* QuestionnaireNavbar */}
      <QuestionnaireNavbar onBackClick={handleBack} currentPage={currentStep} />
      {/* Progress Bar - Hide for recommendation step */}
      {currentStep !== 13 && (
        <div className="pt-2 pb-4">
          <ProgressBar progress={progressPercent || 100} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1">
        <QuizStepRenderer
          currentStep={currentStep}
          userData={userData}
          setUserData={setUserData}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          handleContinue={handleContinue}
          handleAction={handleAction}
          handleRecommendationContinue={handleRecommendationContinue}
        />
      </div>

      {/* Generic popup */}
      <GenericPopup
        isOpen={!!activePopup}
        onClose={closePopup}
        popupConfig={activePopupConfig}
        asPage={activePopupConfig?.asPage ?? true}
        onAction={handleAction}
        currentPage={currentStep}
        progressBar={progressPercent}
      />
    </div>
  );
};

export default WLFlowOne;

"use client";

import React from "react";
import { useEDFlowTwo } from "./hooks/useEDFlowTwo";
import { quizConfig } from "./config/quizConfig";
import GenericPopup from "../components/GenericPopup";
import QuestionnaireNavbar from "../../../EdQuestionnaire/QuestionnaireNavbar";
import { ProgressBar } from "../../../EdQuestionnaire/ProgressBar";
import QuizStepRenderer from "./QuizStepRenderer";
import { logger } from "@/utils/devLogger"; 

const getPopupConfigWithChosenValue = (popupKey, userData) => {

  //logger.log("Generating popup config for key:", popupKey);
  if(popupKey === "WantSomeThing"){
    logger.log("User Data in WantSomeThing popup:", userData);
    const popupConfig = quizConfig.popups[popupKey];
   var content = popupConfig.content.replace("[how-often]", userData.sexFrequency || "");
      content = content.replace("[goalsForBetterSex]", userData.goalsForBetterSex || "");
      content = content.replace("[medicationTiming]", userData.medicationTiming == "long-lasting" ? "take daily to stay sex-ready for up to 36 hours" : "As-needed before sex" || "");
    return { ...popupConfig, content };
  }

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
      const chosenOption = quizConfig.steps[6].options.find(
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

const EDFlowTwo = () => {
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
  } = useEDFlowTwo();


  const activePopupConfig = activePopup
    ? typeof activePopup === "string"
      ? getPopupConfigWithChosenValue(activePopup, userData)
      : activePopup
    : null;

  if (activePopup && (activePopupConfig?.asPage ?? true)) {
    return (
      <GenericPopup
        isOpen={!!activePopup}
        onClose={closePopup}
        popupConfig={activePopupConfig}
        asPage={activePopupConfig?.asPage ?? true}
        onAction={handleAction}
        currentPage={currentStep}
      />
    );
  }

  return (
    <div className="min-h-screen">
      {/* QuestionnaireNavbar */}
      <QuestionnaireNavbar onBackClick={handleBack} currentPage={currentStep} />
      {/* Progress Bar - Hide for recommendation step */}
      {currentStep !== 8 && (
        <div className="pt-4 pb-6">
          <ProgressBar progress={progressPercent} />
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
      />
    </div>
  );
};

export default EDFlowTwo;

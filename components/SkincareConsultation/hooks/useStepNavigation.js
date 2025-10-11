import { useState, useEffect } from "react";

export const useStepNavigation = (quizConfig, initialStep = 1) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [progressPercent, setProgressPercent] = useState(
    quizConfig.progressMap[initialStep] || 0
  );

  const goToStep = (stepNumber) => {
    setCurrentStep(stepNumber);
    setProgressPercent(quizConfig.progressMap[stepNumber] || 0);
  };

  const getNextStep = (userData) => {
    const stepConfig = quizConfig.steps[currentStep];

    if (stepConfig?.conditionalNavigation) {
      const userValue = userData[stepConfig.field];
      const nextStep = stepConfig.conditionalNavigation[userValue];
      if (nextStep) return nextStep;
    }

    return quizConfig.navigation[currentStep] || currentStep + 1;
  };

  const handleContinue = (userData) => {
    const nextStep = getNextStep(userData);
    goToStep(nextStep);
  };

  const handleBack = () => {
    const prevStep = currentStep - 1;
    goToStep(prevStep);
  };

  return {
    currentStep,
    progressPercent,
    goToStep,
    handleContinue,
    handleBack,
  };
};

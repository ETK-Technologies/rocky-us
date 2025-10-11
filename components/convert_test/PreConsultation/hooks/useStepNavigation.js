import { useState } from "react";
import { isUserAuthenticated } from "@/utils/crossSellCheckout";


// Add isAuthenticated param to control step skipping
export const useStepNavigation = (quizConfig) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [progressPercent, setProgressPercent] = useState(
    quizConfig.progressMap[1] || 0
  );
  // History stack of visited steps to support accurate "Back" behavior
  const [history, setHistory] = useState([]);


  const isAuthenticated = isUserAuthenticated();




  // Helper to check if a step should be skipped
  const shouldSkipStep = (stepNumber) => {
    const step = quizConfig.steps[stepNumber];
    if (!step) return false;
    if (step.passIf === "authenticate" && isAuthenticated) return true;
    return false;
  };

  // Find the next eligible step (forward)
  const findNextStep = (startStep, userData) => {
    let nextStep = startStep;
    while (shouldSkipStep(nextStep)) {
      // Use conditionalNavigation if present
      const stepConfig = quizConfig.steps[nextStep];
      let candidate = quizConfig.navigation[nextStep] || nextStep + 1;
      if (stepConfig?.conditionalNavigation) {
        const userValue = userData?.[stepConfig.field];
        const condNav = stepConfig.conditionalNavigation[userValue];
        if (condNav) candidate = condNav;
      }
      nextStep = candidate;
    }
    return nextStep;
  };

  // Find the previous eligible step (backward)
  const findPrevStep = (startStep) => {
    let prevStep = startStep;
    while (shouldSkipStep(prevStep) && prevStep > 1) {
      prevStep = prevStep - 1;
    }
    return prevStep;
  };

  const goToStep = (stepNumber, userData) => {
    if (stepNumber === currentStep) return;
    // push current step to history so Back can return here
    setHistory((h) => [...h, currentStep]);

    const eligibleStep = shouldSkipStep(stepNumber)
      ? findNextStep(stepNumber, userData)
      : stepNumber;

    setCurrentStep(eligibleStep);
    setProgressPercent(quizConfig.progressMap[eligibleStep] || 0);
  };

  const getNextStep = (userData) => {
    const stepConfig = quizConfig.steps[currentStep];

    if (stepConfig?.conditionalNavigation) {
      const userValue = userData[stepConfig.field];
      const nextStep = stepConfig.conditionalNavigation[userValue];
      if (nextStep) return findNextStep(nextStep, userData);
    }

    const candidate = quizConfig.navigation[currentStep] || currentStep + 1;
    return findNextStep(candidate, userData);
  };

  const handleContinue = (userData) => {
    const nextStep = getNextStep(userData);
    if (nextStep === currentStep) return;
    // record current step so Back returns here
    setHistory((h) => [...h, currentStep]);
    setCurrentStep(nextStep);
    setProgressPercent(quizConfig.progressMap[nextStep] || 0);
  };

  const handleBack = (userData) => {
    // If we have a history stack, pop the last visited step and go there
    if (history.length > 0) {
      const last = history[history.length - 1];
      setHistory((h) => h.slice(0, -1));
      setCurrentStep(last);
      setProgressPercent(quizConfig.progressMap[last] || 0);
      return;
    }

    // Fallback: walk backward to previous non-skipped step
    const prevStep = findPrevStep(currentStep - 1);
    setCurrentStep(prevStep);
    setProgressPercent(quizConfig.progressMap[prevStep] || 0);
  };

  return {
    currentStep,
    progressPercent,
    goToStep,
    handleContinue,
    handleBack,
  };
};

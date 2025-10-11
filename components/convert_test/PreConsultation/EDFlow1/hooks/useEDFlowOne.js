import { useStepNavigation } from "../../hooks/useStepNavigation";
import { useQuizData } from "../../hooks/useQuizData";
import { quizConfig } from "../config/quizConfig";

export const useEDFlowOne = () => {
  const {
    currentStep,
    progressPercent,
    goToStep,
    handleContinue: baseHandleContinue,
    handleBack,
  } = useStepNavigation(quizConfig);

  const {
    userData,
    setUserData,
    activePopup,
    selectedProduct,
    setSelectedProduct,
    handleAction: baseHandleAction,
    closePopup,
    handleRecommendationContinue: baseHandleRecommendationContinue,
  } = useQuizData();

  const handleContinue = () => {
    baseHandleContinue(userData);
  };

  const handleAction = (action, payload) => {
    if (action === "navigate") {
      goToStep(payload);
    } else {
      baseHandleAction(action, payload, handleContinue);
    }
  };

  const handleRecommendationContinue = () => {
    baseHandleRecommendationContinue();
    goToStep(18); // Completion step
  };

  return {
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
  };
};

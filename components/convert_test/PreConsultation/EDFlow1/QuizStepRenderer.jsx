"use client";

import React, { useEffect } from "react";
import { quizConfig } from "./config/quizConfig";
import GenericQuestionStep from "../components/GenericQuestionStep";
import { getProductRecommendation } from "../utils/recommendationEngine";
import EDRecommendationStep from "../components/EDRecommendationStep";
import EdProductCard from "../components/EdProductCard";
import { QuizProvider, useQuiz } from "../../QuizContext";

const InnerRenderer = ({
  currentStep,
  userData,
  setUserData,
  selectedProduct,
  setSelectedProduct,
  handleContinue,
  handleAction,
  handleRecommendationContinue,
}) => {
  const stepConfig = quizConfig.steps[currentStep];

  // Sync userData into context answers when userData changes
  const { setAnswers } = useQuiz();
  useEffect(() => {
    if (userData) setAnswers(userData);
  }, [userData, setAnswers]);

  // Handle recommendation step (step 10)
  if (currentStep === 10) {
    const recommendation = getProductRecommendation(
      userData,
      quizConfig.recommendationRules
    );

    console.log("Recommendation:", recommendation);

    return (
      <EDRecommendationStep
        {...recommendation}
        selectedProduct={selectedProduct}
        selectedPreference={recommendation.selectedPreference}
        setSelectedProduct={setSelectedProduct}
        onContinue={handleRecommendationContinue}
        ProductCard={EdProductCard}
        showAlternatives={true}
        showIncluded={false}
        userData={userData}
        setUserData={setUserData}
      />
    );
  }

  // Handle completion or invalid step
  if (!stepConfig) {
    return (
      <div className="w-full md:w-[520px] mx-auto px-5 md:px-0 mt-6">
        <h1 className="mb-4 headers-font text-[26px] font-[450] md:font-medium md:text-[32px] md:leading-[115%] leading-[120%] tracking-[-1%] md:tracking-[-2%] text-[#C19A6B]">
          Thank you for completing the questionnaire!
        </h1>
        <p className="text-gray-600 mb-6">
          Please check your cart or continue shopping.
        </p>
      </div>
    );
  }

  // Handle regular quiz steps
  return (
    <GenericQuestionStep
      stepConfig={stepConfig}
      userData={userData}
      setUserData={setUserData}
      onContinue={handleContinue}
      onAction={handleAction}
    />
  );
};

const QuizStepRenderer = (props) => {
  // Provide the quiz context for inner components
  return (
    <QuizProvider>
      <InnerRenderer {...props} />
    </QuizProvider>
  );
};

export default QuizStepRenderer;

"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { quizConfig } from "./config/quizConfig";
import GenericQuestionStep from "../components/GenericQuestionStep";
import { QuizProvider, useQuiz } from "../../QuizContext";
import { logger } from "@/utils/devLogger";
import {
  EDProducts,
  findEDProductByVariation,
} from "../data/PreConsultationProductsData";
import Loader from "@/components/Loader";

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
  const {
    setAnswers,
    setSelectedDosage,
    setSelectedProduct: ctxSetSelectedProduct,
  } = useQuiz();
  useEffect(() => {
    if (userData) setAnswers(userData);
  }, [userData, setAnswers]);

  // Handle recommendation step (step 2)
  const router = useRouter();

  // When we reach the designated step, wait 2s then navigate to /payment
  useEffect(() => {
    if (currentStep !== 4) return;

    const selectedProd = JSON.parse(
      localStorage.getItem("flow_cart_products") || "{}"
    )?.mainProduct;

    try {
      // Use functional updater to derive the new userData, then persist it.
      setUserData((prev) => {
        const next = { ...(prev || {}), selected_product: selectedProd };
        try {
          localStorage.setItem(
            "quiz_and_selected_product",
            JSON.stringify(next)
          );
        } catch (e) {
          // ignore localStorage errors
        }
        return next;
      });
    } catch (e) {
      logger.error("Failed to merge selectedProduct into userData:", e);
    }

    logger.log("Selected product from localStorage:", selectedProd);
    localStorage.removeItem("ed_onboarding_payload");
    const id = setTimeout(async () => {
      router.push("/almost");
    }, 2000);

    return () => clearTimeout(id);
  }, [currentStep, router]);

  if (currentStep === 4) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/80">
        <Loader />
      </div>
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

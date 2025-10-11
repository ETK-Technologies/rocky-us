import React, { createContext, useContext, useState, useEffect } from "react";

const QuizContext = createContext(null);

export const QuizProvider = ({ children, initialAnswers = {} }) => {
  const [answers, setAnswers] = useState(() => {
    try {
      const fromSession = sessionStorage.getItem("ed_quiz_answers");
      if (fromSession) return JSON.parse(fromSession);
    } catch (e) {
      // ignore
    }
    return initialAnswers || {};
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedDosage, setSelectedDosage] = useState(null);

  // persist answers and selection so other pages can read them (almost/checkout)
  useEffect(() => {
    try {
      sessionStorage.setItem("ed_quiz_answers", JSON.stringify(answers));
    } catch (e) {
      // ignore
    }
  }, [answers]);

  useEffect(() => {
    try {
      const payload = JSON.parse(sessionStorage.getItem("ed_onboarding_payload") || "null");
      const merged = {
        ...(payload || {}),
        selectedProduct: selectedProduct || (payload && payload.productName ? { name: payload.productName } : null),
        selectedDosage: selectedDosage || (payload && payload.dosage ? payload.dosage : null),
        answers,
      };
      sessionStorage.setItem("ed_onboarding_payload", JSON.stringify(merged));
    } catch (e) {
      // ignore
    }
  }, [selectedProduct, selectedDosage, answers]);

  return (
    <QuizContext.Provider
      value={{ answers, setAnswers, selectedProduct, setSelectedProduct, selectedDosage, setSelectedDosage }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const ctx = useContext(QuizContext);
  if (!ctx) {
    // Graceful fallback: return no-op setters so components can render
    // even when not wrapped by QuizProvider (useful in isolation or tests).
    return {
      answers: null,
      setAnswers: () => {},
      selectedProduct: null,
      setSelectedProduct: () => {},
      selectedDosage: null,
      setSelectedDosage: () => {},
    };
  }
  return ctx;
};

export default QuizContext;

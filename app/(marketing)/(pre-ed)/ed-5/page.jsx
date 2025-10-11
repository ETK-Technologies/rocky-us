"use client";

import { useState, useCallback } from "react";
import HowRockyWorks from "@/components/HowRockyWorks";
import {
  HeroSection,
  FirstQuestion,
  Question,
  SuccessMessage,
  ComparisonTable,
  StatisticsSection,
  Header,
  PillSlider,
  QUESTIONS_DATA,
} from "@/components/PreLanders/ed-5";

export default function ED5() {
  const [answers, setAnswers] = useState({});

  const handleOptionSelect = useCallback((questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));

    const nextQuestionId = questionId + 1;
    if (nextQuestionId <= QUESTIONS_DATA.length) {
      const nextQuestion = document.getElementById(
        `question-${nextQuestionId}`
      );
      if (nextQuestion) {
        nextQuestion.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      const successMessage = document.getElementById("success-message");
      if (successMessage) {
        successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-[1184px] mx-auto px-5 py-10 ">
        <div className="flex flex-col md:flex-row mb-16 relative md:overflow-visible">
          <HeroSection />
          <FirstQuestion
            question={QUESTIONS_DATA[0]}
            answers={answers}
            onOptionSelect={handleOptionSelect}
          />
        </div>

        {QUESTIONS_DATA.slice(1).map((question) => (
          <Question
            key={question.id}
            question={question}
            answers={answers}
            onOptionSelect={handleOptionSelect}
          />
        ))}

        <SuccessMessage />

        <PillSlider />

        <ComparisonTable />

        <StatisticsSection />

        <HowRockyWorks />
      </main>
    </div>
  );
}

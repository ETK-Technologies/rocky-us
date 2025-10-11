"use client";

import { useCallback, useRef, useState } from "react";
import { logger } from "@/utils/devLogger";
import Question from "@/components/convert_test/Quizzes/Question";
import QHeroSection from "@/components/convert_test/Quizzes/QHeroSection";
import Section from "@/components/utils/Section";
import GoodNews from "@/components/convert_test/Quizzes/GoodNews";
import HowRockyWorks from "@/components/HowRockyWorks";
import StatisticsSection from "@/components/convert_test/Quizzes/StatisticsSection";
import ComparisonTable from "@/components/convert_test/Quizzes/ComparisonTable";

const Questions = [
  {
    id: 1,
    title: "How do you want to improve your sex life?",
    options: [
      { id: "stronger", label: "Stronger erections" },
      { id: "longer", label: "Longer sex" },
      { id: "both", label: "Both" },
    ],
  },
  {
    id: 2,
    title: "Are you looking to boost your confidence in the bedroom?",
    options: [
      { id: "Yes", label: "Yes" },
      { id: "not_sure", label: "I’m not sure" },
    ],
  },
  {
    id: 3,
    title:
      "Do you want your treatment Shipped Free of Charge and in discreet packaging?",
    options: [
      { id: "yes", label: "Yes definitely" },
      { id: "dosenot", label: "Doesn’t matter" },
    ],
  },
  {
    id: 4,
    title: "Are you ready to Reclaim your sex life?",
    options: [
      { id: "Yes", label: "Yes" },
      { id: "not_sure", label: "I’m not sure" },
    ],
  },
];

const ProductImages = [
  "/pre_ed/prod_1.png",
  "/pre_ed/prod_2.png",
  "/pre_ed/prod_3.png",
  "/pre_ed/prod_1.png",
  "/pre_ed/prod_2.png",
  "/pre_ed/prod_3.png",
  "/pre_ed/prod_1.png",
  "/pre_ed/prod_2.png",
  "/pre_ed/prod_3.png",
  "/pre_ed/prod_1.png",
  "/pre_ed/prod_2.png",
  "/pre_ed/prod_3.png",
  "/pre_ed/prod_1.png",
  "/pre_ed/prod_2.png",
  "/pre_ed/prod_3.png",
];

export default function EDQuiz2() {
  const [answers, setAnswers] = useState({});

  const handleOptionSelect = useCallback((questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));

    const nextQuestionId = parseInt(questionId) + 1;

    logger.log("Next Question ID:", nextQuestionId);
    if (nextQuestionId <= Questions.length) {
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
    <>
      <QHeroSection
        img="/pre_ed/hero_sec1.png"
        hero_class="lg:w-full lg:h-[800px] rounded-0"
        firstQuestion={Questions[0]}
        total_questions={Questions.length}
        answers={answers}
        onOptionSelect={handleOptionSelect}
        hero_title="Trusted Treatments For Better Sex"
        hero_description="Personalised ED treatment options approved by licensed providers—delivered discreetly."
      />
      {Questions.slice(1).map((question, index) => (
        <Section key={question.id}>
          <Question
            no={question.id}
            total_question={Questions.length}
            title={question.title}
            options={question.options}
            answers={answers}
            onOptionSelect={handleOptionSelect}
          />
        </Section>
      ))}

      <Section>
        <GoodNews products={ProductImages} goTo="/ed-flow"></GoodNews>
      </Section>

      <StatisticsSection to="/ed-flow" />

      <Section>
        <ComparisonTable to="/ed-flow"></ComparisonTable>
      </Section>

      <Section>
        <HowRockyWorks />
      </Section>
    </>
  );
}

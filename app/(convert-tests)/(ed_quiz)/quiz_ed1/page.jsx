"use client";

import { useCallback, useRef, useState } from "react";
import Question from "@/components/convert_test/Quizzes/Question";
import QHeroSection from "@/components/convert_test/Quizzes/QHeroSection";
import Section from "@/components/utils/Section";
import GoodNews from "@/components/convert_test/Quizzes/GoodNews";


const Questions = [
  {
    id: 1,
    title: "Why do you want to lose weight?",
    options: [
      { id: "improve", label: "Improve overall health" },
      { id: "fell_better", label: "Feel better about my body" },
      { id: "my_best", label: "Look my best for an upcoming event" },
      { id: "all", label: "All of the above" },
    ],
  },
  {
    id: 2,
    title: "How much weight do you want to lose?",
    options: [
      { id: "<20lbs", label: "<20lbs" },
      { id: "21-50lbs", label: "21-50lbs" },
      { id: "51+ lbs", label: "51+ lbs" },
      { id: "Not sure yet", label: "Not sure yet" },
    ],
  },
  {
    id: 3,
    title: "Which weight loss medications are you interested in?",
    options: [
      { id: "Compounded", label: "Compounded semaglutide injection" },
      { id: "GLP-1", label: "GLP-1 injections (Ozempic®, Wegovy®)" },
      { id: "I", label: "I want a provider recommendation" },
    ],
  },
  {
    id: 4,
    title: "What do you value the most in your weight loss journey?",
    options: [
      { id: "Ongoing", label: "Ongoing support from licensed providers" },
      { id: "Privacy", label: "Privacy & 100% online" },
      { id: "Personalized", label: "Personalized weight loss advice" },
      { id: "All", label: "All of the above" },
    ],
  },
];

export default function EDQuiz1() {
  const [answers, setAnswers] = useState({});

  const handleOptionSelect = useCallback((questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));

   

    const nextQuestionId = parseInt(questionId) + 1;

    console.log("Next Question ID:", nextQuestionId);
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
        img="/bo3/WLQHero.jpg"
        firstQuestion={Questions[0]}
        total_questions={Questions.length}
        answers={answers}
        onOptionSelect={handleOptionSelect}
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
        <GoodNews></GoodNews>
      </Section>
     
    </>
  );
}

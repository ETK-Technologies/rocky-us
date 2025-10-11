"use client";

import { logger } from "@/utils/devLogger";
import BO3MoneyBack from "@/components/convert_test/BO3/BO3MoneyBack";
import RockyDifference from "@/components/convert_test/BO3/RockyDifference";
import { useCallback, useRef, useState } from "react";
import Question from "@/components/convert_test/Quizzes/Question";
import WLQHeroSection from "@/components/convert_test/Quizzes/QHeroSection";
import ReviewsSection from "@/components/ReviewsSection";
import Section from "@/components/utils/Section";
import GoodNews from "@/components/convert_test/Quizzes/GoodNews";
import WLWork from "@/components/convert_test/BO3/WLWork";
import LoseUp from "@/components/convert_test/BO3/LoseUp";

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
      { id: "glp-1", label: "GLP-1 injections" },
      { id: "oral", label: "Oral Medication, no injections" },
      {
        id: "provide_recommendation",
        label: "I want a provider recommendation",
      },
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

const WeightLossProgramItems = [
  {
    id: "1",
    time: "",
    title: "Work with your body",
    description:
      "Traditional diets don’t work for everyone—genetics play a major role, influencing up to 70% of body weight. That’s why we combine GLP-1 treatments, nutrition, and personalized care to work with your body, not against it.",
  },
  {
    id: "2",
    time: "",
    title: "No restrictive dieting",
    description:
      "Restrictive diets fail because they fight your body, not support it. Instead of cutting out foods, we focus on nutrient-rich, balanced eating that fuels your metabolism and promotes lasting results.",
  },
  {
    id: "3",
    time: "",
    title: "Optimize overall wellbeing",
    description:
      "Our approach goes beyond just medications and the number on the scale. We focus on whole-body health—optimizing gut health, sleep, and movement to enhance energy, vitality, and long-term well-being.",
  },
  {
    id: "4",
    time: "",
    title: "Fits your schedule",
    description:
      "Traditional weight loss demands your life revolve around it. Our approach integrates seamlessly into your existing routine, with treatment plans and check-ins that adapt to your schedule, rather than the othey way around it.",
  },
];

const loseUpItems = [
  {
    id: "1",
    time: "Step 1",
    title: "Tell us about your health",
    description:
      "Tell us about your health and goals and complete lab work (or provide us with recent results). This initial comprehensive consultation ($99) will help us tailor advice specifically for you.",
  },
  {
    id: "2",
    time: "Step 2",
    title: "Take a lab test",
    description:
      "If you're a candidate for treatment, our clinician will provide you with the appropriate lab requisition or alternatively you can provide us with recent results.",
  },
  {
    id: "3",
    time: "Step 3",
    title: "Provider writes an Rx",
    description:
      "Your medication will arrive within 1-2 business days, free of charge. Sometimes it may take longer depending on where you live.",
  },
  {
    id: "4",
    time: "Step 4",
    title: "Ongoing care & support",
    description:
      "You'll have access to your clinician and the pharmacy team at all times should you have any questions.",
  },
];

export default function QuizWL2() {
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
      <WLQHeroSection
        img="/bo3/WLQHero.jpg"
        firstQuestion={Questions[0]}
        total_questions={Questions.length}
        answers={answers}
        onOptionSelect={handleOptionSelect}
        hero_title="Lose Weight Smarter, Not Harder"
        hero_description="Personalized weight loss plans that fit your goals and busy routine."
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

      <Section bg={"!py-0"}>
        <GoodNews></GoodNews>
      </Section>

      <LoseUp
        ProgramWorksData={loseUpItems}
        title="Lose Up to 25% of Body Weight in 4 Simple Steps"
        description="The comprehensive support you need to succeed in your weight loss journey."
      ></LoseUp>
      <WLWork
        ProgramWorksData={WeightLossProgramItems}
        showBtn={true}
        imgClass="rounded-2xl"
        title="Weight Loss That Works With Your Body & Schedule"
        description="It's not magic; it's metabolic science – with tailored treatments and evidence-based lifestyle advice that seamlessly fits into your schedule."
      />
      <Section bg="bg-[#F8F7F3]">
        <RockyDifference></RockyDifference>
      </Section>
      <Section>
        <ReviewsSection />
      </Section>
      <Section>
        <BO3MoneyBack></BO3MoneyBack>
      </Section>
    </>
  );
}

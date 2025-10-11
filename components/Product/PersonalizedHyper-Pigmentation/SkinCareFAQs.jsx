"use client";
import React from "react";
import dynamic from "next/dynamic";
import Section from "@/components/utils/Section";
import MoreQuestions from "@/components/MoreQuestions";

// Dynamically import the FAQ section component
const DynamicFaqsSection = dynamic(() => import("@/components/FaqsSection"), {
  loading: () => <div className="min-h-[200px] animate-pulse"></div>,
  ssr: false,
});

const SkinCareFAQs = () => {
  const faqs = [
    {
      question: "How is this different from other acne treatments?",
      answer:
        "Our personalized creams are dermatologist-formulated and tailored to your skin's specific needs using pharmaceutical-grade ingredients. Unlike one-size-fits-all products, it combines multiple clinically backed actives in one prescription-strength formula for comprehensive, personalized acne care.",
    },
    {
      question: "What types of acne does it treat?",
      answer:
        "It targets all major forms of acne including whiteheads, blackheads, inflammatory pimples, and hormonal breakouts. It also helps fade dark spots and prevent future flare-ups.",
    },
    {
      question: "Will it irritate my skin?",
      answer:
        "Some initial dryness or irritation can be normal, especially with ingredients like tretinoin. However, your formula is customized to your skin type and tolerance to minimize side effects. Always follow with a gentle moisturizer and SPF during the day.",
    },
    {
      question: "When will I start seeing results?",
      answer:
        "Some users see improvements within 2–4 weeks, but clearer skin and reduced hyperpigmentation typically become more noticeable by 6–12 weeks with consistent use.",
    },
    {
      question: "Can I use it with my other skincare products?",
      answer:
        "Yes, but it's best to keep your routine simple. Use a gentle cleanser, moisturizer, and sunscreen. Avoid layering other active treatments (like AHAs or strong exfoliants) unless directed by your provider.",
    },
    {
      question: "Do I need a prescription to order it?",
      answer:
        "No in-person visit is required. You'll complete a quick online consultation reviewed by licensed healthcare providers, who will customize your formula and prescribe it if appropriate.",
    },
  ];

  return (
    <Section>
      <DynamicFaqsSection
        title="Frequently asked questions"
        faqs={faqs}
        name="RX Custom Acne Cream"
      />
    </Section>
  );
};

export default SkinCareFAQs;

"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CustomHeader from "@/components/Navigation/CustomHeader";
import StepNavigation from "@/components/Navigation/StepNavigation";
import HairProducts from "@/components/Hair/HairProducts";
import FaqsSection from "@/components/FaqsSection";

// Create a client component that uses useSearchParams
function HairFlowContent() {
  // Get the query parameters from the URL
  const searchParams = useSearchParams();
  const onboarding = searchParams.get("onboarding");
  const showonly = searchParams.get("showonly");

  // FAQs data for the Hair Flow page
  const hairFaqs = [
    {
      question: "What causes hair loss?",
      answer:
        "Hair loss can be caused by genetics (male pattern baldness), hormonal changes, medical conditions, medications, stress, and certain hair treatments or styling practices. Male pattern baldness, the most common cause, is related to genetics and male hormones.",
    },
    {
      question: "How do hair loss medications work?",
      answer:
        "Medications like Finasteride (Propecia) work by blocking the conversion of testosterone to DHT, a hormone that contributes to hair loss. Minoxidil (Rogaine) works by increasing blood flow to the hair follicles and prolonging the growth phase of hair.",
    },
    {
      question:
        "How long does it take to see results with hair loss treatments?",
      answer:
        "Most hair loss treatments require at least 3-6 months of consistent use before noticeable results. Full results typically take 12 months or longer. It's important to be patient and consistent with treatment.",
    },
    {
      question: "Are there any side effects with hair loss medications?",
      answer:
        "Finasteride may cause sexual side effects in a small percentage of men, including decreased libido and erectile dysfunction. Minoxidil may cause scalp irritation, unwanted hair growth elsewhere on the body, or initial shedding. Most side effects are mild and temporary.",
    },
    {
      question: "Can I use multiple hair loss treatments together?",
      answer:
        "Yes, combining treatments like Finasteride and Minoxidil can be more effective than using either treatment alone. They work through different mechanisms, so they can complement each other for better results.",
    },
  ];

  // State for steps navigation
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Step labels for the Hair flow
  const stepLabels = ["Choose Plan", "Consultation", "Checkout"];

  // Handle step click if we want steps to be clickable
  const handleStepClick = (step) => {
    // Only allow navigating to steps that have been completed or are next
    if (step <= currentStep + 1) {
      setCurrentStep(step);
    }
  };

  return (
    <div className="hair-flow flex flex-col min-h-screen">
      {/* Use our CustomHeader component */}
      {/* <CustomHeader
        logoUrl="https://myrocky.ca/wp-content/uploads/2022/03/Rocky-Mens-Wellness-copy-4-1-300x120-1.png"
        logoAlt="Rocky Men's Wellness"
      /> */}

      {/* Use our StepNavigation component */}
      <StepNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepLabels={stepLabels}
        onStepClick={handleStepClick}
      />

      {/* Main Content */}
      <main className="flex-grow bg-white">
        <div className="max-w-[1184px] mx-auto px-5 py-10">
          {/* Hair Products Section */}
          <HairProducts />

          {/* FAQs Section */}
          <div className="mt-16">
            <FaqsSection
              title="Frequently Asked Questions"
              subtitle=""
              faqs={hairFaqs}
            />
          </div>
        </div>
      </main>

      {/* No footer as requested */}
    </div>
  );
}

// Fallback component to show during loading
function HairFlowFallback() {
  return (
    <div className="hair-flow flex flex-col min-h-screen">
      <div className="flex-grow flex items-center justify-center">
        <p className="text-xl">Loading Hair Flow...</p>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
const HairFlowPage = () => {
  return (
    <Suspense fallback={<HairFlowFallback />}>
      <HairFlowContent />
    </Suspense>
  );
};

export default HairFlowPage;

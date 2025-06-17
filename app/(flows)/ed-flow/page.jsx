"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CustomHeader from "@/components/Navigation/CustomHeader";
import StepNavigation from "@/components/Navigation/StepNavigation";
import EdProducts from "@/components/EDPlans/EdProducts";
import FaqsSection from "@/components/FaqsSection";
import { EdFlowScripts } from "@/components/VisiOpt";

// Create a client component that uses useSearchParams
function EdFlowContent() {
  // Get the query parameters from the URL
  const searchParams = useSearchParams();
  const onboarding = searchParams.get("onboarding");
  const showonly = searchParams.get("showonly");

  // FAQs data for the ED Flow page
  const edFaqs = [
    {
      question: "What is ED?",
      answer:
        "Erectile dysfunction (ED) is the inability to get or maintain an erection firm enough for sexual activity. It's a common condition affecting millions of men, particularly as they age.",
    },
    {
      question: "How do ED medications work?",
      answer:
        "ED medications like Sildenafil (Viagra) and Tadalafil (Cialis) work by enhancing the effects of nitric oxide, a chemical your body produces that relaxes muscles in the penis. This increases blood flow and allows you to achieve an erection in response to sexual stimulation.",
    },
    {
      question: "Are ED medications safe?",
      answer:
        "When prescribed by a healthcare provider and used as directed, ED medications are generally safe for most men. However, they may not be suitable for everyone, especially those with certain health conditions or who take specific medications.",
    },
    {
      question: "How long do ED medications last?",
      answer:
        "The duration varies by medication. Sildenafil (Viagra) typically lasts 4-6 hours, while Tadalafil (Cialis) can last up to 36 hours, earning it the nickname 'the weekend pill.'",
    },
    {
      question: "What are the possible side effects?",
      answer:
        "Common side effects may include headache, facial flushing, indigestion, nasal congestion, and mild temporary vision changes. Most side effects are mild and temporary.",
    },
  ];

  // State for steps navigation
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Step labels for the ED flow
  const stepLabels = ["Choose Plan", "Consultation", "Checkout"];

  // Handle step click if we want steps to be clickable
  const handleStepClick = (step) => {
    // Only allow navigating to steps that have been completed or are next
    if (step <= currentStep + 1) {
      setCurrentStep(step);
    }
  };
  return (
    <div className="ed-flow flex flex-col min-h-screen">
      {/* Use our new CustomHeader component */}
      {/* <CustomHeader
        logoUrl="https://myrocky.ca/wp-content/uploads/2022/03/Rocky-Mens-Wellness-copy-4-1-300x120-1.png"
        logoAlt="Rocky Men's Wellness"
      /> */}

      {/* Use our new StepNavigation component */}
      <StepNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepLabels={stepLabels}
        onStepClick={handleStepClick}
      />

      {/* Main Content */}
      <main className="flex-grow bg-white">
        <div className="max-w-[1184px] mx-auto px-5 py-10">
          {/* ED Products Section - Pass the filter parameter */}
          <EdProducts showonly={showonly} />

          {/* FAQs Section */}
          <div className="mt-16">
            <FaqsSection
              title="Frequently Asked Questions"
              subtitle=""
              faqs={edFaqs}
            />
          </div>
        </div>
      </main>

      {/* No footer as requested */}

      {/* VisiOpt scripts for ED flow */}
      <EdFlowScripts />
    </div>
  );
}

// Fallback component to show during loading
function EdFlowFallback() {
  return (
    <div className="ed-flow flex flex-col min-h-screen">
      <div className="flex-grow flex items-center justify-center">
        <p className="text-xl">Loading ED Flow...</p>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
const EdFlowPage = () => {
  return (
    <Suspense fallback={<EdFlowFallback />}>
      <EdFlowContent />
    </Suspense>
  );
};

export default EdFlowPage;

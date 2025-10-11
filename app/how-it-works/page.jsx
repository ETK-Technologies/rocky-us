"use client";

import { useState } from "react";
import Section from "@/components/utils/Section";
import StepOne from "@/components/HRW/StepOne";
import StepTwo from "@/components/HRW/StepTwo";
import StepThree from "@/components/HRW/StepThree";
import MoreQuestions from "@/components/MoreQuestions";
import RockyHeroSection from "@/components/HRW/RockyHeroSection";

const HowRockyWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <RockyHeroSection />
      <Section>
        <StepOne activeStep={activeStep} setActiveStep={setActiveStep} />
        <br />
        <br />
        <StepTwo activeStep={activeStep} setActiveStep={setActiveStep} />
        <br />
        <br />
        <StepThree activeStep={activeStep} setActiveStep={setActiveStep} />
      </Section>
      <div className="pb-14 md:pb-24 max-w-[1184px] mx-auto">
        <MoreQuestions
          title="Your path to better health begins here."
          buttonText="Start Free Consultation"
          buttonWidth="md:w-[246px]"
          link="/assistance-center/"
        />
      </div>
    </>
  );
};
export default HowRockyWorks;

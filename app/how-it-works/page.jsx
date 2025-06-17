"use client";

import { useState } from "react";
import CustomImage from "@/components/utils/CustomImage";
import Section from "@/components/utils/Section";
import StepOne from "@/components/HRW/StepOne";
import StepTwo from "@/components/HRW/StepTwo";
import StepThree from "@/components/HRW/StepThree";
import MoreQuestions from "@/components/MoreQuestions";

const HowRockyWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <div className="bg-[#F5F4EF] relative">
        <div className="px-5 sectionWidth:px-0 pt-[52px] mb-14 md:pt-8 md:mb-[96px] max-w-[1184px] mx-auto h-[550px] md:h-[664px] flex flex-col md:justify-center">
          <div className="mb-10 md:mb-12 md:max-w-[635px]">
            <h1 className="capitalize text-[40px] md:text-[120px] leading-[115%] tracking-[-0.02em] mb-2 md:mb-4 headers-font">
              how Rocky Works
            </h1>
            <p className="text-[16px] font-[500] md:text-[20px] leading-[140%]">
              Healthcare on your terms. Get started in 3 easy steps.
            </p>
          </div>
        </div>
        <div className="absolute overflow-hidden -translate-x-2/4 left-2/4 md:translate-x-0 md:left-auto bottom-0 md:right-0 w-full  md:w-[700px] !h-[437px] md:!h-[664px]">
          <CustomImage
            className="object-[96px_32px] md:object-[34px_-1px] scale-110 md:scale-100"
            src="https://myrocky.b-cdn.net/WP%20Images/Global%20Images/hrw.webp"
            fill
          />
        </div>
      </div>
      <Section>
        <StepOne activeStep={activeStep} setActiveStep={setActiveStep} />
        <br />
        <br />
        <StepTwo activeStep={activeStep} setActiveStep={setActiveStep} />
        <br />
        <br />
        <StepThree activeStep={activeStep} setActiveStep={setActiveStep} />
      </Section>
      <div className="px-5 md:sectionWidth:px-0 pb-14 md:pb-24 max-w-[1184px] mx-auto">
        <MoreQuestions
          title="Your path to better health begins here."
          buttonText="Start Free Consultation"
          buttonWidth="md:w-[246px]"
          link="/assistance-center/"
        />
      </div>
      ;
    </>
  );
};
export default HowRockyWorks;

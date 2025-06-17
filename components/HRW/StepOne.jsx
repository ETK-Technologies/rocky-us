"use client";

import CustomImage from "@/components/utils/CustomImage";
import StepSection from "@/components/HRW/StepSection";
import VerticalLine from "@/components/HRW/VerticalLine ";

const StepOne = ({ activeStep, setActiveStep }) => {
  // const handleInViewChange = (stepIndex) => {
  //   if (activeStep !== stepIndex) setActiveStep(stepIndex);
  // };
  const handleInViewChange = (stepIndex) => {
    setActiveStep((prev) => (prev !== stepIndex ? stepIndex : prev));
  };
  return (
    <StepSection index={0} onInViewChange={handleInViewChange}>
      <div className=" md:hidden">
        <VerticalLine index={0} isActive={activeStep === 0} />
      </div>
      <div className="w-full flex flex-col gap-2 md:flex-row">
        {/* Left Text */}
        <div className="w-full md:w-1/2 space-y-4 md:mt-[30px]">
          <div className="w-full md:w-[524px]">
            <span className="text-[16px] leading-[140%] font-[500] text-[#A9764B] mb-2">
              Step 1
            </span>
            <h2 className="text-[24px] md:text-[40px] leading-[115%] tracking-[-0.01em] md:tracking-[-0.02em] mb-4 capitalize headers-font">
              Create a Profile
            </h2>
            <p className="text-[16px] md:text-[18px] leading-[140%] font-[400]">
              Set up your secure account with some personal details. You’ll need
              to complete a medical questionnaire only for prescription
              medications.
              <br />
              <br />
              For your safety, we’ll need to approve a government issued ID
              ensuring the medical team knows who they are treating. We take
              your privacy seriously- all data is securely stored on encrypted
              servers.
            </p>
          </div>
        </div>

        {/* Middle Line */}
        <div className="hidden md:block">
          <VerticalLine index={0} isActive={activeStep === 0} />
        </div>

        {/* Right Image */}
        <div className="relative overflow-hidden w-[299px] h-[299px] md:w-1/2 md:h-[524px] mt-[30px] ">
          <div className="absolute hrw-step1-gradient bottom-0 left-0 w-full h-full z-20"></div>
          <CustomImage
            src="https://myrocky.b-cdn.net/WP%20Images/Global%20Images/hrw-step1.webp"
            fill
            className="object-[-51px_7px] md:object-[-118px_20px] "
          />
        </div>
      </div>
    </StepSection>
  );
};
export default StepOne;

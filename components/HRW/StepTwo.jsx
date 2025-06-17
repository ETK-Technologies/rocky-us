"use client";

import StepSection from "@/components/HRW/StepSection";
import VerticalLine from "@/components/HRW/VerticalLine ";
import AutoScrollProductList from "./AutoScrollProductList";

const StepTwo = ({ activeStep, setActiveStep }) => {
  // const handleInViewChange = (stepIndex) => {
  //   if (activeStep !== stepIndex) setActiveStep(stepIndex);
  // };
  const handleInViewChange = (stepIndex) => {
    setActiveStep((prev) => (prev !== stepIndex ? stepIndex : prev));
  };
  return (
    <StepSection index={1} onInViewChange={handleInViewChange}>
      <div className=" md:hidden">
        <VerticalLine index={1} isActive={activeStep === 1} />
      </div>
      <div className="w-full flex flex-col-reverse gap-2 md:flex-row">
        {/* Left Image */}
        <div className="mt-[30px]  w-full md:w-1/2">
          <AutoScrollProductList />
        </div>

        {/* Middle Line */}
        <div className="hidden md:block">
          <VerticalLine index={1} isActive={activeStep === 1} />
        </div>

        {/* Right Text */}
        <div className="w-full md:w-1/2 space-y-4 md:mt-[30px]">
          <div className="w-full md:w-[524px]">
            <span className="text-[16px] leading-[140%] font-[500] text-[#A9764B] mb-2">
              Step 2
            </span>
            <h2 className="text-[24px] md:text-[40px] leading-[115%] tracking-[-0.01em] md:tracking-[-0.02em] mb-4 capitalize headers-font">
              Choose your products
            </h2>
            <p className="text-[16px] md:text-[18px] leading-[140%] font-[400]">
              We offer a comprehensive selection of prescription medications,
              over-the-counter solutions, and organic products, delivered
              directly to your door. Our process is designed to be simple,
              secure, and personalized to your needs.
              <br />
              <br />
              Have any questions? Our medical team provides personalized support
              whenever you need it.
            </p>
          </div>
        </div>
      </div>
    </StepSection>
  );
};
export default StepTwo;

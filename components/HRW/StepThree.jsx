"use client";

import { useState, useEffect } from "react";
import CustomImage from "@/components/utils/CustomImage";
import StepSection from "@/components/HRW/StepSection";
import VerticalLine from "@/components/HRW/VerticalLine ";

const images = [
  "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/hrw-step3-1.webp",
  "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/hrw-step3-2.webp",
  "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/hrw-step3-3.webp",
];

const StepThree = ({ activeStep, setActiveStep }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // const handleInViewChange = (stepIndex) => {
  //   if (activeStep !== stepIndex) {
  //     setActiveStep(stepIndex);
  //   }
  // };
  const handleInViewChange = (stepIndex) => {
    setActiveStep((prev) => (prev !== stepIndex ? stepIndex : prev));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   if (inView) {
  //     requestAnimationFrame(() => onInViewChange(index)); // debounce rendering issues
  //   }
  // }, [inView]);
  return (
    <StepSection index={2} onInViewChange={handleInViewChange}>
      <div className=" md:hidden">
        <VerticalLine index={2} isActive={activeStep === 2} />
      </div>
      <div className="w-full flex flex-col gap-2 md:flex-row">
        {/* Left Text */}
        <div className="w-full md:w-1/2 space-y-4 md:mt-[30px]">
          <div className="w-full md:w-[524px]">
            <span className="text-[16px] leading-[140%] font-[500] text-[#A9764B] mb-2">
              Step 3
            </span>
            <h2 className="text-[24px] md:text-[40px] leading-[115%] tracking-[-0.01em] md:tracking-[-0.02em] mb-4 capitalize headers-font">
              Fast & Free Delivery
            </h2>
            <p className="text-[16px] md:text-[18px] leading-[140%] font-[400]">
              Focus on your priorities while we handle the rest. Your package
              will arrive discreetly at your doorstep, with clear instructions
              and all the information you need to begin your treatment
              confidently.
            </p>
          </div>
        </div>

        {/* Middle Line */}
        <div className="hidden md:block">
          <VerticalLine index={2} isActive={activeStep === 2} />
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 relative h-[237px] md:h-[400px] flex items-center justify-center ">
          {images.map((img, idx) => {
            const isActive = idx === activeIndex;
            const position =
              idx === (activeIndex + 1) % 3
                ? "right-[30px] rotate-[15deg] opacity-80 z-10 "
                : idx === (activeIndex + 2) % 3
                ? "left-[30px] -rotate-[15deg] opacity-80 z-10 "
                : "left-2/4 -translate-x-2/4 z-20";

            const size = isActive
              ? "w-[192px] md:w-[332px] h-[192px] md:h-[332px]"
              : "w-[136px] md:w-[240px] h-[136px] md:h-[240px]";

            return (
              <div
                key={idx}
                className={`absolute rounded-[24px] overflow-hidden border-[8px] border-white shadow-[0px_6px_12px_0px_#00000029] transition-all duration-500 ${size} ${position}`}
              >
                <CustomImage src={img} fill />
              </div>
            );
          })}

          {/* Progress Tracker */}
          <div className="absolute bottom-[-30px] md:bottom-[-60px] w-full px-6">
            <div className="relative bg-white rounded-[12px] mx-auto w-[208px] md:w-[364px] h-[37] md:h-[57px] shadow-sm px-4">
              {/* Labels */}
              <div className="flex justify-between text-[8px] md:text-[12px] leading-[140%] font-[500] md:pt-3">
                <span
                  className={
                    activeIndex >= 0 ? "text-black" : "text-[#00000070]"
                  }
                >
                  Approved
                </span>
                <span
                  className={
                    activeIndex >= 1 ? "text-black" : "text-[#00000070]"
                  }
                >
                  Shipped
                </span>
                <span
                  className={
                    activeIndex >= 2 ? "text-black" : "text-[#00000070]"
                  }
                >
                  Delivered
                </span>
              </div>

              {/* Circles */}
              {/* Approved Dot */}
              <div
                className={`absolute bottom-3 left-3 w-[6px] md:w-2 h-[6px] md:h-2 rounded-full z-10 translate-y-1/2 ml-[2px] ${
                  activeIndex >= 0 ? "bg-[#AE7E56]" : "bg-[#E5DED7]"
                }`}
              />

              {/* Shipped Dot */}
              <div
                className={`absolute bottom-3 left-1/2 w-[6px] md:w-2 h-[6px] md:h-2 rounded-full z-10 translate-x-[-50%] translate-y-1/2 ${
                  activeIndex >= 1 ? "bg-[#AE7E56]" : "bg-[#E5DED7]"
                }`}
              />

              {/* Delivered Dot */}
              <div
                className={`absolute bottom-3 right-3 w-[6px] md:w-2 h-[6px] md:h-2 rounded-full z-10 translate-y-1/2 mr-[2px] ${
                  activeIndex >= 2 ? "bg-[#AE7E56]" : "bg-[#E5DED7]"
                }`}
              />

              {/* Line 1 */}
              <div className="absolute bottom-[11.5px] left-[23.5px] w-[83] md:w-[154px] h-[2px] bg-[#E5DED7] rounded z-0" />
              {activeIndex >= 1 && (
                <div className="absolute bottom-[11.5px] left-[23.5px] w-[83] md:w-[154px] h-[2px] bg-[#AE7E56] rounded z-10 transition-all duration-300" />
              )}

              {/* Line 2 */}
              <div className="absolute bottom-[11.5px] left-[calc(50%+5.5px)] w-[83] md:w-[154px] h-[2px] bg-[#E5DED7] rounded z-0" />
              {activeIndex >= 2 && (
                <div className="absolute bottom-[11.5px] left-[calc(50%+5.5px)] w-[83] md:w-[154px] h-[2px] bg-[#AE7E56] rounded z-10 transition-all duration-300" />
              )}
            </div>
          </div>
        </div>
      </div>
    </StepSection>
  );
};
export default StepThree;

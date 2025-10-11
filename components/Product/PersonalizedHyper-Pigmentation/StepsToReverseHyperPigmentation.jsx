"use client";

import React from "react";
import CustomImage from "@/components/utils/CustomImage";
import Section from "@/components/utils/Section";

const StepsToReverseHyperPigmentation = () => {
  const steps = [
    {
      step: "Step 1",
      title: "Wash Your Face",
      description:
        "At bedtime, cleanse your face using a mild cleanser that you prefer, then gently pat it dry.",
    },
    {
      step: "Step 2",
      title: "Apply With Your Fingertip",
      description:
        "Place a pea-sized amount on your fingertip and gently massage it into your face, avoiding the eye and lip areas.",
    },
    {
      step: "Step 3",
      title: "Finish With Moisturizer",
      description: "Follow with a gentle moisturizer to keep skin hydrated.",
    },
  ];

  return (
    <Section>
      {/* Desktop Layout - Two Columns */}
      <div className=" flex flex-col md:flex-row gap-12 md:gap-[80px] items-center md:justify-between md:px-[80px]">
        {/* Left Column - Text Content */}
        <div className="md:max-w-[438px]">
          <h2 className="text-[32px] md:text-[48px] text-black leading-tight headers-font mb-10 md:mb-[56px]">
            3 Steps To Your <br /> Best Skin
          </h2>

          <div className="space-y-[24px] md:space-y-[40px]">
            {steps.map((step) => (
              <div key={step.step}>
                <div className="flex items-center gap-[4px] mb-4">
                  <span className=" text-[#212121] text-[20px] md:text-[24px] headers-font ">
                    {step.step}:
                  </span>
                  <h3 className=" text-[#212121] text-[20px] headers-font ">
                    {step.title}
                  </h3>
                </div>
                <div>
                  <p className="text-[16px] font-[400] text-[#000000CC] ">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="relative w-full h-[447px] md:w-[480px] md:h-[640px] rounded-[16px] overflow-hidden">
          <CustomImage
            src="https://myrocky.b-cdn.net/Other%20Images/skin-care/steps-hyper.jpg"
            alt="Woman applying cream to her face"
            fill
          />
        </div>
      </div>
    </Section>
  );
};

export default StepsToReverseHyperPigmentation;

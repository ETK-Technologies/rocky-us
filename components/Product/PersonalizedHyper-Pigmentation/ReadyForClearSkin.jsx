import React from "react";
import CustomImage from "@/components/utils/CustomImage";
import { FaCheck } from "react-icons/fa";
import BrimaryButton from "@/components/ui/buttons/BrimaryButton";

const ReadyForClearSkin = () => {
  const features = [
    {
      title: "Clinically Tested",
      description:
        "All ingredients are backed by clinical research and proven effective for acne treatment.",
    },
    {
      title: "Dermatologist Reviewed",
      description:
        "Each formulation is carefully selected by a dermatologist to ensure it's safe, effective, and right for your skin",
    },
    {
      title: "Ongoing Support",
      description:
        "Regular check-ins and formula adjustments ensure your treatment evolves with your skin.",
    },
  ];

  return (
    <section className=" md:bg-desktop-aging-gradient overflow-hidden ">
      {/* Mobile Layout - Full Background Image */}
      <div className="lg:hidden relative w-full ">
        {/* Full-cover background image */}
        <div className="relative w-full h-[340px] bg-mobile-aging-gradient">
          <CustomImage
            src="https://myrocky.b-cdn.net/Other%20Images/skin-care/transform-aging-m.png"
            alt="Clear skin background"
            fill
            className={"object-[-18px] md:object-[0]"}
          />
        </div>

        {/* Content Section */}
        <div className="relative z-10 py-9 px-5 flex flex-col justify-end h-full bg-[#F5F4EF]">
          <h2 className="text-[32px] md:text-[40px] font-[550] leading-[115%] tracking-[-2%] mb-6 md:mb-12 headers-font text-black">
            Transform your skin, customized for you
          </h2>

          {/* Features List */}
          <div className="space-y-6 mb-7">
            {features.map((feature, index) => (
              <div key={index} className="flex  items-start gap-2">
                <div className="flex-shrink-0 w-[17px] h-[17px] bg-[#AE7E56] mt-[2px] rounded-full flex items-center justify-center">
                  <FaCheck className="text-white text-[10px]" />
                </div>
                <div className="max-w-[307px] md:max-w-max">
                  <h3 className="text-[16px] font-[500] leading-[140%] text-black mb-2 tracking-[0%]">
                    {feature.title}
                  </h3>
                  <p className="text-[14px] leading-[140%] text-[#000000CC] font-[400] tracking-[0%]">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Centered Get Started Button */}
          <BrimaryButton
            className="w-full bg-black text-white px-8 py-3 rounded-full text-[16px] font-[500] hover:bg-gray-800 transition-colors duration-200"
            href="/hyperpigmentation-consultation-quiz"
            arrowIcon={true}
          >
            Get Started today
          </BrimaryButton>
        </div>
      </div>

      <div className="hidden lg:flex relative h-[780px] justify-between  w-full">
        {/* Content Section */}
        <div className=" w-[480px] ml-[220px] mt-[110px]">
          <div className="flex justify-center items-center w-full">
            <div className="w-full">
              <h2 className="text-[48px] font-[550] leading-[115%] tracking-[-2%] mb-12 headers-font text-black md:max-w-[480px]">
                Transform your skin, customized for you
              </h2>

              {/* Features List */}
              <div className="mb-10">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 mb-[24px]">
                    <div className="flex-shrink-0 w-[21px] h-[21px] mt-[2px] bg-[#AE7E56] rounded-full flex items-center justify-center">
                      <FaCheck className="text-white text-xs" />
                    </div>
                    <div className="max-w-[448px]">
                      <h3 className="text-[18px] font-[500] leading-[140%] text-black mb-2 tracking-[0%]">
                        {feature.title}
                      </h3>
                      <p className="text-[16px] leading-[140%] text-[#000000CC] font-[400] tracking-[0%]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <BrimaryButton
                className="w-full max-w-[231px] bg-black text-white px-4 py-4 rounded-full text-[16px] font-[500] hover:bg-gray-800 transition-colors duration-200 leading-[140%]"
                href="/hyperpigmentation-consultation-quiz"
                arrowIcon={true}
              >
                Get Started today
              </BrimaryButton>
            </div>
          </div>
        </div>

        <div className="flex-1 h-full ">
          <CustomImage
            src="https://myrocky.b-cdn.net/Other%20Images/skin-care/transform-aging-d.png"
            alt="Clear skin background"
            width={500}
            height={700}
            className="object-[-30px]  h-full w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default ReadyForClearSkin;

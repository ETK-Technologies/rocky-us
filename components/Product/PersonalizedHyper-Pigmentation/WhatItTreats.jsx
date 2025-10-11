import React from "react";
import CustomImage from "@/components/utils/CustomImage";
import { FaCheckCircle } from "react-icons/fa";
import Section from "@/components/utils/Section";

const WhatItTreats = () => {
  return (
    <Section>
      <div className="flex flex-col items-center gap-8 md:flex-row max-w-[998px] mx-auto md:gap-[80px] ">
        {/* Content */}
        <div className="w-full md:w-[459px] md:h-[435px]">
          <h2 className="text-[32px] md:text-[48px] font-[550] leading-[110%] tracking-[-2%] headers-font text-black mb-6">
            What It Treats
          </h2>

          <p className="text-[16px] md:text-[18px] leading-[140%] tracking-[0%] pr-4 md:pr-0  mb-6">
            Our <span className="font-[500]">Hyperpigmentation Cream </span> is
            <span className="font-[500]">
              {" "}
              expertly formulated by dermatologists
            </span>{" "}
            to target{" "}
            <span className="font-[500]">
              dark spots and uneven skin tone,{" "}
            </span>
            using a powerful combination of{" "}
            <span className="font-[500]">clinically backed ingredients</span>
          </p>

          {/* Benefits List */}
          <ul className="md:max-w-[459px]">
            <li className=" flex items-start justify-start  gap-2 mb-4 md:mb-[24px]">
              <div className=" mt-1">
                <FaCheckCircle
                  width={20}
                  height={20}
                  className="text-[#AE7E56]"
                />
              </div>
              <p className="text-[14px] md:text-[18px] leading-[140%] tracking-[0%] font-normal max-w-[307px] md:max-w-max">
                <span className="font-[500]">Fades dark spots</span> for a more
                even skin tone
              </p>
            </li>
            <li className=" flex items-start justify-start  gap-2 mb-4 md:mb-[24px]">
              <div className=" mt-1">
                <FaCheckCircle
                  width={20}
                  height={20}
                  className="text-[#AE7E56]"
                />
              </div>

              <p className="text-[14px] md:text-[18px] leading-[140%] tracking-[0%] font-normal max-w-[307px] md:max-w-max">
                <span className="font-[500]">Boosts skin cell turnover</span> to
                replace discoloured surface cells with healthy ones
              </p>
            </li>
            <li className=" flex items-start justify-start gap-2 mb-4">
              <div className=" mt-1">
                <FaCheckCircle
                  width={20}
                  height={20}
                  className="text-[#AE7E56]"
                />
              </div>

              <p className="text-[14px] md:text-[18px] leading-[140%] tracking-[0%] font-normal max-w-[307px] md:max-w-max">
                <span className="font-[500]">Brightens complexion</span> and
                restores natural radiance
              </p>
            </li>
            <li className=" flex items-start justify-start  gap-2 mb-4 md:mb-[24px]">
              <div className=" mt-1">
                <FaCheckCircle
                  width={20}
                  height={20}
                  className="text-[#AE7E56]"
                />
              </div>

              <p className="text-[14px] md:text-[18px] leading-[140%] tracking-[0%] font-normal max-w-[307px] md:max-w-max">
                <span className="font-[500]">
                  Helps prevent new discolouration
                </span>{" "}
                and from forming
              </p>
            </li>
          </ul>
        </div>

        {/* Image */}
        <div className="flex justify-center w-full md:w-auto">
          <div className="relative w-full h-[447px] md:w-[459px] md:h-[640px] rounded-2xl overflow-hidden">
            <CustomImage
              src="https://myrocky.b-cdn.net/Other%20Images/skin-care/hyper-treats.jpg"
              alt="What-it-treats"
              fill
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default WhatItTreats;

import React from "react";
import CustomImage from "@/components/utils/CustomImage";
import { FaCheckCircle } from "react-icons/fa";

const WhatItTreats = () => {
  const benefits = [
    "Clears clogged pores to treat and prevent whiteheads, blackheads, and breakouts",
    "Reduces inflammation and bacteria to calm active spots and prevent new ones",
    "Fades dark spots and discolouration for a more even skin tone",
    "Improves skin texture and tone by accelerating cell turnover and strengthening the skin barrier",
  ];

  return (
    <section className="bg-white md:max-w-[1200px] md:mx-auto ">
      <div className="px-5 py-14 ">
        <div className="flex flex-col items-center gap-8 md:flex-row max-w-[998px] mx-auto md:gap-[80px] ">
          {/* Content */}
          <div className="w-full md:w-[459px] md:h-[435px]">
            <h2 className="text-[32px] md:text-[48px] font-[550] leading-[110%] tracking-[-2%] headers-font text-black mb-6">
              What It Treats
            </h2>

            <p className="text-[16px] md:text-[18px] leading-[140%] tracking-[0%] text-[#000000CC] mb-6">
              Our Custom Acne Cream is expertly formulated by dermatologists to
              target multiple acne concerns at once, using a powerful
              combination of clinically backed ingredients:
            </p>

            {/* Benefits List */}
            <ul>
              {benefits.map((benefit, index) => (
                <li key={index} className=" flex items-start justify-start md:justify-center gap-2 mb-4">
                  <div className="w-[16px] h-[16px] md:w-[21px] md:h-[21px] mt-[2px]">
                    <FaCheckCircle
                      width={21}
                      height={21}
                      className="text-[#AE7E56] text-[21px]"
                    />
                  </div>

                  <p className="text-[14px] md:text-[16px] leading-[140%] tracking-[0%] font-normal text-[#000000] max-w-[307px] md:max-w-max">
                    {benefit}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className="flex justify-center w-full md:w-auto">
            <div className="relative w-full h-[447px] md:w-[459px] md:h-[640px] rounded-2xl overflow-hidden">
              <CustomImage
                src="/skin-care-product/treats.jpg"
                alt="Woman applying skincare with towel"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatItTreats;

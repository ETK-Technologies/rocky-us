"use client";

import CustomImage from "@/components/utils/CustomImage";
import React from "react";
import { FaCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const AlMostPage = ({
  payload,
}) => {
  const router = useRouter();
  const defaultSteps = [
    {
      title: "Verify Details",
      subtitle:
        "Enter personal details, shipping address and complete medical questionnaire after payment.",
      image: "/bo3/croppedImg.png",
    },
    {
      title: "Provider review",
      hint: "Hear back within 24 hours*",
      subtitle:
        "A licensed provider will review your questionnaire and determine if you are eligible for treatment.",
      image: "/supplements/testosterone3.jpg",
    },
    {
      title: "Get your prescription",
      subtitle:
        "Your card will be charged when medication is prescribed. Treatment will ship discreetly to you for free.**",
      image: "/how-rocky-works/fast-delivary.webp",
    },
  ];

  const items = defaultSteps;

  return (
    <div className=" flex flex-col tracking-tight mb-8">
      <div className="w-[100%] p-5 mt-5 min-h-fit mx-auto pb-4 flex flex-col items-center h-full">
        <div className="w-full max-w-[500px] p-2">
          <div className="mb-[40px]">
            <p className="subheaders-font font-[550] text-[24px] leading-[120%] tracking-tight">
              We’re almost done,
            </p>
            <p className="subheaders-font font-[550] text-[24px] leading-[120%] tracking-tight">
              here’s what’s next
            </p>
          </div>
         <div className="flex flex-col justify-center">
             {items.map((step, idx) => (
            <div
              key={idx}
              className="card shadow-xl w-full md:w-[520px] h-[150px] mb-[20px] rounded-lg bg-white grid grid-cols-[20%_45%_35%] items-center"
            >
              <div className={`flex items-center flex-col justify-start relative ${idx != 0 ? 'opacity-50' : ''}`}>
                <div className="relative z-10 flex items-center justify-center w-[32px] h-[32px] rounded-full ">
                  <FaCheck className="bg-[#AE7E56] rounded-full text-white p-[4px] w-[24px] h-[24px]" />
                </div>
                {idx >= items.length - 1 ? null : (
                    <div className="mt-8 absolute left-1/2 transform -translate-x-1/2 -translate-y-6 w-[2px] h-[167px] z-0 bg-[#AE7E56] opacity-80"></div>
                )}
              </div>
              <div className="">
                <h3 className="font-medium text-[16px] leading-[140%] mb-[8px]">
                  {step.title}
                </h3>
                {step.hint && (
                  <p className="text-[#AE7E56] font-medium  leading-[140%] text-[12px] mb-[8px]">
                    {step.hint}
                  </p>
                )}
                <p className="text-[12px] md:text-[14px] text-[#757575] font-normal leading-[140%]  ">
                  {step.subtitle}
                </p>
              </div>
              <div className={`overflow-hidden `}>
                <CustomImage
                  src={step.image}
                  className={` h-[150px] float-end rounded-tr-lg rounded-br-lg  ${idx == 0 ? 'bg-gradient-to-b from-[#AE7E56] via-[#A8774B] to-[#8E623E] w-[116px] md:w-[132px]  px-[10px]' : 'w-[116px] md:w-[132px]'}`}
                  width="100"
                  height="100"
                />
              </div>
            </div>
          ))}
         </div>

          <p className="text-[10px] text-[#00000059] leading-[150%] font-medium">
            *Response times may vary based on provider availability and demand.
          </p>

          <p className="text-[10px] text-[#00000059] leading-[150%] font-medium mt-[30px]">
            **Please refer to our T&Cs for more details.
          </p>
         
        </div>
      </div>

      
    </div>
  );
};

export default AlMostPage;

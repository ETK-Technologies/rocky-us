"use client";
import { FaCheckCircle, FaRegTimesCircle, FaTimesCircle } from "react-icons/fa";
import CustomImage from "../../utils/CustomImage";
import MoneyGuaranteeModal from "./MoneyGuaranteeModal";
import { useState } from "react";

const RockyDifference = () => {
 
   const [IsOpen, setIsOpen] = useState(false);
  
    const openModal = () => {
      setIsOpen(true);
    };
  
    const closePopUp = () => {
      setIsOpen(false);
    };
  
 
  return (
    <>
     
      <div className="w-full max-w-6xl mx-auto lg:px-4">
        {/* Title Section */}
        <div className="py-7 flex lg:hidden  flex-col justify-center items-start gap-2">
          <div className="flex flex-col justify-start items-start gap-4">
            <div className="w-full text-center md:text-left">
              <span className="text-black text-3xl font-semibold md:text-4xl">The</span>
              <span className="text-[#AE7E56] font-semibold text-3xl md:text-4xl">
                {" "}
                Rocky
              </span>
              <span className="text-black font-semibold text-3xl md:text-4xl">
                {" "}
                Difference
              </span>
            </div>
            <div className="w-full text-center md:text-left text-black text-lg font-normal leading-relaxed">
              Comprehensive care. Consistent results. See how Rocky compares.
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="flex flex-row">
          {/* Features Column */}
          <div className="w-1/3 ">
            <div className="lg:h-48 h-16 border-b border-black flex items-center lg:px-4">
              {/* Empty space to align with other columns */}

              <div className="lg:flex hidden flex-col  justify-start items-start gap-4">
                <div className="w-full text-center md:text-left">
                  <span className="text-black text-3xl md:text-3xl">The</span>
                  <span className="text-[#AE7E56] text-3xl md:text-3xl">
                    {" "}
                    Rocky
                  </span>
                  <span className="text-black text-3xl md:text-3xl">
                    {" "}
                    Difference
                  </span>
                </div>
                <div className="w-full text-center md:text-left text-black text-lg font-normal leading-relaxed">
                  Comprehensive care. Consistent results. See how Rocky
                  compares.
                </div>
              </div>
            </div>
            {[
              "Personalized treatment plans",
              "Regular check-ins with adjustments",
              "Lifestyle advice",
              "Diet information",
              "Improved microbiome",
              "Program costs",
              "Money-back Guarantee",
            ].map((item, index) => (
              <div
                key={index}
                className="lg:h-20 h-[110px]  border-b border-black flex items-center lg:px-4"
              >
                <div className="text-black  text-[13px] lg:text-[16px]  font-semibold">{item}</div>
              </div>
            ))}
            <div className="lg:h-20 h-[110px] "></div>
          </div>

          {/* Rocky Column */}
          <div className="w-1/3 bg-white rounded-lg md:rounded-3xl shadow-lg">
            <div className="lg:h-48 h-16 border-b border-black/95 flex justify-center items-center">
              <CustomImage
                src="/ed-prelander-5/rocky-logo.png"
                width={100}
                height={100}
                className="w-50 h-50 object-contain"
              />
            </div>
            {[
              "Backed by lab data",
              "Pre-scheduled & on-demand",
              "Evidence-backed",
              "Personali zed",
              "Backed by lab data",
              "$60/month",
            ].map((item, index) => (
              <div
                key={index}
                className="lg:h-20 h-[110px] lg:px-4 px-1 border-b border-black/95 flex items-center"
              >
                <div className="flex flex-col w-full lg:w-auto lg:flex-row items-center justify-center  lg:gap-3 gap-1 lg:px-6">
                  <FaCheckCircle className="text-[#AE7E56] text-xl md:text-2xl" />
                  <span className="text-black  leading-[140%] tracking-[0px] text-[11px] lg:text-[16px] font-medium text-center">
                    {item}
                  </span>
                </div>
              </div>
            ))}

            <div
                onClick={openModal}
                className="lg:h-20 h-[110px] lg:px-4 px-1 border-b border-black/95 flex items-center"
              >
                <div className="flex flex-col w-full lg:w-auto lg:flex-row items-center justify-center  lg:gap-3 gap-1 lg:px-6">
                  <FaCheckCircle className="text-[#AE7E56] text-xl md:text-2xl" />
                  <span className="text-black  leading-[140%] tracking-[0px] text-[11px] lg:text-[16px] font-medium text-center">
                    6 months <span className="underline cursor-pointer">(See Terms)</span> 
                  </span>
                </div>
              </div>

            <div className="lg:h-20 h-[110px] "></div>
          </div>

          {/* Others Column */}
          <div className="w-1/3 ">
            <div className="lg:h-48 h-16 border-b border-black flex justify-center items-center">
              <div className="text-black text-xl font-bold uppercase">
                Others
              </div>
            </div>
            {[
              "Dosage only",
              "When issues arise",
              "Prescriptions only",
              "Either none or only",
              "None at all",
              "> $90 / month",
              "None",
            ].map((item, index) => (
              <div
                key={index}
                className="lg:h-20 h-[110px] px-1  lg:px-4 border-b border-black flex items-center"
              >
                <div className="flex flex-col w-full lg:w-auto lg:flex-row items-center justify-start  lg:gap-3 gap-1 lg:px-6">
                  <FaRegTimesCircle className="text-black text-xl md:text-2xl" />

                  <span className="text-black  leading-[140%] tracking-[0px] text-[11px] lg:text-[16px] font-medium text-center">
                    {item}
                  </span>
                </div>
              </div>
            ))}
            <div className="lg:h-20 h-[110px] "></div>
          </div>
        </div>
      </div>


       {IsOpen && (
        <>
          <MoneyGuaranteeModal closePopUp={closePopUp} />
        </>
      )}
    </>
  );
};

export default RockyDifference;

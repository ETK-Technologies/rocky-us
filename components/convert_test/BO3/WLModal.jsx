"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import CustomImage from "../../utils/CustomImage";
import { MdOutlineMonitorWeight } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { FaStethoscope } from "react-icons/fa6";
import Link from "next/link";

const WLModal = (modalOpen = false) => {
  const [modalView, setmodalView] = useState(modalOpen);

  const closePopUp = () => {
    setmodalView(false);
  };
  return (
    <>
      {modalView && (
        <>
          <div className="bg-black bg-opacity-50 fixed inset-0 z-40"></div>
          <div
            aria-hidden="true"
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="relative bg-white rounded-2xl p-5 lg:p-10 w-[375px]  md:w-[1020px] md:h-[668px] shadow-2xl">
              <button
                onClick={closePopUp}
                className="button absolute lg:right-[14px] lg:top-[14px] top-[5px] right-[5px] w-[32px] h-[32px] flex items-center justify-center rounded-full z-50"
              >
                <FaTimes className="font-thin" />
              </button>

              <div className="flex gap-4 flex-col md:flex-row items-center ">
                <div className="w-[335px] bg-gradient-to-b from-[#67482E]  to-[#36251A] p-[32px] pl-[24px] pb-0 rounded-3xl  md:hidden h-[259px] overflow-hidden relative">
                  <div className="pt-[45px] w-[190px]">
                    <h2 className="font-medium text-[24px] md:text-[32px] mb-[8px] text-[#F2A565] leading-[114.99999999999999%] tracking-[-2%]">
                      Wait!
                    </h2>
                    <p className="text-[18px] md:text-[32px] text-white font-medium leading-[114.99999999999999%] tracking-[-2%]">
                      Get pre-qualifed <br /> for our weight loss program in 3
                      minutes!
                    </p>
                  </div>

                  <CustomImage
                    src="/bo3/mobile_with_prod.png"
                    width="200"
                    className="relative left-[130px] top-[-115px]"
                    height="200"
                  ></CustomImage>
                </div>

                <div>
                  <div className="flex gap-3 items-start mb-[16px] lg:mb-[24px]">
                    <MdOutlineMonitorWeight className="text-[#AE7E56] text-3xl  " />
                    <div>
                      <h2 className="text-[15px] md:text-[20px] font-semibold ">
                        Access proven weight loss treatments
                      </h2>
                      <p className="text-[14px] font-[POPPINS] font-normal text-[#000000BF] md:text-[15px]">
                        if eligible
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start mb-[16px] lg:mb-[24px]">
                    <FiPackage className="text-[#AE7E56] text-3xl  " />
                    <div>
                      <h2 className="text-[15px] md:text-[20px] font-semibold ">
                        Fast & Discreet Shipping
                      </h2>
                      <p className="text-[14px] font-[POPPINS] font-normal text-[#000000BF] md:text-[15px]">
                        to your door or mailbox
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start mb-[16px] lg:mb-[24px]">
                    <FaStethoscope className="text-[#AE7E56] text-3xl  " />
                    <div>
                      <h2 className="text-[15px] md:text-[20px] font-semibold ">
                        Keep the weight off
                      </h2>
                      <p className="text-[14px] font-[POPPINS] font-normal text-[#000000BF] md:text-[15px]">
                        with 1:1 clinician support & guidance
                      </p>
                    </div>
                  </div>
                  <hr className="mb-[16px] lg:mb-[24px]" />
                  <p className="mb-[12px] text-center font-[POPPINS] font-medium text-black opacity-85 text-[12px] md:text-[14px] tracking-[0%] leading-[114.99999999999999%]">
                    Rocky is trusted by{" "}
                    <span className="font-semibold">350,000+</span> Canadians
                  </p>
                  <Link
                    href="/wl-pre-consultation"
                    className="bg-black flex items-center justify-center h-[44px] lg:h-[52px] w-100 rounded-full text-center w-full text-white"
                  >
                    Get Started
                  </Link>

                  <div className="flex justify-center items-center mb-[20px] lg:mb-[32px]">
                    <button
                      className="underline mt-[16px] font-[POPPINS] text-[12px] md:text-[14px] text-[#3B2D23]"
                      onClick={closePopUp}
                    >
                      No, Thank you
                    </button>
                  </div>

                  <div className="flex justify-center items-center flex-col gap-2">
                    <p className="font-medium text-[12px] leading-[114.99999999999999%] font-[POPPINS]">
                      Backed by Research from
                    </p>
                    <CustomImage
                      src="/bo3/logos_for_modal.png"
                      height="1000"
                      width="1000"
                    ></CustomImage>
                  </div>
                </div>
                <div className="bg-gradient-to-b from-[#67482E] to-[#36251A] p-[32px] pb-0 rounded-3xl hidden md:block">
                  <h2 className="font-medium text-[24px] md:text-[32px] mb-[8px] text-[#F2A565] leading-[114.99999999999999%] tracking-[-2%]">
                    Wait!
                  </h2>
                  <p className="text-[20px] md:text-[32px] text-white font-medium leading-[114.99999999999999%] tracking-[-2%]">
                    Get pre-qualifed for our weight loss program in 3 minutes!
                  </p>

                  <CustomImage
                    src="/bo3/mobile_with_prod.png"
                    width="1000"
                    className="relative bottom-0"
                    height="1000"
                  ></CustomImage>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default WLModal;

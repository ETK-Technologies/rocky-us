"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import WLProgressBar from "./WLProgressBar";
const MIN = 100; // Min value
const MAX = 200; // Max value

const WLModalSlider = (modalOpen = false) => {
  const [modalView, setmodalView] = useState(modalOpen);

  const closePopUp = () => {
    setmodalView(false);
  };
  return (
    <>
      {modalView && (
        <>
          <div id="Modal_v2" className="bg-black bg-opacity-50 fixed inset-0 z-40"></div>
          <div
            aria-hidden="true"
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div className="relative  bg-white rounded-2xl p-10 h-[703px] lg:h-auto   md:w-[1020px] shadow-2xl">
              <button
                onClick={closePopUp}
                className="button absolute right-[14px] top-[14px] w-[32px] h-[32px] flex items-center justify-center rounded-full "
              >
                <FaTimes className="font-thin" />
              </button>

              <div className="flex gap-4 flex-col md:flex-row justify-center items-center">


                {/* for mobile version */}
                <WLProgressBar isMobile={true}></WLProgressBar>
                {/* end of mobile version */}
                <div className="flex-1 p-[10px] lg:p-[72px]">
                  <div className="bg-[#AE7E56] text-white lg:mb-[24px] mb-[20px] rounded-md lg:w-[139px] lg:h-[42px]  h-[28px] w-[88px] flex items-center justify-center p-2 lg:p-4">
                    <p className="lg:text-[18px] text-[14px]  font-[POPPINS] font-medium tracking-[0px] leading-[140%]">
                      Lose up to
                    </p>
                  </div>

                  <p className="text-[80px] lg:text-[160px] leading-[80%] font-[550] tracking-tight ">25%</p>

                  <p className="mb-[12px]  mt-[12px] font-[POPPINS] font-[550] text-black  text-[16px] md:text-[14px] tracking-[0%] leading-[115%]">
                    Of your body weight in a year.
                  </p>
                  <Link
                    href="/wl-pre-consultation"
                    className="bg-black flex items-center justify-center h-[44px] w-100 rounded-full text-center w-full text-white"
                  >
                    Start a consultation
                  </Link>

                  <div className="mt-[8px]">
                    <p className=" text-[11px] tracking-[0px] leading-[114.99999999999999%] font-[POPPINS]">
                      * On average, through lifestyle changes, treatment and
                      support, Rocky members lose 12% of their weight in 6
                      months.
                    </p>
                  </div>
                </div>
               
               <WLProgressBar isMobile={false}></WLProgressBar>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default WLModalSlider;

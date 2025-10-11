"use client";
import React, { useState } from "react";
import CustomImage from "@/components/utils/CustomImage";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import CustomContainImage from "@/components/utils/CustomContainImage";

const Hero = () => {
  const [openModalIndex, setOpenModalIndex] = useState(false);

  return (
    <section className="bg-[#F5F4EF] w-full">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10 lg:py-0 flex flex-col lg:flex-row items-center justify-center lg:justify-between lg:h-[720px] relative">
        {/* Desktop Image */}
        <div className="hidden lg:flex lg:justify-start lg:pl-[70px] relative w-[1100px] h-[1100px] mt-28">
          <CustomContainImage
            src="https://myrocky.b-cdn.net/Other%20Images/Hyper-pigmentation-dk.png"
            alt="Personalized Hyper-pigmentation Cream"
            fill
          />
        </div>

        {/* Content */}
        <div className="w-full  text-left max-w-[389px] md:pl-10">
          <p className="text-[#AE7E56] text-[16px] font-medium leading-[140%] mb-4">
            All Your Skincare, Delivered
          </p>

          <h1 className="text-[28px] md:text-[40px] font-medium leading-[115%] md:tracking-[-2px] align-middle mb-4 headers-font">
            Hyper-pigmentation Cream
          </h1>

          <p className="text-[16px] leading-[140%] text-[#000000] md:mb-6 font-normal md:max-w-[349px]">
            Formulated by dermatologists and made with pharmaceutical-grade
            ingredients, this cream targets stubborn dark spots, uneven tone,
            and discolouration with precision and potency.
          </p>

          {/* Mobile Image */}
          <div className="flex lg:hidden justify-center mb-6 relative w-full h-[355px] md:my-10">
            <CustomImage
              src="https://myrocky.b-cdn.net/Other%20Images/Hyper-pigmentation-mob.png"
              alt="Personalized Hyper-pigmentation Cream"
              fill
            />
          </div>

          {/* Get Started Button */}
          <div className="flex justify-center lg:justify-start mb-4 w-full lg:min-w-[394px]">
            <Link
              href="/hyperpigmentation-consultation-quiz"
              className="w-full lg:w-[349px] h-[48px] bg-black text-white rounded-full flex items-center justify-center text-[14px] font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Get Started
              <FaArrowRight className="ml-2 w-[18px] h-[18px]" />
            </Link>
          </div>

          {/* Safety Info Link */}
          <div className="flex justify-center mb-6 mt-4 md:mt-0">
            <button
              className="text-xs text-black underline cursor-pointer flex gap-1 items-center text-center"
              onClick={() => setOpenModalIndex(!openModalIndex)}
            >
              <Image
                src="/skin-care/information.svg"
                alt="information"
                width={16}
                height={16}
              />
              Important Safety information
            </button>
          </div>
          {/* Disclaimer Text */}
          <div className="space-y-4 text-[12px] text-[#00000080] leading-[140%] font-normal max-w-[335px] md:max-w-max">
            <p>
              * Prescription products are subject to provider approval and
              require an online consultation with a provider who will determine
              if a prescription is appropriate.
            </p>
            <p>
              * Do not use this medication if you are allergic to tretinoin,
              clindamycin, niacinamide, azelaic acid and/or salicyclic acid.
            </p>
          </div>
        </div>

        {/* Modal */}
        {openModalIndex && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            {/* Desktop Modal */}
            <div className="hidden md:block bg-white rounded-2xl shadow-lg max-w-[640px] w-full p-4 py-10 md:p-[40px] relative m-6">
              <button
                className="absolute top-[10px] md:top-[20px] pt-1 text-[24px] md:text-[32px] right-[10px] md:right-[20px] shadow-[0px_0px_10px_0px_#00000029] rounded-full w-[32px] h-[32px] flex items-center justify-center hover:text-black  "
                onClick={() => setOpenModalIndex(false)}
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="text-[18px] md:text-[22px] font-semibold mb-[24px]">
                Important Safety Information
              </h2>
              <div className=" md:w-[560px] text-[14px] md:text-[18px]">
                <p>
                  Not recommended during pregnancy or breastfeeding. Avoid eyes,
                  lips, and broken skin. Mild redness, dryness, or peeling may
                  occur as your skin adjusts. Use sunscreen daily to protect
                  results and prevent new discolouration
                </p>
              </div>
            </div>

            {/* Mobile Bottom Popup */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg px-10 py-[64px] max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[20px] headers-font">
                  Important Safety Information
                </h2>
                <button
                  className="absolute top-[20px]  pt-1 text-[24px] md:text-[32px] right-[20px]  shadow-[0px_0px_10px_0px_#00000029] rounded-full w-[32px] h-[32px] flex items-center justify-center hover:text-black  "
                  onClick={() => setOpenModalIndex(false)}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <div className="text-[16px] font-[400] leading-[140%] pr-[20px]">
                <p>
                  Not recommended during pregnancy or breastfeeding. Avoid eyes,
                  lips, and broken skin. Mild redness, dryness, or peeling may
                  occur as your skin adjusts. Use sunscreen daily to protect
                  results and prevent new discolouration
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;

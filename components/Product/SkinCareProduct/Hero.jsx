"use client";
import React, { useState } from "react";
import CustomImage from "@/components/utils/CustomImage";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";
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
            src="https://myrocky.b-cdn.net/WP%20Images/Global%20Images/acne-cover.png"
            alt="RX Custom Acne Cream"
            fill
          />
        </div>

        {/* Content */}
        <div className="w-full lg:pl-[40px] text-left max-w-[392px]">
          <p className="text-[#AE7E56] text-[16px] font-medium leading-[140%] mb-4">
            All Your Skincare, Delivered
          </p>

          <h1 className="text-[28px] lg:text-[40px] font-medium leading-[115%] tracking-[-2%] mb-4 headers-font">
             Acne Cream
          </h1>

          <p className="text-[16px] leading-[140%] text-[#000000] mb-6 font-normal">
            Formulated by dermatologists and made with pharmaceutical-grade ingredients, our customized treatments targets whiteheads, blackheads, and more severe acne with precision and potency
          </p>

          {/* Mobile Image */}
          <div className="flex lg:hidden justify-center mb-6 relative w-full h-[355px] my-10">
            <CustomImage
              src="/skin-care-product/acne-photo-mobile2.png"
              alt="RX Custom Acne Cream"
              fill
            />
          </div>

          {/* Get Started Button */}
          <div className="flex justify-center lg:justify-start mb-4 w-full lg:min-w-[394px]">
            <Link
              href="/acne-consultation-quiz"
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
              *Prescription products are subject to provider approval and
              require an online consultation.
            </p>
            <p>
              *Do not use this medication if you are allergic to tretinoin,
              clindamycin, niacinamide, azelaic acid and/or salicylic acid.
            </p>
          </div>
        </div>

        {/* Modal */}
        {openModalIndex && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40">
            {/* Mobile Bottom Sheet */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg p-6 animate-slide-up">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
                onClick={() => setOpenModalIndex(false)}
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="text-lg font-semibold mb-4 pr-8">Important Safety Information</h2>
              <div className="text-gray-700 text-sm leading-relaxed">
                <p>
                  For external use only. May cause dryness or irritation.<br />
                  Avoid eyes & sun. Not for use if pregnant or breastfeeding.
                </p>
              </div>
            </div>

            {/* Desktop Modal */}
            <div className="hidden md:flex items-center justify-center min-h-screen p-4">
              <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 relative lg:min-w-[640px]">
                <button
                  className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                  onClick={() => setOpenModalIndex(false)}
                  aria-label="Close"
                >
                  ×
                </button>
                <h2 className="text-xl font-semibold mb-4">
                  Important Safety Information
                </h2>
                <div className="text-gray-700 text-sm space-y-3">
                  <p>
                    For external use only. May cause dryness or irritation.<br />
                    Avoid eyes & sun. Not for use if pregnant or breastfeeding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;

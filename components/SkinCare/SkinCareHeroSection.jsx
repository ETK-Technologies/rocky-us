import Image from "next/image";
import React from "react";
import BrimaryButton from "../ui/buttons/BrimaryButton";

const SkinCareHeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden pt-6 md:pt-0 min-h-[556px] h-auto md:h-[726px] max-h-[726px]">
      {/* Mobile: image covers the whole section */}
      <div className="md:hidden absolute inset-0 w-full h-full">
        <Image
          src="/skin-care/hero-mobile.jpg"
          alt="Person applying skincare"
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Desktop: image covers the whole section */}
      <div className="hidden md:block absolute inset-0 w-full h-[726px]">
        <Image
          src="/skin-care/hero-desktop.jpg"
          alt="Person applying skincare"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="relative z-5 max-w-6xl mx-auto flex flex-col md:flex-row items-center">
        <div className="w-full text-left flex flex-col justify-center px-4 md:px-0 md:py-[180px] max-w-[464px]">
          <h1 className="text-4xl md:text-[72px] font-semibold leading-tight text-black mb-4 md:mb-6">
            Skincare,
            <br />
            <span className="text-[#b77c50]">Personalized</span>
          </h1>
          <p className="text-[#000000] text-base md:text-lg mb-6 md:mb-10">
            Feel better in your skincare formulated by dermatologist formulated
            skincare.
          </p>

          <BrimaryButton
            className="px-6 py-3 rounded-full bg-black text-white text-sm md:text-base font-medium hover:bg-gray-900 transition w-full md:w-[248px]"
            href="#skin-care-section"
            arrowIcon="true"
          >
            Transform your skin
          </BrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default SkinCareHeroSection;

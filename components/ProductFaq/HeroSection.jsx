import React from "react";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";

const HeroSection = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-full md:bg-[#F7F9FB]">
      {/* Mobile hero image */}
      <div className="md:hidden relative h-[460px] w-full">
        <Image
          src="/ProductFaq/product_faq_hero.webp"
          alt="Product FAQ Hero"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>

      {/* Desktop hero image */}
      <div className="hidden md:block md:absolute md:right-0 md:top-0 md:w-full md:h-full">
        <Image
          src="/ProductFaq/product_faq_hero_image.webp"
          alt="Product FAQ Hero"
          fill
          className="object-cover object-left"
          priority
          quality={100}
        />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 md:relative flex flex-col py-8 md:py-[147px] max-w-[1184px] mx-auto px-5 sectionWidth:px-0">
        <div className="max-w-[600px] md:max-w-[50%]">
          <h1 className="text-[40px] md:text-[60px] headers-font font-semibold leading-[115%] mb-2">
            Product FAQs
          </h1>
          <p className="text-base md:text-xl leading-[140%] mb-[40px] md:mb-12 poppins-font">
            Everything you need to know, in one place.
          </p>

          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search for keywords"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pr-4 pl-14 rounded-full bg-white text-black border border-[#E2E2E1] focus:outline-none text-sm leading-[140%]"
            />
            <Image
              src="/ProductFaq/search-icon.svg"
              alt="Search"
              width={32}
              height={32}
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
            />
            {searchTerm.length > 0 && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#ADADAD] hover:text-black cursor-pointer"
              >
                <IoCloseSharp />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

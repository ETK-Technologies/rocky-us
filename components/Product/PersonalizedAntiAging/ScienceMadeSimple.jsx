"use client";
import React, { useState, useRef, useEffect } from "react";
import CustomImage from "@/components/utils/CustomImage";
import { FaArrowRight } from "react-icons/fa6";
import Section from "@/components/utils/Section";

const ScienceMadeSimple = () => {
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const ingredients = [
    {
      id: 1,
      image: "https://myrocky.b-cdn.net/Other%20Images/science-1.png",
      title: "Current Aging skin",
      description:
        "Your skin shows visible signs of aging - collagen fibers are broken down and disorganized. Fine lines form where collagen has weakened.",
      alt: "Current Aging skin ",
    },

    {
      id: 2,
      image: "https://myrocky.b-cdn.net/Other%20Images/science-2.png",
      title: "Active Repair",
      description:
        "Tretinoin accelerates cell turnover, shedding damaged cells and stimulating new collagen production, while Ascorbic Acid brightens skin and supports healthy collagen repair",
      alt: "Active Repair ",
    },

    {
      id: 3,
      image: "https://myrocky.b-cdn.net/Other%20Images/science-3.png",
      title: "Restored & Protected",
      description:
        "Your skin reaches its optimal state - collagen fibers are rebuilt and organized, cell turnover returns to a youthful rate, and the moisture barrier is fully restored.",
      alt: "Restored & Protected ",
    },
  ];

  const getCardWidth = () => {
    return typeof window !== "undefined" && window.innerWidth >= 768
      ? 376 + 24
      : 300 + 16;
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;

    const cardWidth = getCardWidth();
    const index = Math.round(scrollLeft / cardWidth);

    setActiveIndex(index);
    setShowPrev(scrollLeft > 0);
    setShowNext(scrollLeft + clientWidth < scrollWidth - 5);
  };

  const scrollTo = (direction) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const cardWidth = getCardWidth();
    const scrollAmount = direction === "next" ? cardWidth : -cardWidth;

    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Section bg={"bg-[#F5F4EF]"} className="relative">
      {/* Title */}
      <h2 className=" text-[32px] md:text-[48px] font-[550] leading-[115%] tracking-[-2%] text-black mb-[32px] md:mb-14 text-left headers-font max-w-[250px] md:max-w-full">
        The Science Made Simple
      </h2>

      {/* Cards Container with Gradient Overlays */}
      <div className="relative">
        {/* Left scroll button */}
        <div
          className="hidden lg:block absolute top-0 left-0 w-32 h-full pointer-events-none z-10 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(270deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.77) 66.37%, #FFF 100%)",
            opacity: showPrev ? 1 : 0,
          }}
        >
          <button
            onClick={() => scrollTo("prev")}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 pointer-events-auto w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 shadow-md"
            aria-label="Scroll to previous ingredient"
          >
            <FaArrowRight className="w-4 h-4 text-black rotate-180" />
          </button>
        </div>

        {/* Right scroll button */}
        <div className="hidden lg:block absolute top-0 right-0 w-32 h-full pointer-events-none z-10 transition-opacity duration-300">
          <button
            onClick={() => scrollTo("next")}
            className="hidden absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-auto w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 shadow-md"
            aria-label="Scroll to next ingredient"
          >
            <FaArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>

        {/* Scrollable Cards */}
        <div
          className="overflow-x-auto scrollbar-hide"
          ref={scrollContainerRef}
        >
          <div className="flex md:justify-center gap-[24px] lg:gap-6 ">
            {ingredients.map((ingredient, index) => (
              <div
                key={`ingredient_${index}`}
                className="flex-shrink-0 w-[280px] md:w-[379px] "
              >
                <div className="w-full h-[225px] md:h-[304px] overflow-hidden mb-6">
                  <CustomImage
                    src={ingredient.image}
                    alt={ingredient.alt}
                    width={376}
                    height={304}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left px-2">
                  <h3 className="text-[20px] lg:text-[24px] font-[550] leading-[115%] tracking-[-2%] text-black mb-4 headers-font">
                    {ingredient.title}
                  </h3>
                  <p className="text-[16px] leading-[140%] text-[#000000CC] font-[400]">
                    {ingredient.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Scroll Indicator */}
      <div className="flex justify-center items-center gap-2 mt-4 lg:hidden">
        <div className="relative w-20 h-2 bg-[#EFEFEA] rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-black rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${100 / ingredients.length}%`,
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          />
        </div>
      </div>
    </Section>
  );
};

export default ScienceMadeSimple;

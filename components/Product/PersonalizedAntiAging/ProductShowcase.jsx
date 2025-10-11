"use client";
import React, { useState, useRef, useEffect } from "react";
import CustomImage from "@/components/utils/CustomImage";
import { FaArrowRight } from "react-icons/fa6";

const ProductShowcase = () => {
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const ingredients = [
    {
      id: 1,
      image: "/skin-care-product/cream1.png",
      title: "Tretinoin",
      description:
        "Speeds up skin cell turnover to replace damaged cells with healthy ones, while stimulating collagen production for smooth and firm skin.",
      alt: "Tretinoin cream ",
    },

    {
      id: 2,
      image: "/skin-care-product/cream3.png",
      title: "Ascorbic acid",
      description:
        "Brightens skin, fades dark spots, and acts as a powerful antioxidant to protect against free radical damage, all while supporting collagen repair for a more youthful, even complexion.",
      alt: "Ascorbic acid ",
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
    <section className="bg-white py-14 px-5 md:py-24 md:max-w-[1200px] md:mx-auto relative">
      {/* Title */}
      <h2 className="md:text-center text-[32px] md:text-[48px] font-[550] leading-[115%] tracking-[-2%] text-black mb-12 md:mb-14 text-left headers-font">
        Powerful Custom Ingredients
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
        <div
          className="hidden lg:block absolute top-0 right-0 w-32 h-full pointer-events-none z-10 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.77) 66.37%, #FFF 100%)",
            opacity: showNext ? 1 : 0,
          }}
        >
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
          <div className="flex md:justify-center lg:gap-6 gap-4">
            {ingredients.map((ingredient, index) => (
              <div
                key={`ingredient_${index}`}
                className="flex-shrink-0 w-[272px] md:w-[356px] "
              >
                <div className="w-full h-[222px] md:h-[304px] rounded-[20px] overflow-hidden mb-6">
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
    </section>
  );
};

export default ProductShowcase;

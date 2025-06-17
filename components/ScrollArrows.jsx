"use client";

import { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const ScrollArrows = ({ scrollContainerRef, scrollAmount = 384 }) => {
  const [isScrollable, setIsScrollable] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      // Check if scrolling is needed
      setIsScrollable(
        scrollContainer.scrollWidth > scrollContainer.clientWidth
      );
      setIsAtStart(scrollContainer.scrollLeft === 0);
      setIsAtEnd(
        scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth
      );

      const handleScroll = () => {
        setIsAtStart(scrollContainer.scrollLeft === 0);
        setIsAtEnd(
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
            scrollContainer.scrollWidth
        );
      };

      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [scrollContainerRef]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {isScrollable && !isAtStart && (
        <span
          onClick={() => scroll("left")}
          className="absolute left-5 w-[50px] h-[50px] hidden md:flex items-center justify-center bg-white text-xl cursor-pointer z-[9999] shadow-md rounded-full top-[50%] transform -translate-y-1/2"
        >
          <FaChevronLeft />
        </span>
      )}

      {isScrollable && !isAtEnd && (
        <span
          onClick={() => scroll("right")}
          className="absolute right-5 w-[50px] h-[50px] hidden md:flex items-center justify-center bg-white text-xl cursor-pointer z-[9999] shadow-md rounded-full top-[50%] transform -translate-y-1/2"
        >
          <FaChevronRight />
        </span>
      )}
    </>
  );
};

export default ScrollArrows;

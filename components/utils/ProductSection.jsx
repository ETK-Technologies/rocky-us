"use client";
import { useRef } from "react";
import ScrollArrows from "../ScrollArrows";

const ProductSection = ({ children, bg }) => {
  const scrollContainerRef = useRef(null);

  return (
    <section className={` overflow-x-auto !no-scrollbar ${bg}`}>
      <div className="max-w-[1184px] mx-auto pt-[40px] md:pt-[96px]">
        <div className="relative">
          <ScrollArrows scrollContainerRef={scrollContainerRef} />

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 items-start rounded-tl-2xl rounded-bl-2xl snap-x snap-mandatory no-scrollbar"
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;

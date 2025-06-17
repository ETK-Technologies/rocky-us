"use client";

import { useRef } from "react";
import ScrollArrows from "../ScrollArrows";
import AfterAndBeforCard from "./AfterAndBeforCard";

const reviews = [
  {
    name: "Ernie G.",
    verified: true,
    beforeImage:
      "https://myrocky.b-cdn.net/WP%20Images/Hair%20Loss/before-1.png",
    afterImage: "https://myrocky.b-cdn.net/WP%20Images/Hair%20Loss/after-1.png",
    duration: "7 MONTHS",
    reviewText:
      "I was able to fully regrow my hairline within 6 months. My hair has never looked better.",
  },
  {
    name: "Tony H.",
    verified: true,
    beforeImage:
      "https://myrocky.b-cdn.net/WP%20Images/Hair%20Loss/before-2.png",
    afterImage: "https://myrocky.b-cdn.net/WP%20Images/Hair%20Loss/after-2.png",
    duration: "7 MONTHS",
    reviewText:
      "7 months in and I can't believe the effectiveness of the treatment. My hairline looks like it did 10 years ago!",
  },
  {
    name: "Anton A.",
    verified: true,
    beforeImage:
      "https://myrocky.b-cdn.net/WP%20Images/Hair%20Loss/before-3.png",
    afterImage: "https://myrocky.b-cdn.net/WP%20Images/Hair%20Loss/after-3.png",
    duration: "6 MONTHS",
    reviewText:
      "It's hard to believe the results but the pictures speak for themselves. My hair is back and I couldn't be happier.",
  },
];

const AfterAndBeforSection = () => {
  const scrollContainerRef = useRef(null);

  return (
    <>
      <div className="mx-auto text-center">
        <h2 className="text-[32px] md:text-[48px] leading-[36.8px] md:leading-[55.2px] tracking-[-0.01em] md:tracking-[-0.02em] mb-3 md:mb-4 font-[550] headers-font">
          The Reviews
        </h2>
        <p className="text-[16px] md:text-[18px] leading-[22.4px] md:leading-[25.2px] font-[400] mb-10 md:mb-14">
          Before and After.
        </p>
      </div>

      <div className="overflow-x-auto !no-scrollbar relative">
        <div className=" mx-auto ">
          <div className="relative">
            <ScrollArrows scrollContainerRef={scrollContainerRef} />

            <div
              ref={scrollContainerRef}
              className="flex gap-2 md:gap-4 items-start overflow-x-auto snap-x snap-mandatory no-scrollbar"
            >
              {reviews.map((review, index) => (
                <AfterAndBeforCard key={index} {...review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AfterAndBeforSection;

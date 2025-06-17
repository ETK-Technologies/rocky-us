import React from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import Image from "next/image";

const TimelineStep = ({
  section,
  headTitle,
  title,
  timeframe,
  content,
  hasCircle = true,
  expandedSection,
  toggleSection,
  iconSrc,
  isFirstItem = false,
}) => {
  return (
    <div className="mb-8 relative">
      <div className="flex items-start">
        <div className="relative z-10 mr-4">
          {iconSrc && (
            <Image src={iconSrc} alt="Step icon" width={32} height={32} />
          )}
          {/* Only show the indicator for the first item */}
          {isFirstItem && (
            <span className="w-4 h-4 bg-[#AE7E56] rounded-full flex items-center justify-center absolute top-full left-1/2 transform -translate-x-1/2 mt-8 border-[3px] border-white z-10"></span>
          )}
        </div>

        {/* Content */}
        <div className={`flex-1 ${!hasCircle ? "mt-2 ml-8" : "mt-2"}`}>
          <div className="flex items-start flex-col mb-1">
            {hasCircle && (
              <h3 className="text-base md:text-xl font-semibold text-[#A9764B]">
                {headTitle}
              </h3>
            )}
            <div
              className={`text-xs md:text-sm text-[#000000A6] font-medium ${
                !hasCircle ? "" : "mt-6"
              }`}
            >
              {timeframe}
            </div>
          </div>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection(section)}
          >
            <h3 className="text-base md:text-xl font-semibold">{title}</h3>
            <button
              className="text-2xl text-[#8B5A2B] transition-transform duration-300"
              aria-label={
                expandedSection === section
                  ? "Collapse section"
                  : "Expand section"
              }
            >
              {expandedSection === section ? (
                <BiMinus className="text-black" />
              ) : (
                <BiPlus className="text-black" />
              )}
            </button>
          </div>

          <div
            className={`mt-4 overflow-hidden transition-all duration-300 ease-in-out ${
              expandedSection === section
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-[#212121] mb-4 text-sm md:text-base">
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineStep;

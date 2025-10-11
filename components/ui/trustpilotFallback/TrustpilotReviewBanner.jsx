import React from "react";
import Image from "next/image";

const TrustpilotReviewBanner = ({ reviewCount = "1,274" }) => {
  const handleClick = () => {
    window.open(
      "https://www.trustpilot.com/review/myrocky.ca?utm_medium=trustbox&utm_source=MicroCombo",
      "_blank"
    );
  };

  return (
    <div
      className="bg-black w-full flex items-center justify-center gap-2 h-[26px] md:h-[28px] cursor-pointer transition-colors"
      onClick={handleClick}
    >
      {/* Excellent text */}
      <span className="text-white text-sm md:text-[17px] whitespace-nowrap">
        Excellent
      </span>

      {/* Stars image */}
      <div className="w-[96px] h-[18px] md:w-[106px] md:h-[20px] flex-shrink-0">
        <Image
          src="/trustpilot/stars.png"
          alt="Trustpilot stars"
          className="w-full h-full object-contain"
          width={106}
          height={20}
          priority
        />
      </div>

      {/* Review count and Trustpilot text */}
      <span className="text-white text-xs md:text-[12px] whitespace-nowrap underline">
        {reviewCount} <span className="ml-1 font-normal">reviews on</span>
      </span>

      {/* Trustpilot star icon */}
      <div className="flex items-center gap-1">
        <Image
          src="/trustpilot/Shape.png"
          alt="Trustpilot star"
          width={18}
          height={15.25}
        />
        {/* Trustpilot text */}
        <span className="text-white text-xs md:text-[12px] font-normal whitespace-nowrap">
          Trustpilot
        </span>
      </div>
    </div>
  );
};

export default TrustpilotReviewBanner;

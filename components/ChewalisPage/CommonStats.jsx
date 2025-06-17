"use client";

import Image from "next/image";
import CustomImage from "../utils/CustomImage";

const CommonStats = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-20 md:mt-16">
      {/* Left Text */}
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl md:text-5xl font-semibold max-w-lg headers-font">
          It's More Common Than You Think.
        </h2>
        <p className="mt-4 md:text-xl md:w-3/4">
          ED can be frustrating and embarrassing, but it doesn't have to be.
          Millions of men deal with some form of ED; luckily there are
          solutions. Get clinically proven prescription treatments online and
          get back to the bedroom with confidence.
        </p>

        {/* Gradient Stat */}
        <div className="flex gap-4 justify-between border-t mt-10 pt-8 mb-10">
          <div className="flex gap-2">
            <div className="text-6xl md:text-[6rem] font-semibold inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#D3876A] to-[#A55255]">
              52%
            </div>
            <p className="mt-1 md:mt-4 md:text-lg md:max-w-[250px]">
              of men experience some form of erectile dysfunction in their
              life.*
            </p>
          </div>
        </div>

        {/* Footnotes */}
        <p className="mt-2 text-xs">
          *Source: Feldman, H A et al. “Impotence and its Medical and
          Psychosocial Correlates: Results of the Massachusetts Male Aging
          Study.” The Journal of Urology vol. 151,1 (1994): 54–61.
        </p>
        <p className="mt-8 text-xs">
          **Based on studies of oral erectile dysfunction treatment.
        </p>
      </div>

      {/* Right Image */}
      <div className="relative h-[65vh] md:h-[100vh] max-h-[700px] w-full md:w-[50%] rounded-3xl overflow-hidden mt-10 md:mt-0">
        <CustomImage
          src="https://myrocky.b-cdn.net/WP%20Images/Sexual%20Health/chewalis-common.webp"
          alt="ED Awareness"
          fill
        />
      </div>
    </div>
  );
};

export default CommonStats;

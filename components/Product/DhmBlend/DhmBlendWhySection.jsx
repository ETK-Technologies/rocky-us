"use client";

import Image from "next/image";

const DhmBlendWhySection = () => {
  return (
    <div className="px-5 md:px-0 max-w-[1184px] mx-auto py-14 md:py-24">
      {/* Centered heading at the top of the section */}
      <div className="text-center mb-10">
        <h3 className="capitalize text-[32px] font-[550] md:text-[48px] leading-9 md:leading-[54px] headers-font">
          A Better Way To Celebrate!
        </h3>
        <p className="mt-4 text-[16px] lg:text-[20px] font-[400] leading-[22.4px] tracking-[-0.02em] mx-auto max-w-[255px] lg:max-w-full">
          Digital Healthcare without the long wait times.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
        {/* Right Image - Moved above content on mobile */}
        <div className="w-full lg:w-1/2 lg:order-last relative mb-8 lg:mb-0">
          <div className="relative w-full h-[335px] md:h-[640px] rounded-2xl overflow-hidden">
            <Image
              src="https://myrocky.b-cdn.net/WP%20Images/Global%20Images/New%20Product%20Page/Night-NDW-DHMBlend-WHY.webp"
              alt="People enjoying DHM Blend"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Left Content */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="capitalize text-2xl font-normal md:text-3xl leading-9 md:leading-[54px] headers-font mx-auto">
            Why DHM Blend?
          </h2>

          <p className="text-sm md:text-base pb-5 md:pb-8">
            Science-backed formulation with Dihydromyricetin (DHM), L-Cysteine,
            Milk Thistle, Prickly Pear, and Vitamin B Complex
          </p>

          <p className="text-sm md:text-base pb-5 md:pb-8">
            Conveniently packaged – easy to carry in your pocket or purse. Just
            a few dollars per serving.
          </p>

          <p className="text-sm md:text-base pb-5 md:pb-8">
            Purchased and used by over 350,000 customers worldwide.
          </p>

          <div className="flex flex-nowrap gap-2 sm:gap-4 md:gap-8 mt-8 justify-between sm:justify-start">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 md:w-9 md:h-9 lg:w-12 lg:h-12 flex items-center justify-center mb-2 relative">
                <Image
                  src="https://myrocky.b-cdn.net/WP%20Images/Global%20Images/New%20Product%20Page/gluten-free.png"
                  width={48}
                  height={48}
                  alt="icon"
                />
              </div>
              <span className="text-xs md:text-sm font-medium">
                Gluten-Free
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-9 h-9 md:w-12 md:h-12  flex items-center justify-center mb-2 relative">
                <Image
                  src="https://myrocky.b-cdn.net/WP%20Images/Global%20Images/New%20Product%20Page/vegan-new.png"
                  width={48}
                  height={48}
                  alt="icon"
                />
              </div>
              <span className="text-xs md:text-sm font-medium">Vegan</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-9 h-9 md:w-12 md:h-12  flex items-center justify-center mb-2 relative">
                <Image
                  src="https://myrocky.b-cdn.net/WP%20Images/Global%20Images/New%20Product%20Page/plant-powered.png"
                  width={48}
                  height={48}
                  alt="icon"
                />
              </div>
              <span className="text-xs md:text-sm font-medium">
                Plant-Powered
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center mb-2 relative">
                <Image
                  src="https://myrocky.b-cdn.net/WP%20Images/Global%20Images/New%20Product%20Page/nut-free.png"
                  width={48}
                  height={48}
                  alt="icon"
                />
              </div>
              <span className="text-xs md:text-sm font-medium">Nut-Free</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DhmBlendWhySection;

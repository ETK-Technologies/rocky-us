"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { testimonials } from "./data/testimonials";
import CustomImage from "@/components/utils/CustomImage";

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isFirst = current === 0;
  const isLast = current === testimonials.length - 1;

  const { name, image, description, condition, Treatment } =
    testimonials[current];

  // Preload all images when component mounts
  useEffect(() => {
    testimonials.forEach((testimonial) => {
      const img = new window.Image();
      img.src = testimonial.image;
    });
  }, []);

  // Reset image loaded state when current changes
  useEffect(() => {
    setImageLoaded(false);
  }, [current]);

  const handlePrev = () => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="bg-[#F5F4EF] py-[56px] md:py-[96px] px-4">
      <div className="max-w-6xl mx-auto">
        <div className="font-[550] text-[32px] leading-[115%] tracking-[-1%] align-middle capitalize md:text-5xl  md:tracking-[-2%] max-w-[637px] mb-[32px] md:mb-[56px]  headers-font">
          Join the league of extraordinary skin
        </div>
        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-20">
          <div className="flex flex-col items-center w-full md:w-auto">
            <div className="relative w-full h-[251px] md:w-[560px] md:h-[420px] rounded-3xl overflow-hidden">
              {/* Loading skeleton */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
              )}
              <Image
                src={image}
                alt={`${name} testimonial`}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                priority={current === 0}
              />
            </div>
          </div>

          <div className="max-w-xl flex flex-col justify-between  md:max-w-[480px] mt-5 md:mt-0">
            <div className="flex flex-col">
              <span className="font-[550] text-[28px] leading-[115%] tracking-[-2%] align-middle capitalize md:text-[40px] headers-font">
                {name}
              </span>
              <p className="my-[16px] md:my-[32px] text-[16px] md:text-[18px] h-[144px] md:h-[135px]">
                {description}
              </p>
              <div className="h-px bg-gray-300"></div>
            </div>
            <div className="flex gap-[48px] md:gap-[56px] mt-[16px] md:mt-[32px]">
              <div className="flex flex-col gap-4">
                <p className="font-medium text-lg leading-[140%] tracking-[0%] align-middle uppercase text-[#000000CC]">
                  condition
                </p>
                <p className=" text-base leading-[150%] tracking-[-2%] align-middle uppercase headers-font">
                  {condition}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-medium text-lg leading-[140%] tracking-[0%] align-middle uppercase text-[#000000CC]">
                  Treatment
                </p>
                <p className=" text-base leading-[150%] tracking-[-2%] align-middle uppercase headers-font">
                  {Treatment}
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-[32px] md:pt-[40px] justify-center md:justify-start">
              <button
                onClick={handlePrev}
                className={`w-9 h-9 bg-white border rounded-full flex items-center justify-center text-base hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed ${
                  isFirst ? "border-[#D6D6D6]" : "border-[#212121]"
                }`}
                disabled={isFirst}
              >
                <Image
                  src="/skin-care/arrow.svg"
                  alt="Previous"
                  width={16}
                  height={16}
                  className="scale-x-[-1]"
                />
              </button>
              <button
                onClick={handleNext}
                className={`w-9 h-9 bg-white border rounded-full flex items-center justify-center text-base hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed ${
                  isLast ? "border-[#D6D6D6]" : "border-[#212121]"
                }`}
                disabled={isLast}
              >
                <Image
                  src="/skin-care/arrow.svg"
                  alt="Next"
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Image from "next/image";

const DhmIngredients = () => {
  const ingredients = [
    { name: "DIHYDROMYRICETIN (DHM)", iconSrc: "/zonic/planet.svg" },
    { name: "MILK THISTLE", iconSrc: "/zonic/rain-drop.svg" },
    { name: "PRICKLY PEAR", iconSrc: "/zonic/taste.svg" },
    { name: "L-CYSTEINE", iconSrc: "/zonic/Nicotine.svg" },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-[#9bccdb] to-[#4A90E2] md:bg-gradient-to-r md:from-[#9bccdb] md:to-[#4A90E2] rounded-2xl overflow-hidden relative">
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="https://myrocky.b-cdn.net/WP%20Images/Global%20Images/New%20Product%20Page/dhm-cover.jpg"
          alt="DHM Blend Background"
          fill
          className="object-cover"
          style={{ transform: "scaleX(-1)" }}
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between relative z-10">
        {/* Content Section */}
        <div className="w-full md:w-1/2 pt-8 px-5 md:py-[96.5px] md:pl-20">
          <h3 className="capitalize text-[32px] font-[550] md:text-[48px] leading-9 md:leading-[54px] headers-font mb-4">
            DHM Ingredients Explained.
          </h3>
          <p className="text-[16px] md:text-[18px] leading-[140%] mb-8 md:mb-14">
            The foundation and most abundant ingredient in{" "}
            <strong>DHM Blend,</strong> which has been used in Asia for
            centuries.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6 mb-6">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 ${
                  index === 0 ? "col-span-2 md:col-span-1" : ""
                }`}
              >
                <Image
                  src={ingredient.iconSrc}
                  alt={ingredient.name}
                  width={24}
                  height={24}
                />
                <span className="text-[14px] md:text-[16px]">
                  {ingredient.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DhmIngredients;

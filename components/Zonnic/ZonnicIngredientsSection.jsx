import React from "react";
import Image from "next/image";

const ZonnicIngredients = () => {
  const ingredients = [
    { name: "Plant-based fibres", iconSrc: "/zonic/planet.svg" },
    { name: "Water", iconSrc: "/zonic/rain-drop.svg" },
    { name: "Sweetener", iconSrc: "/zonic/taste.svg" },
    { name: "Nicotine", iconSrc: "/zonic/Nicotine.svg" },
    { name: "Flavouring", iconSrc: "/zonic/eyedropper.svg" },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-[#C5F5C9] to-[#91D787] md:bg-gradient-to-r md:from-[#C5F5C9] md:to-[#91D787] md rounded-2xl overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between">
        {/* Content Section */}
        <div className="w-full md:w-1/2 pt-8 px-5 md:py-[96.5px] md:pl-20">
          <h3 className="capitalize text-[32px] font-[550] md:text-[48px] leading-9 md:leading-[54px] headers-font mb-4">
            ZONNIC Ingredients Explained
          </h3>
          <p className="text-[16px] md:text-[18px] leading-[140%] mb-8 md:mb-4">
          We're serious about what goes into our pouches.{" "}
            <strong>ZONNIC</strong> only uses high-quality ingredients: Water,
            plant-based fibres, flavouring, sweetener and nicotine.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-6">
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
 
        <div className="flex justify-center md:justify-end">
          <div className="relative w-[335px] h-[300px] md:w-[592px] md:h-[600px]">
            <Image
              src="/zonic/zonnic-pouch.png"
              alt="ZONNIC pouch"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZonnicIngredients;

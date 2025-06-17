"use client";
import { useState } from "react";
import CustomImage from "../utils/CustomImage";

export default function MemberCard({ name, title, description, image }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-[343px] md:h-[283.5px] bg-[#1f1e1c] rounded-3xl w-full flex flex-col items-center overflow-hidden relative">
      {/* <div className="w-full h-[78%] overflow-hidden">
        <Image
          src={image}
          alt={name}
          width={300}
          height={300}
          className="object-cover w-full h-full object-top"
        />
      </div> */}
      <div className="relative rounded-2xl overflow-hidden h-[78%] w-full ">
        <CustomImage fill src={image} alt={name} />
      </div>

      {/* Toggle Button */}
      <div className="bg-transparent flex items-center w-full absolute bottom-0 text-white py-5 px-5 rounded-t-3xl h-[115px]">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-2xl bg-[#724212] hover:bg-[#593007] w-[50px] h-[50px] rounded-full flex items-center justify-center absolute right-5 bottom-5 z-[30]"
          style={{
            transform: isOpen ? "rotateZ(45deg)" : "rotateZ(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          +
        </button>
      </div>

      {/* Description Overlay */}
      <div
        className={`bg-[#706f6a] w-full absolute top-0 text-white py-5 px-5 rounded-t-3xl h-full z-[15] transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-[67%]"
        }`}
      >
        <div
          className={`desc max-h-[280px] text-left pr-2 pb-8 ${
            isOpen ? "overflow-y-auto " : "overflow-y-hidden"
          }`}
        >
          <div className="mt-[10px]">
            <p className="font-bold md:font-semibold md:text-sm">{name}</p>
            <p className="text-sm md:text-[12px]">{title}</p>
          </div>
          <br />
          <br />
          <p className="text-sm leading-[1.4]">{description}</p>
        </div>
      </div>
    </div>
  );
}

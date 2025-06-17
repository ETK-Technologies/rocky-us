"use client";

import { useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const WLProgramItem = ({ Item , className='lg:w-3/4'}) => {
  const [isOpen, setIsOpen] = useState(Item.id === "1"); // Set first item open by default

  const toggleItem = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div key={Item.id} className={`relative ` + className}>
      <span className="text-[#814B00] font-[14px]">{Item?.time}</span>
      <div className="flex content-center">
        <p className="w-[90%] lg:text-[24px] font-[450] leading-[140%] text-[16px]">{Item?.title}</p>
        <div className="flex w-[10%]justify-end text-right">
          <button
            onClick={toggleItem}
            className="focus:outline-none"
            aria-label={isOpen ? "Collapse" : "Expand"}
          >
            <FaAngleUp
              className={`ml-2 mt-1 text-lg transition-all duration-300 transform ${
                isOpen ? "rotate-0" : "rotate-180"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Content with sliding animation */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-base text-[14px] lg:text-[20px] mt-2 pb-2">{Item?.description}</p>
        </div>
      </div>

      <hr className="border-gray-200 border-1 my-4" />
    </div>
  );
};
export default WLProgramItem;

"use client";
import React, { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#E2E2E1] last:mb-10 md:last:mb-14 focus:outline-none">
      <button
        className="w-full py-6 flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-base md:text-2xl text-black">
          {question}
        </span>
        <span className="transition-transform duration-300">
          {isOpen ? (
            <FiX className="text-2xl rotate-0" />
          ) : (
            <FiPlus className="text-2xl rotate-0" />
          )}
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-5 md:pb-6">
            <div className="text-black text-sm md:text-base leading-[140%]">
              {answer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;

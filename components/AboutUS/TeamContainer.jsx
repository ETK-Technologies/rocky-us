"use client";

import { useState } from "react";
import TeamCard from "./TeamCard";

const TeamContainer = ({ title, teamMembers, scrollRef }) => {

    const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div className="text-center text-black text-[22px] md:text-[30px] headers-font capitalize leading-[33px]  ">
        {title}
      </div>
      <div
        ref={scrollRef}
        className="w-full md:items-center md:gap-4 overflow-x-auto overflow-y-hidden mt-[-70px] md:mt-[-40px] no-scrollbar"
      >
        <div className="flex text-center mt-[24px] px-6 sectionWidth:px-0">
          {teamMembers.map((member, index) => (
            <div key={index} className={index !== 0 ? "-ml-16 md:ml-0" : ""}>
              <TeamCard {...member} index={index} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-1 mt-8 md:hidden">
        {teamMembers.map((_, index) => (
          <span
            key={index}
            className={`w-[6px] h-[6px] rounded-full transition-colors ${
              index === activeIndex ? "bg-black" : "bg-[#00000033]"
            }`}
          />
        ))}
      </div>
    </>
  );
};

export default TeamContainer;

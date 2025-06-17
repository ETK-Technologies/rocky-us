import React from "react";

const SectionHeader = ({ title, subtitle, description, className = "" }) => {
  return (
    <div className={`mb-10 md:mb-14 ${className}`}>
      <h2 className="text-[32px] md:text-5xl font-[550] headers-font mb-3 md:mb-4 leading-[115%] md:leading-[100%] headers-font">
        {title}
      </h2>
      <p className="text-base md:text-xl text-black leading-[140%] md:leading-[100%]">
        {subtitle}
      </p>
      {description && <p className="text-base mt-2">{description}</p>}
    </div>
  );
};

export default SectionHeader;

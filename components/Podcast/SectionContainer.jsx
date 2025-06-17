import React from "react";

const SectionContainer = ({
  children,
  bgColor = "bg-white",
  paddingY = "py-14 md:py-20",
  className = "",
}) => {
  return (
    <section className={`${bgColor} ${paddingY} ${className}`}>
      <div className="max-w-[1184px] mx-auto px-5 sectionWidth:px-0">
        {children}
      </div>
    </section>
  );
};

export default SectionContainer;

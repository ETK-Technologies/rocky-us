import React from "react";

const FAQTabs = ({
  activeTab,
  scrollToSection,
  sexRef,
  hairLossRef,
  hairCareRef,
}) => {
  return (
    <div className="md:col-span-1 md:sticky md:top-20 md:h-fit">
      <div className="flex flex-col gap-3">
        <button
          className={`text-left inline-block w-fit ${
            activeTab === "sex"
              ? "font-bold text-black border-b-2 border-black"
              : "text-[#000000A6]"
          }`}
          onClick={() => scrollToSection(sexRef, "sex")}
        >
          Sexual Health
        </button>
        <button
          className={`text-left inline-block w-fit ${
            activeTab === "hairLoss"
              ? "font-bold text-black border-b-2 border-black"
              : "text-[#000000A6]"
          }`}
          onClick={() => scrollToSection(hairLossRef, "hairLoss")}
        >
          Hair Loss
        </button>
        {/* <button
          className={`text-left inline-block w-fit ${
            activeTab === "hairCare"
              ? "font-bold text-black border-b-2 border-black"
              : "text-[#000000A6]"
          }`}
          onClick={() => scrollToSection(hairCareRef, "hairCare")}
        >
          Hair Care
        </button> */}
      </div>
    </div>
  );
};

export default FAQTabs;

import React from "react";

const DescribeDiet = ({ onOptionSelect }) => {
  const options = [
    "Very healthy",
    "Somewhat healthy",
    "Neither healthy not unhealthy",
    "Somewhat unhealthy",
    "Very unhealthy",
  ];

  return (
    <div className="w-full md:w-[520px] mx-auto px-5 md:px-0 mt-6">
      <h1 className=" mb-4  headers-font text-[26px] font-[450] md:font-medium md:text-[32px] md:leading-[115%] leading-[120%] tracking-[-1%] md:tracking-[-2%]">
        How would you describe your diet in the past month?
      </h1>

      <p className="text-[#AE7E56] text-[16px] md:text-[18px] font-medium leading-[140%] tracking-[0%] mb-6 md:mb-[30px]">
        Understanding your diet helps us choose the right treatment for you.
      </p>

      <div className="space-y-4">
        {options.map((option, index) => (
          <button
            key={index}
            className="w-full text-left px-4 py-5 md:py-6 border-[1px] border-[#E2E2E1] rounded-lg "
            onClick={() => onOptionSelect(option)}
          >
            <span className="text-[14px] md:text-[16px] font-medium leading-[140%] tracking-[0%] text-black">
              {option}
            </span>
          </button>
        ))}
      </div>
      <div className="text-[10px] mt-6 text-[#00000059] text-left] font-[400] leading-[140%] tracking-[0%]">
        We respect your privacy. All of your information is securely stored on
        our HIPAA Compliant server.
      </div>
    </div>
  );
};

export default DescribeDiet;

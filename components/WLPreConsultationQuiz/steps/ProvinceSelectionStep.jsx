import React, { useState } from "react";

const ProvinceSelectionStep = ({ onProvinceSelect }) => {
  const [selectedProvince, setSelectedProvince] = useState("");

  const provinces = [
    { value: "", label: "Select province" },
    { value: "Ontario", label: "Ontario" },
    { value: "British Columbia", label: "British Columbia" },
    { value: "Quebec", label: "Quebec" },
    { value: "Alberta", label: "Alberta" },
    { value: "Manitoba", label: "Manitoba" },
    { value: "New Brunswick", label: "New Brunswick" },
    { value: "Nova Scotia", label: "Nova Scotia" },
    { value: "Saskatchewan", label: "Saskatchewan" },
    { value: "Other", label: "Other" },
  ];

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
  };

  const handleContinue = () => {
    if (selectedProvince) {
      onProvinceSelect(selectedProvince);
    }
  };

  const isValid = selectedProvince && selectedProvince !== "";

  return (
    <div className="w-full md:w-[520px] mx-auto px-5 md:px-0 flex flex-col min-h-screen">
      <div className="flex-grow mt-6">
        <h1 className="headers-font text-[26px] font-[450] md:font-medium md:text-[32px] md:leading-[115%] leading-[120%] tracking-[-1%] md:tracking-[-2%] mb-4">
          First, let's make sure we have licensed providers in your area.
        </h1>

        <p className="text-[#AE7E56] text-[16px] md:text-[18px] font-medium leading-[140%] tracking-[0%] mb-6 md:mb-[30px]">
          Weight loss medication, prescribed online and delivered to your door.
        </p>

        <div className="mb-6">
          <label
            htmlFor="province"
            className="block text-[16px] font-medium text-black mb-3"
          >
            Province
          </label>
          <select
            id="province"
            name="province"
            className="block w-[100%] rounded-[8px] h-[48px] md:h-[52px] text-[16px] border-[1px] border-[#E2E2E1] px-4 focus:outline focus:outline-2 focus:outline-black focus:ring-0 focus:border-transparent bg-white"
            value={selectedProvince}
            onChange={handleProvinceChange}
            style={{ outlineColor: "black" }}
          >
            {provinces.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="text-[10px] mt-6 text-[#00000059] text-left font-[400] leading-[140%] tracking-[0%]">
          We respect your privacy. All of your information is securely stored on
          our PIPEDA Compliant server.
        </div>
      </div>

      {/* Continue Button - Positioned at bottom */}
      <div className="sticky bottom-0 py-4 bg-white">
        <button
          onClick={handleContinue}
          disabled={!isValid}
          className={`w-full py-4 rounded-full font-medium text-[16px] md:text-[18px] transition-colors ${
            isValid
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ProvinceSelectionStep;

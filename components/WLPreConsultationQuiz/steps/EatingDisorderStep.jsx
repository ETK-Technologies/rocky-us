import React from "react";

const EatingDisorderStep = ({ onOptionSelect }) => {
  const PrivacyText = () => (
    <p className="text-xs text-gray-500  my-6">
      We respect your privacy. All of your information is securely stored on our
      HIPAA Compliant server.
    </p>
  );

  const options = ["Yes", "No", "No, but I think I may have one"];

  return (
    <div className="w-full md:w-[520px] mx-auto px-5 md:px-0 mt-6">
      <h1 className="text-2xl mb-6 font-semibold">
        Have you ever been diagnosed with an eating disorder?
      </h1>

      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            onClick={() => onOptionSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <PrivacyText />
    </div>
  );
};

export default EatingDisorderStep;

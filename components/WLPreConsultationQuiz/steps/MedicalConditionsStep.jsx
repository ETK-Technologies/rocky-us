import React from "react";

const MedicalConditionsStep = ({ onConditionSelect }) => {
  const PrivacyText = () => (
    <p className="text-xs text-gray-500  my-6">
      We respect your privacy. All of your information is securely stored on our
      PIPEDA Compliant server.
    </p>
  );

  const medicalConditions = [
    "Multiple Endocrine Neoplasia Type 2",
    "Personal or family history of medullary thyroid cancer",
    "Chronic liver or kidney disease",
    "Diabetic retinopathy",
    "History of self harm",
    "Pancreatitis",
    "Receiving treatment or consultation for an eating disorder",
    "Schizophrenia or mania/bipolar disorder",
    "Alcohol abuse",
    "History of suicidal ideation",
    "None of these apply to me",
  ];

  return (
    <div className="w-full md:w-[520px] mx-auto px-5 md:px-0 mt-6">
      <h1 className="text-2xl mb-6 font-semibold">
        Do you have any of the following medical conditions?
      </h1>

      <div className="space-y-3">
        {medicalConditions.map((condition, index) => (
          <button
            key={index}
            className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            onClick={() => onConditionSelect(condition)}
          >
            {condition}
          </button>
        ))}
      </div>
      <PrivacyText />
    </div>
  );
};

export default MedicalConditionsStep;

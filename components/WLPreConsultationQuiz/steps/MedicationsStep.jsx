import React from "react";

const MedicationsStep = ({ onMedicationSelect }) => {
  const PrivacyText = () => (
    <p className="text-xs text-gray-500  my-6">
      We respect your privacy. All of your information is securely stored on our
      HIPAA Compliant server.
    </p>
  );

  const medications = [
    "Sulfonylureas (i.e. Gliclazide or glimepiride)",
    "Insulin",
    "Meglitinides",
    "Furosemide (Lasix)",
    "SSRIs (fluoxetine, citalopram, sertraline, escitalopram)",
    "None of the above",
  ];

  return (
    <div className="w-full md:w-[520px] mx-auto px-5 md:px-0 mt-6">
      <h1 className="text-2xl mb-6 font-semibold">
        Do you take any of the following medications?
      </h1>

      <div className="space-y-3">
        {medications.map((medication, index) => (
          <button
            key={index}
            className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            onClick={() => onMedicationSelect(medication)}
          >
            {medication}
          </button>
        ))}
      </div>
      <PrivacyText />
    </div>
  );
};

export default MedicationsStep;

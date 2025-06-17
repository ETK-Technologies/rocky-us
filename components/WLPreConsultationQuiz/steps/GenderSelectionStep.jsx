import React from "react";

const GenderSelectionStep = ({ userData, setUserData, onContinue }) => {
  const handleGenderSelect = (gender) => {
    setUserData((prev) => ({ ...prev, gender }));
    onContinue();
  };

  return (
    <div className="py-8 px-4">
      <h1 className="text-2xl mb-6 font-semibold">Gender Selection</h1>
      <p className="mb-6 text-gray-700">
        To provide you with the most relevant experience and product
        recommendations, please select your gender.
      </p>

      <div className="space-y-4">
        <button
          onClick={() => handleGenderSelect("male")}
          className={`w-full p-4 border rounded-lg text-left flex items-center gap-3 ${
            userData.gender === "male"
              ? "border-[#814B00] bg-[#FFFBF7]"
              : "border-gray-300"
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full border ${
              userData.gender === "male"
                ? "border-[#814B00] bg-[#814B00]"
                : "border-gray-300"
            }`}
          >
            {userData.gender === "male" && (
              <div className="w-3 h-3 bg-white rounded-full m-[3px]"></div>
            )}
          </div>
          <span>Male</span>
        </button>

        <button
          onClick={() => handleGenderSelect("female")}
          className={`w-full p-4 border rounded-lg text-left flex items-center gap-3 ${
            userData.gender === "female"
              ? "border-[#814B00] bg-[#FFFBF7]"
              : "border-gray-300"
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full border ${
              userData.gender === "female"
                ? "border-[#814B00] bg-[#814B00]"
                : "border-gray-300"
            }`}
          >
            {userData.gender === "female" && (
              <div className="w-3 h-3 bg-white rounded-full m-[3px]"></div>
            )}
          </div>
          <span>Female</span>
        </button>
      </div>
    </div>
  );
};

export default GenderSelectionStep;

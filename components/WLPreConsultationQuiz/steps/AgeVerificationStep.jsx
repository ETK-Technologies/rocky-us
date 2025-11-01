import React, { useState } from "react";
import DOBInput from "../../shared/DOBInput";

const AgeVerificationStep = ({ onDateSelect }) => {
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleDateChange = (value) => {
    setDateOfBirth(value);
  };

  const handleContinue = () => {
    if (dateOfBirth && isValidAge()) {
      onDateSelect(dateOfBirth);
    }
  };

  // Check if user is 18 years or older
  const isValidAge = () => {
    if (!dateOfBirth) return false;

    if (dateOfBirth.includes("-")) {
      const dateParts = dateOfBirth.split("-");
      if (dateParts.length === 3) {
        const birthYear = parseInt(dateParts[0]);
        const birthMonth = parseInt(dateParts[1]);
        const birthDay = parseInt(dateParts[2]);

        const today = new Date();
        const birthDate = new Date(birthYear, birthMonth - 1, birthDay);

        let age = today.getFullYear() - birthYear;
        const monthDiff = today.getMonth() - (birthMonth - 1);

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDay)) {
          age--;
        }

        return age >= 18;
      }
    } else {
      const dateParts = dateOfBirth.split("/");
      if (dateParts.length === 3) {
        const birthMonth = parseInt(dateParts[0]);
        const birthDay = parseInt(dateParts[1]);
        const birthYear = parseInt(dateParts[2]);

        const today = new Date();
        const birthDate = new Date(birthYear, birthMonth - 1, birthDay);

        let age = today.getFullYear() - birthYear;
        const monthDiff = today.getMonth() - (birthMonth - 1);

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDay)) {
          age--;
        }

        return age >= 18;
      }
    }
    return false;
  };

  const isValid = dateOfBirth && dateOfBirth !== "" && isValidAge();

  return (
    <div className="w-full md:w-[520px] mx-auto px-5 md:px-0 flex flex-col min-h-screen">
      <div className="flex-grow mt-6">
        <h1 className="headers-font text-[26px] font-[450] md:font-medium md:text-[32px] md:leading-[115%] leading-[120%] tracking-[-1%] md:tracking-[-2%] mb-4">
          To verify eligibility, please confirm your age:
        </h1>

        <div className="mb-6">
          <label
            htmlFor="date_of_birth"
            className="block text-[16px] font-medium text-black mb-3"
          >
            Date of Birth
          </label>
          <DOBInput
            value={dateOfBirth}
            onChange={handleDateChange}
            className="block w-[100%] rounded-[8px] h-[48px] md:h-[52px] text-[16px] border-[1px] border-[#E2E2E1] px-4 focus:outline focus:outline-2 focus:outline-black focus:ring-0 focus:border-transparent pr-10 bg-white"
            placeholder="MM/DD/YYYY"
            minAge={18}
            required
          />
        </div>

        <div className="text-[10px] mt-6 text-[#00000059] text-left font-[400] leading-[140%] tracking-[0%]">
          We respect your privacy. All of your information is securely stored on
          our HIPAA Compliant server.
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

export default AgeVerificationStep;

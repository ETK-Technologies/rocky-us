import React, { useEffect } from "react";
import { logger } from "@/utils/devLogger";

const BMICalculatorStep = ({
  userData,
  setUserData,
  onContinue,
  validationState,
  setValidationState,
  showBmiPopup,
}) => {
  // Destructure userData

  const {
    weight: weightPounds,
    height: { feet: heightFeet, inches: heightInches },
    bmi,
  } = userData;
  const calculateBMI = () => {
    const feetNum = parseFloat(heightFeet) || 0;
    const inchesNum = parseFloat(heightInches) || 0;
    const weightNum = parseFloat(weightPounds) || 0;

    if (feetNum <= 0 || inchesNum < 0 || inchesNum >= 12 || weightNum <= 0) {
      setValidationState((prev) => ({ ...prev, bmiContinueEnabled: false }));
      return;
    }

    const heightInInches = feetNum * 12 + inchesNum;
    const calculatedBmi = (weightNum / (heightInInches * heightInInches)) * 703;
    // logger.log(heightFeet, heightInches);
    // logger.log(weightPounds);
    // logger.log(calculatedBmi);

    setUserData((prev) => ({ ...prev, bmi: calculatedBmi.toFixed(2) }));

    if (calculatedBmi >= 27) {
      setValidationState((prev) => ({ ...prev, bmiContinueEnabled: true }));
    } else {
      setValidationState((prev) => ({ ...prev, bmiContinueEnabled: false }));
    }
  };

  useEffect(() => {
    calculateBMI();
  }, [weightPounds, heightFeet, heightInches]);

  const PrivacyText = () => (
    <p className="text-xs text-gray-500 my-6">
      We respect your privacy. All of your information is securely stored on our
      HIPAA Compliant server.
    </p>
  );

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full md:w-[520px] mx-auto px-5 md:px-0 mt-6 flex-grow pb-24">
        <h1 className="text-[26px] font-semibold">
          What is your height and weight?
        </h1>
        <p className="text-[#A0693B] text-[16px] font-[500] leading-[140%] py-6">
          This helps calculate your BMI (Body Mass Index), a general screening
          tool for body composition.
        </p>

        <div className="mb-6">
          <label className="block mb-2">Your height is:</label>
          <div className="flex items-center mb-4 gap-2">
            <input
              type="number"
              min="0"
              className="h-[60px] w-full p-3 border border-gray-300 rounded-md "
              placeholder="Feet"
              value={heightFeet}
              onChange={(e) => {
                const value = e.target.value;
                setUserData((prev) => ({
                  ...prev,
                  height: {
                    ...prev.height,
                    feet: value === "" ? "" : parseInt(value) || 0,
                  },
                }));
              }}
            />
            <button
              className="min-w-[60px] h-[60px] p-3 text-2xl border border-gray-300 rounded-md flex items-center justify-center"
              onClick={() => {
                setUserData((prev) => ({
                  ...prev,
                  height: {
                    ...prev.height,
                    feet: Math.max(0, prev.height.feet - 1),
                  },
                }));
              }}
            >
              −
            </button>
            <button
              className="min-w-[60px] h-[60px] p-3 text-2xl border border-gray-300 rounded-md flex items-center justify-center"
              onClick={() => {
                setUserData((prev) => ({
                  ...prev,
                  height: {
                    ...prev.height,
                    feet: prev.height.feet + 1,
                  },
                }));
              }}
            >
              +
            </button>
          </div>

          <div className="flex items-center">
            <input
              type="number"
              min="0"
              className="h-[60px] w-full p-3 border border-gray-300 rounded-md mr-2"
              placeholder="Inches"
              value={heightInches}
              onChange={(e) => {
                const value = e.target.value;
                setUserData((prev) => ({
                  ...prev,
                  height: {
                    ...prev.height,
                    inches: value === "" ? "" : parseInt(value) || 0,
                  },
                }));
              }}
            />
            <button
              className="min-w-[60px] h-[60px] p-3 text-2xl border border-gray-300 rounded-md flex items-center justify-center"
              onClick={() => {
                setUserData((prev) => ({
                  ...prev,
                  height: {
                    ...prev.height,
                    inches: Math.max(0, prev.height.inches - 1),
                  },
                }));
              }}
            >
              −
            </button>
            <button
              className="min-w-[60px] h-[60px] p-3 text-2xl border border-gray-300 rounded-md flex items-center justify-center ml-2"
              onClick={() => {
                setUserData((prev) => ({
                  ...prev,
                  height: {
                    ...prev.height,
                    inches: Math.min(11, prev.height.inches + 1),
                  },
                }));
              }}
            >
              +
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2">Your weight is:</label>
          <input
            type="number"
            className="h-[60px] w-full p-3 border border-gray-300 rounded-md"
            placeholder="Weight (Pounds)"
            value={weightPounds}
            onChange={(e) => {
              const value = e.target.value;
              setUserData((prev) => ({
                ...prev,
                weight: value,
              }));
            }}
          />
        </div>

        <div className="bg-gray-100 rounded-md p-6 mb-6">
          <div className="text-center">
            <p className="text-sm mb-2">Your BMI</p>
            <p className="text-6xl font-bold">{bmi || 0}</p>
          </div>
        </div>

        <PrivacyText />
      </div>

      <div className="fixed bottom-0 left-0 w-full px-4 py-4 bg-white">
        <div className="w-full max-w-md mx-auto">
          {" "}
          <button
            className={`w-full py-3 ${
              bmi && parseFloat(bmi) >= 27
                ? "bg-black text-white"
                : "bg-gray-300 text-gray-700"
            } rounded-full font-medium`}
            onClick={onContinue}
            disabled={!bmi || parseFloat(bmi) < 27}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BMICalculatorStep;

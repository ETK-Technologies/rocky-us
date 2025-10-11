import React from "react";
import CustomImage from "../../utils/CustomImage";

const WeightLossMotivationStep = ({ weightGoal, onContinue }) => {
  // Show full component for first three choices, without first paragraph for first choice
  const shouldShowFirstParagraph =
    weightGoal !== "Not sure, I just want to lose weight";

  // Extract the weight range for dynamic text
  const getWeightRange = () => {
    if (weightGoal === "Losing 1-15 lbs") return "1-15 lbs";
    if (weightGoal === "Losing 16-50 lbs") return "16-50 lbs";
    if (weightGoal === "Losing 51+ lbs") return "51+ lbs";
    return "your goal"; // fallback text when weightGoal is undefined
  };

  return (
    <div className="w-full md:w-[520px] mx-auto px-5 md:px-0 flex flex-col min-h-screen">
      <div className="flex-grow mt-6">
        {shouldShowFirstParagraph && (
          <p className="text-[16px]  headers-font md:text-[18px] md:font-medium leading-[140%] tracking-[0%] text-black mb-6">
            Your goal to lose{" "}
            <span className="text-[#AE7E56] font-medium">
              {getWeightRange()}
            </span>{" "}
            is closer than you might think—and it doesn't involve restrictive
            diets.
          </p>
        )}

        {/* Main Card */}
        <div className="flex justify-center items-center">
          <CustomImage
            className="my-[48px]"
            src={"/wl-pre-consultation/lose-20-mob.png"}
            height="523"
            width="335"
            alt={"Weight Loss Motivation"}
          />
        </div>

        {!shouldShowFirstParagraph && (
          <div className="text-[10px] my-6 text-[#00000059] text-left font-[400] leading-[140%] tracking-[0%]">
            Graph for illustrative purposes only to demonstrate potential
            appetite suppression trends. Individual results will vary. Along
            with a reduced calorie diet and increased exercise. In a 68-week
            clinical study of Wegovy®, about 1 in 3 adults with obesity or with
            overweight and weight-related medical problems achieved 20% weight
            loss. Average weight loss achieved was 15%. Wegovy® is a registered
            trademark of Novo Nordisk.
          </div>
        )}
      </div>

      {/* Continue Button - Positioned at bottom */}
      <div className="sticky bottom-0 py-4 bg-white">
        <button
          onClick={onContinue}
          className="w-full py-4 bg-black text-white rounded-full font-medium text-[16px] md:text-[18px] hover:bg-gray-800 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default WeightLossMotivationStep;

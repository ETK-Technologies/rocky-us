import { memo } from "react";

const ProgressIndicator = memo(({ currentQuestion, totalQuestions }) => {
  return (
    <div className="mb-8">
      <div className="text-center text-[#C19A6B] font-medium mb-4">
        Question {currentQuestion}/{totalQuestions}
      </div>
      <div className="flex justify-center space-x-2">
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full ${
              index < currentQuestion ? "bg-[#C19A6B] w-16" : "bg-gray-300 w-16"
            }`}
          />
        ))}
      </div>
    </div>
  );
});
ProgressIndicator.displayName = "ProgressIndicator";

export default ProgressIndicator;


const ProgressIndicatorTC = ({ currentQuestion, totalQuestions  }) => {
  return (
    <div className="mb-8">
      <div className="font-[POPPINS] font-medium text-[14px] leading-[140%] tracking-[0px] mb-[8px] text-[#AE7E56]">
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
};


export default ProgressIndicatorTC;
import { memo } from "react";
import ProgressIndicator from "./ProgressIndicator";
import OptionButton from "./OptionButton";
import { QUESTIONS_DATA } from "./constants";

const FirstQuestion = memo(({ question, answers, onOptionSelect }) => (
  <div className="w-full md:w-1/2 p-6 bg-white rounded-r-lg md:h-[720px] flex items-center">
    <div className="mx-auto w-full">
      <ProgressIndicator
        currentQuestion={1}
        totalQuestions={QUESTIONS_DATA.length}
      />

      <h2 className="text-2xl lg:text-4xl font-semibold text-center mb-8 headers-font">
        {question.title}
      </h2>

      <div className="options-container space-y-4">
        {question.options.map((option) => (
          <OptionButton
            key={option.id}
            option={option}
            isSelected={answers[1] === option.id}
            onClick={() => onOptionSelect(1, option.id)}
          />
        ))}
      </div>
    </div>
  </div>
));
FirstQuestion.displayName = "FirstQuestion";

export default FirstQuestion;

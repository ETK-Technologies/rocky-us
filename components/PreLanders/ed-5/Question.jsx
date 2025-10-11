import { memo } from "react";
import ProgressIndicator from "./ProgressIndicator";
import OptionButton from "./OptionButton";

// Import the questions data
import { QUESTIONS_DATA } from "./constants";

const Question = memo(({ question, answers, onOptionSelect }) => (
  <div id={`question-${question.id}`} className="question-container mb-16 p-6">
    <div className="max-w-md mx-auto">
      <ProgressIndicator
        currentQuestion={question.id}
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
            isSelected={answers[question.id] === option.id}
            onClick={() => onOptionSelect(question.id, option.id)}
          />
        ))}
      </div>
    </div>
  </div>
));
Question.displayName = "Question";

export default Question;

import React from 'react';
import { QuestionLayout } from '../EdQuestionnaire/QuestionLayout';
import { QuestionOption } from '../EdQuestionnaire/QuestionOption';

const QuestionOne = ({ currentPage, answer, onAnswerChange }) => {
  return (
    <QuestionLayout
      title="Have you taken ED meds in the past?"
      currentPage={currentPage}
      pageNo={1}
      questionId={1}
      inputType="radio"
    >
      <QuestionOption
        id="1_1"
        name="1"
        value="Yes"
        checked={answer === 'Yes'}
        onChange={() => onAnswerChange(1, 'Yes')}
        type="radio"
        label="Yes"
        className="mb-4"
      />
      <QuestionOption
        id="1_2"
        name="1"
        value="No"
        checked={answer === 'No'}
        onChange={() => onAnswerChange(1, 'No')}
        type="radio"
        label="No"
      />
    </QuestionLayout>
  );
};

export default QuestionOne;
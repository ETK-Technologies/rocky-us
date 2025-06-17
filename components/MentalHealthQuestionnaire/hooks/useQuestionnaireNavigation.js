import { useState, useRef } from 'react';
import { QUESTION_CONFIG, VALIDATION_RULES } from '../constants';
import { QUESTION_CONFIGS } from '../components/QuestionConfigs';

export const useQuestionnaireNavigation = (formData, setCurrentPage, setProgress, setQuestionsStack, setIsMovingForward, calculateProgress, submitFormData) => {
  const [cameFromBack, setCameFromBack] = useState(false);
  const isNavigatingRef = useRef(false);

  const handleBackClick = () => {
    setCameFromBack(true);
    moveToPreviousSlide();
  };

  const moveToNextSlide = (isValidated) => {
    if (!isValidated()) return;
    if (isNavigatingRef.current) return;

    isNavigatingRef.current = true;
    setCameFromBack(false);
    setIsMovingForward(true);
    const nextPage = getNextQuestionId();

    const updatedStack = [...questionsStack, currentPage];
    setQuestionsStack(updatedStack);
    setCurrentPage(nextPage);

    const newProgress = calculateProgress(nextPage);
    setProgress(newProgress);

    submitFormData();
    
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 500);
  };

  const moveToPreviousSlide = () => {
    if (questionsStack.length === 0) return;
    if (isNavigatingRef.current) return;

    isNavigatingRef.current = true;
    setCameFromBack(true);
    setIsMovingForward(false);

    const newStack = [...questionsStack];
    const prevPage = newStack.pop();

    setQuestionsStack(newStack);
    setCurrentPage(prevPage);

    const newProgress = calculateProgress(prevPage);
    setProgress(newProgress);
    
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 500);
  };

  const getNextQuestionId = () => {
    const currentPage = questionsStack[questionsStack.length - 1] || 1;
    
    const questionConfig = QUESTION_CONFIGS[Object.keys(QUESTION_CONFIGS).find(key => 
      QUESTION_CONFIGS[key].currentPage === currentPage
    )];
    
    if (questionConfig && questionConfig.continueToQuestionFor && formData[questionConfig.questionId]) {
      const selectedOption = formData[questionConfig.questionId];
      if (questionConfig.continueToQuestionFor[selectedOption]) {
        const targetQuestionId = questionConfig.continueToQuestionFor[selectedOption];
        const targetConfig = Object.values(QUESTION_CONFIGS).find(q => q.questionId === targetQuestionId);
        if (targetConfig) {
          return targetConfig.currentPage;
        }
      }
    }
    
    const config = QUESTION_CONFIG[currentPage];
    if (!config) return currentPage + 1;

    if (config.nextQuestions) {
      const questionIdKey = formData[currentPage] ? currentPage : `${currentPage}01`;
      return config.nextQuestions[formData[questionIdKey]] || currentPage + 1;
    }

    return config.nextQuestion || currentPage + 1;
  };

  const handleFormChangeWithAutoAdvance = (field, value, currentPage, questionsStack, hideError, validateMedicationFields, inputFieldsValid) => {
    const isRadioButtonQuestion = [1, 2, 3, 5, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 29, 30, 31, 33].includes(currentPage);
    
    if (isRadioButtonQuestion && !cameFromBack) {
      const updatedFormData = {...formData, [field]: value};
      
      if (currentPage === 1) {
        return;
      }
      
      if (isNavigatingRef.current) return;
      
      setTimeout(() => {
        if (isNavigatingRef.current) return;
        
        const standardValidation = !VALIDATION_RULES[currentPage] || VALIDATION_RULES[currentPage](updatedFormData);
        const specialCaseValid = currentPage === 1 ? validateMedicationFields(currentPage, updatedFormData) && inputFieldsValid : true;
        
        if (standardValidation && specialCaseValid) {
          hideError();
          
          setTimeout(() => {
            isNavigatingRef.current = true;
            
            setCameFromBack(false);
            setIsMovingForward(true);
            
            const config = QUESTION_CONFIG[currentPage];
            let nextPage;
            
            if (config && config.nextQuestions && config.nextQuestions[updatedFormData[currentPage]]) {
              nextPage = config.nextQuestions[updatedFormData[currentPage]];
            } else if (config && config.nextQuestion) {
              nextPage = config.nextQuestion;
            } else {
              nextPage = currentPage + 1;
            }
            
            const updatedStack = [...questionsStack, currentPage];
            setQuestionsStack(updatedStack);
            setCurrentPage(nextPage);
            
            const newProgress = calculateProgress(nextPage);
            setProgress(newProgress);
            
            setTimeout(() => {
              isNavigatingRef.current = false;
            }, 500);
            
          }, 300);
        } else {
          if (currentPage === 1 && !specialCaseValid) {
            showError("Please complete the medication information");
          } else if (!standardValidation) {
            showError("Please complete all required fields");
          }
        }
      }, 100);
    }
  };

  return {
    cameFromBack,
    setCameFromBack,
    handleBackClick,
    moveToNextSlide,
    moveToPreviousSlide,
    getNextQuestionId,
    handleFormChangeWithAutoAdvance
  };
};
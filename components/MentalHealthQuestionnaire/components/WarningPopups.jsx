import React from 'react';
import { WarningPopup } from "../../MHPreConsultationQuiz/WarningPopup";

export const QuestionnaireWarningPopups = ({
  showSuicidalWarning,
  showHighDepressionWarning,
  showHighAnxietyWarning,
  showCompletionWarning,
  isAcknowledged,
  setShowSuicidalWarning,
  setShowHighDepressionWarning,
  setShowHighAnxietyWarning,
  handleAcknowledge,
  handleCompletionContinue,
  currentPage,
  canCloseCurrentWarning
}) => {
  const handleSuicidalWarningClose = () => {
    if (canCloseCurrentWarning()) {
      setShowSuicidalWarning(false);
      return true;
    }
    return false;
  };

  const handleDepressionWarningClose = () => {
    if (canCloseCurrentWarning()) {
      setShowHighDepressionWarning(false);
      return true;
    }
    return false;
  };

  const handleAnxietyWarningClose = () => {
    if (canCloseCurrentWarning()) {
      setShowHighAnxietyWarning(false);
      return true;
    }
    return false;
  };
  
  return (
    <>
      {/* Warning for suicidal thoughts */}
      <WarningPopup
        isOpen={showSuicidalWarning}
        onClose={handleSuicidalWarningClose}
        title="Important Notice"
        message="Your responses indicate that you may be experiencing thoughts of self-harm. If you're having thoughts of suicide, please contact a mental health professional or crisis line immediately. Our prescribers will reach out to you directly to discuss your needs."
        buttonText="I Understand"
        showCheckbox={true}
        isAcknowledged={isAcknowledged}
        onAcknowledge={handleAcknowledge}
        backgroundColor="bg-[#F5F4EF]"
        titleColor="text-[#C19A6B]"
        currentPage={currentPage}
      />

      {/* Warning for high depression score */}
      <WarningPopup
        isOpen={showHighDepressionWarning}
        onClose={handleDepressionWarningClose}
        title="Important Information"
        message="Your responses suggest that you may be experiencing significant symptoms of depression. Our prescribers will carefully review your assessment and contact you for a follow-up discussion about potential treatment options."
        buttonText="Continue"
        showCheckbox={true}
        isAcknowledged={isAcknowledged}
        onAcknowledge={handleAcknowledge}
        backgroundColor="bg-[#F5F4EF]"
        titleColor="text-[#C19A6B]"
        currentPage={currentPage}
      />

      {/* Warning for high anxiety score */}
      <WarningPopup
        isOpen={showHighAnxietyWarning}
        onClose={handleAnxietyWarningClose}
        title="Important Information"
        message="Your responses suggest that you may be experiencing significant symptoms of anxiety. Our prescribers will carefully review your assessment and contact you for a follow-up discussion about potential treatment options."
        buttonText="Continue"
        showCheckbox={true}
        isAcknowledged={isAcknowledged}
        onAcknowledge={handleAcknowledge}
        backgroundColor="bg-[#F5F4EF]"
        titleColor="text-[#C19A6B]"
        currentPage={currentPage}
      />

      {/* Questionnaire completion message */}
      <WarningPopup
        isOpen={showCompletionWarning}
        onClose={handleCompletionContinue}
        title="Thank You"
        message="Thank you for completing the mental health questionnaire. Your responses have been recorded and will be reviewed by a healthcare provider who will contact you soon to discuss the next steps."
        showCheckbox={false}
        buttonText="Finish"
        backgroundColor="bg-[#F5F4EF]"
        titleColor="text-[#C19A6B]"
        currentPage={currentPage}
      />
    </>
  );
};
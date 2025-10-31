import React, { useState, useEffect } from "react";
import RadioQuestion from "./RadioQuestion";
import CheckboxQuestion from "./CheckboxQuestion";
import RadioTextQuestion from "./RadioTextQuestion";
import InfoIcon from "./InfoIcon";
import RadioImagesQuestion from "./RadioImageQuestion";

const GenericQuestionStep = ({
  stepConfig,
  userData,
  setUserData,
  onContinue,
  onAction,
  onSubmitData,
}) => {
  const [textInput, setTextInput] = useState(
    userData[stepConfig.textField] || ""
  );

  // Update textInput when stepConfig changes (different question)
  useEffect(() => {
    // For all question types, restore the saved text input when navigating to the question
    setTextInput(userData[stepConfig.textField] || "");
  }, [stepConfig.textField, userData]);

  // Handle option selection
  const handleOptionSelect = (value, option) => {
    // For radio-text questions, only clear text input when switching TO an option that doesn't require text
    if (stepConfig.type === "radio-text" && stepConfig.textField) {
      const previousValue = userData[stepConfig.field];
      if (previousValue !== value) {
        // Check if the NEW option requires text input
        if (!option?.showTextInput) {
          // Switching to an option that doesn't need text (like "No") - clear the text
          setTextInput("");
          setUserData((prev) => {
            const newData = {
              ...prev,
              [stepConfig.field]: value,
            };
            // Remove the text field when switching to non-text option
            delete newData[stepConfig.textField];
            return newData;
          });
        } else {
          // Switching to an option that needs text (like "Yes") - keep existing text
          setUserData((prev) => ({
            ...prev,
            [stepConfig.field]: value,
          }));
        }
      } else {
        // Same option selected, just update the radio field
        setUserData((prev) => ({
          ...prev,
          [stepConfig.field]: value,
        }));
      }
    } else {
      // For non-radio-text questions, normal behavior
      setUserData((prev) => ({
        ...prev,
        [stepConfig.field]: value,
      }));
    }

    // Handle special actions
    if (option?.action) {
      onAction(option.action, option.popupType || option);
      return;
    }

    // Handle conditional actions
    if (stepConfig.conditionalActions?.[value]) {
      const action = stepConfig.conditionalActions[value];
      onAction(action.action, action.popupType);
      return;
    }

    // Handle text input requirement first (before conditional navigation)
    if (option?.showTextInput) {
      return; // Don't continue, wait for text input
    }

    // Always show Continue button - no auto-navigation
    // The Continue button will handle conditional navigation and form submission
    return;
  };

  // Handle checkbox toggle (for multi-select)
  const handleCheckboxToggle = (optionId, option) => {
    const currentValues = userData[stepConfig.field] || [];
    let newValues;

    // Handle exclusive options (like "none")
    if (stepConfig.exclusiveOptions?.includes(optionId)) {
      newValues = currentValues.includes(optionId) ? [] : [optionId];
    } else {
      // Remove exclusive options if any other option is selected
      const filteredValues = currentValues.filter(
        (val) => !stepConfig.exclusiveOptions?.includes(val)
      );

      newValues = filteredValues.includes(optionId)
        ? filteredValues.filter((val) => val !== optionId)
        : [...filteredValues, optionId];
    }

    setUserData((prev) => ({
      ...prev,
      [stepConfig.field]: newValues,
    }));

    // Clear text input if "none" is deselected
    if (
      stepConfig.conditionalTextField &&
      stepConfig.conditionalTextField.triggerValue === optionId &&
      !newValues.includes(optionId)
    ) {
      setTextInput("");
    }

    // Handle special actions
    if (option?.action) {
      onAction(option.action, option.popupType || option);
    }
  };

  // Handle text input submission
  const handleTextSubmit = () => {
    if (textInput.trim()) {
      // Update state first
      const updatedData = {
        ...userData,
        [stepConfig.textField]: textInput.trim(),
      };
      setUserData(updatedData);

      // Don't call onContinue here - let the RadioTextQuestion component handle it
      // This ensures onSubmitData is called before navigation
    }
  };

  // Handle Continue button click
  const handleContinue = () => {
    const fieldValue = userData[stepConfig.field];

    // Handle conditional navigation
    if (stepConfig.conditionalNavigation?.[fieldValue]) {
      onAction("navigate", stepConfig.conditionalNavigation[fieldValue]);
      return;
    }

    // Continue to next step
    onContinue();
  };

  // Check if step is valid
  const isValid = () => {
    if (!stepConfig.required) return true;

    const fieldValue = userData[stepConfig.field];

    if (stepConfig.type === "checkbox") {
      const hasSelection = fieldValue && fieldValue.length > 0;

      // Check for conditional text field requirement
      if (stepConfig.conditionalTextField && hasSelection) {
        const needsTextInput = fieldValue.includes(
          stepConfig.conditionalTextField.triggerValue
        );
        if (needsTextInput) {
          return textInput && textInput.trim().length > 0;
        }
      }

      return hasSelection;
    }

    if (stepConfig.type === "radio-text") {
      if (fieldValue === false) return true; // "No" selected
      return fieldValue === true && textInput.trim(); // "Yes" + text
    }

    return fieldValue !== null && fieldValue !== undefined;
  };

  // Render question based on type
  const renderQuestion = () => {
    const questionProps = {
      config: stepConfig,
      userData,
      onSelect: handleOptionSelect,
      onToggle: handleCheckboxToggle,
      textInput,
      setTextInput,
      onTextSubmit: handleTextSubmit,
      onContinue: handleContinue,
      onSubmitData: onSubmitData,
      isValid: isValid(),
      setUserData,
    };

    switch (stepConfig.type) {
      case "radio":
        return <RadioQuestion {...questionProps} />;
      case "checkbox":
        return <CheckboxQuestion {...questionProps} />;
      case "radio-text":
        return <RadioTextQuestion {...questionProps} />;
      case "radio-image":
        return <RadioImagesQuestion {...questionProps} />;
      default:
        return <div>Unsupported question type: {stepConfig.type}</div>;
    }
  };

  return (
    <div className="w-full md:w-[520px] mx-auto px-5 md:px-0 mt-6 pb-24 opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]">
      {/* Header - WL style */}
      <div className="flex items-center gap-3 mb-4">
        <h1 className="headers-font text-[26px] font-[450] md:font-medium md:text-[32px] md:leading-[115%] leading-[120%] tracking-[-1%] md:tracking-[-2%]">
          {stepConfig.title}
        </h1>
        {stepConfig.hasInfoIcon && (
          <InfoIcon infoContent={stepConfig.infoContent} />
        )}
      </div>

      {/* Subtitle */}
      {stepConfig.subtitle && (
        <p className="text-[14px] md:text-[16px] text-gray-600 mb-6">
          {stepConfig.subtitle}
        </p>
      )}

      {/* Question content */}
      {renderQuestion()}

      {/* Privacy text - WL style */}
      <div className="text-[10px] my-6 text-[#00000059] text-left font-[400] leading-[140%] tracking-[0%]">
        We respect your privacy. All of your information is securely stored on
        our HIPAA Compliant server.
      </div>
    </div>
  );
};

export default GenericQuestionStep;

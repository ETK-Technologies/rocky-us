import React from "react";
import { QuestionLayout } from "../../EdQuestionnaire/QuestionLayout";
import { QuestionOption } from "../../EdQuestionnaire/QuestionOption";
import { QuestionAdditionalInput } from "../../EdQuestionnaire/QuestionAdditionalInput";

export const createRadioQuestion = ({
  title,
  currentPage,
  pageNo,
  questionId,
  options,
  showAdditionalInputFor = null,
  additionalInputPlaceholder = "Please specify",
  medicationsInputFields = null,
  subtitle = null,
}) => {
  return ({ formData, onSelect }) => {
    const checkRequiredFields = () => {
      if (medicationsInputFields && formData[questionId]) {
        const fields = medicationsInputFields[formData[questionId]];
        if (fields) {
          return fields.every(
            (field) =>
              formData[`${questionId}_${field.key}`] &&
              formData[`${questionId}_${field.key}`].trim() !== ""
          );
        }
      }
      return true;
    };

    React.useEffect(() => {
      const event = new CustomEvent("questionValidationChange", {
        detail: { questionId, isValid: checkRequiredFields() },
      });
      document.dispatchEvent(event);
    }, [formData]);

    return (
      <div className="w-full md:max-w-[520px] mx-auto">
        <QuestionLayout
          title={title}
          subtitle={subtitle}
          currentPage={currentPage}
          pageNo={pageNo}
          questionId={questionId}
        >
          {options.map((option, index) => {
            const isSelected = formData[questionId] === option;
            const hasInputFields =
              medicationsInputFields && medicationsInputFields[option];
            const needsAdditionalInput =
              showAdditionalInputFor &&
              (Array.isArray(showAdditionalInputFor)
                ? showAdditionalInputFor.includes(option)
                : option === showAdditionalInputFor);

            return (
              <div
                key={`${questionId}_${index + 1}`}
                className="mb-4 relative w-full"
              >
                <div
                  className={`quiz-option text-left block w-full ${
                    isSelected && (hasInputFields || needsAdditionalInput)
                      ? "selected-with-inputs"
                      : ""
                  }`}
                >
                  <input
                    id={`${questionId}_${index + 1}`}
                    className="hidden"
                    type="radio"
                    name={questionId}
                    value={option}
                    checked={isSelected}
                    onChange={() => onSelect(option)}
                  />
                  <label
                    htmlFor={`${questionId}_${index + 1}`}
                    className={`quiz-option-label cursor-pointer text-left p-5 border-2 w-full
                      ${isSelected ? "border-[#A7885A]" : "border-gray-300"}
                      rounded-[12px] block
                      ${
                        isSelected && (hasInputFields || needsAdditionalInput)
                          ? "flex flex-col items-start transition-all duration-200"
                          : "flex justify-between items-center h-[60px] md:h-[70px]"
                      }
                      text-[14px] md:text-[16px] shadow-none`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span>{option}</span>
                      <div className="flex-grow"></div>
                    </div>

                    {isSelected && hasInputFields && (
                      <div className="mt-4 w-full">
                        {medicationsInputFields[option].map((field, idx) => (
                          <div
                            key={`${questionId}_${field.key}`}
                            className="mb-3"
                          >
                            <label className="block text-sm font-normal text-gray-700">
                              {field.placeholder}
                            </label>{" "}
                            <input
                              type="text"
                              id={field.key}
                              value={formData[field.key] || ""}
                              onChange={(e) =>
                                onSelect(e.target.value, field.key)
                              }
                              placeholder=""
                              className="w-full border border-[#B0A28C] rounded-md px-3 py-2 mt-1"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {isSelected && needsAdditionalInput && !hasInputFields && (
                      <div className="mt-4 w-full">
                        <input
                          type="text"
                          id={`${questionId}_textarea`}
                          value={
                            questionId === "504" && index === 4
                              ? formData[
                                  `l-${questionId}_${index + 1}-textarea`
                                ] || ""
                              : questionId === "503" && index === 3
                              ? formData[
                                  `l-${questionId}_${index + 1}-textarea`
                                ] || ""
                              : questionId === "510" && index === 0
                              ? formData[
                                  `l-${questionId}_${index + 1}-textarea`
                                ] || ""
                              : questionId === "529" && index === 0
                              ? formData[
                                  `l-${questionId}_${index + 1}-textarea`
                                ] || ""
                              : questionId === "530" && index === 0
                              ? formData[
                                  `l-${questionId}_${index + 1}-textarea`
                                ] ||
                                formData[`${questionId}_textarea`] ||
                                ""
                              : questionId === "531" && index === 0
                              ? formData[
                                  `l-${questionId}_${index + 1}-textarea`
                                ] || ""
                              : formData[`${questionId}_textarea`] || ""
                          }
                          onChange={(e) =>
                            onSelect(e.target.value, `${questionId}_textarea`)
                          }
                          placeholder={additionalInputPlaceholder}
                          className="w-full border border-[#B0A28C] rounded-md px-3 py-2"
                        />
                      </div>
                    )}
                  </label>
                </div>
              </div>
            );
          })}
        </QuestionLayout>
      </div>
    );
  };
};

export const createCheckboxQuestion = ({
  title,
  currentPage,
  pageNo,
  questionId,
  options,
  showAdditionalInputFor = null,
  additionalInputPlaceholder = "Please specify",
  noneOfTheAboveIndex = -1,
  preferNotToSayIndex = -1,
  subtitle = null,
}) => {
  return ({ formData, onSelect }) => {
    const handleNoneOfTheAbove = (checked) => {
      if (checked && noneOfTheAboveIndex !== -1) {
        if (questionId === "533") {
          console.log("Selecting 'None of these apply' for drugs question");
        }

        options.forEach((option, index) => {
          if (index !== noneOfTheAboveIndex && index !== preferNotToSayIndex) {
            onSelect("", `${questionId}_${index + 1}`);
          }
        });

        if (showAdditionalInputFor !== null) {
          if (typeof showAdditionalInputFor === "number") {
            onSelect(
              "",
              `l-${questionId}_${showAdditionalInputFor + 1}-textarea`
            );
          } else if (typeof showAdditionalInputFor === "string") {
            const index = options.findIndex(
              (opt) => opt === showAdditionalInputFor
            );
            if (index !== -1) {
              onSelect("", `l-${questionId}_${index + 1}-textarea`);
            }
          }
        }

        onSelect(
          options[noneOfTheAboveIndex],
          `${questionId}_${noneOfTheAboveIndex + 1}`
        );
      }
    };
    const handlePreferNotToSay = (checked) => {
      if (checked && preferNotToSayIndex !== -1) {
        options.forEach((option, index) => {
          if (index !== preferNotToSayIndex && index !== noneOfTheAboveIndex) {
            onSelect("", `${questionId}_${index + 1}`);
          }
        });

        if (showAdditionalInputFor !== null) {
          if (typeof showAdditionalInputFor === "number") {
            onSelect(
              "",
              `l-${questionId}_${showAdditionalInputFor + 1}-textarea`
            );
          } else if (typeof showAdditionalInputFor === "string") {
            const index = options.findIndex(
              (opt) => opt === showAdditionalInputFor
            );
            if (index !== -1) {
              onSelect("", `l-${questionId}_${index + 1}-textarea`);
            }
          }
        }

        onSelect(
          options[preferNotToSayIndex],
          `${questionId}_${preferNotToSayIndex + 1}`
        );
      }
    };
    const handleOptionClick = (checked, field, optionText) => {
      const fieldIndex = parseInt(field.split("_")[1]) - 1;

      if (
        checked &&
        fieldIndex !== noneOfTheAboveIndex &&
        fieldIndex !== preferNotToSayIndex
      ) {
        if (noneOfTheAboveIndex !== -1) {
          onSelect("", `${questionId}_${noneOfTheAboveIndex + 1}`);
        }
        if (preferNotToSayIndex !== -1) {
          onSelect("", `${questionId}_${preferNotToSayIndex + 1}`);
        }
      }

      if (!checked) {
        const needsAdditionalInput =
          (typeof showAdditionalInputFor === "number" &&
            fieldIndex === showAdditionalInputFor) ||
          (typeof showAdditionalInputFor === "string" &&
            optionText === showAdditionalInputFor);

        if (needsAdditionalInput) {
          onSelect("", `l-${questionId}_${fieldIndex + 1}-textarea`);
        }
      }
      if (questionId === "533") {
        console.log(
          `Setting drug option: ${field}=${checked ? optionText : ""}`
        );
      }

      onSelect(checked ? optionText : "", field);
    };

    return (
      <div className="w-full md:max-w-[520px] mx-auto">
        <QuestionLayout
          title={title}
          subtitle={subtitle}
          currentPage={currentPage}
          pageNo={pageNo}
          questionId={questionId}
        >
          {options.map((option, index) => {
            const isNoneOption = index === noneOfTheAboveIndex;
            const isPreferNotToSayOption = index === preferNotToSayIndex;
            const fieldName = `${questionId}_${index + 1}`;
            const isChecked = formData[fieldName] === option;
            const needsAdditionalInput =
              (typeof showAdditionalInputFor === "number" &&
                index === showAdditionalInputFor) ||
              (typeof showAdditionalInputFor === "string" &&
                option === showAdditionalInputFor);

            return (
              <div key={fieldName} className="mb-4 relative w-full">
                <div
                  className={`quiz-option text-left block w-full ${
                    isChecked && needsAdditionalInput
                      ? "selected-with-inputs"
                      : ""
                  }`}
                >
                  <input
                    id={fieldName}
                    className="hidden"
                    type="checkbox"
                    name={questionId}
                    checked={isChecked}
                    onChange={(e) => {
                      if (isNoneOption) {
                        handleNoneOfTheAbove(e.target.checked);
                      } else if (isPreferNotToSayOption) {
                        handlePreferNotToSay(e.target.checked);
                      } else {
                        handleOptionClick(e.target.checked, fieldName, option);
                      }
                    }}
                  />
                  <label
                    htmlFor={fieldName}
                    className={`quiz-option-label cursor-pointer text-left p-5 border-2 w-full
                      ${isChecked ? "border-[#A7885A]" : "border-gray-300"}
                      rounded-[12px] block
                      ${
                        isChecked && needsAdditionalInput
                          ? "flex flex-col items-start transition-all duration-200"
                          : "flex justify-between items-center h-[60px] md:h-[70px]"
                      }
                      text-[14px] md:text-[16px] shadow-none`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span>{option}</span>
                      <div className="flex-grow"></div>
                    </div>

                    {isChecked && needsAdditionalInput && (
                      <div className="mt-4 w-full">
                        <input
                          type="text"
                          id={`l-${questionId}_${index + 1}-textarea`}
                          value={
                            formData[`l-${questionId}_${index + 1}-textarea`] ||
                            ""
                          }
                          onChange={(e) =>
                            onSelect(
                              e.target.value,
                              `l-${questionId}_${index + 1}-textarea`
                            )
                          }
                          placeholder={additionalInputPlaceholder}
                          className="w-full border border-[#B0A28C] rounded-md px-3 py-2"
                        />
                      </div>
                    )}
                  </label>
                </div>
              </div>
            );
          })}
        </QuestionLayout>
      </div>
    );
  };
};

export const createScaleQuestion = ({
  title,
  subtitle,
  currentPage,
  pageNo,
  questionId,
  options = [
    "Not at all",
    "Several Days",
    "More than half the days",
    "Nearly every day",
  ],
}) => {
  return ({ formData, onSelect }) => (
    <div className="w-full md:max-w-[520px] mx-auto">
      <QuestionLayout
        title={title}
        subtitle={subtitle}
        currentPage={currentPage}
        pageNo={pageNo}
        questionId={questionId}
      >
        {" "}
        {options.map((option, index) => (
          <QuestionOption
            key={`${questionId}_${index + 1}`}
            id={`${questionId}_${index + 1}`}
            name={questionId}
            value={option}
            checked={formData[questionId] === option}
            onChange={() => {
              console.log(
                `Option selected: ${option} for question ${questionId}`
              );
              onSelect(option);
            }}
            type="radio"
          />
        ))}
      </QuestionLayout>
    </div>
  );
};

export const createCompletionMessage = ({
  title,
  subtitle,
  currentPage,
  pageNo,
  questionId,
  message = [],
}) => {
  return ({ formData, onSelect }) => (
    <div className="w-full md:max-w-[520px] mx-auto">
      <QuestionLayout
        title={title}
        subtitle={subtitle}
        currentPage={currentPage}
        pageNo={pageNo}
        questionId={questionId}
        isPopup={true}
      >
        <div className="text-center">
          {message && message.length > 0 ? (
            message.map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="mb-4">
              We've received your information. Our healthcare professionals will
              review your answers and contact you soon.
            </p>
          )}
        </div>
      </QuestionLayout>
    </div>
  );
};

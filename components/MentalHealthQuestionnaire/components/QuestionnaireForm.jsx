import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as QuestionTypes from "./QuestionTypes";

const slideVariants = {
  hiddenRight: { x: "100%", opacity: 0 },
  hiddenLeft: { x: "-100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  exitRight: {
    x: "-100%",
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  exitLeft: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

export const QuestionnaireForm = ({
  formRef,
  currentPage,
  isMovingForward,
  formData,
  handleFormChange,
  handleFormChangeWithAutoAdvance,
  enhancedHandleFormChange,
  fileInputRef,
  photoIdFile,
  firstName,
  lastName,
  setFirstName,
  setLastName,
  photoIdAcknowledged,
  handlePhotoIdAcknowledge,
  handleTapToUpload,
  handlePhotoIdFileSelect,
  isUploading,
}) => {
  const renderQuestion = () => {
    switch (currentPage) {
      case 1:
        return (
          <QuestionTypes.CurrentSituationQuestion
            formData={formData}
            onSelect={(value, field = "501") => {
              if (field === "501") {
                if (value !== formData[field]) {
                  handleFormChange("l-501_1-input", "");
                  handleFormChange("l-501-1-input", "");
                  handleFormChange("l-501_1-textarea", "");
                  handleFormChange("l-501-1-textarea", "");
                  handleFormChange("l-501_3-input", "");
                  handleFormChange("l-501-3-input", "");
                  handleFormChange("l-501_3-textarea", "");
                  handleFormChange("l-501-3-textarea", "");
                }
                enhancedHandleFormChange(field, value);
              } else {
                handleFormChange(field, value);
                if (field.includes("_")) {
                  const hyphenField = field.replace(/_/g, "-");
                  handleFormChange(hyphenField, value);
                }
              }
            }}
          />
        );
      case 2:
        return (
          <QuestionTypes.ChangeTypeQuestion
            formData={formData}
            onSelect={(value) => handleFormChangeWithAutoAdvance("502", value)}
          />
        );
      case 3:
        return (
          <QuestionTypes.ChangeReasonQuestion
            formData={formData}
            onSelect={(value, field = "503") => {
              if (field === "503") {
                if (value !== "Other") {
                  handleFormChangeWithAutoAdvance(field, value);
                } else {
                  handleFormChange(field, value);
                }
              } else if (field === "503_textarea") {
                handleFormChange("l-503_4-textarea", value);
              } else {
                handleFormChange(field, value);
              }
            }}
          />
        );
      case 4:
        return (
          <QuestionTypes.SymptomsQuestion
            formData={formData}
            onSelect={(value, field) => {
              if (field === "504_textarea") {
                handleFormChange("l-504_5-textarea", value);
              } else {
                handleFormChange(field, value);
              }
            }}
          />
        );
      case 5:
        return (
          <QuestionTypes.HowLongQuestion
            formData={formData}
            onSelect={(value) => handleFormChangeWithAutoAdvance("505", value)}
          />
        );
      case 6:
        return (
          <QuestionTypes.RecentEventsQuestion
            formData={formData}
            onSelect={(value, field) => {
              handleFormChange(field, value);
            }}
          />
        );
      case 7:
        return (
          <QuestionTypes.SupportMethodsQuestion
            formData={formData}
            onSelect={(value, field) => {
              if (field === "l-507_5-textarea") {
                handleFormChange(field, value);
              } else {
                enhancedHandleFormChange(field, value);
              }
            }}
          />
        );
      case 8:
        return (
          <QuestionTypes.ResultsQuestion
            formData={formData}
            onSelect={(value, field) => {
              handleFormChange(field, value);
            }}
          />
        );
      case 9:
        return (
          <QuestionTypes.MentalHealthJourneyQuestion
            formData={formData}
            onSelect={(value, field) => {
              handleFormChange(field, value);
            }}
          />
        );
      case 10:
        return (
          <QuestionTypes.PsychiatristConsultQuestion
            formData={formData}
            onSelect={(value, field = "510") => {
              if (field === "510") {
                if (value === "No") {
                  handleFormChange("510_textarea", "");
                  handleFormChange("l-510_1-textarea", "");
                  enhancedHandleFormChange(field, value);
                } else {
                  enhancedHandleFormChange(field, value);
                }
              } else if (field === "510_textarea") {
                enhancedHandleFormChange("l-510_1-textarea", value);
              } else {
                enhancedHandleFormChange(field, value);
              }
            }}
          />
        );
      case 11:
        return (
          <QuestionTypes.PHQ9Question
            formData={formData}
            onSelect={(value) => handleFormChangeWithAutoAdvance("511", value)}
            question="Little interest or pleasure in doing things"
            questionId="511"
            currentPage={currentPage}
          />
        );
      case 12:
        return (
          <QuestionTypes.PHQ9Question
            formData={formData}
            onSelect={(value) => handleFormChangeWithAutoAdvance("512", value)}
            question="Feeling down, depressed, or hopeless"
            questionId="512"
            currentPage={currentPage}
          />
        );
      case 13:
        return (
          <QuestionTypes.PHQ9Question
            formData={formData}
            onSelect={(value) => handleFormChangeWithAutoAdvance("513", value)}
            question="Trouble falling or staying asleep, or sleeping too much"
            questionId="513"
            currentPage={currentPage}
          />
        );
      case 14:
        return (
          <QuestionTypes.PHQ9Question
            formData={formData}
            onSelect={(value) => handleFormChangeWithAutoAdvance("514", value)}
            question="Feeling tired or having little energy"
            questionId="514"
            currentPage={currentPage}
          />
        );
      case 15:
        return (
          <QuestionTypes.PHQ9Question
            formData={formData}
            onSelect={(value) => handleFormChangeWithAutoAdvance("515", value)}
            question="Poor appetite or overeating"
            questionId="515"
            currentPage={currentPage}
          />
        );
      case 16:
        return (
          <QuestionTypes.PHQ9Question
            formData={formData}
            onSelect={(value) => handleFormChangeWithAutoAdvance("516", value)}
            question="Feeling bad about yourself — or that you are a failure or have let yourself or your family down"
            questionId="516"
            currentPage={currentPage}
          />
        );
      case 17:
        return (
          <QuestionTypes.PHQ9Question
            formData={formData}
            onSelect={(value) => handleFormChangeWithAutoAdvance("517", value)}
            question="Trouble concentrating on things, such as reading the newspaper or watching television"
            questionId="517"
            currentPage={currentPage}
          />
        );
      case 18:
        return (
          <QuestionTypes.PHQ9Question
            formData={formData}
            onSelect={(value) => handleFormChangeWithAutoAdvance("518", value)}
            question="Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual"
            questionId="518"
            currentPage={currentPage}
          />
        );
      case 19:
        return (
          <QuestionTypes.PHQ9Question
            formData={formData}
            onSelect={(value) => handleFormChangeWithAutoAdvance("519", value)}
            question="Thoughts that you would be better off dead or of hurting yourself in some way"
            questionId="519"
            currentPage={currentPage}
          />
        );
      case 20:
        return (
          <QuestionTypes.GAD7Question
            formData={formData}
            onSelect={(value) => handleFormChangeWithAutoAdvance("520", value)}
            question="Feeling nervous, anxious, or on edge"
            questionId="520"
            currentPage={currentPage}
          />
        );
      case 21:
        return (
          <QuestionTypes.GAD7Question
            formData={formData}
            onSelect={(value) => handleFormChangeWithAutoAdvance("521", value)}
            question="Not being able to stop or control worrying"
            questionId="521"
            currentPage={currentPage}
          />
        );
      case 22:
        return (
          <QuestionTypes.GAD7Question
            formData={formData}
            onSelect={(value) => handleFormChangeWithAutoAdvance("522", value)}
            question="Worrying too much about different things"
            questionId="522"
            currentPage={currentPage}
          />
        );
      case 23:
        return (
          <QuestionTypes.GAD7Question
            formData={formData}
            onSelect={(value) => handleFormChangeWithAutoAdvance("523", value)}
            question="Trouble relaxing"
            questionId="523"
            currentPage={currentPage}
          />
        );
      case 24:
        return (
          <QuestionTypes.GAD7Question
            formData={formData}
            onSelect={(value) => handleFormChangeWithAutoAdvance("524", value)}
            question="Being so restless that it is hard to sit still"
            questionId="524"
            currentPage={currentPage}
          />
        );
      case 25:
        return (
          <QuestionTypes.GAD7Question
            formData={formData}
            onSelect={(value) => handleFormChangeWithAutoAdvance("525", value)}
            question="Becoming easily annoyed or irritable"
            questionId="525"
            currentPage={currentPage}
          />
        );
      case 26:
        return (
          <QuestionTypes.GAD7Question
            formData={formData}
            onSelect={(value) => handleFormChangeWithAutoAdvance("526", value)}
            question="Feeling afraid, as if something awful might happen"
            questionId="526"
            currentPage={currentPage}
          />
        );
      case 27:
        return (
          <QuestionTypes.MedicationsQuestion
            formData={formData}
            onSelect={(value, field) => handleFormChange(field, value)}
          />
        );
      case 28:
        return (
          <QuestionTypes.MedicalConditionsQuestion
            formData={formData}
            onSelect={(value, field) => handleFormChange(field, value)}
          />
        );
      case 29:
        return (
          <QuestionTypes.AllergiesQuestion
            formData={formData}
            onSelect={(value, field = "529") => {
              if (field === "529") {
                if (value === "Yes") {
                  handleFormChange(field, value);
                } else {
                  handleFormChangeWithAutoAdvance(field, value);
                }
              } else if (field === "529_textarea") {
                handleFormChange("l-529_1-textarea", value);
                handleFormChange("529_textarea", value);
              } else {
                handleFormChange(field, value);
              }
            }}
          />
        );
      case 30:
        return (
          <QuestionTypes.CurrentMedicationsQuestion
            formData={formData}
            onSelect={(value, field = "530") => {
              if (field === "530") {
                handleFormChangeWithAutoAdvance(field, value);
              } else if (field === "530_textarea") {
                handleFormChange("l-530_1-textarea", value);
                handleFormChange("530_textarea", value);
              } else {
                handleFormChange(field, value);
              }
            }}
          />
        );
      case 31:
        return (
          <QuestionTypes.MedicalHistoryQuestion
            formData={formData}
            onSelect={(value, field = "531") => {
              if (field === "531") {
                if (value === "No") {
                  handleFormChangeWithAutoAdvance(field, value);
                } else {
                  handleFormChange(field, value);
                }
              } else if (field === "531_textarea") {
                handleFormChange("l-531_1-textarea", value);
              } else {
                handleFormChange(field, value);
              }
            }}
          />
        );
      case 32:
        return (
          <QuestionTypes.AlcoholQuestion
            formData={formData}
            onSelect={(value) => handleFormChangeWithAutoAdvance("532", value)}
          />
        );
      case 33:
        return (
          <QuestionTypes.DrugsQuestion
            formData={formData}
            onSelect={(value, field) => {
              console.log(`Drug option selected: ${field} = ${value}`);
              handleFormChange(field, value);
              setTimeout(() => {
                const updatedFormData = {
                  ...formData,
                  [field]: value,
                };

                const anyDrugSelected =
                  updatedFormData["533_1"] ||
                  updatedFormData["533_2"] ||
                  updatedFormData["533_3"] ||
                  updatedFormData["533_4"] ||
                  updatedFormData["533_5"] ||
                  updatedFormData["533_6"];

                console.log(`Any drug selected: ${anyDrugSelected}`);
              }, 10);
            }}
          />
        );
      case 34:
        return (
          <>
            <QuestionTypes.PhotoIdInstructionsPage currentPage={currentPage} />
            <div className="mt-6 flex flex-col items-center">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="photoIdAcknowledged"
                  className="w-4 h-4 text-[#A7885A] border-gray-300 rounded focus:ring-[#A7885A]"
                  checked={photoIdAcknowledged}
                  onChange={handlePhotoIdAcknowledge}
                />
                <label
                  htmlFor="photoIdAcknowledged"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  I understand and acknowledge the ID verification requirement
                </label>
              </div>
            </div>
          </>
        );
      case 35:
        return (
          <QuestionTypes.PhotoIdUpload
            formData={formData}
            onSelect={(value, field) => {
              if (field === "firstName") {
                setFirstName(value);
                handleFormChange("legal_first_name", value);
              } else if (field === "lastName") {
                setLastName(value);
                handleFormChange("legal_last_name", value);
              }
            }}
            firstName={firstName}
            lastName={lastName}
            fileInputRef={fileInputRef}
            photoIdFile={photoIdFile}
            handleTapToUpload={handleTapToUpload}
            handlePhotoIdFileSelect={handlePhotoIdFileSelect}
            isUploading={isUploading}
          />
        );
      case 36:
        return (
          <QuestionTypes.AppointmentBookingPage
            formData={formData}
            onSelect={(value, field) => handleFormChange(field, value)}
            userName={
              firstName && lastName
                ? `${firstName} ${lastName}`
                : formData.legal_first_name
                ? `${formData.legal_first_name} ${formData.legal_last_name}`
                : ""
            }
            userEmail={formData["email"] || ""}
            phoneNumber={formData["phone"] || ""}
          />
        );
      case 37:
        return (
          <QuestionTypes.QuestionnaireComplete currentPage={currentPage} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pb-24">
      <div
        className="quiz-page-wrapper relative w-full md:w-[520px] mx-auto bg-[#FFFFFF] min-h-0"
        ref={formRef}
      >
        <form id="quiz-form" className="pb-20">
          <div className="relative min-h-[300px] flex items-start w-full px-5 md:px-0 md:max-w-[520px] mx-auto">
            <AnimatePresence mode="wait" custom={isMovingForward}>
              <motion.div
                key={currentPage}
                variants={slideVariants}
                initial={isMovingForward ? "hiddenRight" : "hiddenLeft"}
                animate="visible"
                exit={isMovingForward ? "exitRight" : "exitLeft"}
                className="w-full"
              >
                {renderQuestion()}
              </motion.div>
            </AnimatePresence>
          </div>
        </form>

        <p className="error-box text-red-500 hidden m-2 text-center text-sm"></p>
      </div>
    </div>
  );
};

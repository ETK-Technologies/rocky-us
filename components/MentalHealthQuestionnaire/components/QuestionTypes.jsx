import {
  createRadioQuestion,
  createCheckboxQuestion,
  createScaleQuestion,
  createCompletionMessage,
} from "./QuestionFactory";

import {
  QUESTION_CONFIGS,
  createPHQ9Question,
  createGAD7Question,
  PHQ9_QUESTIONS,
  GAD7_QUESTIONS,
} from "./QuestionConfigs";


// Radio button questions
export const CurrentSituationQuestion = createRadioQuestion(QUESTION_CONFIGS.currentSituation);
export const ChangeTypeQuestion = createRadioQuestion(QUESTION_CONFIGS.changeType);
export const ChangeReasonQuestion = createRadioQuestion(QUESTION_CONFIGS.changeReason);
export const HowLongQuestion = createRadioQuestion(QUESTION_CONFIGS.howLong);
export const PsychiatristConsultQuestion = createRadioQuestion(
  QUESTION_CONFIGS.psychiatristConsult
);
export const AllergiesQuestion = createRadioQuestion(
  QUESTION_CONFIGS.allergies
);
export const CurrentMedicationsQuestion = createRadioQuestion(
  QUESTION_CONFIGS.currentMedications
);
export const MedicalHistoryQuestion = createRadioQuestion(
  QUESTION_CONFIGS.medicalHistory
);
export const AlcoholQuestion = createRadioQuestion(QUESTION_CONFIGS.alcohol);

// Health Care Team Questions
export const HealthCareTeamQuestions = ({ formData, onSelect }) => {
  const config = QUESTION_CONFIGS.healthCareTeamQuestions;
  
  return (
    <div className="w-full md:max-w-[520px] mx-auto">
      <div className="my-6">
        <h1 className="text-3xl mb-6">
          {config.title}
        </h1>
      </div>
      
      <div className="space-y-4">
        {config.options.map((option, index) => {
          const fieldName = `${config.questionId}_${index + 1}`;
          const isChecked = formData[config.questionId] === option;
          const needsAdditionalInput = option === config.showAdditionalInputFor;
          
          return (
            <div key={fieldName} className="mb-4 relative w-full">
              <div className={`quiz-option text-left block w-full ${
                isChecked && needsAdditionalInput ? "selected-with-inputs" : ""
              }`}>
                <input
                  id={fieldName}
                  className="hidden"
                  type="radio"
                  name={config.questionId}
                  checked={isChecked}
                  onChange={() => onSelect(option, undefined)}
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
                      <textarea
                        value={formData["539"] || ""}
                        onChange={(e) => onSelect(e.target.value, e.target.value)}
                        placeholder={config.additionalInputPlaceholder}
                        className="w-full border border-[#B0A28C] rounded-md px-3 py-4 h-24 resize-none"
                        rows="4"
                      />
                    </div>
                  )}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Checkbox questions
export const RecentEventsQuestion = createCheckboxQuestion(QUESTION_CONFIGS.recentEvents);
export const SupportMethodsQuestion = createCheckboxQuestion(QUESTION_CONFIGS.supportMethods);
export const ResultsQuestion = createCheckboxQuestion(QUESTION_CONFIGS.results);
export const SymptomsQuestion = createCheckboxQuestion(QUESTION_CONFIGS.symptoms);
export const MentalHealthJourneyQuestion = createCheckboxQuestion(
  QUESTION_CONFIGS.mentalHealthJourney
);
export const MedicationsQuestion = createCheckboxQuestion(
  QUESTION_CONFIGS.medications
);
export const MedicalConditionsQuestion = createCheckboxQuestion(
  QUESTION_CONFIGS.medicalConditions
);
export const DrugsQuestion = createCheckboxQuestion(QUESTION_CONFIGS.drugs);

export const PHQ9Question = ({
  formData,
  onSelect,
  question,
  questionId,
  currentPage,
}) => {
  const questionData = PHQ9_QUESTIONS.find(
    (q) => q.questionId === questionId
  ) || { subtitle: question };

  const ScaleQuestion = createScaleQuestion({
    ...QUESTION_CONFIGS.phq9AndGad7Scale,
    subtitle: questionData.subtitle,
    questionId: questionId,
    currentPage: currentPage,
    pageNo: currentPage,
    scoreType: "PHQ9",
  });

  return <ScaleQuestion formData={formData} onSelect={onSelect} />;
};

export const GAD7Question = ({
  formData,
  onSelect,
  question,
  questionId,
  currentPage,
}) => {
  const questionData = GAD7_QUESTIONS.find(
    (q) => q.questionId === questionId
  ) || { subtitle: question };

  const ScaleQuestion = createScaleQuestion({
    ...QUESTION_CONFIGS.phq9AndGad7Scale,
    subtitle: questionData.subtitle,
    questionId: questionId,
    currentPage: currentPage,
    pageNo: currentPage,
    scoreType: "GAD7",
  });

  return <ScaleQuestion formData={formData} onSelect={onSelect} />;
};

export const PhotoIdInstructionsPage = ({ currentPage }) => {
  const InstructionsMessage = createCompletionMessage(
    QUESTION_CONFIGS.photoIdInstructions
  );
  return <InstructionsMessage />;
};

// ID Upload Component
export const PhotoIdUpload = ({
  formData,
  onSelect,
  fileInputRef,
  photoIdFile,
  handleTapToUpload,
  handlePhotoIdFileSelect,
  isUploading,
}) => {
  return (
    <div className="w-fullw-full md:max-w-[520px] mx-auto">
      <div className=" pt-6 pb-4">
        <h1 className="text-3xl text-center text-[#AE7E56] font-bold mb-6">
          {QUESTION_CONFIGS.photoIdUpload.title}
        </h1>
        <h3 className="text-lg text-center font-medium mb-4">
          {QUESTION_CONFIGS.photoIdUpload.subtitle}
        </h3>

        <div className="flex flex-col items-center justify-center mb-6">
          <div
            onClick={handleTapToUpload}
            className="w-full md:w-[80%] max-w-lg h-40 flex items-center justify-center border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 mb-6 mx-auto"
          >
            {!photoIdFile ? (
              <div className="flex flex-col sm:flex-row items-center justify-center w-full px-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-2 sm:mb-0">
                  <img
                    src="https://myrocky.b-cdn.net/WP%20Images/Questionnaire/ID-icon.png"
                    alt="ID"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[#C19A6B] text-base sm:text-lg text-center sm:text-left sm:ml-4">
                  Tap to upload the ID photo
                </span>
              </div>
            ) : (
              <img
                id="photo-id-preview"
                src={URL.createObjectURL(photoIdFile)}
                alt="ID Preview"
                className="max-w-full max-h-36 object-contain"
              />
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            id="photo-id-file"
            accept="image/jpeg,image/jpg,image/png"
            className="hidden"
            onChange={handlePhotoIdFileSelect}
          />

          {photoIdFile && (
            <div className="mb-6 mt-4 w-full max-w-md mx-auto">
              <p className="text-center text-xs text-gray-500 mb-4 break-words overflow-hidden">
                Photo selected: {photoIdFile.name}
              </p>
            </div>
          )}

          {!photoIdFile && (
            <div className="w-full max-w-md mx-auto">
              <p className="text-center text-md font-medium mb-2">
                Please capture a selfie of yourself holding your ID
              </p>{" "}
              <p className="text-center text-sm text-gray-500 mb-8">
                Only JPG, JPEG, and PNG images are supported.
                <br />
                Maximum file size per image is 20MB
              </p>
            </div>
          )}
        </div>

        <input
          type="hidden"
          name="photo_id"
          value={formData["photo_id"] || ""}
        />
        <input type="hidden" name="196" value={formData["196"] || ""} />
      </div>
    </div>
  );
};


// Completion message
export const QuestionnaireComplete = ({ currentPage, formData, onSelect }) => {
  const CompletionMessage = createCompletionMessage(
    QUESTION_CONFIGS.questionnaireComplete
  );
  return <CompletionMessage formData={formData} onSelect={onSelect} currentPage={currentPage} />;
};

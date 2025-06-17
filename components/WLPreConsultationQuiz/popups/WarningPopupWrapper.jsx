import React from "react";
import { WarningPopup } from "../WarningPopup";

const WarningPopupWrapper = ({
  popups,
  setPopups,
  onPopupActions,
  currentPage,
}) => {
  // Destructure popups state
  const {
    bmi: showBmiPopup,
    medicalCondition: showMedicalConditionPopup,
    medication: showMedicationPopup,
    eatingDisorder: showEatingDisorderPopup,
    pregnancy: showPregnancyPopup,
    rybelsus: showRybelusPopup,
  } = popups;

  // Destructure popup actions
  const {
    bmiAction,
    medicalConditionAction,
    medicationAction,
    eatingDisorderAction,
    pregnancyAction,
    rybelusAction,
  } = onPopupActions;

  // Helper to close a specific popup
  const closePopup = (popupName) => {
    setPopups((prev) => ({ ...prev, [popupName]: false }));
  };

  return (
    <>
      {showBmiPopup && (
        <WarningPopup
          isOpen={showBmiPopup}
          onClose={() => closePopup("bmi")}
          title="Please Read"
          message="Our weight loss program requires a BMI of 27 or higher."
          onAcknowledge={bmiAction}
          isAcknowledged={true}
          showCheckbox={false}
          buttonText="Continue"
          backgroundColor="bg-[#F5F4EF]"
          titleColor="text-[#C19A6B]"
          currentPage={currentPage}
        />
      )}

      {showMedicalConditionPopup && (
        <WarningPopup
          isOpen={showMedicalConditionPopup}
          onClose={() => closePopup("medicalCondition")}
          title="Please Read"
          message="Our weight loss program wouldn't be a good match for you at this moment."
          onAcknowledge={medicalConditionAction}
          isAcknowledged={true}
          showCheckbox={false}
          buttonText="Continue"
          backgroundColor="bg-[#F5F4EF]"
          titleColor="text-[#C19A6B]"
          currentPage={currentPage}
        />
      )}

      {showMedicationPopup && (
        <WarningPopup
          isOpen={showMedicationPopup}
          onClose={() => closePopup("medication")}
          title="Please Read"
          message="Our weight loss program wouldn't be a good match for you at this moment."
          onAcknowledge={medicationAction}
          isAcknowledged={true}
          showCheckbox={false}
          buttonText="Continue"
          backgroundColor="bg-[#F5F4EF]"
          titleColor="text-[#C19A6B]"
          currentPage={currentPage}
        />
      )}

      {showEatingDisorderPopup && (
        <WarningPopup
          isOpen={showEatingDisorderPopup}
          onClose={() => closePopup("eatingDisorder")}
          title="Please Read"
          message="Our weight loss program wouldn't be a good match for you at this moment."
          onAcknowledge={eatingDisorderAction}
          isAcknowledged={true}
          showCheckbox={false}
          buttonText="Continue"
          backgroundColor="bg-[#F5F4EF]"
          titleColor="text-[#C19A6B]"
          currentPage={currentPage}
        />
      )}

      {showPregnancyPopup && (
        <WarningPopup
          isOpen={showPregnancyPopup}
          onClose={() => closePopup("pregnancy")}
          title="Please Read"
          message="Our weight loss program wouldn't be a good match for you at this moment."
          onAcknowledge={pregnancyAction}
          isAcknowledged={true}
          showCheckbox={false}
          buttonText="Continue"
          backgroundColor="bg-[#F5F4EF]"
          titleColor="text-[#C19A6B]"
          currentPage={currentPage}
        />
      )}

      {showRybelusPopup && (
        <WarningPopup
          isOpen={showRybelusPopup}
          onClose={(choice) => rybelusAction && rybelusAction(choice)}
          title="Rybelsus vs. Injectable GLP-1s: Why Injections Are Superior"
          message="While Rybelsus (oral GLP-1) aids in weight loss, injectable GLP-1s like Ozempic offer distinct advantages:"
          isAcknowledged={true}
          showCheckbox={false}
          backgroundColor="bg-[#F5F4EF]"
          titleColor="text-[#C19A6B]"
          currentPage={currentPage}
          hideDefaultButton={true}
          additionalContent={
            <div className="flex flex-col">
              <ul className="text-sm leading-relaxed space-y-2 mb-6">
                <li>
                  <strong>1. Greater Weight Loss:</strong> Injectables often
                  result in 15-20% body weight reduction, compared to 5-10% with
                  Rybelsus.
                </li>
                <li>
                  <strong>2. Lower Gastrointestinal Side Effects:</strong> Many
                  patients report fewer issues like nausea and bloating with
                  injectables.
                </li>
                <li>
                  <strong>3. Less Frequent Dosing:</strong> Weekly injections
                  are more convenient than daily tablets.
                </li>
                <li>
                  <strong>4. Higher Maximum Dose and Flexibility:</strong> The
                  maximum dose of Rybelsus (14 mg daily) is equivalent to only
                  0.5 mg of injectable Ozempic, while Ozempic's maximum dose is
                  2.0 mg weekly.
                </li>
              </ul>
              <div className="flex flex-col gap-4 ">
                <button
                  onClick={() =>
                    rybelusAction && rybelusAction("choose-for-me")
                  }
                  className="w-full py-3 bg-white text-[#814B00] border border-[#814B00] rounded-full font-medium hover:bg-[#814B00] hover:text-white transition-colors"
                >
                  Choose for Me
                </button>
                <button
                  onClick={() =>
                    rybelusAction && rybelusAction("continue-with-rybelsus")
                  }
                  className="w-full py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  Continue with Rybelsus
                </button>
              </div>
            </div>
          }
        />
      )}
    </>
  );
};

export default WarningPopupWrapper;

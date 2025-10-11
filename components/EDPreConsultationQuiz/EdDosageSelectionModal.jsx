"use client";

import QuestionnaireNavbar from "../EdQuestionnaire/QuestionnaireNavbar";
import { useEffect } from "react";
import { saveDosageSelection } from "@/utils/dosageCookieManager";

const EdDosageSelection = ({
  isOpen,
  onClose,
  product,
  selectedDose,
  setSelectedDose,
  onContinue,
  handleBackClick,
  currentPage,
  isLoading = false,
}) => {
  useEffect(() => {
    if (isOpen) {
      const form = document.getElementById("quiz-form");
      if (form) {
        const onSubmit = form.onsubmit;
        form.onsubmit = (e) => {
          e.preventDefault();
          return false;
        };

        return () => {
          form.onsubmit = onSubmit;
        };
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRadioChange = (e) => {
    const newDose = e.target.value;
    setSelectedDose(newDose);

    // Save the dosage selection to cookie if we have a product ID
    if (product?.id) {
      saveDosageSelection(product.id.toString(), newDose);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[#F5F4EF] !z-[999999] flex flex-col overflow-auto ]"
      style={{
        animation: isOpen
          ? "fadeIn 0.3s ease-in-out"
          : "fadeOut 0.3s ease-in-out",
      }}
    >
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>

      <QuestionnaireNavbar
        onBackClick={() => onClose()}
        currentPage={currentPage}
      />
      <div className="flex-1 flex items-start justify-center py-4 overflow-auto">
        <div className="w-full md:w-[520px] max-w-xl mx-auto px-5 md:px-0 py-4 relative flex flex-col">
          <h3 className="text-[26px] md:text-[32px] mb-4 text-left">
            Select preferred dose
          </h3>

          <p className="text-sm mb-10 text-[#000000] max-w-lg text-left leading-relaxed">
            Please note this is only a request. The prescription remains at the
            clinician's discretion. If you already have a prescription with us,
            please message your clinician for changes as selections here will
            not be seen.
          </p>

          {/* Viagra doses */}
          {product?.name === "Viagra" && (
            <div className="flex flex-col gap-4 mb-10">
              <p className="text-base text-left text-[#A0693B]">
                If this is your first time trying this medication, we recommend
                the following dosage strength:
              </p>
              <label className="cursor-pointer">
                <div className="p-4 w-full flex justify-between items-center border border-gray-400 border-solid rounded-lg">
                  <span className="text-base">50mg</span>
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <input
                      type="radio"
                      name="dose"
                      value="50mg"
                      checked={selectedDose === "50mg"}
                      onChange={handleRadioChange}
                      className="appearance-none h-5 w-5 border-2 border-gray-300 rounded-full checked:border-[#C19A6B] absolute inset-0"
                    />
                    {selectedDose === "50mg" && (
                      <div className="h-2.5 w-2.5 bg-[#C19A6B] rounded-full absolute pointer-events-none"></div>
                    )}
                  </div>
                </div>
              </label>
              <p className="mt-5 text-base text-left text-[#A0693B]">
                If you've used the medication before, you can request the
                following dosage strength:
              </p>
              <label className="cursor-pointer">
                <div className="p-4 w-full flex justify-between items-center border border-gray-400 border-solid rounded-lg">
                  <span className="text-base">100mg</span>
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <input
                      type="radio"
                      name="dose"
                      value="100mg"
                      checked={selectedDose === "100mg"}
                      onChange={handleRadioChange}
                      className="appearance-none h-5 w-5 border-2 border-gray-300 rounded-full checked:border-[#C19A6B] absolute inset-0"
                    />
                    {selectedDose === "100mg" && (
                      <div className="h-2.5 w-2.5 bg-[#C19A6B] rounded-full absolute pointer-events-none"></div>
                    )}
                  </div>
                </div>
              </label>
            </div>
          )}

          {/* Cialis doses */}
          {(product?.name === "Cialis" || product?.name === "Tadalafil") && (
            <div className="flex flex-col gap-4 mb-10">
              <p className="text-base text-left text-[#A0693B]">
                If this is your first time trying this medication, we recommend
                the following dosage strength:
              </p>
              <label className="cursor-pointer">
                <div className="p-4 w-full flex justify-between items-center border border-gray-400 border-solid rounded-lg">
                  <span className="text-base">10mg</span>
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <input
                      type="radio"
                      name="dose"
                      value="10mg"
                      checked={selectedDose === "10mg"}
                      onChange={handleRadioChange}
                      className="appearance-none h-5 w-5 border-2 border-gray-300 rounded-full checked:border-[#C19A6B] absolute inset-0"
                    />
                    {selectedDose === "10mg" && (
                      <div className="h-2.5 w-2.5 bg-[#C19A6B] rounded-full absolute pointer-events-none"></div>
                    )}
                  </div>
                </div>
              </label>
              <p className="mt-5 text-base text-left text-[#A0693B]">
                If you've used the medication before, you can request the
                following dosage strength:
              </p>
              <label className="cursor-pointer">
                <div className="p-4 w-full flex justify-between items-center border border-gray-400 border-solid rounded-lg">
                  <span className="text-base">20mg</span>
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <input
                      type="radio"
                      name="dose"
                      value="20mg"
                      checked={selectedDose === "20mg"}
                      onChange={handleRadioChange}
                      className="appearance-none h-5 w-5 border-2 border-gray-300 rounded-full checked:border-[#C19A6B] absolute inset-0"
                    />
                    {selectedDose === "20mg" && (
                      <div className="h-2.5 w-2.5 bg-[#C19A6B] rounded-full absolute pointer-events-none"></div>
                    )}
                  </div>
                </div>
              </label>
            </div>
          )}

          {/* Variety Pack doses */}
          {product?.name === "Cialis + Viagra" && (
            <div className="flex flex-col gap-4 mb-10">
              <p className="text-base text-left text-[#A0693B]">
                If this is your first time trying this medication, we recommend
                the following dosage strength:
              </p>
              <label className="cursor-pointer">
                <div className="p-4 w-full flex justify-between items-center border border-gray-400 border-solid rounded-lg">
                  <span className="text-base">10/50mg</span>
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <input
                      type="radio"
                      name="dose"
                      value="10/50mg"
                      checked={selectedDose === "10/50mg"}
                      onChange={handleRadioChange}
                      className="appearance-none h-5 w-5 border-2 border-gray-300 rounded-full checked:border-[#C19A6B] absolute inset-0"
                    />
                    {selectedDose === "10/50mg" && (
                      <div className="h-2.5 w-2.5 bg-[#C19A6B] rounded-full absolute pointer-events-none"></div>
                    )}
                  </div>
                </div>
              </label>
              <p className="mt-5 text-base text-left text-[#A0693B]">
                If you've used the medication before, you can request the
                following dosage strength:
              </p>
              <label className="cursor-pointer">
                <div className="p-4 w-full flex justify-between items-center border border-gray-400 border-solid rounded-lg">
                  <span className="text-base">20/100mg</span>
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <input
                      type="radio"
                      name="dose"
                      value="20/100mg"
                      checked={selectedDose === "20/100mg"}
                      onChange={handleRadioChange}
                      className="appearance-none h-5 w-5 border-2 border-gray-300 rounded-full checked:border-[#C19A6B] absolute inset-0"
                    />
                    {selectedDose === "20/100mg" && (
                      <div className="h-2.5 w-2.5 bg-[#C19A6B] rounded-full absolute pointer-events-none"></div>
                    )}
                  </div>
                </div>
              </label>
            </div>
          )}

          <div className="fixed bottom-0 left-0 right-0 md:left-auto md:right-auto px-5 md:px-0 md:w-[520px]  pb-4 flex items-center justify-center z-50">
            <button
              onClick={onContinue}
              disabled={!selectedDose || isLoading}
              className="w-full py-3 bg-black text-white rounded-full font-medium disabled:bg-gray-400 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Adding to cart...</span>
                </>
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdDosageSelection;

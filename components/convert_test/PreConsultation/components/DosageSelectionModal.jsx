"use client";

import React, { useEffect, useState } from "react";
import { logger } from "@/utils/devLogger";

import { saveDosageSelection } from "@/utils/dosageCookieManager";

const DosageSelectionModal = ({
  isOpen,
  onClose,
  product,
  selectedDose,
  setSelectedDose,
  onContinue,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Log product info when modal opens
      logger.log("DosageSelectionModal opened with product:", product);

      // Save the default dosage selection when modal opens
      if (product?.id && selectedDose) {
        logger.log(
          "Saving default dosage for product:",
          product.id,
          "with dose:",
          selectedDose
        );
        saveDosageSelection(product.id.toString(), selectedDose);
      }
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup on component unmount or when isOpen changes
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, product, selectedDose]);
  if (!isOpen) return null;

  const handleRadioChange = (e) => {
    const newDose = e.target.value;
    logger.log("Radio changed to:", newDose);
    logger.log("Current product in modal:", product);
    setSelectedDose(newDose);

    // Save the dosage selection to cookie if we have a product ID
    if (product?.id) {
      logger.log(
        "Saving dosage for product:",
        product.id,
        "with dose:",
        newDose
      );
      saveDosageSelection(product.id.toString(), newDose);
    } else {
      logger.log("No product ID available for saving dosage");
    }
  };

  return (
    <div className="fixed w-screen h-screen m-auto bg-[#FFFFFF] z-[9999] top-[0] left-[0] flex flex-col tracking-tight">
      <div className="w-[100%] p-5 mt-5 min-h-fit mx-auto pb-4 flex flex-col items-center h-full overflow-y-scroll">
        <div className="w-full max-w-[500px] p-2">
          <p className="mb-4 text-3xl lg:text-5xl font-bold headers-font">
            Select preferred dose
          </p>
           <p className="text-sm mb-10 text-[#00000073]">
            Please note this is only a request. The prescription remains at the
            clinician's discretion. If you already have a prescription with us,
            please message your clinician for changes as selections here will
            not be seen.
          </p>
          {product && (
            <div className="flex flex-col gap-4">
              {product.strengths.map((strength, idx) => (
                <React.Fragment key={strength || idx}>
                  {idx === 0 ? (
                    <p className="text-[#A0693B] font-medium text-[16px] leading-[140%] mb-[16px]">
                      If this is your first time trying this medication, we
                      recommend the following dosage strength.
                    </p>
                  ) : (
                    <p className="text-[#A0693B] font-medium text-[16px] leading-[140%] mb-[16px]">
                      If you've used the medication before, you can request the
                      appropriate dosage strength below:
                    </p>
                  )}
                  <label
                    htmlFor={`dose-${idx}`}
                    className="cursor-pointer"
                  >
                    <div className="p-4 w-full flex gap-2 items-center border border-gray-400 border-solid rounded-lg mb-[32px]">
                      <input
                        className="p-2 mr-2"
                        type="radio"
                        name="dose"
                        id={`dose-${idx}`}
                        value={strength}
                        checked={selectedDose === strength}
                        onChange={handleRadioChange}
                      />
                      <span dangerouslySetInnerHTML={{ __html: strength }} />
                    </div>
                  </label>
                </React.Fragment>
              ))}
            </div>
          )}

          <div className="w-full flex justify-center  mx-auto bottom-0">
            <button
              onClick={onContinue}
              className="bg-black w-full rounded-full p-[13px] px-[60px] text-white font-bold mt-[46px]"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={onClose}
        className="leading-[21px] font-bold new-popup-dialog-close-button absolute top-[5px] right-[5px] md:top-[20px] md:right-[40px] z-[99999] cursor-pointer border border-gray-400 border-solid rounded-[25px] w-[25px] h-[25px] text-center text-black"
      >
        x
      </button>
    </div>
  );
};

export default DosageSelectionModal;

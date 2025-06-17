"use client";
import { useState } from "react";
import CustomImage from "../../utils/CustomImage";
import { FaTimes } from "react-icons/fa";
import MoneyGuaranteeModal from "./MoneyGuaranteeModal";

const BO3MoneyBack = () => {
  const [IsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closePopUp = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex gap-4 justify-center items-center flex-col md:flex-row">
        <div>
          <CustomImage
            src="/bo3/moneyBack.png"
            width="100"
            height="100"
          ></CustomImage>
        </div>
        <div className="text-center lg:text-left">
          <h1 className="text-[24px] font-[POPPINS] font-medium">
            6 Months Money-back Guarantee
          </h1>
          <p className="text-[16px] font-[POPPINS]">
            Transform your body or we'll refund you.{" "}
            <span className="underline cursor-pointer" onClick={openModal}>
              Learn more.
            </span>
          </p>
        </div>
      </div>
      {IsOpen && (
        <>
          <MoneyGuaranteeModal closePopUp={closePopUp} />
        </>
      )}
    </>
  );
};

export default BO3MoneyBack;

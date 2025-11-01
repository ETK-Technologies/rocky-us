"use client";
import React, { useState } from "react";

const BasicInfoForm = ({ onAction, initialData = {} }) => {
  const [sex, setSex] = useState(initialData.sex || "");
  const [birthday, setBirthday] = useState(initialData.birthday || "");
  const [zip, setZip] = useState(initialData.zip || "");

  const isValid = sex && birthday && zip;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid && onAction) {
      onAction({ sex, birthday, zip });
    }
  };

  return (
    <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
      <h2 className="text-[28px] font-semibold mb-4">
        We’ll start with the basics
      </h2>
      <div>
        <label className="block text-[16px] font-medium mb-2">
          Sex assigned at birth
        </label>
        <div className="flex gap-4 mb-2">
          <button
            type="button"
            className={`flex-1 py-3 rounded-lg border text-[16px] font-medium ${
              sex === "Male"
                ? "border-black bg-white"
                : "border-[#E5E5E5] bg-[#FAFAFA]"
            }`}
            onClick={() => setSex("Male")}
          >
            Male
          </button>
          <button
            type="button"
            className={`flex-1 py-3 rounded-lg border text-[16px] font-medium ${
              sex === "Female"
                ? "border-black bg-white"
                : "border-[#E5E5E5] bg-[#FAFAFA]"
            }`}
            onClick={() => setSex("Female")}
          >
            Female
          </button>
        </div>
      </div>
      <div>
        <label className="block text-[16px] font-medium mb-2">Birthday</label>
        <input
          type="text"
          className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[16px] focus:outline-none focus:border-black"
          placeholder="dd/mm/yyyy"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-[16px] font-medium mb-2">Zip code</label>
        <input
          type="text"
          className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[16px] focus:outline-none focus:border-black"
          placeholder="123456"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
      </div>
      <p className="text-[13px] text-[#888] mt-2 mb-4">
        We respect your privacy. All of your information is securely stored on
        our HIPAA Compliant server.
      </p>
      <button
        type="submit"
        className={`w-full py-4 rounded-full text-[18px] font-semibold transition ${
          isValid
            ? "bg-black text-white hover:bg-gray-900"
            : "bg-[#E5E5E5] text-[#888] cursor-not-allowed"
        }`}
        disabled={!isValid}
      >
        Continue
      </button>
    </form>
  );
};

export default BasicInfoForm;

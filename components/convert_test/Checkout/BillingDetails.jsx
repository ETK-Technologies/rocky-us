import { useState, useEffect } from "react";
import FormInput from "./FormInput";
import DOBInput from "@/components/shared/DOBInput";

import { checkAgeRestriction } from "@/utils/ageValidation";
import { logger } from "@/utils/devLogger";
import FloatLabelInput from "../PreConsultation/components/FloatLabelInput";
import PostCanadaAddressAutocomplete from "../PostCanadaAddressAutocompelete";

const BillingDetails = ({
  formData,
  handleBillingAddressChange,
  isUpdatingShipping,
  onAgeValidation,
  onAgeValidationReset,
  cartItems,
}) => {
  logger.log("BillingDetails props:", {
    onAgeValidation,
    onAgeValidationReset,
    cartItems,
  });
  // Handle date change in the date picker with real-time age validation
  const handleDateChange = (value) => {
    logger.log("handleDateChange called with value:", value);

    // Update the form data
    handleBillingAddressChange({
      target: {
        name: "date_of_birth",
        value: value,
      },
    });

    // Check if cart has Zonnic products and validate age in real-time
    if (cartItems && cartItems.items && value && value.length === 10) {
      logger.log("Date is complete (10 chars), checking for Zonnic products");

      const hasZonnic = cartItems.items.some(
        (item) =>
          item &&
          item.name &&
          typeof item.name === "string" &&
          item.name.toString().toLowerCase().includes("zonnic")
      );

      logger.log("Has Zonnic products:", hasZonnic);

      if (hasZonnic) {
        // The date is already in YYYY-MM-DD format from DOBInput
        logger.log("Date format from DOBInput:", value);

        const ageCheck = checkAgeRestriction(value, 19);
        logger.log("Age validation result:", ageCheck);

        if (ageCheck.blocked) {
          logger.log("User is too young, triggering age popup");
          logger.log("onAgeValidation function:", onAgeValidation);
          // Trigger age validation popup
          if (onAgeValidation) {
            logger.log("Calling onAgeValidation function");
            onAgeValidation();
          } else {
            logger.log("onAgeValidation function is not available");
          }
        } else {
          logger.log("User meets age requirement");
          // Reset age validation failed flag when user enters valid age
          if (onAgeValidationReset) {
            logger.log("Resetting age validation failed flag");
            onAgeValidationReset();
          }
        }
      } else {
        logger.log("No Zonnic products in cart, skipping age validation");
      }
    } else {
      logger.log("Date not complete or no cart items, skipping validation");
    }
  };

  // Handle address selection from address autocomplete
  const handleAddressSelected = (address) => {
    // Update each address field individually, marking as from autocomplete
    Object.entries(address).forEach(([field, value]) => {
      handleBillingAddressChange(
        {
          target: {
            name: field,
            value: value,
          },
        },
        true
      ); // true indicates this is from autocomplete
    });
  };

  return (
    <>
      <div className="mb-4">
        <FloatLabelInput
          label="Country"
          name="country"
          placeholder="Canada"
          required
          readOnly
          disabled
          value={"Canada"}
          hidden
          className="!bg-[#E2E2E1]"
          onChange={null}
        />
      </div>
      <div className="mb-4 grid md:grid-cols-2 grid-cols-1  gap-[16px]">
        <FloatLabelInput
          label="First Name"
          name="first_name"
          placeholder="Your first name"
          required
          className="flex-col"
          value={formData.billing_address.first_name}
          onChange={handleBillingAddressChange}
        />
        <FloatLabelInput
          label="Last Name"
          name="last_name"
          placeholder="Your last name"
          className="flex-col"
          required
          value={formData.billing_address.last_name?.replace(/^%20/, "")}
          onChange={handleBillingAddressChange}
        />
      </div>

      <div className="mb-4">
        <PostCanadaAddressAutocomplete
          title="Street address"
          name="address_1"
          value={formData.billing_address.address_1}
          placeholder=""
          required
          disabled={isUpdatingShipping}
          onChange={handleBillingAddressChange}
          onAddressSelected={handleAddressSelected}
        />
      </div>
      <div className="mb-4">
        <FloatLabelInput
          label="Apartment Number"
          name="address_2"
          value={formData.billing_address.address_2}
          placeholder="Enter your apartment number"
          disabled={isUpdatingShipping}
          onChange={handleBillingAddressChange}
        />
      </div>

      <div className="mb-4 md:grid md:grid-cols-3 md:items-center gap-[16px] grid-cols-1 ">
        <FloatLabelInput
          label="Town / City"
          name="city"
          value={formData.billing_address.city}
          placeholder="Enter your city/town"
          required
          className="md:mb-0 mb-4"
          disabled={isUpdatingShipping}
          onChange={handleBillingAddressChange}
        />
        <div className="mb-4 w-full md:mb-0">
          <div className="relative">
            <select
              required
              value={formData.billing_address.state}
              onChange={handleBillingAddressChange}
              id="state"
              name="state"
              disabled={isUpdatingShipping}
              className={`text-[14px] text-black w-full h-[60px] border rounded-lg px-4 font-medium  bg-white focus:outline-none border-[#0000001F]  appearance-none ${
                isUpdatingShipping ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <option value="" disabled="">
                province
              </option>
              <option value="AB">Alberta</option>
              <option value="BC">British Columbia</option>
              <option value="MB">Manitoba</option>
              <option value="NB">New Brunswick</option>
              <option value="NL">Newfoundland and Labrador</option>
              <option value="NT">Northwest Territories</option>
              <option value="NS">Nova Scotia</option>
              <option value="NU">Nunavut</option>
              <option value="ON">Ontario</option>
              <option value="PE">Prince Edward Island</option>
              <option value="QC">Quebec</option>
              <option value="SK">Saskatchewan</option>
              <option value="YT">Yukon Territory</option>
            </select>
            <div className="absolute right-3 top-1/2 w-5 h-5 transform -translate-y-1/2 pointer-events-none">
              {isUpdatingShipping ? (
                <svg
                  className="animate-spin"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#757575"
                    strokeWidth="4"
                    strokeDasharray="32"
                    strokeDashoffset="16"
                    fill="none"
                  />
                </svg>
              ) : (
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
                      fill="#757575"
                    ></path>
                  </g>
                </svg>
              )}
            </div>
          </div>
        </div>

        <FloatLabelInput
          label="Postal Code"
          name="postcode"
          value={formData.billing_address.postcode}
          placeholder="Enter your postal code"
          required
          disabled={isUpdatingShipping}
          onChange={handleBillingAddressChange}
        />
      </div>
      <div className="mb-4">
        <FloatLabelInput
          label="Phone Number"
          name="phone"
          value={formData.billing_address.phone}
          placeholder="Enter your phone number"
          required
          onChange={handleBillingAddressChange}
        />
      </div>
      <div className="mb-4">
        
        <DOBInput
          value={formData.billing_address.date_of_birth}
          onChange={handleDateChange}
          className="w-full bg-white rounded-[8px] border border-solid border-[#E2E2E1] px-[16px] py-[12px] h-[44px] focus:outline-none focus:border-gray-500"
          placeholder="MM/DD/YYYY"
          minAge={18}
          required
        />
      </div>
    </>
  );
};

export default BillingDetails;

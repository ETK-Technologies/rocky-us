import { useState, useEffect } from "react";
import DateInput from "../DateInput";
import FormInput from "./FormInput";
import Datepicker from "react-tailwindcss-datepicker";
import PostGridAddressAutocomplete from "./PostGrid/PostGridAddressAutocomplete";

const BillingDetails = ({ formData, handleBillingAddressChange }) => {
  // Initialize date picker value from form data if available
  const [datePickerValue, setDatePickerValue] = useState(
    formData.billing_address.date_of_birth
      ? {
          startDate: formData.billing_address.date_of_birth,
          endDate: formData.billing_address.date_of_birth,
        }
      : ""
  );

  // Update the date picker value when form data changes
  useEffect(() => {
    if (formData.billing_address.date_of_birth) {
      setDatePickerValue({
        startDate: formData.billing_address.date_of_birth,
        endDate: formData.billing_address.date_of_birth,
      });
    }
  }, [formData.billing_address.date_of_birth]);

  // Handle date change in the date picker
  const handleDateChange = (newValue) => {
    setDatePickerValue(newValue);

    // Update the form data with the new date
    const newDate = newValue?.startDate || "";
    handleBillingAddressChange({
      target: {
        name: "date_of_birth",
        value: newDate,
      },
    });
  };

  // Handle address selection from address autocomplete
  const handleAddressSelected = (address) => {
    // Update each address field individually
    Object.entries(address).forEach(([field, value]) => {
      handleBillingAddressChange({
        target: {
          name: field,
          value: value,
        },
      });
    });
  };

  return (
    <>
      <div className="mb-4 md:flex md:items-center md:gap-[16px]">
        <FormInput
          title="First Name"
          name="first_name"
          placeholder="Your first name"
          required
          value={formData.billing_address.first_name}
          onChange={handleBillingAddressChange}
        />
        <FormInput
          title="Last Name"
          name="last_name"
          placeholder="Your last name"
          required
          value={formData.billing_address.last_name?.replace(/^%20/, "")}
          onChange={handleBillingAddressChange}
        />
      </div>
      <div className="mb-4">
        <FormInput
          title="Country / Region"
          name="country"
          placeholder="Canada"
          required
          readOnly
          disabled
          value="CA"
          hidden
          onChange={null}
        />
        <input
          type={"text"}
          readOnly
          disabled
          className="w-full bg-white rounded-[8px] border border-solid border-[#E2E2E1] px-[16px] py-[12px] h-[44px] focus:outline-none focus:border-gray-500"
          value={"Canada"}
          onChange={null}
        />
      </div>
      <div className="mb-4">
        <PostGridAddressAutocomplete
          title="Street address"
          name="address_1"
          value={formData.billing_address.address_1}
          placeholder="Start typing your street address"
          required
          onChange={handleBillingAddressChange}
          onAddressSelected={handleAddressSelected}
        />
      </div>
      <div className="mb-4">
        <FormInput
          title="Apartment Number"
          name="address_2"
          value={formData.billing_address.address_2}
          placeholder="Enter your apartment number"
          onChange={handleBillingAddressChange}
        />
      </div>
      <div className="mb-4">
        <FormInput
          title="Town / City"
          name="city"
          value={formData.billing_address.city}
          placeholder="Enter your city/town"
          required
          onChange={handleBillingAddressChange}
        />
      </div>
      <div className="mb-4 md:flex md:items-center md:gap-[16px]">
        <div className="mb-4 w-full md:mb-0">
          <label
            htmlFor="billing_state"
            className="block text-[14px] font-[500] leading-[19.6px] text-[#212121] mb-2"
          >
            Province*
          </label>
          <div className="relative">
            <select
              required
              value={formData.billing_address.state}
              onChange={handleBillingAddressChange}
              id="state"
              name="state"
              className="w-full bg-white rounded-[8px] border border-solid border-[#E2E2E1] px-[16px] h-[44px] focus:outline-none focus:border-gray-500 appearance-none"
            >
              <option value="" disabled="">
                Select your province
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
            </div>
          </div>
        </div>

        <FormInput
          title="Postal Code"
          name="postcode"
          value={formData.billing_address.postcode}
          placeholder="Enter your postal code"
          required
          onChange={handleBillingAddressChange}
        />
      </div>
      <div className="mb-4">
        <FormInput
          title="Phone Number"
          name="phone"
          value={formData.billing_address.phone}
          placeholder="Enter your phone number"
          required
          onChange={handleBillingAddressChange}
        />
      </div>
      <div className="mb-4">
        <div className="mb-4 md:mb-0 w-full">
          <label
            htmlFor="date_of_birth"
            className="block text-[14px] leading-[19.6px] font-[500] text-[#212121] mb-2"
          >
            Date of Birth *
          </label>
        </div>
        <Datepicker
          value={datePickerValue}
          popoverDirection="down"
          onChange={handleDateChange}
          useRange={false}
          asSingle={true}
          name="date_of_birth"
          displayFormat="MM/DD/YYYY"
          inputClassName="w-full !bg-white !rounded-[8px] !border !border-solid !border-[#E2E2E1] !px-[16px] py-[12px] h-[44px] !focus:outline-none !focus:border-gray-500"
        ></Datepicker>
      </div>
    </>
  );
};

export default BillingDetails;

import { useState } from "react";
import FormInput from "./FormInput";
import PostGridAddressAutocomplete from "./PostGrid/PostGridAddressAutocomplete";
import { US_STATES_WITH_CODES, PHASE_1_STATES } from "@/lib/constants/usStates";

const ShippingAddress = ({
  formData,
  handleAnotherShippingAddressChange,
  handleShippingAddressChange,
}) => {
  const [active, setActive] = useState(false);

  // Handle address selection from address autocomplete
  const handleAddressSelected = (address) => {
    // Update each address field individually
    Object.entries(address).forEach(([field, value]) => {
      handleShippingAddressChange({
        target: {
          name: field,
          value: value,
        },
      });
    });
  };

  return (
    <>
      <ShipToAnotherAddressButton
        setActive={setActive}
        handleAnotherShippingAddressChange={handleAnotherShippingAddressChange}
      />
      {active && (
        <div>
          <div className="mb-4 md:flex md:items-center md:gap-[16px]">
            <FormInput
              title="First Name"
              name="first_name"
              placeholder="Your first name"
              required
              value={formData.shipping_address.first_name}
              onChange={handleShippingAddressChange}
            />
            <FormInput
              title="Last Name"
              name="last_name"
              placeholder="Your last name"
              required
              value={formData.shipping_address.last_name}
              onChange={handleShippingAddressChange}
            />
          </div>
          <div className="mb-4">
            <FormInput
              title="Country / Region"
              name="country"
              placeholder="United States"
              required
              readOnly
              disabled
              value="US"
              hidden
              onChange={null}
            />
            <input
              type={"text"}
              readOnly
              disabled
              className="w-full bg-white rounded-[8px] border border-solid border-[#E2E2E1] px-[16px] py-[12px] h-[44px] focus:outline-none focus:border-gray-500"
              value={"United States"}
              onChange={null}
            />
          </div>
          <div className="mb-4">
            <PostGridAddressAutocomplete
              title="Street address"
              name="address_1"
              value={formData.shipping_address.address_1}
              placeholder="Start typing your street address"
              required
              onChange={handleShippingAddressChange}
              onAddressSelected={handleAddressSelected}
            />
          </div>
          <div className="mb-4">
            <FormInput
              title="Apartment Number"
              name="address_2"
              value={formData.shipping_address.address_2}
              placeholder="Enter your apartment number"
              onChange={handleShippingAddressChange}
            />
          </div>
          <div className="mb-4">
            <FormInput
              title="Town / City"
              name="city"
              value={formData.shipping_address.city}
              placeholder="Enter your city/town"
              required
              onChange={handleShippingAddressChange}
            />
          </div>
          <div className="mb-4 md:flex md:items-center md:gap-[16px]">
            <div className="mb-4 md:mb-0 w-full ">
              <label
                htmlFor="billing_state"
                className="block text-[14px] font-[500] leading-[19.6px] text-[#212121] mb-2"
              >
                State*
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.shipping_address.state}
                  onChange={handleShippingAddressChange}
                  id="state"
                  name="state"
                  className="w-full bg-white rounded-[8px] border border-solid border-[#E2E2E1] px-[16px] h-[44px] focus:outline-none focus:border-gray-500 appearance-none"
                >
                  <option value="" disabled="">
                    Select your state
                  </option>
                  {US_STATES_WITH_CODES.filter(
                    (state) =>
                      state.value !== "" && PHASE_1_STATES.includes(state.code)
                  ).map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.label}
                    </option>
                  ))}
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
              title="ZIP Code"
              name="postcode"
              value={formData.shipping_address.postcode}
              placeholder="Enter your ZIP code"
              required
              onChange={handleShippingAddressChange}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ShippingAddress;

const ShipToAnotherAddressButton = ({
  setActive,
  handleAnotherShippingAddressChange,
}) => {
  return (
    <div className="py-6">
      <label
        htmlFor="ship-to-different-address-checkbox"
        className="flex items-center gap-[4px] text-[12px] leading-[18px] font-[500] !text[#000000] mb-2"
      >
        <input
          type="checkbox"
          id="ship-to-different-address-checkbox"
          name="ship_to_different_address"
          data-gtm-form-interact-field-id="1"
          onChange={(e) => {
            console.log("Checkbox changed:", e.target.checked);
            setActive(Boolean(e.target.checked));
            handleAnotherShippingAddressChange(e);
          }}
        />
        Ship to a different address?
      </label>
    </div>
  );
};

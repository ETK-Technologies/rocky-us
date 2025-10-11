import BillingDetails from "./BillingDetails";
import ShippingAddress from "./ShippingAddress";
import OrderNotes from "./OrderNotes";
import SelectDelivery from "./SelectDelivery";
import Link from "next/link";
import CustomImage from "@/components/utils/CustomImage";
import Trustpilot from "@/components/Sex/Trustpilot";

const BillingAndShipping = ({
  setFormData,
  formData,
  onProvinceChange,
  cartItems,
  isUpdatingShipping,
  onAgeValidation,
  onAgeValidationReset,
  CartAndPayment,
  handleSubmit,
}) => {
  const handleBillingAddressChange = (e, fromAutocomplete = false) => {
    setFormData((prev) => {
      return {
        ...prev,
        billing_address: {
          ...prev.billing_address,
          [e.target.name]: e.target.value,
        },
      };
    });

    // Check for Quebec restriction when province changes
    if (e.target.name === "state" && onProvinceChange) {
      // Pass shouldClearFields as false when coming from autocomplete
      onProvinceChange(e.target.value, "billing", !fromAutocomplete);
    }
  };

  const handleShippingAddressChange = (e, fromAutocomplete = false) => {
    setFormData((prev) => {
      return {
        ...prev,
        shipping_address: {
          ...prev.shipping_address,
          [e.target.name]: e.target.value,
        },
      };
    });

    // Check for Quebec restriction when province changes
    if (e.target.name === "state" && onProvinceChange) {
      // Pass shouldClearFields as false when coming from autocomplete
      onProvinceChange(e.target.value, "shipping", !fromAutocomplete);
    }
  };
  const handleAnotherShippingAddressChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        shipping_address: {
          ...prev.shipping_address,
          [e.target.name]: e.target.checked,
        },
      };
    });
  };
  const handleOrderNotesChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        customer_note: e.target.value,
      };
    });
  };
  const handleSelectDeliveryChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        extensions: {
          ...prev.extensions,
          "checkout-fields-for-blocks": {
            ...prev.extensions["checkout-fields-for-blocks"],
            [e.target.name]: e.target.checked,
          },
        },
      };
    });
  };
  return (
    <div className="w-full lg:max-w-[640px] h-full justify-self-end px-4 mt-8 lg:mt-0 lg:pr-[80px] lg:pt-[50px] overflow-x-hidden">
      <div className="pb-[16px] md:pb-[32px]">
        <button
          onClick={() => (window.location.href = "/cart")}
          className="flex gap-[8px] items-center cursor-pointer w-fit"
        >
          <span className="w-[32px] h-[32px] md:w-[40px] md:h-[40px] rounded-full border border-[#E2E2E1] flex items-center justify-center">
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
                  d="M15 7L10 12L15 17"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          </span>
          <p className="text-[14px] font-[500] text-[#212121] leading-[19.6px] md:pt-1">
            Back to Cart
          </p>
        </button>
      </div>

      <h3 className="font-medium text-[20px] leading-[24px] align-middle tracking-[0] mb-[24px]">
        Billing details
      </h3>
      <div className="mb-4">
        <BillingDetails
          formData={formData}
          handleBillingAddressChange={handleBillingAddressChange}
          isUpdatingShipping={isUpdatingShipping}
          onAgeValidation={onAgeValidation}
          onAgeValidationReset={onAgeValidationReset}
          cartItems={cartItems}
        />
        <ShippingAddress
          handleAnotherShippingAddressChange={
            handleAnotherShippingAddressChange
          }
          formData={formData}
          handleShippingAddressChange={handleShippingAddressChange}
          isUpdatingShipping={isUpdatingShipping}
        />
        <OrderNotes handleOrderNotesChange={handleOrderNotesChange} />
        <SelectDelivery
          formData={formData}
          handleSelectDeliveryChange={handleSelectDeliveryChange}
        />
      </div>

      {CartAndPayment}

      <div className="mb-4">
        <p className="text-[10px] text-gray-700 mt-4 text-center w-full lg:max-w-[512px]">
          Pay securely using your credit card. This transaction is a
          pre-authorization. Your credit card will only be charged if your
          prescription is approved.
        </p>
        <p className="text-[10px] text-gray-700 mt-4 text-center w-full lg:max-w-[512px]">
          Please note that your purchase is subject to our cancellation policy
          as outlined in our{" "}
          <Link
            target="_blank"
            href="/terms-of-use"
            className="text-[#AE7E56] font-semibold underline"
          >
            T&Cs.
          </Link>
        </p>
      </div>

      <hr />

      <div className=" flex justify-center items-center flex-col">
        <div className="bg-white md:hidden block w-full lg:max-w-[512px]  py-6 rounded-[16px] shadow-[0px_1px_1px_0px_#E2E2E1] border border-[#E2E2E1] mt-4 px-4">
          <h2 className="headers-font font-[450] text-[24px] px-4 md:px-0  leading-[110%] text-center mb-[16px] ">
            Canada’s highest rated online pharmacy
          </h2>

          <div className="mb-4 mt-4 !font-[14px]">
            <Trustpilot />
          </div>

          <div className="text-black text-center ">
            <div className="flex items-center justify-center mb-8 md:mb-16">
              <div className="flex flex-col justify-center items-center gap-[11px] flex-1 px-4 md:px-8 text-center">
                <img src="https://myrocky.b-cdn.net/WP%20Images/Global%20Images/New%20ED%20Page/ch-1.png" />
                <p className="text-[14px] md:text-[16px]  font-normal leading-[140%]">
                  2-Day discreet delivery
                </p>
              </div>
              <div className="flex flex-col justify-center items-center gap-[11px] flex-1 px-4 md:px-8 text-center">
                <img src="https://myrocky.b-cdn.net/WP%20Images/Global%20Images/New%20ED%20Page/ch-2.png" />
                <p className="text-[14px] md:text-[16px]  font-normal leading-[140%]">
                  Health Canada approved meds
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex flex-col justify-center items-center gap-[11px] flex-1 px-4 md:px-8 text-center">
                <img src="https://myrocky.b-cdn.net/WP%20Images/Global%20Images/New%20ED%20Page/ch-3.png" />
                <p className="text-[14px] md:text-[16px]  font-normal leading-[140%]">
                  Canadian Licensed Clinicians
                </p>
              </div>
              <div className="flex flex-col justify-center items-center gap-[11px] flex-1 px-4 md:px-8 text-center">
                <img src="https://myrocky.b-cdn.net/WP%20Images/Global%20Images/New%20ED%20Page/ch-4.png" />
                <p className="text-[14px] md:text-[16px]  font-normal leading-[140%]">
                  Free unlimited medical support
                </p>
              </div>
            </div>
          </div>
        </div>
        <CustomImage
          src="/OCP-IMGS.webp"
          width={300}
          height={300}
          className="mt-4 mb-4"
        />
      </div>
    </div>
  );
};

export default BillingAndShipping;

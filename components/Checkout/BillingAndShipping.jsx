import BillingDetails from "./BillingDetails";
import ShippingAddress from "./ShippingAddress";
import OrderNotes from "./OrderNotes";
import SelectDelivery from "./SelectDelivery";
import Link from "next/link";

const BillingAndShipping = ({ setFormData, formData }) => {
  const handleBillingAddressChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        billing_address: {
          ...prev.billing_address,
          [e.target.name]: e.target.value,
        },
      };
    });
  };

  const handleShippingAddressChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        shipping_address: {
          ...prev.shipping_address,
          [e.target.name]: e.target.value,
        },
      };
    });
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
    <div className="w-full lg:max-w-[640px] h-full justify-self-end px-4 mt-8 lg:mt-0 lg:pr-[80px] lg:pt-[50px]">
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
      <h1 className="text-[24px] md:text-[32px] leading-[33.6px] md:leading-[44.8px] tracking-[-0.01em] md:tracking-[-0.02em] text-[#251F20] font-[450] pb-[16px] headers-font border-b border-[#E2E2E1] md:border-none">
        Checkout
      </h1>
      <h3 className="text-[16px] md:text-[20px] leading-[19.2px] md:leading-[24px] text-[#251F20] text-start my-[16px] md:mb-[40px] font-[500]">
        Billing details
      </h3>
      <div className="p-4 md:p-6 lg:w-[512px] rounded-[16px] border border-solid border-[#E2E2E1] mb-4">
        <BillingDetails
          formData={formData}
          handleBillingAddressChange={handleBillingAddressChange}
        />
        <ShippingAddress
          handleAnotherShippingAddressChange={
            handleAnotherShippingAddressChange
          }
          formData={formData}
          handleShippingAddressChange={handleShippingAddressChange}
        />
        <OrderNotes handleOrderNotesChange={handleOrderNotesChange} />
        <SelectDelivery
          formData={formData}
          handleSelectDeliveryChange={handleSelectDeliveryChange}
        />
      </div>
    </div>
  );
};

export default BillingAndShipping;

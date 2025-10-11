import Image from "next/image";

const SelectDelivery = ({ formData, handleSelectDeliveryChange }) => {
  return (
    <div className="">
      <p className="block text-[14px] font-[500] leading-[19.6px] text-[#212121] mb-2">
        Select Delivery:
      </p>

      <label
        htmlFor="_meta_discreet"
        className="delivery-option flex items-start border border-solid border-[#E2E2E1] rounded-[8px] md:py-4 p-[16px] gap-[4px] cursor-pointer mb-2"
      >
        <div>
          <input
            type="checkbox"
            name="_meta_discreet"
            id="_meta_discreet"
            className="checkbox-button mb-[2px] md:mb-[5px] w-[14px] h-[14px] rounded-full focus:outline-none "
            onChange={handleSelectDeliveryChange}
            checked={
              formData.extensions["checkout-fields-for-blocks"]._meta_discreet
            }
          />
        </div>

        <div className="flex-1">
          <div
            htmlFor="_meta_discreet"
            className="block text-[14px] leading-[19.6px] font-[500] text-[#000000] mb-[4px]"
          >
            Discreet Delivery{" "}
            <span className="text-[12px] leading-[16.8px] text-[#000000]">
              (Optional)
            </span>
          </div>
          <p className="text-[12px] text-[400] leading-[16.8px] text-[#212121]">
            Receive your medication in discreet packaging, with no mention of
            the contents or where it is from.
          </p>
        </div>
        <div className="w-[70px] h-[70px] relative">
          <Image
            decoding="async"
            className="w-[70px] h-[70px] object-cover rounded-[12px]"
            src="/delivery.jpg"
            alt="Discreet Packaging"
            fill
          />
        </div>
      </label>

      <label
        htmlFor="_meta_mail_box"
        className="delivery-option flex items-start border border-solid border-[#E2E2E1] rounded-[8px] md:py-4 p-[16px] gap-[4px] cursor-pointer "
      >
        <div>
          <input
            type="checkbox"
            name="_meta_mail_box"
            id="_meta_mail_box"
            className="checkbox-button mb-[2px] md:mb-[5px] w-[14px] h-[14px] rounded-full focus:outline-none"
            onChange={handleSelectDeliveryChange}
            checked={
              formData.extensions["checkout-fields-for-blocks"]._meta_mail_box
            }
          />
        </div>

        <div className="flex-1">
          <div className="block text-[14px] leading-[19.6px] font-[500] text-[#000000]">
            Deliver to Mailbox{" "}
            <span className="text-[12px] leading-[16.8px] text-[#000000]">
              (Optional)
            </span>
          </div>
          <p className="text-[12px] text-[400] leading-[16.8px] text-[#212121] ">
            I hereby consent to having my order delivered to my mailbox without
            requiring my signature.
          </p>
        </div>
        <div className="w-[70px] h-[70px] relative">
          <Image
            decoding="async"
            className="w-[70px] h-[70px] object-cover rounded-[12px]"
            src="/mailbox.jpg"
            alt="Mailbox Delivery"
            fill
          />
        </div>
      </label>
    </div>
  );
};

export default SelectDelivery;

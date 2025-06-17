import { FaTimes } from "react-icons/fa";

const MoneyGuaranteeModal = ({ closePopUp }) => {
  return (
    <>
      <div className="bg-black bg-opacity-50 fixed inset-0 z-40"></div>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="relative bg-white rounded-2xl p-8 w-full max-w-2xl max-h-full shadow-xl">
          <button
            onClick={closePopUp}
            className="button absolute right-[20px] top-[20px] w-[24px] h-[24px] lg:w-[32px] lg:h-[32px] flex items-center justify-center rounded-full bg-[#E2E2E1]"
          >
            <FaTimes className="font-thin" />
          </button>
          <h2 className="text-[24px] font-medium tracking-[114.99999999999999%] mb-[32px]">
            Your Results Are Backed by Our Guarantee
          </h2>
          <p className="text-[16px] mb-[16px]">
            We believe in real, measurable results—so we offer a 100% 6 months
            money-back guarantee on your consultation fee.
          </p>
          <p className="text-[16px] mb-[16px]">
            If you follow your personalized Body Optimization plan and don’t see
            meaningful improvements, we’ll fully refund the cost of your
            consultation.
          </p>
          <p className="text-[16px] mb-[32px]">
            Start your journey with confidence—your health is our priority.
          </p>
          <p className="text-[12px]">
            Please note: This guarantee applies only to the consultation fee.
            Costs related to prescribed medications or supplements are not
            refundable.
          </p>
        </div>
      </div>
    </>
  );
};

export default MoneyGuaranteeModal;

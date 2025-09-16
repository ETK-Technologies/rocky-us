import CartItems from "./CartItems";
import InitialShipping from "../CartCheckoutShared/InitialShipping";
import CouponApply from "../CartCheckoutShared/CouponApply";
import Payment from "./Payment";
import { useState } from "react";

const CartAndPayment = ({
  items,
  cartItems,
  setCartItems,
  setFormData,
  handleSubmit,
  cardNumber,
  setCardNumber,
  expiry,
  setExpiry,
  cvc,
  setCvc,
  cardType,
  setCardType,
  savedCards,
  setSavedCards,
  selectedCard,
  setSelectedCard,
  isLoadingSavedCards,
  saveCard,
  setSaveCard,
  amount, // Add amount for Apple Pay
  billingAddress, // Add billing address for Apple Pay
  onApplePaySuccess, // Add Apple Pay success callback
  onApplePayError, // Add Apple Pay error callback
  isProcessingApplePay = false, // Add Apple Pay processing state
  clientSecret, // Add client secret for Payment Element
}) => {
  const [isPaymentValid, setIsPaymentValid] = useState(false);

  const handleValidationChange = (isValid) => {
    setIsPaymentValid(isValid);
  };

  return (
    <div className="bg-[#f7f7f7] h-full justify-self-start w-full px-4 mt-8 lg:mt-0 lg:pl-[80px] lg:pt-[50px] pb-10">
      <h1 className="hidden lg:block text-[20px] leading-[24px] text-[#251F20] text-start mt-0 font-[500] mb-[24px]">
        Your Order
      </h1>
      <div className="bg-white w-full lg:max-w-[512px] p-4 md:p-6 py-0 md:py-0 rounded-[16px] shadow-[0px_1px_1px_0px_#E2E2E1] border border-[#E2E2E1] mt-8 lg:mt-0 ">
        <CartItems items={items} />
        <CouponApply setCartItems={setCartItems} />
        <InitialShipping cartItems={cartItems} setCartItems={setCartItems} />
      </div>

      <Payment
        setFormData={setFormData}
        cardNumber={cardNumber}
        setCardNumber={setCardNumber}
        expiry={expiry}
        setExpiry={setExpiry}
        cvc={cvc}
        setCvc={setCvc}
        cardType={cardType}
        setCardType={setCardType}
        onValidationChange={handleValidationChange}
        clientSecret={clientSecret}
        billingAddress={billingAddress}
      />
      <button
        onClick={handleSubmit}
        disabled={!isPaymentValid}
        type="button"
        className={`text-white text-sm font-semibold h-[44px] flex items-center justify-center rounded-full w-full lg:max-w-[512px] mt-6 transition ${
          isPaymentValid
            ? "bg-black hover:-translate-y-1 cursor-pointer"
            : "bg-gray-400 cursor-not-allowed opacity-60"
        }`}
      >
        Place order
      </button>
      {!isPaymentValid && (
        <p className="text-sm text-gray-500 text-center mt-2 lg:max-w-[512px]">
          Please complete your payment information to continue
        </p>
      )}
    </div>
  );
};

export default CartAndPayment;

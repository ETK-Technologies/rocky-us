import CartItems from "./CartItems";
import InitialShipping from "@/components/convert_test/CartCheckoutShared/InitialShipping";
import CouponApply from "@/components/convert_test/CartCheckoutShared/CouponApply";
import Payment from "./Payment";
import Link from "next/link";
import Trustpilot from "@/components/Sex/Trustpilot";

const CartAndPayment = ({
  items,
  cartItems,
  setCartItems,
  setFormData,
  formData,
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
  isUpdatingShipping,
  ageValidationFailed,
  isPaymentValid,
  paymentValidationMessage,
}) => {
  return (
    <div className="md:bg-[#f7f7f7] h-full justify-self-start w-full md:px-4 lg:mt-0 lg:pl-[80px] lg:pt-[50px] mb:pb-10 overflow-x-hidden">
      <h1 className="block text-[20px] leading-[24px] text-[#251F20] text-start md:mt-0 font-[500] mt-[10px]  mb:mb-[24px]">
        Your Order
      </h1>
      <div className="bg-white w-full lg:max-w-[512px] p-4 md:p-6 py-0 md:py-0 rounded-[16px] shadow-[0px_1px_1px_0px_#E2E2E1] border border-[#E2E2E1] mt-4  ">
        <CartItems items={items} />
        <CouponApply setCartItems={setCartItems} />
        <InitialShipping
          cartItems={cartItems}
          setCartItems={setCartItems}
          isUpdatingShipping={isUpdatingShipping}
          formData={formData}
        />
      </div>

      <div className="bg-white md:block hidden w-full lg:max-w-[512px]  py-6 rounded-[16px] shadow-[0px_1px_1px_0px_#E2E2E1] border border-[#E2E2E1] mt-4 px-4">
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
    </div>
  );
};

export default CartAndPayment;

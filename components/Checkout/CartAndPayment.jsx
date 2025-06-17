import CartItems from "./CartItems";
import InitialShipping from "../CartCheckoutShared/InitialShipping";
import CouponApply from "../CartCheckoutShared/CouponApply";
import Payment from "./Payment";

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
  selectedCard,
  setSelectedCard,
  isLoadingSavedCards,
}) => {
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
        handleSubmit={handleSubmit}
        cardNumber={cardNumber}
        setCardNumber={setCardNumber}
        expiry={expiry}
        setExpiry={setExpiry}
        cvc={cvc}
        setCvc={setCvc}
        cardType={cardType}
        setCardType={setCardType}
        savedCards={savedCards}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        isLoadingSavedCards={isLoadingSavedCards}
      />
      <button
        onClick={handleSubmit}
        type="button"
        className="bg-black text-white text-sm font-semibold h-[44px] flex items-center justify-center rounded-full w-full lg:max-w-[512px] mt-6 hover:-translate-y-1 transition"
      >
        Place order
      </button>
    </div>
  );
};

export default CartAndPayment;

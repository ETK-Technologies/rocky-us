import { useState } from "react";
import { CiTrash } from "react-icons/ci";
import { DotsLoader } from "react-loaders-kit";
import { toast } from "react-toastify";

const InitialShipping = ({ currencySymbol = "$", cartItems, setCartItems }) => {
  const [removingCode, setRemovingCode] = useState(false);
  const subTotalPrice = cartItems?.totals?.total_items / 100 || 0;
  const totalPrice = cartItems?.totals?.total_price / 100 || 0;
  const totalTax = cartItems?.totals?.total_tax / 100 || 0;

  const handleCodeRemove = async (code) => {
    setRemovingCode(true);
    try {
      const res = await fetch("/api/coupons", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (data.error) {
        toast.error("Invalid coupon code.");
      } else {
        setCartItems(data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setRemovingCode(false);
    }
  };

  // Get the selected province from shipping or billing address
  const selectedProvince =
    cartItems.shipping_address?.state || cartItems.billing_address?.state;

  return (
    <div className="pt-4">
      <div className="flex justify-between items-start py-[6px] md:py-0 mb-3">
        <p className="font-[500] text-[#4E4E4E] leading-[19.6px]">Subtotal</p>
        <p className="leading-[19.6px] text-[#000000]">
          {currencySymbol}
          {subTotalPrice}
        </p>
      </div>
      {cartItems.coupons.length > 0 && (
        <div className="pb-3 border-b relative">
          <p className="font-[500] text-[#4E4E4E] leading-[19.6px] mb-3">
            Coupons
          </p>
          {cartItems.coupons.map((coupon) => {
            return (
              <div
                key={coupon.code}
                className="grid grid-cols-2 justify-between items-start py-[6px] md:py-0 mb-1 relative"
              >
                <p className="font-[500] text-[#4E4E4E] leading-[19.6px] text-sm uppercase underline">
                  {coupon.code}
                </p>
                <div className="flex items-center justify-end gap-4">
                  <p className="leading-[19.6px] text-[#000000] text-sm justify-self-end">
                    - {currencySymbol}
                    {Number(coupon.totals?.total_discount) / 100}
                  </p>
                  <button
                    className="justify-self-end"
                    onClick={() => handleCodeRemove(coupon.code)}
                  >
                    <CiTrash color="darkred" />
                  </button>
                </div>
              </div>
            );
          })}
          {removingCode && (
            <div className="absolute backdrop-blur-[2px] flex items-center justify-center left-0 right-0 top-0 bottom-0 z-50">
              <DotsLoader size={25} loading={removingCode} color={"#000000"} />
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between items-start"></div>
      {cartItems.shipping_rates && cartItems.shipping_rates.length > 0 ? (
        cartItems.shipping_rates.map((shipping) => {
          const selectedShipping = shipping.shipping_rates.find(
            (rate) => rate.selected
          );
          return (
            <div
              key={shipping.name}
              className="flex justify-between items-start mb-3 mt-3"
            >
              <p className="font-[500] text-[#4E4E4E] leading-[19.6px]">
                {shipping.name}
              </p>
              <div className="flex flex-col items-end gap-[2px]">
                <p className="leading-[19.6px]">
                  {selectedShipping ? (
                    <>
                      {selectedShipping.name}
                      {selectedShipping.price > 0 && (
                        <span>
                          {" "}
                          ({currencySymbol}
                          {(Number(selectedShipping.price) / 100).toFixed(2)})
                        </span>
                      )}
                    </>
                  ) : (
                    "Free shipping"
                  )}
                </p>
                {selectedProvince && (
                  <p className="text-[12px] font-[400] text-[#212121] leading-[16.8px]">
                    Shipping to{" "}
                    <b>
                      <span className="font-[600]">{selectedProvince}</span>
                    </b>
                  </p>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex justify-between items-start mb-3 mt-3">
          <p className="font-[500] text-[#4E4E4E] leading-[19.6px]">
            Initial Shipment
          </p>
          <div className="flex flex-col items-end gap-[2px]">
            <p className="leading-[19.6px]">Free shipping</p>
            {selectedProvince && (
              <p className="text-[12px] font-[400] text-[#212121] leading-[16.8px]">
                Shipping to{" "}
                <b>
                  <span className="font-[600]">{selectedProvince}</span>
                </b>
              </p>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-start mb-3">
        <p className="font-[500] text-[#4E4E4E] leading-[19.6px]">Tax</p>
        <p className="leading-[19.6px]">
          {currencySymbol}
          {totalTax}
        </p>
      </div>
      <div className="flex justify-between items-start mb-[24px]">
        <p className="font-[500] text-[#000000] leading-[19.6px]">Total</p>
        <p className="font-[500] text-[#000000] leading-[22px]">
          {currencySymbol}
          {totalPrice}
        </p>
      </div>
    </div>
  );
};

export default InitialShipping;

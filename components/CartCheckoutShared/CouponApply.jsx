import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { DotsLoader } from "react-loaders-kit";
import { toast } from "react-toastify";

const CouponApply = ({ setCartItems }) => {
  const [code, setCode] = useState("");
  const [addingCode, setAddingCode] = useState("");

  const handleCodeSubmit = async () => {
    setAddingCode(true);
    try {
      const res = await fetch("/api/coupons", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
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
      setAddingCode(false);
      setCode("");
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && code.trim() !== "") {
      e.preventDefault();
      handleCodeSubmit();
    }
  };

  return (
    <div className="py-4 flex items-center gap-2 border-b border-[#E2E2E1] relative">
      <input
        onChange={(e) => {
          setCode(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        value={code}
        type="text"
        placeholder="Coupon code"
        className="w-full border border-[#E2E2E1] rounded-[8px] py-[12px] px-[16px] h-[44px] focus:outline-none focus:border-[#c4c4c2]"
      />
      <button
        onClick={handleCodeSubmit}
        type="button"
        className="min-h-[44px] min-w-[44px] rounded-[8px] border border-[#E2E2E1] flex items-center justify-center"
      >
        <FaArrowRight size={12} />
      </button>
      {addingCode && (
        <div className="absolute backdrop-blur-[2px] flex items-center justify-center left-0 right-0 top-0 bottom-0 z-50">
          <DotsLoader size={25} loading={addingCode} color={"#000000"} />
        </div>
      )}
    </div>
  );
};

export default CouponApply;

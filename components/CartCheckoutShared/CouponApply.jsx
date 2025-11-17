import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { logger } from "@/utils/devLogger";
import { DotsLoader } from "react-loaders-kit";
import { toast } from "react-toastify";

const CouponApply = ({ setCartItems }) => {
  const [code, setCode] = useState("");
  const [addingCode, setAddingCode] = useState("");

  const handleCodeSubmit = async () => {
    if (!code.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    setAddingCode(true);
    try {
      // Build URL with sessionId for guest users
      let url = "/api/coupons";
      const { isAuthenticated } = await import("@/lib/cart/cartService");
      const isAuth = isAuthenticated();

      if (!isAuth) {
        // For guest users, get sessionId from localStorage
        try {
          const { getSessionId } = await import("@/services/sessionService");
          const sessionId = getSessionId();
          if (sessionId) {
            url += `?sessionId=${encodeURIComponent(sessionId)}`;
          }
        } catch (error) {
          logger.warn("Could not get sessionId for guest coupon apply:", error);
        }
      }

      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ code: code.trim() }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to apply coupon");
      }

      const data = await res.json();

      if (data.error) {
        toast.error(data.error || "Invalid coupon code.");
      } else {
        setCartItems(data);
        toast.success("Coupon applied successfully!");
        // Trigger cart refresh event
        document.dispatchEvent(new CustomEvent("cart-updated"));
      }
    } catch (error) {
      logger.error("Error applying coupon:", error);
      toast.error(error.message || "Failed to apply coupon. Please try again.");
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

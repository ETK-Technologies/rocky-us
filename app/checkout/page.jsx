import CheckoutPageContent from "@/components/Checkout/CheckoutPageContent";
import { CheckoutScripts } from "@/components/VisiOpt";
import { Suspense } from "react";

const CheckoutPage = async () => {
  return (
    <Suspense fallback={<></>}>
      <CheckoutPageContent />
      {/* Add checkout-specific VisiOpt scripts */}
      <CheckoutScripts />
    </Suspense>
  );
};

export default CheckoutPage;

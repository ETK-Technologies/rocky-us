import CheckoutPageContent from "@/components/Checkout/CheckoutPageContent";
import { Suspense } from "react";

const CheckoutPage = async () => {
  return (
    <Suspense fallback={<></>}>
      <CheckoutPageContent />
    </Suspense>
  );
};

export default CheckoutPage;

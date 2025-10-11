import CheckoutPageContent from "@/components/convert_test/Checkout/CheckoutPageContent";
import { Suspense } from "react";

const CheckoutPage = async () => {
  return (
    <Suspense fallback={<></>}>
      <CheckoutPageContent />
    </Suspense>
  );
};

export default CheckoutPage;

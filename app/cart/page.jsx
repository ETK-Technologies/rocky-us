import CartPageContent from "@/components/Cart/CartPageContent";
import { Suspense } from "react";

const CartPage = () => {
  return (
    <Suspense fallback={<></>}>
      <CartPageContent />
    </Suspense>
  );
};

export default CartPage;

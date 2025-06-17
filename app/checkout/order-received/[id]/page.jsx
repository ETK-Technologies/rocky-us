import OrderReceivedPageContent from "@/components/OrderReceived/OrderReceivedPageContent";
import { ThankYouScript } from "@/components/VisiOpt";
import { Suspense } from "react";
import { cookies } from "next/headers";

const OrderReceivedPage = async () => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  return (
    <Suspense fallback={<></>}>
      <OrderReceivedPageContent userId={userId} />
      {/* Add thank you page VisiOpt script */}
      <ThankYouScript />
    </Suspense>
  );
};

export default OrderReceivedPage;

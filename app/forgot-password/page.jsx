import ForgotPassword from "@/components/LoginRegisterPage/ForgotPassword";
import { Suspense } from "react";

const ForgotPasswordPage = () => {
  return (
    <Suspense fallback={<></>}>
      <ForgotPassword />
    </Suspense>
  );
};

export default ForgotPasswordPage;

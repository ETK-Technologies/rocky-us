import ResetPassword from "@/components/LoginRegisterPage/ResetPassword";
import { Suspense } from "react";

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<></>}>
      <ResetPassword />
    </Suspense>
  );
};

export default ResetPasswordPage;

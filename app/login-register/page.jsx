import LoginRegisterContent from "@/components/LoginRegisterPage/LoginRegisterContent";
import { Suspense } from "react";

const LoginRegister = () => {
  return (
    <Suspense fallback={<></>}>
      <LoginRegisterContent />
    </Suspense>
  );
};

export default LoginRegister;

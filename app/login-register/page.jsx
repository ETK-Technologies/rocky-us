import LoginRegisterContent from "@/components/LoginRegisterPage/LoginRegisterContent";
import { LoginRegisterScripts } from "@/components/VisiOpt";
import { Suspense } from "react";

const LoginRegister = () => {
  return (
    <Suspense fallback={<></>}>
      <LoginRegisterContent />
      {/* Add login/register specific VisiOpt scripts */}
      <LoginRegisterScripts />
    </Suspense>
  );
};

export default LoginRegister;

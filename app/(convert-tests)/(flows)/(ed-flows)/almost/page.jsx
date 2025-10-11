"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AlmostModal from "@/components/convert_test/PreConsultation/components/AlMostModal";

export default function AlmostPage() {
   const router = useRouter();
  // useEffect(() => {
  //   const t = setTimeout(() => {
  //     router.push("/checkoutFlow?from=almost");
  //   }, 2000);
  // }, [router]);


  const goToCheckout = () => {
    router.push("/checkoutFlow?from=almost");
  }

  return (
    <>
      <AlmostModal />
      <div className="fixed bottom-0 w-full p-4 bg-white  flex justify-center">
        <button onClick={goToCheckout} className="bg-black min-w-[335px] h-[52px] rounded-full text-white px-4 py-2">Continue</button>
      </div>
    </>
  );
}

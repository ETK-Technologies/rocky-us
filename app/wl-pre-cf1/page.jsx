"use client";
import React, { Suspense } from "react";
import WeightQuestionnaire from "@/components/WLPreConsultationQuiz/WLPreConsultation";
import { WlPreConsultationScript } from "@/components/VisiOpt";
import { useSearchParams } from "next/navigation";
import WeightLossLanding from "@/components/WlPreCfLanding/WeightLossLanding";

function WLQuizContent() {
  const searchParams = useSearchParams();
  const startTest = searchParams.get("start_test") === "true";

  if (startTest) {
    return (
      <main>
        <WeightQuestionnaire />
        <WlPreConsultationScript />
      </main>
    );
  }

  return <WeightLossLanding />;
}

export default function WLQuizPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WLQuizContent />
    </Suspense>
  );
}

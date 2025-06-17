import React from "react";
import WeightQuestionnaire from "@/components/WLPreConsultationQuiz/WLPreConsultation";
import { WlPreConsultationScript } from "@/components/VisiOpt";

export default function WLQuizPage() {
  return (
    <main>
      <WeightQuestionnaire />
      <WlPreConsultationScript />
    </main>
  );
}

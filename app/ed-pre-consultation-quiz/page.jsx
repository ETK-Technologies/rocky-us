import React from "react";
import EDPreConsultationQuiz from "@/components/EDPreConsultationQuiz/EdPreConsultation";
import { EdPreConsultationScript } from "@/components/VisiOpt";

export default function EDQuizPage() {
  return (
    <main>
      <EDPreConsultationQuiz />
      <EdPreConsultationScript />
    </main>
  );
}

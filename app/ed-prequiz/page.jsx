"use client";
import {
  EDPreQuiz,
  QUIZ_FEATURES,
  ED_PRE_QUIZ_DATA,
  QUIZ_TIMER_TEXT,
} from "@/components/EDPreQuiz";

export default function edPreQuiz() {
  const data = ED_PRE_QUIZ_DATA;

  return (
    <EDPreQuiz
      headerText={QUIZ_TIMER_TEXT}
      subtitle={data.subtitle}
      upperNote={data.upperNote}
      features={QUIZ_FEATURES}
      buttons={data.buttons}
      note={data.note}
      image={data.image}
      imageHeight={data.imageHeight}
      showProudPartner={data.proudPartner}
    />
  );
}

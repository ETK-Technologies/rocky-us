import EDConsultationQuiz from "@/components/EdQuestionnaire/EDConsultationQuiz";
import { cookies } from "next/headers";

export default function EDConsultationQuizPage() {
  const cookieStore = cookies();
  const pn = cookieStore.get("pn")?.value;
  const userName = cookieStore.get("userName")?.value;
  const userEmail = cookieStore.get("userEmail")?.value;
  const province = cookieStore.get("province")?.value;
  const dosageRaw = cookieStore.get("dosages")?.value;
  const dob = cookieStore.get("dob")?.value;
  let dosage = null;
  if (dosageRaw) {
    try {
      const dosageObj = JSON.parse(decodeURIComponent(dosageRaw));
      if (typeof dosageObj === "object" && dosageObj !== null) {
        dosage = Object.values(dosageObj)[0];
      } else {
        dosage = dosageObj;
      }
    } catch (error) {
      console.error("Error parsing dosage cookie:", error);
      dosage = null;
    }
  }
  return (
    <main className="min-h-screen">
      <EDConsultationQuiz
        pn={pn}
        userName={userName}
        userEmail={userEmail}
        province={province}
        dosage={dosage}
        dob={dob}
      />
    </main>
  );
}
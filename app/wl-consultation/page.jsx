import WeightLossConsultationQuiz from "@/components/WeightQuestionnaire/WeightConsultationQuiz";
import { cookies } from "next/headers";

export default function WeightConsultationPage() {
  const cookieStore = cookies();
  const pn = cookieStore.get("pn")?.value;
  const userName = cookieStore.get("userName")?.value;
  const userEmail = cookieStore.get("userEmail")?.value;
  const province = cookieStore.get("province")?.value;
  const dob = cookieStore.get("dob")?.value;

  return (
    <main className="min-h-screen">
      <WeightLossConsultationQuiz
        pn={pn}
        userName={userName}
        userEmail={userEmail}
        province={province}
        dob={dob}
      />
    </main>
  );
}
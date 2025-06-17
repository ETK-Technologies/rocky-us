import MentalHealthQuestionnaire from "@/components/MentalHealthQuestionnaire/MentalHealthQuestionnaire";
import { cookies } from "next/headers";

export default function MHConsultationPage() {
  const cookieStore = cookies();
  const pn = cookieStore.get("pn")?.value;
  const userName = cookieStore.get("userName")?.value;
  const userEmail = cookieStore.get("userEmail")?.value;
  const province = cookieStore.get("province")?.value;

  return (
    <main className="min-h-screen">
      <MentalHealthQuestionnaire 
        pn={pn}
        userName={userName}
        userEmail={userEmail}
        province={province}
        dob={cookieStore.get("dob")?.value}
      />
    </main>
  );
}
import ZonnicConsultationQuiz from "@/components/ZonnicQuestionnaire/ZonicQuestionnaire";
import { SmokingConsultationScripts } from "@/components/VisiOpt";
import { cookies } from "next/headers";

export default function ZonnicConsultationPage() {
  const cookieStore = cookies();
  const phone = cookieStore.get("phone")?.value;
  const displayName = cookieStore.get("displayName")?.value;
  const lastName = cookieStore.get("lastName")?.value;
  const userEmail = cookieStore.get("userEmail")?.value;
  const DOB = cookieStore.get("dob")?.value;
  const province = cookieStore.get("province")?.value;

  return (
    <main className="min-h-screen">
      <ZonnicConsultationQuiz
        phone={phone}
        firstName={displayName}
        lastName={lastName}
        userEmail={userEmail}
        dob={DOB}
        province={province}
      />
      <SmokingConsultationScripts />
    </main>
  );
}

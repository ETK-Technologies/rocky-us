import PreLanderQSection from "@/components/Ed/PreLanderQSection";
import { EdPrelander5Script } from "@/components/VisiOpt";

export default function AgeVerification() {
  return (
    <main className="min-h-screen">
      <PreLanderQSection
        img="/ed-prelander-5/rocky-image.png"
        h2="Make Her"
        p="Fall In Love Again"
        question="Are you over 21?"
      ></PreLanderQSection>
      <EdPrelander5Script />
    </main>
  );
}

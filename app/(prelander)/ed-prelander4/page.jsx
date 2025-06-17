import PreLanderQSection from "@/components/Ed/PreLanderQSection";
import { EdPrelander4Script } from "@/components/VisiOpt";

export default function EdPreLander4() {
  return (
    <main className="min-h-screen">
      <PreLanderQSection
        img="/ed-prelander-5/prelander4.jpg"
        h2="Make Her"
        p="Fall In Love Again"
        question="Are you over 21?"
        UpText={false}
      ></PreLanderQSection>
      <EdPrelander4Script />
    </main>
  );
}

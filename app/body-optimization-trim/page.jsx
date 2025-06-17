import CoverSection from "@/components/utils/CoverSection";
import WlCover from "@/components/BodyOptimization/WlCover";
import RockyFeatures from "@/components/RockyFeatures";
import RockyInTheNews from "@/components/RockyInTheNews";
import ReviewsSection from "@/components/ReviewsSection";
import Section from "@/components/utils/Section";
import EnhancesWellnessJourney from "@/components/BodyOptimization/EnhancesWellnessJourney";
import HealthSolutions from "@/components/BodyOptimization/HealthSolutions";
import PersonalizedTreatment from "@/components/BodyOptimization/PersonalizedTreatment";
import MoneyBack from "@/components/MoneyBack";
import WlFaqsSection from "@/components/BodyOptimization/WlFaqsSection";
import WlProducts from "@/components/BodyOptimization/WlProducts";
import ResultSection from "@/components/BodyOptimization/ResultSection";

export default async function BodyOptimization() {
  return (
    <main>
      <CoverSection>
        <WlCover />
      </CoverSection>
      <RockyFeatures />
      <Section bg={"bg-gradient-to-t from-[#F6F8FB] to-transparent"}>
        <WlProducts />
      </Section>

      <Section>
        <ResultSection />
      </Section>

      <Section bg={"bg-[#F5F4EF]"}>
        <HealthSolutions />
      </Section>

      <Section>
        <EnhancesWellnessJourney />
      </Section>
      <Section bg={"bg-[#F7F8FB]"}>
        <MoneyBack />
      </Section>

      <Section>
        <WlFaqsSection />
      </Section>
    </main>
  );
}

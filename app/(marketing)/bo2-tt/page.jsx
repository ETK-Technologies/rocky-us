import CoverSection from "@/components/utils/CoverSection";
import Bo2Cover from "@/components/Bo2Cover";
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

export default async function BO2() {
  return (
    <main>
      <CoverSection>
        <Bo2Cover btnColor="bg-[forestgreen]" />
      </CoverSection>
      <RockyFeatures />
      <Section bg={"bg-gradient-to-t from-[#F6F8FB] to-transparent"}>
        <WlProducts CardBtnColor="bg-[forestgreen]" productsVisible={false} />
      </Section>
      <Section>
        <EnhancesWellnessJourney />
      </Section>
      <RockyInTheNews />

      <Section>
        <HealthSolutions btnColor="bg-[forestgreen]" />
      </Section>
      <Section bg={"bg-[#F5F4EF]"}>
        <ReviewsSection />
      </Section>
      <Section>
        <PersonalizedTreatment />
      </Section>
      <Section bg={"bg-[#F7F8FB]"}>
        <MoneyBack />
      </Section>
      <Section>
        <WlFaqsSection moreQTitle="Convenient, researched, trusted." />
      </Section>
    </main>
  );
}

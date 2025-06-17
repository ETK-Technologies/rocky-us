import CoverSection from "@/components/utils/CoverSection";
import RockyFeatures from "@/components/RockyFeatures";
import RockyInTheNews from "@/components/RockyInTheNews";
import ReviewsSection from "@/components/ReviewsSection";
import Section from "@/components/utils/Section";
import MentalCover from "@/components/MentalHealth/MentalCover";
import HowRockyWorks from "@/components/HowRockyWorks";
import MentalProducts from "@/components/MentalHealth/MentalProducts";
import EmotionalSupport from "@/components/MentalHealth/EmotionalSupport";
import EmpoweringMentalHealth from "@/components/MentalHealth/EmpoweringMentalHealth";
import MeetQuality from "@/components/MentalHealth/MeetQuality";
import TeamSection from "@/components/TeamSection";
import MentalFaqsSection from "@/components/MentalHealth/MentalFaqsSection";
import TransparentPricing from "@/components/MentalHealth/TransparentPricing";

export default async function MentalHealth() {
  return (
    <main>
      <CoverSection>
        <MentalCover />
      </CoverSection>

      <RockyFeatures />

      <Section>
        <HowRockyWorks />
      </Section>

      <Section>
        <MentalProducts />
      </Section>

      <RockyInTheNews />

      <Section>
        <EmotionalSupport />
      </Section>

      <Section>
        <EmpoweringMentalHealth />
      </Section>

      <Section bg={"bg-[#F5F4EF]"}>
        <ReviewsSection />
      </Section>

      <Section>
        <MeetQuality />
      </Section>

      <Section>
        <TeamSection />
      </Section>

      <TransparentPricing />

      <Section>
        <MentalFaqsSection />
      </Section>
    </main>
  );
}

"use client";
import Section from "@/components/utils/Section";
import CoverSection from "@/components/utils/CoverSection";
import ReviewsSection from "@/components/ReviewsSection";
import ZonnivCover from "@/components/Zonnic/ZonnicCover";
import BecomingSmokeFree from "@/components/Zonnic/BecomingSmokeFree";
import EasySection from "@/components/Zonnic/EasySection";
import ZonnicIngredients from "@/components/Zonnic/ZonnicIngredients";
import ZonnicFaqsSection from "@/components/Zonnic/ZonnicFaqsSection";
import HighestRated from "@/components/Zonnic/HighestRated";
import { ZonnicProductScript } from "@/components/VisiOpt";

export default function Zonnic() {
  return (
    <main>
      <ZonnicProductScript />
      <CoverSection>
        <ZonnivCover />
      </CoverSection>
      <Section>
        <BecomingSmokeFree />
      </Section>
      <HighestRated />

      <Section>
        <EasySection />
      </Section>
      <Section>
        <ZonnicIngredients />
      </Section>

      <Section bg={"bg-[#F5F4EF]"}>
        <ReviewsSection />
      </Section>
      <Section>
        <ZonnicFaqsSection />
      </Section>
    </main>
  );
}

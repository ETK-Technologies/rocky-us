"use client";
import HowRockyWorks from "@/components/HowRockyWorks";
import Section from "@/components/utils/Section";
import SexBlog from "@/components/Sex/SexBlog";
import CoverSection from "@/components/utils/CoverSection";
import SexCover from "@/components/Sex/SexCover";
import RockyInTheNews2 from "@/components/RockyInTheNews2";
import ReviewsSection from "@/components/ReviewsSection";
import FindTreatment from "@/components/Sex/FindTreatment";
import TeamSection from "@/components/TeamSection";
import EdProducts from "@/components/EDPlans/EdProducts";
import { SexScript } from "@/components/VisiOpt";

export default function Sex() {
  return (
    <main>
      <CoverSection>
        <SexCover />
      </CoverSection>
      <Section>
        <EdProducts />
      </Section>
      <RockyInTheNews2 />
      <Section>
        <HowRockyWorks />
      </Section>
      <Section bg={"bg-[#F5F4EF]"}>
        <ReviewsSection />
      </Section>
      <Section>
        <FindTreatment />
      </Section>
      <Section>
        <TeamSection />
      </Section>
      <SexBlog />
      <SexScript />
    </main>
  );
}

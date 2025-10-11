import React from "react";
import Hero from "./Hero";
import WhatItTreats from "./WhatItTreats";
import ReadyForClearSkin from "./ReadyForClearSkin";
import ProductShowcase from "./ProductShowcase";
import SkinCareFAQs from "./SkinCareFAQs";
import TestimonialSlider from "./SkinCareReviews";
import ThreeStepSection from "./ThreeStepSection";
import Section from "@/components/utils/Section";

const AcnePage = () => {
  return (
    <div>
      <Hero />
      <WhatItTreats />
      <ProductShowcase />
      <TestimonialSlider />
      <ThreeStepSection />
      <Section bg={"bg-[#F5F4EF]"}>
      <SkinCareFAQs />

      </Section>
      <ReadyForClearSkin />
    </div>
  );
};

export default AcnePage;

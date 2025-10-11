import React from "react";
import Hero from "@/components/Product/PersonalizedHyper-Pigmentation/Hero";
import WhatItTreats from "@/components/Product/PersonalizedHyper-Pigmentation/WhatItTreats";
import ReadyForClearSkin from "@/components/Product/PersonalizedHyper-Pigmentation/ReadyForClearSkin";
import ProductShowcase from "@/components/Product/PersonalizedHyper-Pigmentation/ProductShowcase";
import TestimonialSlider from "@/components/Product/PersonalizedHyper-Pigmentation/TestimonialSection";
import StepsToReverseHyperPigmentation from "@/components/Product/PersonalizedHyper-Pigmentation/StepsToReverseHyperPigmentation";
import HyperPigmentationFaqs from "@/components/Product/PersonalizedHyper-Pigmentation/HyperPigmentationFaqs";
import Section from "@/components/utils/Section";

const PersonalizedHyperPigmentation = () => {
  return (
    <div>
      <Hero />
      <WhatItTreats />
      <ProductShowcase />
      <TestimonialSlider />
      <StepsToReverseHyperPigmentation />
      <Section bg={"bg-[#F5F4EF]"}>
        <HyperPigmentationFaqs />
      </Section>
      <ReadyForClearSkin />
    </div>
  );
};

export default PersonalizedHyperPigmentation;

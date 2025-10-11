import React from "react";
import Hero from "@/components/Product/PersonalizedAntiAging/Hero";
import WhatItTreats from "@/components/Product/PersonalizedAntiAging/WhatItTreats";
import ReadyForClearSkin from "@/components/Product/PersonalizedAntiAging/ReadyForClearSkin";
import ProductShowcase from "@/components/Product/PersonalizedAntiAging/ProductShowcase";
import TestimonialSlider from "@/components/Product/PersonalizedAntiAging/TestimonialSection";
import StepsToReverseAgingSkin from "@/components/Product/PersonalizedAntiAging/StepsToReverseAgingSkin";
import ScienceMadeSimple from "@/components/Product/PersonalizedAntiAging/ScienceMadeSimple";
import AntiAgingFaqs from "@/components/Product/PersonalizedAntiAging/AntiAgingFaqs";
import Section from "@/components/utils/Section";

const PersonalizedAntiAgingPage = () => {
  return (
    <div>
      <Hero />
      <WhatItTreats />
      <ScienceMadeSimple />
      <ProductShowcase />
      <TestimonialSlider />
      <StepsToReverseAgingSkin />
      <Section bg={"bg-[#F5F4EF]"}>
        <AntiAgingFaqs />
      </Section>
      <ReadyForClearSkin />
    </div>
  );
};

export default PersonalizedAntiAgingPage;

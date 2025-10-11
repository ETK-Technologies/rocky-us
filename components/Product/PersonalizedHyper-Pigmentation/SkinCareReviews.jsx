"use client";
import React from "react";
import dynamic from "next/dynamic";
import Section from "@/components/utils/Section";

// Dynamically import the Reviews section component
const DynamicReviewsSection = dynamic(
  () => import("@/components/ReviewsSection"),
  {
    loading: () => (
      <div className="min-h-[300px] bg-[#F5F4EF] animate-pulse"></div>
    ),
    ssr: false,
  }
);

const SkinCareReviews = () => {
  return (
    <Section bg="bg-[#F5F4EF]">
      <DynamicReviewsSection />
    </Section>
  );
};

export default SkinCareReviews;

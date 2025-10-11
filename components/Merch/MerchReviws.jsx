import React from "react";
import dynamic from "next/dynamic";
import Section from "@/components/utils/Section";

const DynamicReviewsSection = dynamic(
  () => import("@/components/ReviewsSection"),
  {
    loading: () => (
      <div className="min-h-[300px] bg-[#F5F4EF] animate-pulse"></div>
    ),
    ssr: false,
  }
);
const MerchReviws = () => {
  return (
    <Section bg="bg-[#F5F4EF]">
      <DynamicReviewsSection />
    </Section>
  );
};

export default MerchReviws;

import MoreQuestions from "@/components/MoreQuestions";
import React from "react";


export const metadata = {
  title: "ED Medication Services Across Canada | Rocky",
  description:
    "Access ED medications online with discreet delivery across Canada. Professional consultation and prescription services for Viagra and Cialis.",
  openGraph: {
    title: "ED Medication Services Across Canada | Rocky",
  description:
    "Access ED medications online with discreet delivery across Canada. Professional consultation and prescription services for Viagra and Cialis.",
 images:
      "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Rocky-TM_upscayl_2x.webp",
  },
  twitter: {
    card: "ED Medication Services Across Canada | Rocky",
    title: "ED Medication Services Across Canada | Rocky",
  description:
    "Access ED medications online with discreet delivery across Canada. Professional consultation and prescription services for Viagra and Cialis.",
 images:
      "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Rocky-TM_upscayl_2x.webp",
  },
};

export default function ServiceLayout({ children }) {
  return (
    <>
      {children}
      <div className="max-w-[1184px] mx-auto px-5 pb-8 md:pb-12 md:px-0">
        <MoreQuestions
          title="Your path to better health begins here."
          buttonText="Get Started For Free"
          link="/faqs"
        />
      </div>
    </>
  );
}

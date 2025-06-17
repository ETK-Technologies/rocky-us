import React from "react";


export const metadata = {
  title: "Rocky | Expert Insights on Health & Wellness",
  description:
    "Explore our collection of informative podcasts covering health, wellness, and lifestyle topics. Listen to expert discussions and stay updated with the latest trends.",
  openGraph: {
    title: "Rocky | Expert Insights on Health & Wellness",
    description:
    "Explore our collection of informative podcasts covering health, wellness, and lifestyle topics. Listen to expert discussions and stay updated with the latest trends.",
    images:
      "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Rocky-TM_upscayl_2x.webp",
  },
  twitter: {
    card: "Rocky | Expert Insights on Health & Wellness",
    title: "Rocky | Expert Insights on Health & Wellness",
    description:
      "Explore our collection of informative podcasts covering health, wellness, and lifestyle topics. Listen to expert discussions and stay updated with the latest trends.",
   images:
      "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Rocky-TM_upscayl_2x.webp",
  },
};

export default function PodcastLayout({ children }) {
  return <>{children}</>;
}

// Minimal layout for flows
// Simplified to avoid duplication with template components

export const metadata = {
  title: "Rocky - Your Health Partner",
  description: "Get professional healthcare advice and treatment online",
  openGraph: {
    title: "Rocky - Your Health Partner",
    description: "Get professional healthcare advice and treatment online",
    images: "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Rocky-TM_upscayl_2x.webp",
  },
  twitter: {
    card: "Get professional healthcare advice and treatment online",
    title: "Rocky - Your Health Partner",
    description: "Get professional healthcare advice and treatment online",
    images: "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Rocky-TM_upscayl_2x.webp",
  },
};

export default function FlowsLayout({ children }) {
  return <>{children}</>;
}

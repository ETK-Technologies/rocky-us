import "./globals.css";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import LoadingOverlay from "@/components/utils/LoadingBar";
import CacheClearer from "@/components/utils/CacheClearer";
import CronHitHandler from "@/components/utils/CronHitHandler";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";
import ClientLayoutProvider from "@/components/Layout/ClientLayoutProvider";
import LayoutDetector from "@/components/Layout/LayoutDetector";
import Tracker from "@/components/Tracker";
import { VisiOptProvider } from "@/components/VisiOpt";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Configure Google font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Configure local fonts
const fellixMedium = localFont({
  src: "../fonts/Fellix-Medium.woff",
  variable: "--font-fellix",
  display: "swap",
});

const fellixSemiBold = localFont({
  src: "../fonts/Fellix-SemiBold.woff",
  variable: "--font-fellix-bold",
  display: "swap",
});

// export const metadata = {
//   title: "Rocky - Your Health Partner",
//   description: "Get professional healthcare advice and treatment online",
//   openGraph: {
//     title: "Rocky - Your Health Partner",
//     description: "Get professional healthcare advice and treatment online",
//     images:
//       "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Rocky-TM_upscayl_2x.webp",
//   },
//   twitter: {
//     card: "Get professional healthcare advice and treatment online",
//     title: "Rocky - Your Health Partner",
//     description: "Get professional healthcare advice and treatment online",
//     images:
//       "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Rocky-TM_upscayl_2x.webp",
//   },
// };
export const metadata = {
  title: "Rocky - Your Health Partner",
  description: "Get professional healthcare advice and treatment online",
  openGraph: {
    title: "Rocky - Your Health Partner",
    description: "Get professional healthcare advice and treatment online",
    siteName: "Rocky Health",
    images: [
      {
        url: "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Rocky-TM_upscayl_2x.webp",
        width: 1200,
        height: 630,
        alt: "Rocky - Your Health Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rocky - Your Health Partner",
    description: "Get professional healthcare advice and treatment online",
    images: [
      "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Rocky.webp",
    ],
  },
};
export default async function RootLayout({ children }) {
  // Layout detection is now handled client-side by LayoutDetector component
  // This prevents dynamic server usage error for static routes like /product/[slug]

  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager - Changed to beforeInteractive for earlier loading */}
        {
          <Script id="google-tag-manager" strategy="beforeInteractive">
            {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K9PC394B');
          `}
          </Script>
        }
        {/* End Google Tag Manager */}
        {/* Start Facebooc Domain Verification */}
        <meta
          name="facebook-domain-verification"
          content="uvvbdeqdbj046v74x0oqaxhl9tyq26"
        />
        {/* End Facebooc Domain Verification */}
        {/* Start Convert Experiences */}
        <Script
          id="convert-experiences"
          strategy="beforeInteractive"
          src="//cdn-4.convertexperiments.com/v1/js/10045956-10046753.js?environment=production"
        />
        {/* End Convert Experiences */}
        {/* <Tracker /> */}
      </head>
      <body
        className={`${poppins.variable} ${fellixMedium.variable} ${fellixSemiBold.variable}`}
        suppressHydrationWarning={true}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K9PC394B"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */} <CacheClearer />
        <LoadingOverlay />
        <CronHitHandler />
        <LayoutDetector />
        <Navbar className="navbar-main" />
        <ClientLayoutProvider>{children}</ClientLayoutProvider>
        <Footer className="footer-main" />
        <ToastContainer position="top-right" autoClose={5000} />
        {/* VisiOpt Scripts Provider - Automatically loads the right scripts based on page and URL parameters */}
        <VisiOptProvider />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

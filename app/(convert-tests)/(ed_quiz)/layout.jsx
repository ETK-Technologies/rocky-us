import FBPixelLoader from "@/components/FBPixelLoader";
import "../../globals.css";

import Footer2 from "@/components/convert_test/BO3/Footer2";
import LoadingOverlay from "@/components/utils/LoadingBar";
import EdNavbar from "@/components/PreLanders/EdNavbar";
import { Header } from "@/components/PreLanders/ed-5";
import HeaderProudPartner from "@/components/Navbar/HeaderProudPartner";

export const metadata = {
  title: "Body Optimization & Weight Management | Rocky",
  description:
    "Discover personalized body optimization and weight management solutions with Rocky. Professional healthcare advice and effective treatments delivered across Canada.",
  openGraph: {
    title: "Body Optimization & Weight Management | Rocky",
    description:
      "Discover personalized body optimization and weight management solutions with Rocky. Professional healthcare advice and effective treatments delivered across Canada.",
    images:
      "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/my-rocky-black.webp",
  },
  twitter: {
    card: "Body Optimization & Weight Management | Rocky",
    title: "Body Optimization & Weight Management | Rocky",
    description:
      "Discover personalized body optimization and weight management solutions with Rocky. Professional healthcare advice and effective treatments delivered across Canada.",
    images:
      "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/my-rocky-black.webp",
  },
};

export default function CTQuizLayout({ children }) {
  return (
    <>
      <div className="sticky top-0 z-50 bg-white pb-2">
        <FBPixelLoader />
        <LoadingOverlay />
        <EdNavbar />
        <HeaderProudPartner />
        <Header />
      </div>
      {children}
      <Footer2></Footer2>
    </>
  );
}

import "../../globals.css";

import Navbar from "@/components/Navbar";
import Footer2 from "@/components/convert_test/BO3/Footer2";


export const metadata = {
  title: "Body Optimization & Weight Management | Rocky",
  description: "Discover personalized body optimization and weight management solutions with Rocky. Professional healthcare advice and effective treatments delivered across Canada.",
  openGraph: {
    title: "Body Optimization & Weight Management | Rocky",
    description: "Discover personalized body optimization and weight management solutions with Rocky. Professional healthcare advice and effective treatments delivered across Canada.",  
    images: "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Rocky-TM_upscayl_2x.webp",
  },
  twitter: {
    card: "Body Optimization & Weight Management | Rocky",
    title: "Body Optimization & Weight Management | Rocky",
    description: "Discover personalized body optimization and weight management solutions with Rocky. Professional healthcare advice and effective treatments delivered across Canada.",  
    images: "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/Rocky-TM_upscayl_2x.webp",
  },
};


export default function CTLayout({ children }) {
  return (
    <>
     <Navbar />
      {children}
     <Footer2></Footer2>
    </>
  );
}
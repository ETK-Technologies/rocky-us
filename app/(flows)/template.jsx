// Template for flows that works within the root layout structure
// This adapts to work within the existing HTML structure

import { Inter } from "next/font/google";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "@/components/utils/LoadingBar";

const inter = Inter({ subsets: ["latin"] });

export default function FlowsTemplate({ children }) {
  return (
    <div className="flows-template">
      <LoadingOverlay />
      {children}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

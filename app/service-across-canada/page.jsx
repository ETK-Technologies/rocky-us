import React from "react";
import ServicesAcrossCanada from "@/components/service-across-canada/ServicesAcrossCanada";
import { cities } from "@/lib/constants/cities";

const ServicesAcrossCanadaPage = () => {
  return <ServicesAcrossCanada cities={cities} />;
};

export default ServicesAcrossCanadaPage;

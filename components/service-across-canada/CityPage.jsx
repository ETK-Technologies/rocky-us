import React from "react";
import Breadcrumb from "./Breadcrumb";
import HeroImage from "./HeroImage";
import CityContent from "./CityContent";
import Sidebar from "./Sidebar";

const CityPage = ({ city, cityInfo }) => {
  const displayCity = city.charAt(0).toUpperCase() + city.slice(1);

  return (
    <main className="max-w-[1184px] mx-auto px-5 pt-8 md:pt-12 md:px-0">
      <Breadcrumb displayCity={displayCity} />

      <h1 className="mb-8 text-2xl font-[550] md:text-6xl headers-font">
        {cityInfo.title}
      </h1>

      <HeroImage />

      <div className="grid grid-cols-1 gap-8 md:gap-24 md:grid-cols-3">
        <CityContent cityInfo={cityInfo} displayCity={displayCity} />
        <Sidebar />
      </div>
    </main>
  );
};

export default CityPage;

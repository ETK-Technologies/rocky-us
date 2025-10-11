"use client";
import Link from "next/link";
import CustomImage from "../utils/CustomImage";

const PopularTreatmentsSection = ({ mostPopular }) => {
  return (
    <div className="py-4 mb-2 px-[24px] md:px-10 bg-white">
              <h3 className="text-[#00000099] mb-4 uppercase font-medium text-xs  md:text-sm tracking-normal align-middle">
                Most Popular Treatments
              </h3>
              <ul className="space-y-4 py-4">
                {mostPopular.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setSelectedTreatment(item)}
                  >
                    <div className="flex flex-col gap-2">
                      <p className="font-medium text-base md:text-xl tracking-normal align-middle leading-[115%]">
                        {item.category}
                      </p>
                      <p className="text-[#00000080] font-normal text-sm md:text-base tracking-normal align-middle leading-[140%]">
                        {item.description}
                      </p>
                    </div>
                    <div className="relative overflow-hidden rounded-[16px] w-[64px] h-[64px] md:w-[80px] md:h-[80px]">
                      <CustomImage src={item.image} alt={item.category} fill />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
  );
};

export default PopularTreatmentsSection;

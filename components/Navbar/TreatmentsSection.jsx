"use client";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const TreatmentsSection = ({ items }) => {
  return (
    <div className="mb-8">
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between items-center">
            <Link href={item.link} className="text-sm text-black font-semibold">
              {item.text}
            </Link>
            <FaArrowRightLong className="text-gray-400" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TreatmentsSection;

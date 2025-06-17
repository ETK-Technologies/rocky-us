import { memo } from "react";
import CheckmarkIcon from "./CheckmarkIcon";

const BenefitItem = memo(({ text, bg="bg-[#00B67A]", textClassName = "text-lg" }) => (
  <div className="flex items-center">
    <div className={`flex-shrink-0 h-6 w-6 rounded-full  flex items-center justify-center mr-4 ` + bg}>
      <CheckmarkIcon />
    </div>
    <span className={textClassName}>{text}</span>
  </div>
));
BenefitItem.displayName = "BenefitItem";

export default BenefitItem;
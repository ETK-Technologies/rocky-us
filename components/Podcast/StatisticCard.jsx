import React from "react";

const StatisticCard = ({
  value,
  title,
  description,
  className,
  valueClassName,
  titleClassName,
  descriptionClassName,
  mobileFirst = false,
}) => {
  return (
    <div className={className}>
      <div
        className={`md:hidden flex flex-col ${
          mobileFirst ? "flex-col" : "flex-col-reverse"
        }`}
      >
        <h2 className={valueClassName}>{value}</h2>
        <h3 className={titleClassName}>{title}</h3>
      </div>

      <div className="hidden md:block">
        <h3 className={titleClassName}>{title}</h3>
        <h2 className={valueClassName}>{value}</h2>
      </div>

      <p className={descriptionClassName}>{description}</p>
    </div>
  );
};

export default StatisticCard;

import FaqItem from "@/components/FaqItem";

const FaqsSection = ({ title, subtitle, faqs, name, isFirstCardOpen }) => {
  return (
    <div className="max-w-[1184px] mx-auto md:px-0 py-14 md:py-24 md:pb-0">
      <h2 className="text-[32px] md:text-[48px] leading-[36.8px] md:leading-[55.2px] max-w-xs lg:max-w-full tracking-[-0.01em] md:tracking-[-0.02em] font-[550] mb-3 md:mb-4 headers-font">
        {title}
      </h2>
      <p className="text-[18px] md:text-[20px] leading-[25.2px] md:leading-[28px] font-[400] mb-[40px] md:mb-[80px]">
        {subtitle}
      </p>

      <div
        className={`mx-auto grid ${
          name ? "md:grid-cols-2 lg:grid-cols-3 gap-[24px] lg:gap-[174px]" : ""
        } items-start`}
      >
        {name && (
          <div>
            <h3 className="text-[20px] md:text-[24px] leading-[23px] md:leading-[27.6px] font-[450] md:pt-4 headers-font">
              {name}
            </h3>
          </div>
        )}
        <div
          className={`${
            name ? "self-start lg:col-span-2" : "mx-auto md:w-3/4"
          }`}
        >
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isFirstCardOpen={isFirstCardOpen}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqsSection;

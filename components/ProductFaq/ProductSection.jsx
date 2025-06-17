import React from "react";
import FAQItem from "./FAQItem";

const ProductSection = ({ title, products, reference }) => {
  return (
    <div ref={reference} className="scroll-mt-24">
      <div className="max-w-[1184px] mx-auto sectionWidth:px-0">
        <h2 className="text-[32px] font-semibold headers-font mb-6 md:mb-14 leading-[140%]">
          {title}
        </h2>

        <div className="w-full">
          {products.map((product) => (
            <div key={product.name} className="mb-12 last:mb-0">
              <h3 className="text-lg md:text-xl font-medium headers-font mb-4 leading-[140%] text-[#AE7E56]">
                {product.name}
              </h3>
              {product.faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;

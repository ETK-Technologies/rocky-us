const CategoryContainer = ({FaqsButton, setSelectedCategory, selectedCategory}) => {
  return (
    <>
      <div className="mb-12 md:mb-24">
        <h2 className="text-[32px] md:text-[48px] leading-[115%] md:leading-[100%] tracking-[-0.01em] md:tracking-[-0.02em] mb-5 md:mb-11 headers-font">
          Your Questions, Answered
        </h2>
        <ul className="flex items-center gap-3 overflow-auto no-scrollbar">
          {FaqsButton.map((faq, index) => (
            <li
              key={index}
              onClick={() => setSelectedCategory(faq)}
              className={`capitalize text-nowrap py-4 px-6 text-[14px] md:text-[16px] leading-[140%] cursor-pointer rounded-[64px] transition-all ${
                selectedCategory === faq
                  ? "bg-black text-white"
                  : "bg-[#0000000A] text-black"
              }`}
            >
              {faq}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CategoryContainer;

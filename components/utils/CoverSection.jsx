const CoverSection = ({ children, bg }) => {
  return (
    <section
      className={`px-5 sectionWidth:px-0 pt-6 pb-14 md:pt-8 md:pb-[96px]  ${bg}`}
    >
      <div className="max-w-[1184px] mx-auto">{children}</div>
    </section>
  );
};

export default CoverSection;

"use client";

const Section = ({ children, bg }) => {
  return (
    <section className={`px-5 sectionWidth:px-0 py-14 md:py-24 ${bg}`}>
      <div className="max-w-[1184px] mx-auto">{children}</div>
    </section>
  );
};

export default Section;

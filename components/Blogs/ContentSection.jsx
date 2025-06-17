const ContentSection = ({ children , ref}) => {
    return (
      <div ref={ref} className="md:px-5 sectionWidth:px-0 pt-14">
        <div className="max-w-[1184px] mx-auto">{children}</div>
      </div>
    );
  };
  
  export default ContentSection;
  
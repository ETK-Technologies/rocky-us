import Shape from "./Shape";

const HolisticSection = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-[#F8F8F7] to-[#EBE3D8] rounded-2xl mt-[32px] p-5 md:p-10 pb-0 md:pb-0 md:h-auto h-[407px]">
        <h1 className="text-[28px] md:text-[40px] leading-[114.99999999999999%] tracking-[-1%] font-[550] mb-[24px]">
          Holistic Approach
        </h1>
        <p className="md:w-[450px] w-[201px] font-[POPPINS] text-[14px] leading-[140%] tracking-[0px] md:text-[16px] ">
          On average, Rocky members lose 2-5x more weight vs. similar programs.
          Our approach goes beyond just treatments – we help you develop habits
          for a healthier, happier you.
        </p>
        <div className="flex items-end md:px-10 md:gap-8 gap-2 mt-20 md:mt-0 relative  md:top-0 top-[-95px] ">
          <Shape height="md:h-[121px] h-[70px]"></Shape>
          <Shape
            height="md:h-[196px] h-[113px]"
            precentage="10–15%"
            text="Treatment-only"
          ></Shape>
          <Shape
            height="md:h-[361px] h-[209px]"
            precentage="15–25%"
            textColor="text-white"
            precentColor="text-[#FFFFFFE5]"
            bg="bg-gradient-to-b from-[#AE7E56] to-[#2F1D04]"
            text="Lifestyle + treatment + support"
            showLogo={true}
          ></Shape>
        </div>
      </div>
    </>
  );
};

export default HolisticSection;

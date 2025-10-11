import CustomImage from "@/components/utils/CustomImage";

const ProductSlider = ({ products }) => {
  return (
    <div className="px-5 py-8">
      <div className="max-w-[1184px] mx-auto relative overflow-hidden w-full  py-10 ">
        <div className="md:hidden bg-[linear-gradient(270deg,rgba(255,255,255,0)_0%,#ffffff_100%)] absolute -right-[5px] md:right-0 top-[85px] w-[80px] h-[39px] z-10 rotate-[180deg]"></div>
        <div className="md:hidden bg-[linear-gradient(270deg,rgba(255,255,255,0)_0%,#ffffff_100%)] absolute -left-[5px] md:left-0 top-[85px] w-[80px] h-[39px] z-10"></div>
        <div className="flex items-center gap-[16px] whitespace-nowrap w-fit  relative animate-scroll">
          {products.concat(products).map((product, index) => (
            <div
              key={index}
              className="flex-shrink-0 min-w-[180px] max-w-[300px]"
            >
              <div className="relative overflow-hidden w-full min-h-[100px] flex justify-center items-center ">
                <CustomImage
                  className="w-[180px] h-[157px] mx-[16px] relative"
                  src={product}
                  fill
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;

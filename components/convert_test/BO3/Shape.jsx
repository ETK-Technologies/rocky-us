import CustomImage from "../../utils/CustomImage";

const Shape = ({
    bg = 'bg-white', 
    height = 'h-[121px]', 
    precentage = '5%', 
    text = 'Diet & exercise only', 
    precentColor = 'text-[#814B00]', 
    textColor = '', 
    showLogo = false
}) => {
  return (
    <>
    
    
      <div className={`graph `+bg +  ` ` + height + `  flex-1 relative rounded-tl-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]  flex items-top pt-2 lg:pt-10  justify-center text-center`}>
          {
          showLogo && (<>
            <p className="text-[20px] lg:text-[32px] text-[#AE7E56] font-bold absolute  top-[-65px] lg:top-[-120px]" >
              2-5X
            </p>
            <p className="text-[12px]  lg:text-[14px] font-bold absolute top-[-40px] lg:top-[-80px]">
              BETTER RESULTS
            </p>
          
          </>)
        }    
        <div>
        
          <h1 className={precentColor + ` font-semibold lg:text-[24px] text-[16] font-[POPPINS] mb-2 `}>{precentage}</h1>
          <p className={`lg:text-[16px] text-[12px] leading-[120%] tracking-[0px] font-[POPPINS] font-medium ` + textColor}>{text}</p>
          
          {showLogo && (<>
            <CustomImage className="relative mx-auto lg:mt-20 mt-[19px]" src="/bo3/white_rocky_logo.png" width="75" height="75" alt="rocky logo"></CustomImage>
          </>)}
          
          
          
        </div>
      </div>
    </>
  );
};

export default Shape;

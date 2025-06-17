import { BenefitItem, PillSlider } from "@/components/PreLanders/ed-5";
import Link from "next/link";
import HolisticSection from "../BO3/HolisticSection";
import ProductSlider from "./ProductSlider";

const GoodNews = () => {

    const Products = [
        '/bo3/p1.png',
        '/bo3/p2.png',
        '/bo3/p3.png',
        '/bo3/p4.png',
        '/bo3/p5.png',
        '/bo3/p6.png',
        '/bo3/p7.png',
    ];

  return (
    <>
      <div  className="mt-16">
        <div id="success-message" className="p-8 rounded-lg bg-white flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-start justify-between">
            <div className="mb-6 md:mb-0 md:mr-8 max-w-1/2">
              <h3 className="text-[32px] lg:text-[48px] leading-[115%] tracking-[-2px]  font-medium  mb-2">
                Good News:
              </h3>
              <p className="text-[32px] lg:text-[48px] font-medium leading-[115%] tracking-[-2px]  text-[#AE7E56]">
                You've got options.
              </p>
            </div>

            <div className="w-full md:w-1/2">
              <div className="space-y-4">
                <BenefitItem bg="bg-[#03A670]" textClassName="font-[POPPINS] font-[550] text-[16px] lg:text-[18px] leadeing-[140%]" text="Free online assessment by a licensed provider" />
                <BenefitItem bg="bg-[#03A670]" textClassName="font-[POPPINS] font-[550] text-[16px] lg:text-[18px] leadeing-[140%]" text="Health Canada Approved medications" />
                <BenefitItem bg="bg-[#03A670]" textClassName="font-[POPPINS] font-[550] text-[16px] lg:text-[18px] leadeing-[140%]" text="Free, discreet shipping if treatment is approved" />
              </div>

              <div className="mt-[27.5px]">
                <Link
                  href="/wl-pre-consultation"
                  className="w-full py-3 px-6 text-[16px] rounded-full text-white bg-[#03A670] hover:bg-[#03A670] leading-[140%] text-base  transition-colors"
                >
                  Find my treatment
                </Link>
                <div className="mt-8 text-[12px] leading-[140%] tracking-[0px] ">
                  *Requires an online consultation with a healthcare provider who will determine if a reatmet is appropriate. 
                </div>
              </div>
            </div>



          </div>
        </div>
         <ProductSlider products={Products} />

       

      </div>
    </>
  );
};

export default GoodNews;

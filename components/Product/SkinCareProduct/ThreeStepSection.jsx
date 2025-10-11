import React from 'react'
import Section from '@/components/utils/Section'
import CustomImage from '@/components/utils/CustomImage'
const ThreeStepSection = () => {
  return (
      <Section>
          <div className="flex flex-col md:flex-row md:gap-[80px] gap-10 justify-center items-center">
              <div className='w-full md:w-[438px] space-y-6 md:space-y-10'>
                  <h2 className="text-[32px] md:text-[48px] headers-font  leading-[115%] tracking-[-2%] headers-font text-black mb-10 md:mb-14">3 Steps to
                      <br className='hidden md:block' />
                      Reverse Acne</h2>
                  <div>
                      <p className="text-[20px] md:text-[24px] headers-font text-black  tracking-[-2%] leading-[115%] mb-4"> Step 1: Wash Your Face</p>
                      <p className="text-[16px] leading-[140%] tracking-[0%] text-[#000000CC] ">Clean your face with a gentle cleanser and pat it dry.</p>
                  </div>
                  <div>
                      <p className="text-[20px] md:text-[24px] headers-font text-black tracking-[-2%] leading-[115%] mb-4">Step 2: Apply With Your Fingertip</p>
                      <p className="text-[16px] leading-[140%] tracking-[0%] text-[#000000CC] ">Put a pea-sized amount on your fingertip and spread a thin layer over the spots. Avoid eyes, mouth, and broken skin.</p>
                  </div>
                  <div>
                      <p className="text-[20px] md:text-[24px] headers-font text-black tracking-[-2%] leading-[115%] mb-4">Step 3: Protect Your Skin</p>
                      <p className="text-[16px] leading-[140%] tracking-[0%] text-[#000000CC] ">Finish with a light moisturizer, and don’t forget sunscreen during the day.</p>
                  </div>
              </div>
              <div className='w-full max-w-[480px] mx-auto md:mx-0 aspect-[3/4] rounded-[16px] overflow-hidden'>
                <CustomImage src="/skin-care-product/theeestep.png" alt="Acne Step" width={480} height={640} className='w-full h-full object-cover' />
              </div>
        </div>
      </Section>
  )
}

export default ThreeStepSection

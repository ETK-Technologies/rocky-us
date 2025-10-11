import React from 'react'
import SkinCareHeroSection from '@/components/SkinCare/SkinCareHeroSection'
import SkincareHighlight from '@/components/SkinCare/SkincareHighlight'
import SkinCareSection from '@/components/SkinCare/SkinCareSection'
import OneStopSkincare from '@/components/SkinCare/OneStopSkincare'
import SkinCareProducts from '@/components/SkinCare/SkinCareProducts'
import TestimonialSlider from '@/components/SkinCare/TestimonialSection'
import VideoSection from '@/components/SkinCare/VideoSection'
import ComparingTable from '@/components/SkinCare/ComparingTable'
import SkincareIntro from '@/components/SkinCare/SkincareIntro'
import PersonalizedSkincare from '@/components/SkinCare/PersonalizedSkincare'
import SkincareTestimonialSlider from '@/components/SkinCare/SkincareTestimonialSlider'

const page = () => {
    return (
        <>
            <SkinCareHeroSection />
            <SkincareHighlight />
            <SkinCareSection />
            <OneStopSkincare />
            <SkinCareProducts />
            <SkincareTestimonialSlider />
            {/* <TestimonialSlider /> */}

            {/* <VideoSection /> */}
            <ComparingTable />
            {/* <SkincareIntro /> */}
            <PersonalizedSkincare />
        </>
    )
}

export default page 
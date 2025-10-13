import React from "react";
import Image from "next/image";

const ProductRecommendationCard = ({ 
  product, 
  onAddToCart, 
  isLoading, 
  onCheckout, 
  isCheckoutLoading 
}) => {

  return (
    <div className="w-full md:w-[335px] mx-auto md:mb-20 px-6 md:px-0">
      {/* Progress Indicator */}
      <div className="progress-indicator mb-2 text-[#A7885A] font-medium">
        <span className="text-sm">Here's what we recommended</span>
      </div>
      <div className="progress-bar-wrapper w-full block h-[8px] my-1 rounded-[10px] bg-gray-200">
        <div
          style={{ width: "100%" }}
          className="progress-bar bg-[#A7885A] rounded-[10px] block float-left h-[8px]"
        ></div>
      </div>

      <div className="product-recommendation-page py-4">
        <div className="quiz-heading-wrapper px-3 mx-auto pt-2 pb-0">
          <h2 className="quiz-heading text-[#AE7E56] text-base text-center">
            Time To Get Growing!
          </h2>
        </div>
        <div className="text-center mt-4 pb-0 text-[32px] headers-font font-[450] leading-[115%] tracking-[-2%] mb-4">We recommend</div>

        <div className="mx-auto w-[335px] mt-4 relative">
          {/* Recommended Banner - positioned behind */}
          <div className="bg-[#AE7E56] text-white text-center w-full py-[2px] px-[8px] rounded-t-2xl h-[35px] relative z-10 " >
            <span className="text-xs font-normal">Recommended</span>
          </div>
          
          {/* Main content area - positioned to overlap the banner */}
          <div className="bg-white  shadow-lg p-6 h-[409px] w-[335px] flex flex-col items-center rounded-2xl relative -mt-[10px] z-20">
            {/* Rating and Trustpilot */}
            <div className="flex justify-between items-center mb-4 w-[220px] h-[20px]">
              <div className="text-black text-[12px] font-medium">
                <span className="font-medium">4.4 out of 5 • Excellent</span>
              </div>
              <Image src="/hair-consultation/trust.png" alt="trustpilot" width={74} height={18} />
            </div>

            {/* Product Image and Guarantee Badge */}
            <div className="relative flex justify-center items-center mb-4 w-full h-[189px]"> 
              <div className="absolute left-[7px] top-0 z-10"> 
                <Image src={product.badge} alt="guarantee" width={72} height={72} />
              </div>
              
              {/* Product Image */}
              <div className="flex justify-center items-center w-[200px] h-[140px]">
                <img
                  src={product.productImage}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div> 

            {/* Product Information */}
            <div className="text-center">
              {/* Product Name */}
              <h3 className="text-[16px] font-medium leading-[140%] tracking-[0%] text-black mb-[2px]">
                {product.pills}
              </h3>
              <p className="text-[12px] font-normal leading-[140%] tracking-[0%] text-[#212121] mb-2">
                {product.name}
              </p>
              <p className="text-[16px] font-medium leading-[140%] tracking-[0%] text-black mb-3">
                ${product.price}
              </p>
              {/* Product Description */}
              <p className="text-[#212121] text-[14px] font-normal leading-[140%] tracking-[0%] mb-3">
                {product.description}
              </p>
              <div className="w-full   rounded-full">
                <span className="w-[116px] px-[8px] border border-[##E2E2E1] text-[12px] font-normal leading-[140%] tracking-[0%] text-[#098C60] bg-[#F7F7F7] rounded-full py-[2px] text-center">Supply available</span>
              </div>
            </div> 
          </div>
        </div>
     {/* Privacy Notice */}
          <p className="text-left mb-5 px-5 md:px-8 text-[10px] text-[#00000059] mt-5 subheaders-font w-[335px] mx-auto">
            We respect your privacy. All of your information is securely
            stored on our PIPEDA Compliant server.
          </p>
          {/* Checkout Button */}
          <div className="fixed bottom-0 w-[335px] md:w-[520px] p-4 bg-white -translate-x-2/4 left-2/4">
            <button
              onClick={onCheckout}
              disabled={isCheckoutLoading}
              className={`w-full py-3 px-6 rounded-full font-medium transition-colors block text-center ${
                isCheckoutLoading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {isCheckoutLoading ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding to Cart...
                </>
              ) : (
                "Get my growth plan now"
              )}
            </button>
            <div className="flex items-center justify-center mt-2 text-sm">
              <img
                src="https://myrocky.b-cdn.net/WP%20Images/Questionnaire/reset.png"
                alt="Guarantee icon"
                className="h-5 w-5 mr-1"
              />
              <span>100% Money Back Guarantee</span>
            </div>
          </div>

          {/* Full-screen loading overlay */}
          {isCheckoutLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]">
              <div className="bg-white rounded-lg p-8 flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
                <p className="text-lg font-medium">Adding items to cart...</p>
                <p className="text-sm text-gray-600 mt-2">Please wait</p>
              </div>
            </div>
          )}
        </div>
      </div>
    
  );
};

export default ProductRecommendationCard;
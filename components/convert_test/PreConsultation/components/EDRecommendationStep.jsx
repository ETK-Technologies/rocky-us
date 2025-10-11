"use client";
import React, { useEffect, useState } from "react";
import { logger } from "@/utils/devLogger";
import { useRouter } from "next/navigation";
import { skincareFlowAddToCart } from "@/utils/flowCartHandler";
import CustomImage from "@/components/utils/CustomImage";
import Loader from "@/components/Loader";

const EDRecommendationStep = ({
  recommended,
  alternatives,
  selectedProduct,
  setSelectedProduct,
  selectedPreference,
  onContinue,
  ProductCard, // Product card component to use
  showAlternatives = true,
  variations = [],
  userData,
  setUserData,
}) => {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const router = useRouter();

  // Privacy text component
  const PrivacyText = () => (
    <p className="text-xs text-[#212121] my-1 md:my-4">
      We respect your privacy. All of your information is securely stored on our
      PIPEDA Compliant server.
    </p>
  );

  useEffect(() => {
    const t = setTimeout(() => {
      setShowLoader(false);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // Auto-select the recommended product
    if (recommended && !selectedProduct) {
      // select the recommended product and merge it into userData
      setSelectedProduct(recommended);

      try {
        // Use functional updater to derive the new userData, then persist it.
        setUserData((prev) => {
          const next = { ...(prev || {}), selected_product: recommended };
          try {
            localStorage.setItem(
              "quiz_and_selected_product",
              JSON.stringify(next)
            );
          } catch (e) {
            // ignore localStorage errors
          }
          return next;
        });
      } catch (e) {
        logger.error("Failed to merge selectedProduct into userData:", e);
      }
    }
  }, [recommended, setSelectedProduct, setUserData]);

  const handleShowMoreOptions = () => {
    if (showMoreOptions) {
      // Reset to recommended product when hiding options
      setSelectedProduct(recommended);
    }
    setShowMoreOptions(!showMoreOptions);
  };

  const onSelectProduct = (product) => {
    setSelectedProduct(product);
    try {
      setUserData((prev) => {
        const next = { ...(prev || {}), selectedProduct: product };
        try {
          localStorage.setItem(
            "quiz_and_selected_product",
            JSON.stringify(next)
          );
        } catch (e) {
          // ignore localStorage errors
        }
        return next;
      });
    } catch (e) {
      logger.error("Failed to merge selectedProduct into userData:", e);
    }
  };

  const isContinueEnabled = selectedProduct !== null;

  if (!recommended) {
    return (
      <div className="w-full md:w-[520px] mx-auto px-5 md:px-0 mt-6">
        <div className="text-center">
          Loading your personalized recommendations...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[520px] mx-auto px-5 md:px-0 flex flex-col min-h-screen relative">
      {/* Full-screen loading overlay */}
      {isCheckoutLoading && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black bg-opacity-30">
          <Loader />
        </div>
      )}

      {showLoader && (
        <div className="fixed inset-0 z-[20000] bg-white flex justify-center items-center">
          <div className="relative w-20 h-20 flex items-center justify-center">
            {/* Rotating dotted ring */}
            <svg
              className="absolute w-24 h-24 animate-[spin_5.5s_linear_infinite]"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#000"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="2 10"
                opacity="0.85"
              />
            </svg>

            {/* Center letter - stays still while ring spins */}
            <div className="relative text-2xl font-bold text-black">
              <CustomImage
                src="/convert_test/reloader.png"
                width="30"
                height="30"
              />
            </div>
          </div>
        </div>
      )}
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="w-full md:w-[520px] mx-auto">
          <div className="progress-indicator mb-2 text-[#A7885A] font-medium">
            <span className="text-sm">Here's what we recommended</span>
          </div>
          <div className="progress-bar-wrapper w-full block h-[8px] my-1 rounded-[10px] bg-gray-200">
            <div
              style={{ width: "100%" }}
              className="progress-bar bg-[#A7885A] rounded-[10px] block float-left h-[8px]"
            ></div>
          </div>
        </div>
      </div>

      <div className="flex-grow">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-start text-[#000000] my-6">
          Your treatment plan
        </h2>

        {/* Recommended Product */}
        <div className="mb-6">
          <ProductCard
            product={recommended}
            variations={variations}
            selectedPreference={selectedPreference}
            onSelect={(product) => onSelectProduct(product)}
            isSelected={selectedProduct?.id === recommended?.id}
          />
        </div>

        {/* Alternative Products */}
        {showAlternatives &&
          showMoreOptions &&
          Array.isArray(alternatives) &&
          alternatives.some(Boolean) && (
            <div className="space-y-4 mb-6">
              {alternatives.filter(Boolean).map((product, idx) => (
                <ProductCard
                  key={product?.id ?? `alt-${idx}`}
                  product={product}
                  onSelect={(p) => p && onSelectProduct(p)}
                  isSelected={selectedProduct?.id === product?.id}
                />
              ))}
            </div>
          )}

        {/* Show more/less options button */}
        {showAlternatives &&
          Array.isArray(alternatives) &&
          alternatives.some(Boolean) && (
            <button
              onClick={handleShowMoreOptions}
              className="w-full py-3 px-8 rounded-full border border-gray-300 text-black font-medium bg-transparent mb-6"
            >
              {showMoreOptions ? "Show less options" : "Show more options"}
            </button>
          )}

        {/* Privacy text */}
        <PrivacyText />
      </div>

      {/* Continue Button */}
      {/* <div className="sticky bottom-0 py-4 z-30">
        <button
          className={`w-full py-3 rounded-full font-medium ${
            isContinueEnabled
              ? "bg-black text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={isContinueEnabled ? handleCheckout : null}
          disabled={!isContinueEnabled || isCheckoutLoading}
        >
          {isCheckoutLoading
            ? "Processing..."
            : `Proceed - ${selectedProduct?.price || ""} →`}
        </button>
      </div> */}
    </div>
  );
};

export default EDRecommendationStep;

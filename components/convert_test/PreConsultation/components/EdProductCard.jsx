"use client";

import { useState, useEffect } from "react";
import { logger } from "@/utils/devLogger";
import { useRouter } from "next/navigation";

import { getDosageSelection } from "@/utils/dosageCookieManager";
;

import BrandGenericModal from "@/components/EDPlans/BrandGenericModal";

import CrossSellModal from "@/components/EDPlans/CrossSellModal";
import CustomContainImage from "@/components/utils/CustomContainImage";
import DosageSelectionModal from "@/components/EDPlans/DosageSelectionModal";
import { emptyCart } from "@/lib/cart/cartService";
import Loader from "@/components/Loader";
import { trackTikTokCustomEvent } from "@/utils/tiktokEvents";

// State management for user selections
const EdProductCard = ({ product, selectedPreference }) => {
  // derive a safe default frequency from the product data (fallback to monthly-supply)
  const defaultFrequency =
    Object.keys(product.frequencies || {})[0] || "monthly-supply";

  // derive a safe default pill option for that frequency (prefer index 1 when available)
  const defaultPillOptions =
    (product.pillOptions && product.pillOptions[defaultFrequency]) || [];
  const defaultPillIndex = defaultPillOptions.length > 1 ? 1 : 0;
  const defaultPill =
    defaultPillOptions[defaultPillIndex] || defaultPillOptions[0] || {};

  const [activePreference, setActivePreference] = useState(
    selectedPreference || product.preferences[0]
  );
  const [activeFrequency, setActiveFrequency] = useState(defaultFrequency);
  const [selectedPillOption, setSelectedPillOption] = useState(defaultPill);

  // State for modals
  const [brandModalOpen, setBrandModalOpen] = useState(false);
  const [dosageModalOpen, setDosageModalOpen] = useState(false);
  const [crossSellModalOpen, setCrossSellModalOpen] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const router = useRouter();

  // Initialize selectedDose from cookie if available
  const [selectedDose, setSelectedDose] = useState(() => {
    if (product?.id) {
      const savedDose = getDosageSelection(product.id.toString());
      if (savedDose) return savedDose;
    }
    // Default dose based on product name
    return product.name === "Viagra"
      ? "50mg"
      : product.name === "Cialis + Viagra"
      ? "10/50mg"
      : "10mg";
  });

  // Calculate current price based on preferences
  const currentPrice =
    activePreference === "brand"
      ? selectedPillOption.brandPrice
      : selectedPillOption.genericPrice;

  // Handle frequency change
  const handleFrequencyChange = (frequency) => {
    setActiveFrequency(frequency);
    // Select a safe default pill option for the new frequency (prefer index 1 if it exists)
    const opts = (product.pillOptions && product.pillOptions[frequency]) || [];
    const idx = opts.length > 1 ? 1 : 0;
    setSelectedPillOption(opts[idx] || {});
  };

  // Handle pill option selection
  const handlePillOptionSelect = (option) => {
    setSelectedPillOption(option);
  };

  // Handle preference change (generic vs brand)
  const handlePreferenceChange = (preference) => {
    setActivePreference(preference);
  };

  // Product ID mapping based on product type and selections
  const getProductIDs = () => {
    // Get the variationId based on preference (generic or brand)
    const variationId =
      activePreference === "brand" && selectedPillOption.brandVariationId
        ? selectedPillOption.brandVariationId
        : selectedPillOption.variationId;

    // If the product is the variety pack, it might have multiple product IDs
    if (product.name === "Cialis + Viagra") {
      // Return the full variationId string for variety pack
      return variationId;
    }

    return variationId;
  };

  // Get the checkout URL with proper product IDs
  const getCheckoutUrl = () => {
    // Check if we have an authToken in cookies - indicating user is logged in
    // Only access document on the client side
    const hasAuthToken =
      typeof window !== "undefined"
        ? document.cookie.includes("authToken=")
        : false;

    // Get the proper product ID(s)
    const productIds = getProductIDs();

    // If user is logged in, send directly to checkout with the product
    if (hasAuthToken) {
      return `/checkout?ed-flow=1&onboarding-add-to-cart=${productIds}`;
    }

    // Otherwise, use the login-register flow
    return `/checkout/?ed-flow=1&onboarding=1&view=account&viewshow=login&onboarding-add-to-cart=${productIds}&redirect_to=/checkout`;
  };

  // Handle product selection
  const handleProductSelect = () => {
    // If brand is selected, show the brand modal first
    if (activePreference === "brand" && product.name !== "Chewalis") {
      setBrandModalOpen(true);
    } else {
      // Otherwise, go straight to dosage selection

      setDosageModalOpen(true);
    }
  };

  // Handle brand modal actions
  const handleSwitchToGeneric = () => {
    setActivePreference("generic");
    setBrandModalOpen(false);
    setDosageModalOpen(true);
  };

  const handleContinueWithBrand = () => {
    setBrandModalOpen(false);
    setDosageModalOpen(true);
  };

  const handleDosageContinue = async () => {
    setDosageModalOpen(false);

    handleCheckout();
  };

  // Prepare selected product data for checkout
  const selectedProductData = {
    name: product.name,
    activeIngredient: product.activeIngredient,
    preference: activePreference,
    frequency: activeFrequency,
    pills: selectedPillOption.count,
    price: currentPrice,
    image: product.image,
    dosage: selectedDose,
    checkoutUrl: getCheckoutUrl(),
    productIds: getProductIDs(),
  };

  // pill options for the currently active frequency (safe access)
  const pillOptionsForActive =
    (product.pillOptions && product.pillOptions[activeFrequency]) || [];
  const singlePill = pillOptionsForActive.length === 1;

  // preference and frequency helpers for layout
  const preferenceOptions = product.preferences || [];
  const singlePreference = preferenceOptions.length === 1;
  const frequencyOptions = Object.entries(product.frequencies || {});
  const singleFrequency = frequencyOptions.length === 1;

  // Handle checkout
  const handleCheckout = async (addons = []) => {
    try {
      logger.log("ED checkout with addons:", addons);

      emptyCart();
      // Start loading state
      setIsCheckoutLoading(true);

      // Check if this is a variety pack product (has comma-separated variation IDs)
      const productIds = getProductIDs();
      const isVarietyPack = productIds.includes(",");
      let varietyPackId = null;

      if (isVarietyPack) {
        // Generate a unique variety pack ID for this specific pack
        varietyPackId = `variety_pack_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        logger.log(`Detected variety pack product with ID: ${varietyPackId}`);
      }

      // Create main product data
      const mainProduct = {
        id: productIds,
        name: selectedProductData.name,
        price: selectedProductData.price,
        isSubscription: selectedProductData.frequency === "monthly-supply",
        variationId: productIds,
        isVarietyPack: isVarietyPack,
        varietyPackId: varietyPackId,
        image: selectedProductData.image,
      };

      logger.log("ED main product:", mainProduct);
      logger.log("ED addons:", addons);

      const carToAdd = {
        mainProduct,
        requireConsultation: true,
        varietyPackId: varietyPackId,
      }

      localStorage.setItem("ed_cart_data", JSON.stringify(carToAdd));
     

      if (true) {
        // Close modal and navigate on success
        logger.log("ED checkout successful, redirecting to checkout page");
        setCrossSellModalOpen(false);
        setIsCheckoutLoading(false);
        setTimeout(() => {
          router.push("/almost?ed-flow=1");
        }, 1000);
      } 
    } catch (error) {
      logger.error("Error in ED checkout:", error);
      setIsCheckoutLoading(false);
      alert("There was an issue processing your checkout. Please try again.");
    }
  };

  return (
    <>
      {/* Full-screen loading overlay */}
      {isCheckoutLoading && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black bg-opacity-30">
          <Loader />
        </div>
      )}
      <div className="bg-[#FFFFFF] drop-shadow-md border-[0.5px] border-solid border-[#E2E2E1] shadow-[0px_1px_1px_0px_#E2E2E1] rounded-[16px] p-[16px] md:p-[24px] text-center h-full w-full min-w-[280px] md:min-w-[384px]">
        <p className="text-[18px] font-[500] leading-[115%] mb-[4px]">
          {product.name}
        </p>
        <p className="text-[14px] font-[400] leading-[140%] mb-[4px] text-[#212121]">
          {product.tagline}
        </p>

        <div className="relative overflow-hidden rounded-[16px] w-[248px] h-[140px] md:h-[130px] mx-auto ">
          <CustomContainImage
            src={product.image}
            fill
            alt={product.name}
            priority={true}
            sizes="(max-width: 768px) 248px, 248px"
          />
        </div>

        <div className="min-h-[80px] md:min-h-[60px] flex flex-col items-center justify-center">
          <p className="text-sm font-semibold mt-1 text-[#212121]">
            Active ingredient:{" "}
            <span className="font-base font-normal">
              {product.activeIngredient}
            </span>
          </p>

          <p className="text-sm font-semibold text-[#212121]">
            Available in:{" "}
            <span className="font-base font-normal text-balance">
              {product.strengths.join(" & ")}
            </span>
          </p>
        </div>
        {/* Preference Selection */}
        <>
          <p className="mt-[20px] text-sm md:text-[16px] leading-[140%] font-[500] text-left">
            Select preference
          </p>
          <p className="text-[10px] md:text-[12px] font-[400] leading-[140%] tracking-[-0.01em] md:tracking-[0]  text-left mb-[12px] md:mb-[16px]">
            Generic is as effective as Brand, but costs less.
          </p>
          <div
            className={`flex gap-2 ${singlePreference ? "justify-start" : ""}`}
          >
            {preferenceOptions.map((preference) => (
              <button
                key={preference}
                onClick={() => handlePreferenceChange(preference)}
                className={`border-2 flex-1 border-solid ${
                  activePreference === preference
                    ? "border-[#A55255]"
                    : "border-[#CECECE]"
                } text-black text-center py-1 rounded-[8px] ${
                  singlePreference ? "w-auto px-4" : "w-full"
                } text-sm`}
              >
                {preference.charAt(0).toUpperCase() + preference.slice(1)}
              </button>
            ))}
          </div>
        </>

        {/* Frequency Selection */}
        <p className="mt-4 text-sm md:text-[16px] leading-[140%] font-[500] text-left">
          Select frequency
        </p>
        <div className={`flex gap-2 ${singleFrequency ? "justify-start" : ""}`}>
          {frequencyOptions.map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleFrequencyChange(key)}
              className={`border-2 flex-1 mt-2 border-solid ${
                activeFrequency === key
                  ? "border-[#A55255]"
                  : "border-[#CECECE]"
              } text-black text-center py-1 rounded-[8px] ${
                singleFrequency ? "w-auto px-4" : "w-full"
              } text-sm`}
            >
              {value}
            </button>
          ))}
        </div>

        {/* Pills Selection */}
        <p className="mt-4 mb-2 text-sm md:text-[16px] leading-[140%] font-[500] text-left">
          How many pills?
        </p>
        {/* we have add class names to use in convert_test please do not remove it */}
        <div className={`flex gap-2 ${singlePill ? "justify-start" : ""}`}>
          {pillOptionsForActive.map((option, index) => (
            <button
              key={index}
              onClick={() => handlePillOptionSelect(option)}
              className={`${index === 0 ? "ct-opt-1" : ""} ${
                index === pillOptionsForActive.length - 1
                  ? "ct-opt-last relative"
                  : ""
              } relative border-2 border-solid ${
                selectedPillOption.count === option.count
                  ? "border-[#A55255]"
                  : "border-[#CECECE]"
              } text-black text-center py-1 rounded-[8px] w-full text-sm`}
            >
              {option.count}
            </button>
          ))}
        </div>

        {/* Buy Button */}
        <button
          onClick={handleProductSelect}
          className="bg-black text-white font-semibold text-center py-3 rounded-full mt-6 w-full"
        >
          ${currentPrice} - Select
        </button>

        <p className="text-[10px] md:text-[12px] leading-[140%] font-[400] mt-[8px]">
          *Dose request can be made during questionnaire
        </p>
      </div>

      {/* Modals */}
      <BrandGenericModal
        isOpen={brandModalOpen}
        onClose={() => setBrandModalOpen(false)}
        onSwitchToGeneric={handleSwitchToGeneric}
        onContinueWithBrand={handleContinueWithBrand}
        genericPrice={selectedPillOption.genericPrice}
        brandPrice={selectedPillOption.brandPrice}
      />

      <DosageSelectionModal
        isOpen={dosageModalOpen}
        onClose={() => setDosageModalOpen(false)}
        product={{
          ...product,
          id: getProductIDs(),
        }}
        selectedDose={selectedDose}
        setSelectedDose={setSelectedDose}
        onContinue={handleDosageContinue}
      />

      <CrossSellModal
        isOpen={crossSellModalOpen}
        onClose={() => setCrossSellModalOpen(false)}
        selectedProduct={selectedProductData}
        onCheckout={handleCheckout}
        isLoading={isCheckoutLoading}
      />
    </>
  );
};

export default EdProductCard;

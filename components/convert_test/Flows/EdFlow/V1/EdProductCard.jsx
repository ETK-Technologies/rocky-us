"use client";

import { useState } from "react";
import { logger } from "@/utils/devLogger";
import { useRouter } from "next/navigation";

import { getDosageSelection } from "@/utils/dosageCookieManager";
import { edFlowAddToCart } from "@/utils/flowCartHandler";
import CustomContainImage from "@/components/utils/CustomContainImage";
import BrandGenericModal from "@/components/EDPlans/BrandGenericModal";
import DosageSelectionModal from "@/components/EDPlans/DosageSelectionModal";
import CrossSellModal from "@/components/EDPlans/CrossSellModal";

const EdProductCard = ({ product }) => {
  const router = useRouter();

  // State management for user selections
  const [activePreference, setActivePreference] = useState(
    product.preferences[0]
  );
  const [activeFrequency, setActiveFrequency] = useState("monthly-supply");
  const [selectedPillOption, setSelectedPillOption] = useState(
    product.pillOptions["monthly-supply"][0]
  );

  // State for modals
  const [brandModalOpen, setBrandModalOpen] = useState(false);
  const [dosageModalOpen, setDosageModalOpen] = useState(false);
  const [crossSellModalOpen, setCrossSellModalOpen] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

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
    // Select default pill option for new frequency (first option)
    setSelectedPillOption(product.pillOptions[frequency][0]);
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

  // Handle direct checkout for quick buy (without cross-sell)
  const handleDirectCheckout = async () => {
    try {
      const mainProduct = {
        id: getProductIDs(),
        name: product.name,
        price: currentPrice,
        isSubscription: selectedFrequency === "monthly-supply",
        variationId: getProductIDs(),
      };

      const result = await edFlowAddToCart(mainProduct, [], {
        requireConsultation: true,
      });

      if (result.success) {
        router.push(result.redirectUrl);
      } else {
        logger.error("Direct checkout failed:", result.error);
        alert("There was an issue processing your checkout. Please try again.");
      }
    } catch (error) {
      logger.error("Error in direct checkout:", error);
      alert("There was an issue processing your checkout. Please try again.");
    }
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

  // Handle dosage selection
  const handleDosageContinue = () => {
    setDosageModalOpen(false);
    setCrossSellModalOpen(true);
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
    productIds: getProductIDs(),
  };

  // Handle checkout
  const handleCheckout = async (addons = []) => {
    try {
      logger.log("ED checkout with addons:", addons);

      // Start loading state
      setIsCheckoutLoading(true);

      // Check if this is a variety pack product (has comma-separated variation IDs)
      const productIds = selectedProductData.productIds;
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
        id: selectedProductData.productIds,
        name: selectedProductData.name,
        price: selectedProductData.price,
        isSubscription: selectedProductData.frequency === "monthly-supply",
        variationId: selectedProductData.productIds,
        isVarietyPack: isVarietyPack,
        varietyPackId: varietyPackId,
      };

      logger.log("ED main product:", mainProduct);
      logger.log("ED addons:", addons);

      // Use the new direct cart handler
      const result = await edFlowAddToCart(mainProduct, addons, {
        requireConsultation: true,
        varietyPackId: varietyPackId,
      });

      if (result.success) {
        // Close modal and redirect on success
        setCrossSellModalOpen(false);
        setIsCheckoutLoading(false);
        router.push(result.redirectUrl);
      } else {
        logger.error("ED checkout failed:", result.error);
        setIsCheckoutLoading(false);
        alert("There was an issue processing your checkout. Please try again.");
      }
    } catch (error) {
      logger.error("Error in ED checkout:", error);
      setIsCheckoutLoading(false);
      alert("There was an issue processing your checkout. Please try again.");
    }
  };

  return (
    <>
      <div className="bg-gradient-to-b from-[#ffffff00] to-[#f3f2ed] border-[0.5px] border-solid border-[#E2E2E1] shadow-[0px_1px_1px_0px_#E2E2E1] rounded-[16px] p-[16px] md:p-[24px] text-center h-full w-full min-w-[280px] md:min-w-[384px]">
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

        <div className="min-h-[80px] md:min-h-[60px] max-w-[300px]">
          <p className="text-sm font-semibold mt-6 text-[#212121]">
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
        {product.preferences.length > 1 ? (
          <>
            <p className="mt-[24px] text-[14px] leading-[140%] font-[500] text-left">
              Select preference
            </p>
            <p className="text-[10px] md:text-[12px] font-[400] leading-[140%] tracking-[-0.01em] md:tracking-[0]  text-left mb-[12px] md:mb-[16px]">
              Generic is as effective as Brand, but costs less.
            </p>
            <div className="flex gap-2">
              {product.preferences.map((preference) => (
                <button
                  key={preference}
                  onClick={() => handlePreferenceChange(preference)}
                  className={`border-2 border-solid ${
                    activePreference === preference
                      ? "border-[#A55255]"
                      : "border-[#CECECE]"
                  } text-black text-center py-1 rounded-[8px] w-full text-sm`}
                >
                  {preference.charAt(0).toUpperCase() + preference.slice(1)}
                </button>
              ))}
            </div>
          </>
        ) : (
          /* For Chewalis, show generic-only preference to maintain card height consistency */
          <>
            <p className="mt-[24px] text-[14px] leading-[140%] font-[500] text-left">
              Select preference
            </p>
            <p className="text-[10px] md:text-[12px] font-[400] leading-[140%] tracking-[-0.01em] md:tracking-[0]  text-left mb-[12px] md:mb-[16px]">
              Generic is as effective as Brand, but costs less.
            </p>
            <div className="flex gap-2">
              <button className="border-2 border-solid border-[#A55255] text-black text-center py-1 rounded-[8px] w-full text-sm">
                Generic
              </button>
            </div>
          </>
        )}

        {/* Frequency Selection */}
        <p className="mt-4 font-semibold text-left">Select frequency</p>
        <div className="flex gap-2">
          {Object.entries(product.frequencies).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleFrequencyChange(key)}
              className={`border-2 border-solid ${
                activeFrequency === key
                  ? "border-[#A55255]"
                  : "border-[#CECECE]"
              } text-black text-center py-1 rounded-[8px] w-full text-sm`}
            >
              {value}
            </button>
          ))}
        </div>

        {/* Pills Selection */}
        <p className="mt-[12px] md:mt-[16px] mb-[8px] text-[14px] leading-[140%] font-[500] text-left">
          How many pills?
        </p>
        {/* we have add class names to use in convert_test please do not remove it */}
        <div className="flex gap-2">
          {product.pillOptions[activeFrequency].map((option, index) => (
            <button
              key={index}
              onClick={() => handlePillOptionSelect(option)}
              className={`${index === 0 ? "ct-opt-1" : ""} ${
                index === product.pillOptions[activeFrequency].length - 1
                  ? "ct-opt-last relative"
                  : ""
              } relative border-2 border-solid ${
                selectedPillOption.count === option.count
                  ? "border-[#A55255]"
                  : "border-[#CECECE]"
              } text-black text-center py-1 rounded-[8px] w-full text-sm`}
            >
              {index == product.pillOptions[activeFrequency].length - 1 && (
                <div className="h-[14px] w-[62px] rounded-lg bg-[#AE7E56] absolute flex justify-center items-center top-[-8px] inset-0 left-0 right-0 mx-auto">
                  <span className="text-white font-[POPPINS] text-[10px] leading-[140%] font-[500]">
                    Best Value
                  </span>
                </div>
              )}

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
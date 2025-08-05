import React, { useEffect } from "react";
import WLProductCard from "../WLProductCard";

const ProductRecommendationsStep = ({
  products,
  selectedProduct,
  setSelectedProduct,
  showMoreOptions,
  setShowMoreOptions,
  onContinue,
}) => {
  const PrivacyText = () => (
    <p className="text-xs text-[#212121] my-1 md:my-4">
      We respect your privacy. All of your information is securely stored on our
      PIPEDA Compliant server.
    </p>
  );

  useEffect(() => {
    setSelectedProduct(products.OZEMPIC);
  }, []);

  const handleShowMoreOptions = () => {
    if (showMoreOptions) {
      setSelectedProduct(products.OZEMPIC);
    }
    setShowMoreOptions(!showMoreOptions);
  };

  const isContinueEnabled = selectedProduct !== null;

  return (
    <div className="w-full md:w-[520px] mx-auto px-5 md:px-0 flex flex-col min-h-screen">
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
        {/* <div className="text-center mt-4">
          <span className="text-[#A7885A]">We're Done!!</span>
        </div> */}
      </div>
      <div className="flex-grow">
        <h2 className="text-2xl font-semibold text-start text-[#000000] my-6">
          Your treatment plan
        </h2>

        <div className="mb-6">
          <WLProductCard
            product={products.OZEMPIC}
            isRecommended={true}
            onSelect={(product) => setSelectedProduct(product)}
            isSelected={selectedProduct?.name === products.OZEMPIC.name}
          />
        </div>

        {showMoreOptions && (
          <div className="space-y-4 mb-6">
            {/* <WLProductCard
              product={products.OZEMPIC}
              onSelect={(product) => setSelectedProduct(product)}
              isSelected={selectedProduct?.name === products.OZEMPIC.name}
            /> */}
            <WLProductCard
              product={products.WEGOVY}
              onSelect={(product) => setSelectedProduct(product)}
              isSelected={selectedProduct?.name === products.WEGOVY.name}
            />
            <WLProductCard
              product={products.MOUNJARO}
              onSelect={(product) => setSelectedProduct(product)}
              isSelected={selectedProduct?.name === products.MOUNJARO.name}
            />
            <WLProductCard
              product={products.RYBELSUS}
              onSelect={(product) => setSelectedProduct(product)}
              isSelected={selectedProduct?.name === products.RYBELSUS.name}
            />
          </div>
        )}

        <button
          onClick={handleShowMoreOptions}
          className="w-full py-3 px-8 rounded-full border border-gray-300 text-black font-medium bg-transparent mb-6"
        >
          {showMoreOptions ? "Show less options" : "Show more options"}
        </button>
        <PrivacyText />
      </div>

      <div className="sticky bottom-0 py-4 z-30">
        <button
          className={`w-full py-3 rounded-full font-medium ${
            isContinueEnabled
              ? "bg-black text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={isContinueEnabled ? onContinue : null}
          disabled={!isContinueEnabled}
          title={
            !isContinueEnabled ? "Please select a product to continue" : ""
          }
        >
          Proceed - ${selectedProduct?.price || ""} →
        </button>
        {!isContinueEnabled && (
          <p className="text-center text-sm text-red-500 mt-2">
            Please select a product to continue
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductRecommendationsStep;

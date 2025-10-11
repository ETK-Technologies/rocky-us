import React from "react";
import { MaleCrossSellPopup, FemaleCrossSellPopup } from "./CrossSellPopups";

const CrossSellPopupWrapper = ({
  isOpen,
  onClose,
  userData,
  selectedProduct,
  onCheckout,
  initialCartData = null,
}) => {
  // Don't show popup if gender hasn't been loaded yet
  if (!isOpen || !userData.gender) {
    return null;
  }

  // Determine which gender-specific popup to show
  const isMale = userData.gender === "male";

  // Props for both popup types
  const popupProps = {
    isOpen,
    onClose,
    mainProduct: selectedProduct,
    onCheckout,
    selectedProductId: selectedProduct?.id,
    initialCartData,
  };

  // Render the appropriate gender-specific popup
  return isMale ? (
    <MaleCrossSellPopup {...popupProps} />
  ) : (
    <FemaleCrossSellPopup {...popupProps} />
  );
};

export default CrossSellPopupWrapper;

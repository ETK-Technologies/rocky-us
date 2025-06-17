import React from "react";
import { MaleCrossSellPopup, FemaleCrossSellPopup } from "./CrossSellPopups";

const CrossSellPopupWrapper = ({
  isOpen,
  onClose,
  userData,
  selectedProduct,
  onCheckout,
}) => {
  // Determine which gender-specific popup to show
  const isMale = userData.gender === "male";

  // Props for both popup types
  const popupProps = {
    isOpen,
    onClose,
    mainProduct: selectedProduct,
    onCheckout,
    selectedProductId: selectedProduct?.id,
  };

  // Render the appropriate gender-specific popup
  return isMale ? (
    <MaleCrossSellPopup {...popupProps} />
  ) : (
    <FemaleCrossSellPopup {...popupProps} />
  );
};

export default CrossSellPopupWrapper;

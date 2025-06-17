import React from "react";
import HairCrossSellPopup from "./HairCrossSellPopup";

const HairCrossSellPopupWrapper = ({
  isOpen,
  onClose,
  selectedProduct,
  onCheckout,
}) => {
  // Props for popup
  const popupProps = {
    isOpen,
    onClose,
    mainProduct: selectedProduct,
    onCheckout,
  };

  // Render the hair cross-sell popup
  return <HairCrossSellPopup {...popupProps} />;
};

export default HairCrossSellPopupWrapper;

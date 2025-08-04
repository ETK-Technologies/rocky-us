import React from "react";
import CrossSellPopup from "./CrossSellPopupBase";

// Male-specific add-on products
const maleAddOnProducts = [
  {
    id: "353755", // Dad Hat - CORRECT ID
    name: "Rocky Dad Hat",
    price: "29.99",
    imageUrl:
      "https://mycdn.myrocky.ca/wp-content/uploads/20241211132726/Copy-of-RockyHealth-15-scaled.webp",
    bulletPoints: ["One size fits all", "Adjustable strap", "Cotton twill"],
  },
  {
    id: "262914", // Essential T-Boost - WORKING ID from ED flow (changed from 90995)
    name: "Essential T-Boost",
    price: "35.00",
    imageUrl:
      "https://myrocky.b-cdn.net/WP%20Images/Sexual%20Health/webp-images/support-removebg-preview.webp",
    bulletPoints: [
      "Helps improve overall testosterone levels, enhance libido, and promote a sense of well-being.",
      "60 Capsules",
      "30-days supply",
    ],
    description:
      "Helps improve overall testosterone levels, enhance libido, and promote a sense of well-being.",
    dataAddToCart: "262914", // Same as ID for working products
    dataType: "simple", // Not a subscription for WL flow
    quantity: "60 Capsules",
    frequency: "30-days supply",
  },
];

const MaleCrossSellPopup = ({
  isOpen,
  onClose,
  mainProduct,
  onCheckout,
  selectedProductId,
}) => {
  return (
    <CrossSellPopup
      isOpen={isOpen}
      onClose={onClose}
      mainProduct={mainProduct}
      addOnProducts={maleAddOnProducts}
      onCheckout={onCheckout}
      selectedProductId={selectedProductId}
    />
  );
};

export default MaleCrossSellPopup;

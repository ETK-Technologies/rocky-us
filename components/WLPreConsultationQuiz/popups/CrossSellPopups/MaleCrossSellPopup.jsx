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
    id: "90995", // Essential T-Boost - CORRECT ID
    name: "Essential T-Boost",
    price: "35.00",
    imageUrl:
      "https://mycdn.myrocky.ca/wp-content/uploads/20240906120305/Rocky-Health-August-2024-HQ-1-scaled.jpg",
    bulletPoints: [
      "Helps improve overall testosterone levels",
      "Enhances libido",
      "Promotes a sense of well-being",
    ],
    showInfoIcon: true,
    faqContent: `
      <p class="mb-4"><strong>Q: What is Essential T-Boost?</strong><br>
        A: Essential T-Boost is a supplement designed to support healthy testosterone levels in men.</p>
      <p class="mb-4"><strong>Q: How do I take Essential T-Boost?</strong><br>
        A: Take one capsule daily with food, or as directed by your healthcare provider.</p>
      <p class="mb-4"><strong>Q: How long does it take to see results?</strong><br>
        A: While individual results may vary, many users report benefits within 2-4 weeks of consistent use.</p>
    `,
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

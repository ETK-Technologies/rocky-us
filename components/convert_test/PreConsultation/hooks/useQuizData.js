import { useState } from "react";
import { logger } from "@/utils/devLogger";

export const useQuizData = () => {
  const [userData, setUserData] = useState({});
  const [activePopup, setActivePopup] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAction = (action, payload, onContinue) => {
    switch (action) {
      case "showPopup":
        setActivePopup(payload);
        break;
      case "openPopup":
        setActivePopup(payload);
        break;
      case "navigate":
        // This will be handled by the composed hook
        break;
      case "continue":
        setActivePopup(null);
        onContinue();
        break;
      default:
        logger.log("Unknown action:", action, payload);
    }
  };

  const closePopup = () => {
    setActivePopup(null);
  };

  const handleRecommendationContinue = () => {
    logger.log("🛒 Proceeding with selected product:", selectedProduct);

    setUserData((prev) => ({
      ...prev,
      selectedProduct: selectedProduct,
    }));

    // Navigation will be handled by the composed hook
  };

  return {
    userData,
    setUserData,
    activePopup,
    selectedProduct,
    setSelectedProduct,
    handleAction,
    closePopup,
    handleRecommendationContinue,
  };
};

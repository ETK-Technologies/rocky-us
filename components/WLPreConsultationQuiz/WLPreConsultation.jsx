"use client";

import React, { useState, useEffect } from "react";
import QuestionnaireNavbar from "../EdQuestionnaire/QuestionnaireNavbar";
import { ProgressBar } from "../EdQuestionnaire/ProgressBar";
import { useProductsWithAvailability } from "./productData";
import { stepConfig, determineRecommendedProduct } from "./utils/stepUtils";

// Import Step Components
import BMICalculatorStep from "./steps/BMICalculatorStep";
import MedicalConditionsStep from "./steps/MedicalConditionsStep";
import MedicationsStep from "./steps/MedicationsStep";
import EatingDisorderStep from "./steps/EatingDisorderStep";
import PregnancyStep from "./steps/PregnancyStep";
import NeedlePreferenceStep from "./steps/NeedlePreferenceStep";
import ProductRecommendationsStep from "./steps/ProductRecommendationsStep";

// Import Popup Components
import WarningPopupWrapper from "./popups/WarningPopupWrapper";
import CrossSellPopupWrapper from "./popups/CrossSellPopupWrapper";

const WeightQuestionnaire = () => {
  // Core navigation state
  const [currentPage, setCurrentPage] = useState(1);
  const [progressPercent, setProgressPercent] = useState(20);

  // Products data
  const { products: PRODUCTS, loading: productsLoading } =
    useProductsWithAvailability();

  // User data state
  const [userData, setUserData] = useState({
    height: { feet: 5, inches: 3 },
    weight: "",
    bmi: 0,
    weightDuration: "",
    weightGoal: "",
    province: "",
    dateOfBirth: "",
    selectedWeightGoalText: "16-50 lbs",
    gender: "male",
    needlePreference: "",
  });

  // Product selection state
  const [productState, setProductState] = useState({
    recommended: null,
    alternatives: [],
    selected: null,
    showMoreOptions: false,
  });

  // Popup visibility state
  const [popups, setPopups] = useState({
    bmi: false,
    medicalCondition: false,
    medication: false,
    eatingDisorder: false,
    pregnancy: false,
    rybelsus: false,
  });

  // Validation state
  const [validationState, setValidationState] = useState({
    bmiContinueEnabled: false,
    provinceContinueEnabled: false,
    dobContinueEnabled: false,
    isAcknowledged: true,
  });

  // For cross-sell popup
  const [showCrossSellPopup, setShowCrossSellPopup] = useState(false);

  useEffect(() => {
    checkFinalStep();
    fetchUserGender();
  }, []);

  // Fetch user gender from API
  const fetchUserGender = async () => {
    try {
      // before we fetch user meta data we have to check if user Authenticate or not .. it shows error

      // Fetch user data from API
      const response = await fetch("/api/user-meta");

      if (!response.ok) {
        console.error("Failed to fetch user metadata");
        return;
      }

      const userData = await response.json();

      // Update gender from user metadata
      if (userData && userData.gender) {
        setUserData((prevData) => ({
          ...prevData,
          gender: userData.gender.toLowerCase(),
        }));
      }
    } catch (error) {
      console.error("Error fetching user gender:", error);
    }
  };

  // Check if we need to show the final step
  const checkFinalStep = () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("step") && urlParams.get("step") === "final") {
      setCurrentPage(7);
      urlParams.delete("step");
      const newUrl =
        window.location.pathname +
        (urlParams.toString() ? "?" + urlParams.toString() : "");
      window.history.replaceState({}, "", newUrl);
    }
  };

  // Handle step navigation
  const goToStep = (step) => {
    setCurrentPage(step);
    updateProgressBar(step);
  };

  // Update progress bar based on current step
  const updateProgressBar = (step) => {
    setProgressPercent(stepConfig.progressMap[step] || 0);
  };

  // Handle back button click
  const handleBackClick = () => {
    const prevStep = stepConfig.previousStep[currentPage] || 1;
    goToStep(prevStep);
  };

  // BMI Step Handlers
  const handleBMIContinue = () => {
    if (userData.bmi >= 27) {
      const quizData = {
        weightPounds: userData.weight,
        feetValue: userData.height.feet,
        inchesValue: userData.height.inches,
        bmi_result: userData.bmi,
      };
      localStorage.setItem("wl_pre_quiz_data", JSON.stringify(quizData));
      goToStep(2);
    } else {
      setPopups((prev) => ({ ...prev, bmi: true }));
    }
  };

  // Medical Conditions Step Handler
  const handleMedicalConditionSelect = (condition) => {
    const existingData = JSON.parse(
      localStorage.getItem("wl_pre_quiz_data") || "{}"
    );
    const updatedData = {
      ...existingData,
      pre_quiz_q1: condition,
    };
    localStorage.setItem("wl_pre_quiz_data", JSON.stringify(updatedData));

    if (condition === "None of these apply to me") {
      goToStep(3);
    } else {
      setPopups((prev) => ({ ...prev, medicalCondition: true }));
    }
  };

  // Medications Step Handler
  const handleMedicationSelect = (medication) => {
    const existingData = JSON.parse(
      localStorage.getItem("wl_pre_quiz_data") || "{}"
    );
    const updatedData = {
      ...existingData,
      pre_quiz_q2: medication,
    };
    localStorage.setItem("wl_pre_quiz_data", JSON.stringify(updatedData));

    if (medication === "None of the above") {
      goToStep(4);
    } else {
      setPopups((prev) => ({ ...prev, medication: true }));
    }
  };

  // Eating Disorder Step Handler
  const handleEatingDisorderSelect = (option) => {
    const existingData = JSON.parse(
      localStorage.getItem("wl_pre_quiz_data") || "{}"
    );
    const updatedData = {
      ...existingData,
      pre_quiz_q3: option,
    };
    localStorage.setItem("wl_pre_quiz_data", JSON.stringify(updatedData));

    if (option === "No") {
      goToStep(5);
    } else {
      setPopups((prev) => ({ ...prev, eatingDisorder: true }));
    }
  };

  // Pregnancy Step Handler
  const handlePregnancySelect = (option) => {
    const existingData = JSON.parse(
      localStorage.getItem("wl_pre_quiz_data") || "{}"
    );
    const updatedData = {
      ...existingData,
      pre_quiz_q4: option,
    };
    localStorage.setItem("wl_pre_quiz_data", JSON.stringify(updatedData));

    if (option === "None of the above") {
      goToStep(6);
    } else {
      setPopups((prev) => ({ ...prev, pregnancy: true }));
    }
  };
    
  const handleNeedlePreferenceSelect = (option) => {
    setUserData((prev) => ({ ...prev, needlePreference: option }));

    const existingData = JSON.parse(
      localStorage.getItem("wl_pre_quiz_data") || "{}"
    );
    const updatedData = {
      ...existingData,
      "wl-pew-6": option,
      pre_quiz_q5: option,
    };
    localStorage.setItem("wl_pre_quiz_data", JSON.stringify(updatedData));

    goToStep(7);
  };

  // Product Selection Handlers
  const handleProductSelect = (product) => {
    setProductState((prev) => ({ ...prev, selected: product }));
  };

  const handleContinueClick = () => {
    if (productState.selected?.name === "Rybelsus") {
      setPopups((prev) => ({ ...prev, rybelsus: true }));
    } else {
      // Show cross-sell popup instead of going directly to the next step
      setShowCrossSellPopup(true);
    }
  };

  // Handle checkout from cross-sell popup
  const handleCheckout = (checkoutUrl) => {
    setShowCrossSellPopup(false);

    // The direct checkout handling will now be managed by the CrossSellPopupBase component
    // using the enhanced addToCartAndRedirect function with the "wl" flow type
  };

  // Popup Action Handlers
  const handleRybelusPopupAction = (choice) => {
    if (choice === "choose-for-me") {
      setProductState((prev) => ({ ...prev, selected: PRODUCTS.OZEMPIC }));
      setPopups((prev) => ({ ...prev, rybelsus: false }));
      setShowCrossSellPopup(true);
    } else if (choice === "continue-with-rybelsus") {
      setPopups((prev) => ({ ...prev, rybelsus: false }));
      setShowCrossSellPopup(true);
    }
  };
  
  // Calculate progress for progress bar
  const maxPage = 7;
  const progress = Math.max(10, Math.ceil((currentPage / maxPage) * 100));

  // Render current step based on currentPage
  const renderCurrentStep = () => {
    switch (currentPage) {
      case 1:
        return (
          <BMICalculatorStep
            userData={userData}
            setUserData={setUserData}
            validationState={validationState}
            setValidationState={setValidationState}
            onContinue={handleBMIContinue}
          />
        );
      case 2:
        return (
          <MedicalConditionsStep
            onConditionSelect={handleMedicalConditionSelect}
          />
        );
      case 3:
        return <MedicationsStep onMedicationSelect={handleMedicationSelect} />;
      case 4:
        return (
          <EatingDisorderStep onOptionSelect={handleEatingDisorderSelect} />
        );
      case 5:
        return <PregnancyStep onOptionSelect={handlePregnancySelect} />;
      case 6:
        return (
          <NeedlePreferenceStep onOptionSelect={handleNeedlePreferenceSelect} />
        );
      case 7:
        return (
          <ProductRecommendationsStep
            products={PRODUCTS}
            selectedProduct={productState.selected}
            setSelectedProduct={handleProductSelect}
            showMoreOptions={productState.showMoreOptions}
            setShowMoreOptions={(value) =>
              setProductState((prev) => ({ ...prev, showMoreOptions: value }))
            }
            onContinue={handleContinueClick}
          />
        );
      default:
        return null;
    }
  };

  // Format product data for the cross-sell popup
  const formatProductForPopup = (product) => {
    if (!product) return null;

    // Ensure the product ID is properly included
    return {
      ...product,
      id: product.id, // Ensure ID is explicitly included
      imageUrl: product.url, // Map 'url' property to 'imageUrl' for the popup component
    };
  };

  return (
    <div className="flex flex-col min-h-screen bg-white subheaders-font font-medium">
      <QuestionnaireNavbar
        onBackClick={handleBackClick}
        currentPage={currentPage}
      />
      {currentPage !== 7 && <ProgressBar progress={progress} />}
      <div className="quiz-page-wrapper relative w-full md:w-[520px] mx-auto bg-[#FFFFFF] !min-h-fit">
        {renderCurrentStep()}
      </div>

      {/* Warning Popups */}
      <WarningPopupWrapper
        popups={popups}
        setPopups={setPopups}
        onPopupActions={{
          rybelusAction: handleRybelusPopupAction,
        }}
        currentPage={currentPage}
      />

      {/* Cross-Sell Popup */}
      {showCrossSellPopup && (
        <CrossSellPopupWrapper
          isOpen={showCrossSellPopup}
          userData={userData}
          selectedProduct={formatProductForPopup(productState.selected)}
          onCheckout={handleCheckout}
          onClose={() => setShowCrossSellPopup(false)}
        />
      )}

      {/* Styles */}
      <style jsx>{`
        @keyframes fade-out {
          0% {
            opacity: 1;
            transform: translateX(0);
          }

          100% {
            opacity: 0;
            transform: translateX(-100vw);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateX(100vw);
          }

          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .fade-out {
          animation: fade-out ease-in 250ms forwards;
        }

        .fade-in {
          animation: fade-in ease-in 250ms forwards;
        }

        .calc-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 10px;
          border-radius: 5px;
          background: #d3d3d3;
          outline: none;
          opacity: 0.7;
          -webkit-transition: 0.2s;
          transition: opacity 0.2s;
          max-width: 350px;
        }

        .calc-slider:hover {
          opacity: 1;
        }

        .calc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #814b00;
          cursor: pointer;
        }

        .calc-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #814b00;
          cursor: pointer;
        }

        [type="checkbox"]:checked,
        [type="radio"]:checked {
          background-color: #fffbf7 !important;
          background-image: url("https://myrocky-dev.testmg.us/wp-content/uploads/2024/02/quiz-checkmark-removebg-preview.png") !important;
          background-size: 59% !important;
          border: 1px #814b00 solid !important;
          outline: 1px #814b00 solid !important;
          box-shadow: 0 0 0 2px #814b00 !important;
        }

        input:focus,
        input:active {
          border: 1px #814b00 solid !important;
          outline: 1px #814b00 solid !important;
          box-shadow: 0 0 0 2px #814b00 !important;
        }

        .quiz-continue-button-wrapper {
          display: none !important;
        }

        .headers-font {
          font-family: "Fellix-SemiBold", sans-serif;
        }

        .subheaders-font {
          font-family: "Fellix-MediumBold", sans-serif;
        }

        .quiz-page-wrapper {
          display: flex;
          flex-direction: column;
          min-height: calc(
            100vh - 64px
          ); /* Adjust based on your navbar height */
        }

        .sticky {
          position: sticky;
          bottom: 0;
          background: white;
          padding: 1rem 0;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default WeightQuestionnaire;

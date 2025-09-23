"use client";

import { useState, useEffect } from "react";
import React from "react";
import { ProgressBar } from "../EdQuestionnaire/ProgressBar";
import { QuestionLayout } from "../EdQuestionnaire/QuestionLayout";
import { QuestionOption } from "../EdQuestionnaire/QuestionOption";
import QuestionnaireNavbar from "../EdQuestionnaire/QuestionnaireNavbar";
import QuestionOne from "./QuestionOne";
import EdProductCards from "./EdProductCards";
import { FAQItem } from "./FAQItem";
import EdDosageSelection from "./EdDosageSelectionModal";
import CrossSellModal from "../EDPlans/CrossSellModal";
import {
  handleEdProductCheckout,
  buildEdCheckoutUrl,
} from "@/utils/edCartHandler";
import { addToCartAndRedirect } from "@/utils/crossSellCheckout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  cialisProduct,
  viagraProduct,
  varietyPackProduct,
} from "./productData";
import FaqsSection from "../FaqsSection";

const EDPreConsultationQuiz = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [recommendedProduct, setRecommendedProduct] = useState(null);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductOptions, setSelectedProductOptions] = useState(null);
  const [showDosagePopup, setShowDosagePopup] = useState(false);
  const [selectedDose, setSelectedDose] = useState(null);
  const [showCrossSellModal, setShowCrossSellModal] = useState(false);
  const [isBackNavigation, setIsBackNavigation] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const maxPage = 6;
  const progress = Math.max(10, Math.ceil((currentPage / maxPage) * 100));

  const toggleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  useEffect(() => {
    if (showDosagePopup) {
      // Disable background scroll
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scroll
      document.body.style.overflow = "auto";
    }

    // Very important: Clean up when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showDosagePopup]);

  const handleProductSelect = (product, options) => {
    setSelectedProduct(product);
    setSelectedProductOptions(options);

    // Set default dose if not already set
    if (!selectedDose) {
      const defaultDose =
        product.name === "Cialis"
          ? "10mg"
          : product.name === "Viagra"
          ? "50mg"
          : product.name === "Cialis + Viagra"
          ? "10/50mg"
          : null;
      setSelectedDose(defaultDose);
      setShowDosagePopup(true);
      // console.log("selectd dose", selectedDose);
    }
  };

  const handleDoseSelect = (dose) => {
    setSelectedDose(dose);
    setSelectedProduct((prev) => ({
      ...prev,
      selectedDose: dose,
    }));
  };

  const handleCheckout = async (addons = []) => {
    setIsCheckoutLoading(true);
    setShowCrossSellModal(false);

    try {
      console.log("ED PreConsultation checkout with addons:", addons);
      // Instead of using hardcoded product IDs, use the actual variationId from selectedProductOptions
      let productId = "";

      if (selectedProductOptions && selectedProductOptions.variationId) {
        // Use the correct variation ID from the selected product options
        productId = selectedProductOptions.variationId;
      } else {
        // Fallback in case variationId is not available
        console.error(
          "Error: No variation ID found in selected product options",
          selectedProductOptions
        );
        setError("Product selection error. Please try again.");
        setIsCheckoutLoading(false);
        return;
      }
      const mainProduct = {
        id: productId,
        name: selectedProduct?.name,
        price: selectedProductOptions?.price || 0,
        isSubscription: selectedProductOptions?.frequency === "monthly-supply",
      };
      console.log("ED PreConsultation main product:", mainProduct);
      console.log("ED PreConsultation addons:", addons);
      // Use the centralized addToCartAndRedirect function
      addToCartAndRedirect(mainProduct, addons, "ed");
    } catch (error) {
      console.error("Error during ED PreConsultation checkout:", error);
      setError("An unexpected error occurred. Please try again.");
      setIsCheckoutLoading(false);
    }
  };

  const handleOptionChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });

    if (currentPage < maxPage) {
      if (questionId === 2) {
        if (value === "4 or more times a week") {
          setTimeout(() => {
            setCurrentPage(3);
          }, 300);
        } else {
          setTimeout(() => {
            setCurrentPage(4);
          }, 300);
        }
      } else if (questionId === 3 && answers[2] === "4 or more times a week") {
        setTimeout(() => {
          setCurrentPage(5);
        }, 300);
      } else {
        setTimeout(() => {
          setCurrentPage(currentPage + 1);
        }, 300);
      }
    }
  };

  const handleBackClick = () => {
    if (currentPage > 1) {
      setIsBackNavigation(true);
      if (
        currentPage === 4 &&
        answers[2] &&
        answers[2] !== "4 or more times a week"
      ) {
        setCurrentPage(2);
      } else if (currentPage === 5 && answers[2] === "4 or more times a week") {
        setCurrentPage(3);
      } else {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleContinueClick = () => {
    if (currentPage < maxPage) {
      if (currentPage === 2) {
        if (answers[2] === "4 or more times a week") {
          setCurrentPage(3);
        } else {
          setCurrentPage(4);
        }
      } else if (currentPage === 3 && answers[2] === "4 or more times a week") {
        setCurrentPage(5);
      } else {
        setCurrentPage(currentPage + 1);
      }
    }
    setIsBackNavigation(false);
  };

  useEffect(() => {
    if (currentPage === 6) {
      setIsLoading(true);
      setTimeout(() => {
        const product = getRecommendedProduct();
        setRecommendedProduct(product);

        // Instead of just setting selectedProduct, we need to properly select it
        // by calling handleProductSelect with the default options
        const defaultPreference = product.selectedPreference || "generic";
        const defaultFrequency = "monthly-supply";
        const defaultPills = product.pillOptions[defaultFrequency][0];

        // Calculate price and variationId based on preference
        const price =
          defaultPreference === "generic"
            ? defaultPills.genericPrice
            : defaultPills.brandPrice;

        const variationId =
          defaultPreference === "generic"
            ? defaultPills.genericVariationId
            : defaultPills.brandVariationId;

        // Set the product with proper options
        setSelectedProduct(product);
        setSelectedProductOptions({
          preference: defaultPreference,
          frequency: defaultFrequency,
          pills: defaultPills,
          pillCount: defaultPills.count,
          price: price,
          variationId: variationId,
        });

        setShowProducts(true);
        setIsLoading(false);
      }, 2000);
    }
  }, [currentPage]);

  // Function to check if Continue button should be enabled
  const isContinueEnabled = selectedProduct !== null;

  const getRecommendedProduct = () => {
    const takenBefore = answers[1];
    const frequency = answers[2];
    const preference = answers[3];
    const duration = answers[4];
    const brandType = answers[5];

    let product = null;

    if (takenBefore === "No") {
      product = varietyPackProduct;
    } else {
      if (frequency === "4 or more times a week" && preference === "Daily") {
        product = cialisProduct;
        product.selectedPreference = "generic";
      } else {
        if (duration === "Long-lasting") {
          product = cialisProduct;
          product.selectedPreference = brandType?.toLowerCase() || "generic";
        } else if (duration === "Short-lasting") {
          product = viagraProduct;
          product.selectedPreference = brandType?.toLowerCase() || "generic";
        }
      }
    }

    return product;
  };

  if (showProducts && recommendedProduct) {
    return (
      <div className="flex flex-col min-h-screen bg-white subheaders-font font-medium">
        <ToastContainer position="top-center" />
        <QuestionnaireNavbar
          onBackClick={handleBackClick}
          currentPage={currentPage}
        />
        <div className="w-full md:w-[520px] px-5 md:px-0 mx-auto">
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
        <div className="quiz-page-wrapper text-center relative w-full md:w-[520px] px-5 md:px-0 mx-auto bg-[#FFFFFF] subheaders-font">
          <h2 className="text-[26px] md:text-[32px] my-4">
            Your treatment plan
          </h2>

          <div className="flex flex-col items-center">
            <div className="w-full md:w-[380px] relative ">
              <div className="bg-[#AE7E56] absolute top-0 right-0 left-0 h-10 md:py-1 text-white  rounded-t-xl text-center z-0">
                <span className="-translate-y-1 inline-block text-[12px] leading-[140%]">
                  Recommended
                </span>
              </div>
              <div className="w-full md:w-[380px] mt-[20px] rounded-lg relative z-10 ">
                <EdProductCards
                  product={recommendedProduct}
                  isRecommended={true}
                  onSelect={handleProductSelect}
                  isSelected={selectedProduct?.name === recommendedProduct.name}
                />
              </div>
            </div>

            {showMoreOptions && (
              <div className="flex flex-col gap-4 my-6 w-[380px]">
                {recommendedProduct.name !== "Cialis" && (
                  <EdProductCards
                    product={cialisProduct}
                    onSelect={handleProductSelect}
                    isSelected={selectedProduct?.name === cialisProduct.name}
                  />
                )}
                {recommendedProduct.name !== "Viagra" && (
                  <EdProductCards
                    product={viagraProduct}
                    onSelect={handleProductSelect}
                    isSelected={selectedProduct?.name === viagraProduct.name}
                  />
                )}
                {recommendedProduct.name !== "Cialis + Viagra" && (
                  <EdProductCards
                    product={varietyPackProduct}
                    onSelect={handleProductSelect}
                    isSelected={
                      selectedProduct?.name === varietyPackProduct.name
                    }
                  />
                )}
              </div>
            )}

            <div className="w-full mt-4 flex justify-center">
              <button
                onClick={toggleMoreOptions}
                className="py-3 px-8 w-[380px] rounded-full border border-gray-300 text-black font-medium bg-transparent"
              >
                {showMoreOptions ? "Show less options" : "Show more options"}
              </button>
            </div>

            {showDosagePopup && (
              <EdDosageSelection
                isOpen={showDosagePopup}
                onClose={() => setShowDosagePopup(false)}
                product={selectedProduct}
                selectedDose={selectedDose}
                setSelectedDose={handleDoseSelect}
                handleBackClick={handleBackClick}
                onContinue={() => {
                  if (selectedDose) {
                    setShowDosagePopup(false);
                    // Only open cross-sell modal if we have valid product options with a variationId
                    if (
                      selectedProductOptions &&
                      selectedProductOptions.variationId
                    ) {
                      setShowCrossSellModal(true);
                    } else {
                      console.error(
                        "Cannot proceed to cross-sell: Missing variation ID",
                        selectedProductOptions
                      );
                      setError("Product selection error. Please try again.");
                    }
                  }
                }}
              />
            )}

            {showCrossSellModal && (
              <CrossSellModal
                isOpen={showCrossSellModal}
                onClose={() => setShowCrossSellModal(false)}
                selectedProduct={{
                  name: selectedProduct?.name,
                  activeIngredient:
                    selectedProduct?.name === "Cialis"
                      ? "Tadalafil"
                      : selectedProduct?.name === "Viagra"
                      ? "Sildenafil"
                      : "Tadalafil & Sildenafil",
                  preference: selectedProduct?.selectedPreference || "generic",
                  frequency:
                    selectedProductOptions?.frequency || "monthly-supply",
                  pills: selectedProductOptions?.pillCount || 8,
                  price: selectedProductOptions?.price || 0,
                  image:
                    selectedProduct?.image ||
                    (selectedProduct?.name === "Cialis"
                      ? "https://myrocky.b-cdn.net/WP%20Images/Sexual%20Health/chewalis-ed.webp"
                      : selectedProduct?.name === "Viagra"
                      ? "https://myrocky.b-cdn.net/WP%20Images/Sexual%20Health/webp-images/viagra-ed.webp"
                      : "https://myrocky.b-cdn.net/WP%20Images/Sexual%20Health/webp-images/variety-pack-ed.webp"),
                  dosage: selectedDose,
                  productIds: selectedProductOptions?.variationId || "",
                }}
                onCheckout={handleCheckout}
                isLoading={isCheckoutLoading}
              />
            )}

            <div className="w-full md:w-[688px] mt-14 md:mt-16">
              <div className="mx-auto">
                <FaqsSection faqs={faqs} title="FAQs" />
              </div>
            </div>
          </div>

          <div
            className="fixed bottom-0 w-full p-4 bg-white border-t  flex items-center justify-center"
            style={{
              visibility: isContinueEnabled ? "visible" : "hidden",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
            }}
          >
            <button
              type="button"
              onClick={() => {
                if (selectedProduct) {
                  setShowDosagePopup(true);
                }
              }}
              className="w-[335px] md:w-[520px] mx-auto bg-black text-white py-3 px-6 rounded-full font-medium"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col min-h-screen bg-white subheaders-font font-medium"
      suppressHydrationWarning={true}
    >
      <ToastContainer position="top-center" />
      <QuestionnaireNavbar
        onBackClick={handleBackClick}
        currentPage={currentPage}
      />
      <ProgressBar progress={progress} />

      <div className="quiz-page-wrapper relative w-full md:w-[520px] px-5 md:px-0 mx-auto bg-[#FFFFFF]">
        <QuestionOne
          currentPage={currentPage}
          answer={answers[1]}
          onAnswerChange={handleOptionChange}
        />

        <QuestionLayout
          title="How often do you have sex?"
          currentPage={currentPage}
          pageNo={2}
          questionId={2}
          inputType="radio"
        >
          <QuestionOption
            id="2_1"
            name="2"
            value="Once a week or less"
            checked={answers[2] === "Once a week or less"}
            onChange={() => handleOptionChange(2, "Once a week or less")}
            type="radio"
            label="Once a week or less"
            className="mb-4"
          />
          <QuestionOption
            id="2_2"
            name="2"
            value="2-3 times a week"
            checked={answers[2] === "2-3 times a week"}
            onChange={() => handleOptionChange(2, "2-3 times a week")}
            type="radio"
            label="2-3 times a week"
            className="mb-4"
          />
          <QuestionOption
            id="2_3"
            name="2"
            value="4 or more times a week"
            checked={answers[2] === "4 or more times a week"}
            onChange={() => handleOptionChange(2, "4 or more times a week")}
            type="radio"
            label="4 or more times a week"
          />
        </QuestionLayout>

        <QuestionLayout
          title="Which option do you prefer?"
          currentPage={currentPage}
          pageNo={3}
          questionId={3}
          inputType="radio"
        >
          <QuestionOption
            id="3_1"
            name="3"
            value="Daily"
            checked={answers[3] === "Daily"}
            onChange={() => handleOptionChange(3, "Daily")}
            type="radio"
            label="Take a daily tablet so I am always ready"
            className="mb-4"
          />
          <QuestionOption
            id="3_2"
            name="3"
            value="When-needed"
            checked={answers[3] === "When-needed"}
            onChange={() => handleOptionChange(3, "When-needed")}
            type="radio"
            label="Take a tablet when needed before sex"
          />
        </QuestionLayout>

        <QuestionLayout
          title="Are you looking for a medication that is long-lasting (up to 36hrs) or short lasting (up to 8hrs)?"
          currentPage={currentPage}
          pageNo={4}
          questionId={4}
          inputType="radio"
        >
          <QuestionOption
            id="4_1"
            name="4"
            value="Long-lasting"
            checked={answers[4] === "Long-lasting"}
            onChange={() => handleOptionChange(4, "Long-lasting")}
            type="radio"
            label="Long-lasting"
            className="mb-4"
          />
          <QuestionOption
            id="4_2"
            name="4"
            value="Short-lasting"
            checked={answers[4] === "Short-lasting"}
            onChange={() => handleOptionChange(4, "Short-lasting")}
            type="radio"
            label="Short-lasting"
          />
        </QuestionLayout>

        <QuestionLayout
          title="Do you prefer a brand name or generic?"
          subtitle="Generic is up to 68% cheaper, no difference in performance."
          currentPage={currentPage}
          pageNo={5}
          questionId={5}
          inputType="radio"
        >
          <QuestionOption
            id="5_1"
            name="5"
            value="Generic"
            checked={answers[5] === "Generic"}
            onChange={() => handleOptionChange(5, "Generic")}
            type="radio"
            label="Generic works for me (more bang for your buck)"
            className="mb-4"
          />
          <QuestionOption
            id="5_2"
            name="5"
            value="Brand"
            checked={answers[5] === "Brand"}
            onChange={() => handleOptionChange(5, "Brand")}
            type="radio"
            label="I prefer the brand name"
          />
        </QuestionLayout>

        {currentPage === 6 && (
          <div className="quiz-page recommendation-preloader" data-pageno="6">
            <div className="quiz-heading-wrapper px-3 mx-auto pt-10 pb-0">
              <h2 className="quiz-heading text-lg text-center font-medium">
                Please wait while we are loading the recommended ED product...
              </h2>
            </div>
            <p className="text-center p-5 pb-[150px]">
              <img
                src="https://myrocky.ca/wp-content/themes/salient-child/img/preloader-wheel.svg"
                className="block w-[100px] h-auto m-auto"
                alt="Preloader Wheel"
              />
            </p>
          </div>
        )}
        {error && (
          <p className="error-box text-red-500 m-2 text-center text-sm">
            {error}
          </p>
        )}
        {currentPage < 6 && (
          <div
            className="fixed bottom-0 w-full p-4 bg-white border-t flex items-start justify-center"
            style={{
              visibility:
                isBackNavigation && answers[currentPage] ? "visible" : "hidden",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
            }}
          >
            <button
              type="button"
              onClick={handleContinueClick}
              className=" w-[335px] md:w-[520px] mx-auto bg-black text-white py-3 px-6 rounded-full font-medium"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EDPreConsultationQuiz;

const faqs = [
  {
    question: "What is the cause of ED?",
    answer:
      "Erectile dysfunction can be caused by a variety of issues such as psychological distress, medical conditions or medications. Situational anxiety and stress tend to be the leading causes in younger men and may restrict blood flow to the penis at the wrong moment. As you age, ED may become persistent due to underlying problems with nerves, blood vessels or hormone production. Our online medical assessment can help establish the cause and treat your ED.",
  },
  {
    question: "How do ED pills work?",
    answer:
      "Get the party started and the pills will do the rest. When sexually aroused, the body releases a substance called nitric oxide which works to relax the blood vessels in penis. This results in a blood rush to the penis, leaving it hard for penetration. When sex is over, an enzyme shuts this process off. ED pills work by blocking this enzyme (PDE5), making it easier to get your erection going longer and stronger.",
  },
  {
    question: "What is the safest drug for ED?",
    answer:
      "All medications go through extensive clinical trials and quality checks before getting approved by Health Canada. The safety and effectiveness for ED medications is well established, making it an excellent treatment for most men. Our online questionnaire will take into account your personal medical history and determine if these pills are right for you!",
  },
  {
    question: "What is the most effective pill for ED?",
    answer:
      "While both Sildenafil and Tadalafil are equally effective, there are a few differences. Viagra takes anywhere between 30-60 mins to work after ingestion but sometimes can be delayed up to 2 hours and its effects lasts on average 4 hours. Cialis on the other hand , some may act faster, last longer or work regardless of when you had your last meal. With enough information, Rocky can help you find an ED medication and dosage that is right for you. You may connect with providers and receive ongoing care through our platform.",
  },
  {
    question: "What are the side effects of ED medications?",
    answer:
      "In general, ED treatment is well tolerated. However if side effects occur, they are usually mild and temporary. This includes headaches, flushed skin, runny nose and upset stomach. ED medications can very rarely cause serious side effects such as priapism (a prolonged erection lasting hours after stimulation has ended) which can result in permanent damage to your penis if not treated immediately. Other rare events include sudden loss of vision or loss of hearing.",
  },
  {
    question: "Which ED drug is the best?",
    answer:
      "There is no particular medication that is superior to the other, they are all equally effective. However, some of the tablets may have a particular advantage that is best suited for your needs.",
  },
  {
    question: "Are ED drugs available OTC?",
    answer:
      "In United States, erectile dysfunction medications are not available over-the-counter and can only be obtained with a prescription. ED medications that are sold without a prescription is illegal and could potentially result in harm from counterfeit drugs. Rocky provides access to a licensed health care team so you can be certain that you are getting safe and effective care. Through our online platform, you will be guided through a series of medical questions which is then received by a Canadian licensed doctor. They will review this information, and once approved, treatment is delivered straight to your home.",
  },
  {
    question: "How can I improve my ED?",
    answer:
      "There are multiple factors that contribute to your sexual health. With this in mind, there are certainly ways in which you can improve your erectile dysfunction. Lifestyle changes that promote overall health is a great place to start. Eating a healthy diet that promotes heart vitality and non-inflammatory, regular exercise and with cutting down on health-harming behaviour such as cigarette smoking and recreational drugs can make impactful change. Of course, there is also your mental well-being and intimate relationships that you should take into consideration. Therapy may be useful in these circumstances to help identify the root cause of any psychological difficulties you may be experiencing. Lastly, we have to mention alcohol. Its widely enjoyed and we wouldn’t want you to miss out on the fun, but if you notice that it may hampering your experience in the bedroom, maybe give it a miss or reduce it down next time.",
  },
];

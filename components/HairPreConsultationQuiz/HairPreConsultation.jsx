"use client";

import { useState, useEffect } from "react";
import React from "react";
import { ProgressBar } from "../EdQuestionnaire/ProgressBar";
import { QuestionLayout } from "../EdQuestionnaire/QuestionLayout";
import { QuestionOption } from "../EdQuestionnaire/QuestionOption";
import QuestionnaireNavbar from "../EdQuestionnaire/QuestionnaireNavbar";
import { WarningPopup } from "../EdQuestionnaire/WarningPopup";
import DOBInput from "@/components/DOBInput";

const HairPreConsultationQuiz = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [recommendedProduct, setRecommendedProduct] = useState(null);
  const [dateInput, setDateInput] = useState("");
  const [dateValInput, setDateValInput] = useState("");
  const [age, setAge] = useState(null);
  const [cameFromBack, setCameFromBack] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showUnderagePopup, setShowUnderagePopup] = useState(false);

  const maxPage = 8;
  const minAgeValidity = 18;
  const maxAgeValidity = 55;
  const progress = Math.max(10, Math.ceil((currentPage / maxPage) * 100));

  const handleOptionChange = (questionId, value) => {
    if (questionId === 1 && value === "Female") {
      setShowPopup(true);
      return; // Stop further processing
    }

    setAnswers({
      ...answers,
      [questionId]: value,
    });
    setCameFromBack(false); // Reset the flag when an option is selected

    if (currentPage < maxPage) {
      if (questionId === 138 && currentPage === 2) {
        // For question 2 (page 2), always go to page 3 first
        setTimeout(() => {
          setCurrentPage(3);
        }, 300);
      } else {
        setTimeout(() => {
          setCurrentPage(currentPage + 1);
        }, 300);
      }
    }
  };

  const handleDateChange = (newValue) => {
    setDateValInput(newValue);
    // Normalize to MM/DD/YYYY for internal validation/age calc
    let formattedValue = newValue;
    if (typeof newValue === "string" && newValue.includes("-")) {
      const parts = newValue.split("-");
      if (parts.length === 3) {
        const [year, month, day] = parts;
        formattedValue = `${month.padStart(2, "0")}/${day.padStart(
          2,
          "0"
        )}/${year}`;
      }
    }
    setDateInput(formattedValue);
    if (isValidDate(formattedValue)) {
      const calculatedAge = getAge(formattedValue);
      setAge(calculatedAge);

      if (calculatedAge < minAgeValidity) {
        setShowUnderagePopup(true); // Show popup for underage
      } else if (
        calculatedAge >= minAgeValidity &&
        calculatedAge <= maxAgeValidity
      ) {
        setAnswers({
          ...answers,
          158: formattedValue,
        });
      }
    }
  };

  const formatDateInput = (value) => value;

  const isValidDate = (dateString) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(dateString)) return false;
    const parts = dateString.split("/");
    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    if (
      year < 1900 ||
      year > new Date().getFullYear() ||
      month === 0 ||
      month > 12
    )
      return false;

    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
      monthLength[1] = 29;
    }

    return day > 0 && day <= monthLength[month - 1];
  };

  const getAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const ContinueButton = ({ onClick, disabled = false, text = "Continue" }) => (
    <div className="fixed bottom-0 w-full p-4 bg-white border-t ">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`w-[335px] md:w-[520px] mx-auto bg-black text-white py-3 px-6 rounded-full font-medium ${
          disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
        }`}
      >
        {text}
      </button>
    </div>
  );

  const handleContinue = () => {
    if (currentPage < maxPage) {
      if (
        currentPage === 2 &&
        answers[138] &&
        answers[138] !== "4 or more times a week"
      ) {
        setTimeout(() => {
          setCurrentPage(3);
        }, 300);
      } else {
        setTimeout(() => {
          setCurrentPage(currentPage + 1);
        }, 300);
      }
    }
  };

  const handleDateSubmit = () => {
    if (age >= minAgeValidity && age <= maxAgeValidity) {
      setCurrentPage(currentPage + 1);
      setError("");
    } else {
      setError(
        `You are not eligible. Minimum age required is ${minAgeValidity} and max age is ${maxAgeValidity}`
      );
    }
  };

  const handleBackClick = () => {
    if (currentPage > 1) {
      setCameFromBack(true); // Set the flag when back button is clicked
      if (
        currentPage === 4 &&
        answers[138] &&
        answers[138] !== "4 or more times a week"
      ) {
        setCurrentPage(2);
      } else if (currentPage === 4) {
        setCurrentPage(3); // Fix the navigation when coming back from page 4 to page 3
      } else if (currentPage === 7) {
        setShowProducts(false);
        setRecommendedProduct(null);
        setCurrentPage(5);

        console.log(showProducts);
      } else {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  useEffect(() => {
    if (currentPage === 6) {
      setIsLoading(true);
      setTimeout(() => {
        const product = getRecommendedProduct();
        setRecommendedProduct(product);
        setShowProducts(true);
        setIsLoading(false);
        setCurrentPage(7);
      }, 2000);
    }

    // For page 3, only auto-advance if not coming from back button
    if (currentPage === 3 && !cameFromBack) {
      const timer = setTimeout(() => {
        setCurrentPage(4);
      }, 2000);

      // Clean up the timer if component unmounts or page changes
      return () => clearTimeout(timer);
    }
  }, [currentPage, cameFromBack]);

  const getRecommendedProduct = () => {
    const hairType = answers[137];
    const resultDesired = answers[138];

    let product = {
      title: "",
      image: "",
      price: "",
      frequency: "",
      pills: "",
      url: "",
    };

    if (resultDesired === "Regrowing my hair") {
      product = {
        title: "2 in 1 Growth Plan",
        image:
          "https://myrocky.b-cdn.net/WP%20Images/Questionnaire/FinistridenMinioxidalFoam.png",
        price: "160",
        frequency: "2 Months Supply",
        pills: "Finasteride & Minoxidil Foam",
        url: "/login-register/?hair-flow=1&onboarding=1&view=account&viewshow=register&onboarding-add-to-cart=96913&consultation-required=1&convert_to_sub_96913=2_month",
      };
    } else if (resultDesired === "Preventing future hair loss") {
      product = {
        title: "Finasteride (Propecia) Tablets",
        image:
          "https://myrocky.b-cdn.net/WP%20Images/Questionnaire/Finastride.png",
        price: "123.75",
        frequency: "3 Months supply",
        pills: "",
        url: "/login-register/?hair-flow=1&onboarding=1&view=account&viewshow=register&consultation-required=1&convert_to_sub_2838=3_month_24&onboarding-add-to-cart=2838",
      };
    } else if (resultDesired === "Both") {
      product = {
        title: "2 in 1 Growth Plan",
        image:
          "https://myrocky.b-cdn.net/WP%20Images/Questionnaire/FinistridenMinioxidalFoam.png",
        price: "160",
        frequency: "2 Months Supply",
        pills: "Finasteride & Minoxidil Foam",
        url: "/login-register/?hair-flow=1&onboarding=1&view=account&viewshow=register&onboarding-add-to-cart=96913&consultation-required=1&convert_to_sub_96913=2_month",
      };
    }

    return product;
  };

  if (showProducts && recommendedProduct) {
    return (
      <div
        className="flex flex-col min-h-screen bg-white subheaders-font font-medium"
        suppressHydrationWarning={true}
      >
        <QuestionnaireNavbar
          onBackClick={handleBackClick}
          currentPage={currentPage}
        />
        <div className="w-full md:w-[520px] mx-auto md:mb-20 px-6 md:px-0 ">
          <div className="progress-indicator mb-2 text-[#A7885A] font-medium">
            <span className="text-sm">Here's what we recommended</span>
          </div>
          <div className="progress-bar-wrapper w-full block h-[8px] my-1 rounded-[10px] bg-gray-200">
            <div
              style={{ width: "100%" }}
              className="progress-bar bg-[#A7885A] rounded-[10px] block float-left h-[8px]"
            ></div>
          </div>

          <div className="product-recommendation-page py-4 ">
            <div className="quiz-heading-wrapper px-3 mx-auto pt-2 pb-0">
              <h2 className="quiz-heading text-[#AE7E56] text-sm text-center">
                Time To Get Growing!
              </h2>
            </div>

            <p className="text-center pt-3 pb-0 text-2xl">We recommend</p>
            <p className="text-center w-full">
              <img
                className="recommended-product block w-full h-auto m-auto  pb-1 max-w-[500px]"
                src={recommendedProduct.image}
                alt={recommendedProduct.title}
              />
            </p>
            <p className="text-left  mb-5 px-5 md:px-8  text-[12px] text-[#BCBCBC] mt-5 subheaders-font">
              We respect your privacy. All of your information is securely
              stored on our PIPEDA Compliant server.
            </p>

            <div className="fixed bottom-0 w-[335px] md:w-[520px] p-4 bg-white -translate-x-2/4 left-2/4">
              <a
                href={recommendedProduct.url}
                className="w-full bg-black text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors block text-center no-underline"
              >
                Get my growth plan now
              </a>
              <div className="flex items-center justify-center mt-2 text-sm">
                <img
                  src="https://myrocky.b-cdn.net/WP%20Images/Questionnaire/reset.png"
                  alt="Guarantee icon"
                  className="h-5 w-5 mr-1"
                />
                <span>100% Money Back Guarantee</span>
              </div>
            </div>
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
      <QuestionnaireNavbar
        onBackClick={handleBackClick}
        currentPage={currentPage}
      />
      <ProgressBar progress={progress} />

      <div
        className="quiz-page-wrapper relative w-full subheaders-font md:w-[520px] mx-auto bg-[#FFFFFF]"
        suppressHydrationWarning={true}
      >
        <QuestionLayout
          title="What best describes your hair?"
          currentPage={currentPage}
          pageNo={1}
          questionId={137}
          inputType="radio"
        >
          <QuestionOption
            id="137_1"
            name="137"
            value="Receding hairline"
            checked={answers[137] === "Receding hairline"}
            onChange={() => handleOptionChange(137, "Receding hairline")}
            type="radio"
            className="mb-4"
            label={
              <div className="flex flex-row items-center">
                <span className="flex justify-start mr-4">
                  <img
                    className="w-[50px] h-[50px] object-contain"
                    src="https://myrocky.b-cdn.net/WP%20Images/Questionnaire/receding_hairline.png"
                    alt="Receding hairline"
                  />
                </span>
                <span className="self-center">Receding hairline</span>
              </div>
            }
          />

          <QuestionOption
            id="137_2"
            name="137"
            value="Thinning at the crown"
            checked={answers[137] === "Thinning at the crown"}
            onChange={() => handleOptionChange(137, "Thinning at the crown")}
            type="radio"
            className="mb-4"
            label={
              <div className="flex flex-row items-center">
                <span className="flex justify-start mr-4">
                  <img
                    className="w-[50px] h-[50px] object-contain"
                    src="https://myrocky.b-cdn.net/WP%20Images/Questionnaire/crown_hairline.png"
                    alt="Thinning at the crown"
                  />
                </span>
                <span className="self-center">Thinning at the crown</span>
              </div>
            }
          />

          <QuestionOption
            id="137_3"
            name="137"
            value="Overall hair loss/thinning"
            checked={answers[137] === "Overall hair loss/thinning"}
            onChange={() =>
              handleOptionChange(137, "Overall hair loss/thinning")
            }
            type="radio"
            className="mb-4"
            label={
              <div className="flex flex-row items-center">
                <span className="flex justify-start mr-4">
                  <img
                    className="w-[50px] h-[50px] object-contain"
                    src="https://myrocky.b-cdn.net/WP%20Images/Questionnaire/overall_hairline.png"
                    alt="Overall hair loss/thinning"
                  />
                </span>
                <span className="self-center">Overall hair loss/thinning</span>
              </div>
            }
          />

          <QuestionOption
            id="137_4"
            name="137"
            value="Full head of hair"
            checked={answers[137] === "Full head of hair"}
            onChange={() => handleOptionChange(137, "Full head of hair")}
            type="radio"
            className="mb-4"
            label={
              <div className="flex flex-row items-center">
                <span className="flex justify-start mr-4">
                  <img
                    className="w-[50px] h-[50px] object-contain"
                    src="https://myrocky.b-cdn.net/WP%20Images/Questionnaire/full_hairline.png"
                    alt="Full head of hair"
                  />
                </span>
                <span className="self-center">Full head of hair</span>
              </div>
            }
          />

          {cameFromBack && (
            <ContinueButton onClick={handleContinue} disabled={!answers[137]} />
          )}
        </QuestionLayout>

        <QuestionLayout
          title="What sort of results are you looking for?"
          currentPage={currentPage}
          pageNo={2}
          questionId={138}
          inputType="radio"
        >
          <QuestionOption
            id="138_1"
            name="138"
            value="Regrowing my hair"
            checked={answers[138] === "Regrowing my hair"}
            onChange={() => handleOptionChange(138, "Regrowing my hair")}
            type="radio"
            label="Regrowing my hair"
            className="mb-4"
          />

          <QuestionOption
            id="138_2"
            name="138"
            value="Preventing future hair loss"
            checked={answers[138] === "Preventing future hair loss"}
            onChange={() =>
              handleOptionChange(138, "Preventing future hair loss")
            }
            type="radio"
            label="Preventing future hair loss"
            className="mb-4"
          />

          <QuestionOption
            id="138_3"
            name="138"
            value="Both"
            checked={answers[138] === "Both"}
            onChange={() => handleOptionChange(138, "Both")}
            type="radio"
            label="Both"
          />

          {cameFromBack && (
            <ContinueButton onClick={handleContinue} disabled={!answers[138]} />
          )}
        </QuestionLayout>

        {currentPage === 3 && (
          <div className="quiz-page before-after-page">
            <div className="quiz-heading-wrapper px-3 mx-auto pt-10">
              <h2 className="quiz-heading text-2xl text-center font-medium">
                Time to get your hair back
              </h2>
            </div>
            <p className="text-center p-5">
              <img
                className="block w-full h-auto m-auto p-5 max-w-[500px]"
                src="https://myrocky.ca/wp-content/uploads/2023/03/review-aanton-before-after-e1678831383630.jpg"
                alt="Before and After Results"
              />
              <img
                width="24"
                height="24"
                className="block m-auto"
                src="https://myrocky.ca/wp-content/themes/salient-child/img/puff.svg"
                alt="Puff"
              />
            </p>
          </div>
        )}

        {currentPage === 4 && (
          <div className="quiz-page">
            <div className="quiz-content px-4 md:px-0 pt-2">
              <h2 className="text-2xl font-medium mb-6 mt-4">
                Let's make sure you're eligible for treatment
              </h2>

              <div className="birthday-section mb-6">
                <label
                  htmlFor="birthdate"
                  className="block text-left text-base mb-2"
                >
                  My birthday is
                </label>
                {/* <input
                  id="birthdate"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#AE7E56] focus:border-[#AE7E56]"
                  name="158"
                  type="tel"
                  placeholder="mm/dd/yyyy"
                  value={dateInput}
                  onChange={handleDateChange}
                /> */}
                <DOBInput
                  value={dateValInput}
                  onChange={(newValue) => handleDateChange(newValue)}
                  required
                  name="158"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#AE7E56] focus:border-[#AE7E56]"
                />
                <WarningPopup
                  isOpen={showUnderagePopup}
                  onClose={() => setShowUnderagePopup(false)}
                  // title="Age Restriction"
                  message="Sorry, but we are not able to service you as this service is for adults only."
                  showCheckbox={false}
                  buttonText="Ok"
                  backgroundColor="bg-[#F5F4EF]"
                  titleColor="text-[#C19A6B]"
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>

              <div className="fixed bottom-0  p-4 bg-white border-t -translate-x-2/4 left-2/4">
                <button
                  type="button"
                  onClick={handleDateSubmit}
                  disabled={
                    !age || age < minAgeValidity || age > maxAgeValidity
                  }
                  className={`w-[335px] md:w-[520px]  bg-black text-white py-3 px-6 rounded-full font-medium ${
                    !age || age < minAgeValidity || age > maxAgeValidity
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-800"
                  }`}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {currentPage === 5 && (
          <div className="quiz-page">
            <div className="quiz-content px-4 md:px-0 pt-2">
              <h2 className="text-2xl font-medium mb-4 mt-4">
                What was your biological sex at birth?
              </h2>
              <h3 className="text-[#B17F4A] text-base font-normal mb-6">
                For example, on your original birth certificate
              </h3>

              <div className="sex-options-wrapper space-y-4 mb-8">
                <QuestionOption
                  id="1_1"
                  name="1"
                  value="Male"
                  checked={answers[1] === "Male"}
                  onChange={() => handleOptionChange(1, "Male")}
                  type="radio"
                  label="Male"
                  className="w-full"
                />
                <QuestionOption
                  id="1_2"
                  name="1"
                  value="Female"
                  checked={answers[1] === "Female"}
                  onChange={() => handleOptionChange(1, "Female")}
                  type="radio"
                  label="Female"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

        <WarningPopup
          isOpen={showPopup}
          onClose={(proceed) => {
            setShowPopup(false);
            if (!proceed) {
            } else {
              setAnswers({
                ...answers,
                1: "",
              });
            }
          }}
          title="Just a Quick Note! 😊"
          message="We noticed you selected Female—currently, our treatments for hair loss are only available for men."
          showCheckbox={false}
          buttonText="Ok"
          backgroundColor="bg-[#F5F4EF]"
          titleColor="text-[#C19A6B]"
        />

        {currentPage === 6 && (
          <div className="quiz-page">
            <div className="quiz-heading-wrapper px-3 mx-auto pt-10">
              <h2 className="quiz-heading text-lg text-center font-medium">
                Please wait while we are loading the recommended hair product...
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

        {currentPage === 8 && (
          <div className="quiz-page">
            <p className="text-center p-5 pb-[100px]">
              <img
                src="https://myrocky.ca/wp-content/themes/salient-child/img/preloader-wheel.svg"
                className="block w-[100px] h-auto m-auto pt-6"
                alt="Preloader Wheel"
              />
            </p>
          </div>
        )}

        {/* <p className="text-left text-xs text-gray-400 mt-5 subheaders-font">
          We respect your privacy. All of your information is securely stored on
          our PIPEDA Compliant server.
        </p> */}
      </div>
    </div>
  );
};

export default HairPreConsultationQuiz;

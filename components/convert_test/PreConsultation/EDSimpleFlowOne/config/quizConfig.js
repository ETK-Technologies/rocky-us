import { EDProducts } from "../../data/PreConsultationProductsData";

//  Quiz Configuration - Data-driven approach (ED flow)
export const quizConfig = {
  // Recommendation rules derived from the legacy `getRecommendedProduct()` logic.
  // NOTE: rules are data descriptors only. The recommendation engine should
  // create a shallow copy of the product (e.g. { ...product, selectedPreference })
  // instead of mutating the imported `EDProducts` objects.
  recommendationRules: [
    // Fallback/default rule (keep an opinionated default)
    {
      conditions: {}, // Default case
      outcome: {
        recommended: EDProducts.cialisProduct,
        alternatives: [
          EDProducts.viagraProduct,
          EDProducts.mounjaroProduct,
          EDProducts.varietyPackProduct,
        ],
      },
    },
  ],

  steps: {
    1: {
      id: "province",
      type: "select",
      passIf: "authenticate",
      title: "Select your province",
      subtitle:
        "We need to make sure we have providers and service in your area.",
      field: "province",
      required: true,
      label: "Province",
      showMessage: "Promo applied: Free online assessment",
      showSignIn: true,
      options: [
        { id: "", label: "Select a province" },
        { id: "AB", label: "Alberta" },
        { id: "BC", label: "British Columbia" },
        { id: "MB", label: "Manitoba" },
        { id: "NB", label: "New Brunswick" },
        { id: "NL", label: "Newfoundland & Labrador" },
        { id: "NS", label: "Nova Scotia" },
        { id: "ON", label: "Ontario" },
        { id: "QC", label: "Quebec" },
        { id: "SK", label: "Saskatchewan" },
        { id: "NU", label: "Nunavut" },
      ],
    },

    2: {
      id: "dateOfBirth",
      type: "date",
      passIf: "authenticate",
      label: "Date Of Birth",
      showMessage: "Good news! We have providers in your province",
      title: "Let us know your age",
      showSignIn: true,
      subtitle: "We need to know if you may be eligible for treatment",
      field: "dateOfBirth",
      required: true,
      placeholder: "MM-DD-YYYY",
    },

    3: {
      id: "mail&passwordForm",
      type: "form",
      passIf: "authenticate",
      title: "Start having better sex",
      subtitle:
        "Get personalized treatment and 24/7 support. Private and 100% online.",
      showSignIn: true,
      fields: [
        { id: "email", label: "Email", type: "email", placeholder: "Email" },
        {
          id: "password",
          label: "Password",
          type: "password",
          placeholder: "Password",
          showInCondition: "email",
        },
        {
          id: "privacy_accept",
          label:
            "By clicking “Continue” I agree to the Terms and Conditions and Telehealth Consent and acknowledge the Privacy Policy.",
          type: "checkbox",
        },
      ],
      required: true,
    },
  },

  // Navigation configuration
  navigation: {
    1: 2,
    2: 3,
    3: 4,
  },

  // Progress mapping (8 steps) - values represent percent complete for each step
  progressMap: {
    1: 75,
    2: 85,
    3: 92,
  },

  // Step titles
  stepTitles: {
    1: "Province",
    2: "Age",
    3: "Account",
  },

  // Popup configurations
  popups: {
  },
};

import { ANTI_AGING_PRODUCTS } from "../../data/skincareProductData";
// Anti-Aging Quiz Configuration - Data-driven approach
export const quizConfig = {
  recommendationRules: [
    {
      conditions: {
        skinSensitivity: "804_3",
      },
      outcome: {
        strengthLevel: 1,
        reasoning: "1E strength required for very sensitive skin",
        recommended: ANTI_AGING_PRODUCTS.RETINOL_1E,
        alternatives: [ANTI_AGING_PRODUCTS.RETINOL_2E, ANTI_AGING_PRODUCTS.RETINOL_3E],
        maxStrength: 1,
      },
    },
    {
      conditions: {
        skinConcernsSeverity: ["802_1", "802_2"],
      },
      outcome: {
        strengthLevel: 1,
        reasoning: "1E strength recommended for mild skin concerns",
        recommended: ANTI_AGING_PRODUCTS.RETINOL_1E,
        alternatives: [ANTI_AGING_PRODUCTS.RETINOL_2E, ANTI_AGING_PRODUCTS.RETINOL_3E],
        maxStrength: 1,
      },
    },
    {
      conditions: {
        skinType: ["801_3", "801_4"],
      },
      outcome: {
        strengthLevel: 2,
        reasoning: "2E maximum strength for dry or combination skin",
        recommended: ANTI_AGING_PRODUCTS.RETINOL_2E,
        alternatives: [ANTI_AGING_PRODUCTS.RETINOL_1E, ANTI_AGING_PRODUCTS.RETINOL_3E],
        maxStrength: 2,
      },
    },
    {
      conditions: {
        skinSensitivity: "804_2",
      },
      outcome: {
        strengthLevel: 2,
        reasoning: "2E maximum strength for occasionally sensitive skin",
        recommended: ANTI_AGING_PRODUCTS.RETINOL_2E,
        alternatives: [ANTI_AGING_PRODUCTS.RETINOL_1E, ANTI_AGING_PRODUCTS.RETINOL_3E],
        maxStrength: 2,
      },
    },
    {
      conditions: {
        skinType: ["801_1", "801_2"],
        skinSensitivity: "804_1",
        skinConcernsSeverity: ["802_4", "802_5"],
      },
      outcome: {
        strengthLevel: 3,
        reasoning:
          "3E strength approved for resilient skin with significant concerns",
        recommended: ANTI_AGING_PRODUCTS.RETINOL_3E,
        alternatives: [
          ANTI_AGING_PRODUCTS.RETINOL_1E,
          ANTI_AGING_PRODUCTS.RETINOL_2E,
        ],
        maxStrength: 3,
      },
    },
    {
      conditions: {}, // Default case
      outcome: {
        strengthLevel: 2,
        reasoning: "2E strength recommended based on your skin profile",
        recommended: ANTI_AGING_PRODUCTS.RETINOL_2E,
        alternatives: [ANTI_AGING_PRODUCTS.RETINOL_1E, ANTI_AGING_PRODUCTS.RETINOL_3E],
        maxStrength: 2,
      },
    },
  ],
  "form_id": 8,
  steps: {
    1: {
      id: "800",
      type: "radio",
      title: "What are your skincare goals?",
      subtitle: "Check all that apply",
      field: "skincareGoals",
      required: true,
      options: [
        {
          id: "800_1",
          label: "Improve skin texture and smoothness",
        },
        {
          id: "800_2",
          label: "Minimize fine lines and wrinkles",
        },
        {
          id: "800_3",
          label: "Other",
          action: "showPopup",
          popupType: "otherGoals",
        },
      ],
    },

    2: {
      id: "801",
      type: "radio",
      title: "Skin Type",
      subtitle: "Select the option that best describes your skin",
      field: "skinType",
      required: true,
      hasInfoIcon: true,
      infoContent: {
        description: "Select the option that best matches your skin.",
        details: {
          Normal: "Balanced, not too oily or dry.",
          Oily: "Shiny, prone to excess oil and breakouts.",
          Dry: "Feels tight, flaky, or rough.",
          "Both Dry & Oily":
            "Oily in some areas and dry in others.",
        },
      },
      options: [
        { id: "801_1", label: "Normal" },
        { id: "801_2", label: "Oily" },
        { id: "801_3", label: "Dry" },
        { id: "801_4", label: "Both dry and oily" },
      ],
    },

    3: {
      id: "802",
      type: "radio",
      title: "How significant are your skin concerns?",
      subtitle: "On a scale of 1–5, where 1 = mild and 5 = severe",
      field: "skinConcernsSeverity",
      required: true,
      options: [
        { id: "802_1", label: "1 – Very mild" },
        { id: "802_2", label: "2 – Somewhat noticeable" },
        { id: "802_3", label: "3 – Moderate" },
        { id: "802_4", label: "4 – Quite significant" },
        { id: "802_5", label: "5 – Very severe" },
      ],
    },

    4: {
      id: "803",
      type: "radio-text",
      title: "Are you currently using any hormonal birth control?",
      field: "usingBirthControl",
      textField: "birthControlDetails",
      required: true,
      options: [
        { id: "803_2", label: "No" },
        {
          id: "803_1",
          label: "Yes",
          showTextInput: true,
          textPlaceholder: "Please specify the type of hormonal birth control...",
        },
      ],
    },

    5: {
      id: "804",
      type: "radio",
      title: "How sensitive is your skin?",
      field: "skinSensitivity",
      required: true,
      options: [
        {
          id: "804_1",
          label:
            "Not sensitive-I can tolerate most skincare products without any concerns",
        },
        {
          id: "804_2",
          label:
            "Occasionally sensitive- My skin is occasionally irritated by skincare products",
        },
        {
          id: "804_3",
          label:
            "Very sensitive- My skin is frequently irritated by skincare products and I have to be careful with what I use",
        },
      ],
    },

    6: {
      id: "805",
      type: "radio-text",
      title:
        "Do you have any allergies to medications, preservatives or specific ingredients?",
      field: "hasAllergies",
      textField: "allergyDetails",
      required: true,
      options: [
        { id: "805_1", label: "No" },
        {
          id: "805_2",
          label: "Yes",
          showTextInput: true,
          textPlaceholder: "Please specify your allergies...",
        },
      ],
    },

    7: {
      id: "806",
      type: "checkbox",
      title: "What is your current skincare routine?",
      subtitle: "Check all that apply",
      field: "currentSkincareRoutine",
      required: true,
      exclusiveOptions: ["806_1"], // If "none" is selected, clear others
      options: [
        { id: "806_1", label: "None" },
        { id: "806_2", label: "Cleanser" },
        { id: "806_3", label: "Moisturizer" },
        { id: "806_4", label: "Sunscreen (SPF)" },
        { id: "806_5", label: "Exfoliator (AHA/BHA)" },
        { id: "806_6", label: "Retinol or prescription retinoids" },
        {
          id: "806_7",
          label: "Serums (Vitamin C, Hyaluronic Acid, Niacinamide, etc.)",
        },
      ],
    },

    8: {
      id: "807",
      type: "radio",
      title: "Have you used prescription skincare before?",
      field: "hasPrescriptionExperience",
      required: true,
      conditionalNavigation: {
        "807_1": 9, // Go to prescription types
        "807_2": 10, // Skip to sunscreen
      },
      options: [
        { id: "807_1", label: "Yes" },
        { id: "807_2", label: "No" },
      ],
    },

    9: {
      id: "808",
      type: "checkbox",
      title: "If yes, which ones?",
      subtitle: "Select all that apply",
      field: "prescriptionTypes",
      required: true,
      exclusiveOptions: ["808_6"],
      options: [
        { id: "808_1", label: "Tretinoin (Retin-A)" },
        { id: "808_2", label: "Benzoyl Peroxide" },
        { id: "808_3", label: "Hydroquinone" },
        { id: "808_4", label: "Azelaic Acid" },
        { id: "808_5", label: "Antibiotic creams" },
        { id: "808_6", label: "None of the above" },
      ],
    },

    10: {
      id: "809",
      type: "radio-text",
      title: "Do you use sunscreen?",
      field: "usesSunscreen",
      textField: "sunscreenDetails",
      required: true,
      conditionalActions: {
        "809_2": {
          action: "showPopup",
          popupType: "sunscreenEducation",
        },
      },
      options: [
        {
          id: "809_1",
          label: "Yes",

        },
        {
          id: "809_2",
          label: "No",

        },
      ],
    },

    11: {
      id: "810",
      type: "radio",
      title:
        "Are you currently pregnant, breastfeeding, or planning to become pregnant?",
      field: "isPregnantOrBreastfeeding",
      required: true,
      conditionalActions: {
        "810_1": {
          action: "showPopup",
          popupType: "pregnancyBlocking",
        },
      },
      options: [
        { id: "810_1", label: "Yes" },
        { id: "810_2", label: "No" },
      ],
    },

    12: {
      id: "811",
      type: "radio-text",
      title: "Do you take any medications?",
      subtitle:
        "This helps us ensure there are no interactions with skincare treatments.",
      field: "takingMedications",
      textField: "medicationDetails",
      required: true,
      options: [
        { id: "811_1", label: "No" },
        {
          id: "811_2",
          label: "Yes",
          showTextInput: true,
          textPlaceholder: "Please specify your medications...",
        },
      ],
    },

    13: {
      id: "812",
      type: "radio-text",
      title: "Do you have any medical conditions we should be aware of?",
      subtitle:
        "Some conditions can affect your skin or how it reacts to treatments.",
      field: "hasMedicalConditions",
      textField: "medicalConditionDetails",
      required: true,
      options: [
        { id: "812_1", label: "No" },
        {
          id: "812_2",
          label: "Yes",
          showTextInput: true,
          textPlaceholder: "Please specify your medical conditions...",
        },
      ],
    },

    14: {
      id: "813",
      type: "photo-upload",
      title: "Photo Upload",
      subtitle: "Please upload photos to help our healthcare providers assess your skin condition",
    },

    15: {
      id: "814",
      type: "id-upload",
      title: "ID Verification",
      subtitle: "Please upload a clear photo of your government-issued ID for verification purposes",
    },

    16: {
      id: "899",
      type: "thank-you",
      title: "Thank You",
      subtitle: "Completing your consultation",
    },
  },

  // Navigation configuration
  navigation: {
    1: 2,
    2: 3,
    3: 4,
    4: 5,
    5: 6,
    6: 7,
    7: 8,
    8: 9,
    9: 10,
    10: 11,
    11: 12,
    12: 13,
    13: 14,
    14: 15, // Photo upload goes to ID upload
    15: 16, // ID upload goes to thank you
    16: 17, // Thank you goes to recommendations
    17: 18, // Recommendations to completion
  },

  // Progress mapping
  progressMap: {
    1: 8,
    2: 15,
    3: 23,
    4: 31,
    5: 38,
    6: 46,
    7: 54,
    8: 62,
    9: 69,
    10: 77,
    11: 85,
    12: 92,
    13: 98,
    14: 98,
    15: 99, // ID upload step
    16: 100, // Thank you step shows 100%
    17: 100, // Recommendations step
    18: 100, // Completion step
  },

  // Step titles
  stepTitles: {
    1: "Skincare Goals",
    2: "Skin Type",
    3: "Skin Concerns Severity",
    4: "Birth Control",
    5: "Skin Sensitivity",
    6: "Allergies",
    7: "Current Skincare Routine",
    8: "Prescription Experience",
    9: "Prescription Types",
    10: "Sunscreen Usage",
    11: "Pregnancy/Breastfeeding",
    12: "Medications",
    13: "Medical Conditions",
    14: "Photo Upload",
    15: "ID Verification",
    16: "Thank You",
    17: "Product Recommendations",
    18: "Completion",
  },

  // Popup configurations
  popups: {
    otherGoals: {
      title: "Other Skin Concerns",
      message:
        "This questionnaire is specifically designed for anti-aging care. If you have other skin concerns, please exit and explore our full range of products on the skincare page.",
      buttons: [
        {
          label: "Go to Skincare Page",
          action: "redirect",
          url: "/skincare",
          primary: true,
        },
        {
          label: "Continue with Anti-Aging Quiz",
          action: "close",
          primary: false,
        },
      ],
    },
    sunscreenEducation: {
      title: "Did you know?",
      titleColor: "#C19A6B",
      message:
        "Using sunscreen daily is one of the most effective ways to prevent premature aging, wrinkles, and sun damage. It protects your skin and helps maximize the benefits of your anti-aging treatment.\n\nFor best results, start using sunscreen every day - rain or shine!",
      buttons: [{ label: "Continue", action: "continue", primary: true }],
    },
    pregnancyBlocking: {
      title: "Unable to Proceed",
      titleColor: "red",
      message:
        "We're sorry, but we are unable to proceed with treatment at this time. Please contact your healthcare provider for further assistance.",
      buttons: [
        { label: "Close", action: "close", primary: false },
      ],
    },
  },
};

import { HYPERPIGMENTATION_PRODUCTS } from "../../data/skincareProductData";
export const quizConfig = {
  recommendationRules: [
    {
      conditions: {
        skinSensitivity: "904_3",
      },
      outcome: {
        recommended: HYPERPIGMENTATION_PRODUCTS["1C"],
        alternatives: [
          HYPERPIGMENTATION_PRODUCTS["2C"],
          HYPERPIGMENTATION_PRODUCTS["3C"],
        ],
      },
    },
    {
      conditions: {
        skinSensitivity: "904_2",
        skinConcernsSeverity: 1,
      },
      outcome: {
        recommended: HYPERPIGMENTATION_PRODUCTS["1C"],
        alternatives: [
          HYPERPIGMENTATION_PRODUCTS["2C"],
          HYPERPIGMENTATION_PRODUCTS["3C"],
        ],
      },
    },
    {
      conditions: {
        skinSensitivity: "904_2",
      },
      outcome: {
        recommended: HYPERPIGMENTATION_PRODUCTS["2C"],
        alternatives: [
          HYPERPIGMENTATION_PRODUCTS["1C"],
          HYPERPIGMENTATION_PRODUCTS["3C"],
        ],
      },
    },
    {
      conditions: {
        skinSensitivity: "904_1",
        skinConcernsSeverity: 1,
      },
      outcome: {
        recommended: HYPERPIGMENTATION_PRODUCTS["1C"],
        alternatives: [
          HYPERPIGMENTATION_PRODUCTS["2C"],
          HYPERPIGMENTATION_PRODUCTS["3C"],
        ],
      },
    },
    {
      conditions: {
        skinSensitivity: "904_1",
        skinConcernsSeverity: 2,
      },
      outcome: {
        recommended: HYPERPIGMENTATION_PRODUCTS["2C"],
        alternatives: [
          HYPERPIGMENTATION_PRODUCTS["1C"],
          HYPERPIGMENTATION_PRODUCTS["3C"],
        ],
      },
    },
    {
      conditions: {
        skinSensitivity: "904_1",
        skinConcernsSeverity: 3,
        skinType: ["902_1", "902_2"],
      },
      outcome: {
        recommended: HYPERPIGMENTATION_PRODUCTS["3C"],
        alternatives: [
          HYPERPIGMENTATION_PRODUCTS["2C"],
          HYPERPIGMENTATION_PRODUCTS["1C"],
        ],
      },
    },
    {
      conditions: {
        skinSensitivity: "904_1",
        skinConcernsSeverity: 3,
      },
      outcome: {
        recommended: HYPERPIGMENTATION_PRODUCTS["2C"],
        alternatives: [
          HYPERPIGMENTATION_PRODUCTS["1C"],
          HYPERPIGMENTATION_PRODUCTS["3C"],
        ],
      },
    },
    {
      conditions: {}, // Default case
      outcome: {
        recommended: HYPERPIGMENTATION_PRODUCTS["1C"],
        alternatives: [
          HYPERPIGMENTATION_PRODUCTS["2C"],
          HYPERPIGMENTATION_PRODUCTS["3C"],
        ],
      },
    },
  ],
  steps: {
    "form_id": 9,
    1: {
      id: 900,
      type: "radio",
      title: "What are your skincare goals?",
      field: "skincareGoals",
      required: true,
      options: [
        {
          id: "900_1",
          label: "Reduce dark spots and hyperpigmentation",
        },
        {
          id: "900_2",
          label: "Other",
          action: "showPopup",
          popupType: "otherGoals",
        },
      ],
    },
    2: {
      id: 901,
      type: "radio",
      title: "How Significant are your skin concerns?",
      // subtitle: "1 = Mild, 2 = Moderate, 3 = Severe",
      field: "skinConcernsSeverity",
      required: true,
      options: [
        { id: "901_1", label: "1 – Mild" },
        { id: "901_2", label: "2 – Moderate" },
        { id: "901_3", label: "3 – Severe" },
      ],
    },
    3: {
      id: 902,
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
            "Oily in some areas (like the T-zone) and dry in others.",
        },
      },
      options: [
        { id: "902_1", label: "Normal" },
        { id: "902_2", label: "Oily" },
        { id: "902_3", label: "Dry" },
        { id: "902_4", label: "Oily in some areas and dry in others" },
      ],
    },
    4: {
      id: 903,
      type: "radio-text",
      title: "Are you currently using any hormonal birth control?",
      field: "usingHormonalBirthControl",
      textField: "hormonalBirthControlDetails",
      required: true,
      options: [
        { id: "903_1", label: "No" },
        {
          id: "903_2",
          label: "Yes",
          showTextInput: true,
          textPlaceholder: "Please specify the type of hormonal birth control...",
        },
      ],
    },
    5: {
      id: 904,
      type: "radio",
      title: "How sensitive is your skin?",
      field: "skinSensitivity",
      required: true,
      options: [
        {
          id: "904_1",
          label:
            "Not sensitive - I can tolerate most skincare products without any concerns",
        },
        {
          id: "904_2",
          label:
            "Occasionally sensitive - My skin is occasionally irritated by skincare products",
        },
        {
          id: "904_3",
          label:
            "Very sensitive - My skin is frequently irritated by skincare products and I have to be careful with what I use",
        },
      ],
    },
    6: {
      id: 905,
      type: "radio-text",
      title:
        "Do you have any allergies to medications, preservatives or specific ingredients?",
      field: "hasAllergies",
      textField: "allergyDetails",
      required: true,
      options: [
        { id: "905_1", label: "No" },
        {
          id: "905_2",
          label: "Yes",
          showTextInput: true,
          textPlaceholder: "Please specify your allergies...",
        },
      ],
    },
    7: {
      id: 906,
      type: "checkbox",
      title: "What is your Current Skincare Routine ?",
      field: "currentSkincareRoutine",
      required: true,
      exclusiveOptions: ["906_1"],
      options: [
        { id: "906_1", label: "None" },
        { id: "906_2", label: "Cleanser" },
        { id: "906_3", label: "Moisturizer" },
        { id: "906_4", label: "Sunscreen (SPF)" },
        { id: "906_5", label: "Exfoliator (AHA/BHA)" },
        { id: "906_6", label: "Retinol or prescription retinoids" },
        {
          id: "906_7",
          label: "Serums (Vitamin C, Hyaluronic Acid, Niacinamide, etc.)",
        },
      ],
    },
    8: {
      id: 907,
      type: "radio",
      title: "Have you used prescription skincare before?",
      field: "hasPrescriptionExperience",
      required: true,
      conditionalNavigation: {
        "907_1": 9,
        "907_2": 10,
      },
      options: [
        { id: "907_1", label: "Yes" },
        { id: "907_2", label: "No" },
      ],
    },
    9: {
      id: 908,
      type: "checkbox",
      title: "If yes, which ones?",
      subtitle: "Select all that apply",
      field: "prescriptionTypes",
      required: true,
      exclusiveOptions: ["908_6"],
      options: [
        { id: "908_1", label: "Tretinoin (Retin-A)" },
        { id: "908_2", label: "Benzoyl Peroxide" },
        { id: "908_3", label: "Hydroquinone" },
        { id: "908_4", label: "Azelaic Acid" },
        { id: "908_5", label: "Antibiotic creams" },
        { id: "908_6", label: "None of the above" },
      ],
    },
    10: {
      id: 909,
      type: "radio",
      title: "Do you use sunscreen?",
      field: "usesSunscreen",
      required: true,
      conditionalActions: {
        "909_2": {
          action: "showPopup",
          popupType: "sunscreenEducation",
        },
      },
      options: [
        { id: "909_1", label: "Yes" },
        { id: "909_2", label: "No" },
      ],
    },
    11: {
      id: 910,
      type: "radio",
      title:
        "Are you currently pregnant, breastfeeding, or planning to become pregnant?",
      field: "isPregnantOrBreastfeeding",
      required: true,
      conditionalActions: {
        "910_1": {
          action: "showPopup",
          popupType: "pregnancyBlocking",
        },
      },
      options: [
        { id: "910_1", label: "Yes" },
        { id: "910_2", label: "No" },
      ],
    },
    12: {
      id: 911,
      type: "radio-text",
      title: "Do you take any medications?",
      subtitle:
        "This helps us ensure there are no interactions with skincare treatments.",
      field: "takingMedications",
      textField: "medicationDetails",
      required: true,
      options: [
        { id: "911_1", label: "No" },
        {
          id: "911_2",
          label: "Yes",
          showTextInput: true,
          textPlaceholder: "Please specify your medications...",
        },
      ],
    },
    13: {
      id: 912,
      type: "radio-text",
      title: "Do you have any medical conditions we should be aware of?",
      subtitle:
        "Some conditions can affect your skin or how it reacts to treatments.",
      field: "hasMedicalConditions",
      textField: "medicalConditionDetails",
      required: true,
      options: [
        { id: "912_1", label: "No" },
        {
          id: "912_2",
          label: "Yes",
          showTextInput: true,
          textPlaceholder: "Please specify your medical conditions...",
        },
      ],
    },

    14: {
      id: "913",
      type: "photo-upload",
      title: "Photo Upload",
      subtitle: "Please upload photos to help our healthcare providers assess your skin condition",
    },

    15: {
      id: "914",
      type: "id-upload",
      title: "ID Verification",
      subtitle: "Please upload a clear photo of your government-issued ID for verification purposes",
    },

    16: {
      id: "999",
      type: "thank-you",
      title: "Thank You",
      subtitle: "Completing your consultation",
    },
  },

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

  progressMap: {
    1: 7,
    2: 14,
    3: 21,
    4: 28,
    5: 35,
    6: 42,
    7: 49,
    8: 56,
    9: 63,
    10: 70,
    11: 77,
    12: 84,
    13: 91,
    14: 98,
    15: 99, // ID upload step
    16: 100, // Thank you step shows 100%
    17: 100, // Recommendations step
    18: 100, // Completion step
  },

  stepTitles: {
    1: "Skincare Goals",
    2: "Skin Concerns Severity",
    3: "Skin Type",
    4: "Hormonal Birth Control",
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

  popups: {
    otherGoals: {
      title: "Other Skin Concerns",
      message:
        "This questionnaire is specifically designed for skin hyperpigmentation. If you have other skin concerns, please exit and explore our full range of products on the skincare page.",
      buttons: [
        {
          label: "Go to Skincare Page",
          action: "redirect",
          url: "/skincare",
          primary: true,
        },
        {
          label: "Continue with Hyperpigmentation Quiz",
          action: "close",
          primary: false,
        },
      ],
    },
    sunscreenEducation: {
      title: "Sunscreen is essential!",
      titleColor: "#C19A6B",
      message:
        "Daily sun protection is key to treating hyperpigmentation. Without it, dark spots can worsen and treatments may not work as well.\nStart wearing sunscreen every day to protect your skin and get the best results.",
      buttons: [{ label: "Continue", action: "continue", primary: true }],
    },
    pregnancyBlocking: {
      title: "Unable to Proceed",
      titleColor: "red",
      message:
        "We're sorry, but we are unable to proceed with treatment at this time. Please contact your healthcare provider for further assistance.",
      buttons: [
        // {
        //   label: "Contact Healthcare Provider",
        //   action: "redirect",
        //   url: "/contact-us",
        //   primary: true,
        // },
        { label: "Close", action: "close", primary: false },
      ],
    },
  },
};

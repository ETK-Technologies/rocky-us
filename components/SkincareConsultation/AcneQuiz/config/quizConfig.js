import { ACNE_PRODUCTS } from "../../data/skincareProductData";
// Anti-Aging Quiz Configuration - Data-driven approach
export const quizConfig = {
  recommendationRules: [
    // very-sensitive + 1A -> recommend Acne1 1A
    {
      conditions: {
        skinSensitivity: "1004_3",
        representAcne: ["1001_1"],
      },
      outcome: {
        strengthLevel: 1,
        reasoning: "1A strength required for very sensitive skin (comedonal)",
        recommended: ACNE_PRODUCTS["Acne1"].variation.find(
          (v) => v.key === "1A"
        ),
        alternatives: [
          ACNE_PRODUCTS["Acne1"].variation.find((v) => v.key === "1B"),
        ],
        maxStrength: 1,
      },
    },

    // very-sensitive + 2A -> recommend Acne2 2A (Acne2 has no variations)
    {
      conditions: {
        skinSensitivity: "1004_3",
        representAcne: ["1001_2"],
      },
      outcome: {
        strengthLevel: 1,
        reasoning:
          "very sensitive + severe comedonal -> consider Acne2 2A but conservative",
        recommended: ACNE_PRODUCTS["Acne1"].variation.find(
          (v) => v.key === "1A"
        ),
        alternatives: [],
        maxStrength: 1,
      },
    },
    // very-sensitive + 1B -> Acne1 1B (gentle inflammatory)
    {
      conditions: {
        skinSensitivity: "1004_3",
        representAcne: ["1001_3"],
      },
      outcome: {
        strengthLevel: 1,
        reasoning: "very sensitive + mild inflammatory -> recommend 1B",
        recommended: ACNE_PRODUCTS["Acne2"].variation.find(
          (v) => v.key === "2A"
        ),
        alternatives: [],
        maxStrength: 1,
      },
    },

    // very-sensitive + 2B -> map to Acne3 2B as conservative alternative
    {
      conditions: {
        skinSensitivity: "1004_3",
        representAcne: ["1001_4"],
      },
      outcome: {
        strengthLevel: 1,
        reasoning:
          "very sensitive + moderate inflammatory -> recommend conservative 2B mapping",
        recommended: ACNE_PRODUCTS["Acne2"].variation.find(
          (v) => v.key === "2A"
        ),
        alternatives: [],
        maxStrength: 1,
      },
    },

    // very-sensitive + 3B -> Acne3 3B but conservative
    {
      conditions: {
        skinSensitivity: "1004_3",
        representAcne: ["1001_5"],
      },
      outcome: {
        strengthLevel: 1,
        reasoning:
          "very sensitive + severe inflammatory -> recommend gentle inflammatory 1B if possible, else 3B",
        recommended: ACNE_PRODUCTS["Acne2"].variation.find(
          (v) => v.key === "2A"
        ),
        maxStrength: 1,
      },
    },

    // occasionally-sensitive Cases

    {
      conditions: {
        skinSensitivity: "1004_2",
        representAcne: ["1001_1"],
      },
      outcome: {
        strengthLevel: 1,
        reasoning: "depending on Choosen Acne Type ",
        recommended: ACNE_PRODUCTS["Acne1"].variation.find(
          (v) => v.key === "1A"
        ),
        alternatives: [
          ACNE_PRODUCTS["Acne1"].variation.find((v) => v.key === "1B"),
        ],
        maxStrength: 1,
      },
    },
    {
      conditions: {
        skinSensitivity: "1004_2",
        representAcne: ["1001_2"],
      },
      outcome: {
        strengthLevel: 1,
        reasoning: "depending on Choosen Acne Type ",
        recommended: ACNE_PRODUCTS["Acne1"].variation.find(
          (v) => v.key === "1B"
        ),
        alternatives: [ACNE_PRODUCTS["Acne1"].variation.find(
          (v) => v.key === "1A"
        ),],
        maxStrength: 1,
      },
    },
    {
      conditions: {
        skinSensitivity: "1004_2",
        representAcne: ["1001_3"],
      },
      outcome: {
        strengthLevel: 1,
        reasoning: "depending on Choosen Acne Type ",
        recommended: ACNE_PRODUCTS["Acne2"].variation.find(
          (v) => v.key === "2A"
        ),

        maxStrength: 1,
      },
    },
    {
      conditions: {
        skinSensitivity: "1004_2",
        representAcne: ["1001_4"],
      },
      outcome: {
        strengthLevel: 1,
        reasoning: "depending on Choosen Acne Type ",
        // Map input 2B -> canonical 3A (recommended: Acne3 3A)
        recommended: ACNE_PRODUCTS["Acne3"].variation.find(
          (v) => v.key === "3A"
        ),
        alternatives: [
          ACNE_PRODUCTS["Acne3"].variation.find((v) => v.key === "3B"),
        ],
        maxStrength: 1,
      },
    },
    {
      conditions: {
        skinSensitivity: "1004_2",
        representAcne: ["1001_5"],
      },
      outcome: {
        strengthLevel: 1,
        reasoning: "depending on Choosen Acne Type ",
        recommended: ACNE_PRODUCTS["Acne3"].variation.find(
          (v) => v.key === "3B"
        ),
        alternatives: [
          ACNE_PRODUCTS["Acne3"].variation.find((v) => v.key === "3A"),
        ],
        maxStrength: 1,
      },
    },

    //// End Of occasionally-sensitive

    {
      conditions: {
        skinSensitivity: "1004_1",
        skinType: "1002_1",
        representAcne: "1001_1",
      },
      outcome: {
        strengthLevel: 1,
        reasoning: "Depend on ACNE Type",
        recommended: ACNE_PRODUCTS["Acne1"].variation.find(
          (v) => v.key === "1A"
        ),
        alternatives: [
          ACNE_PRODUCTS["Acne1"].variation.find((v) => v.key === "1B"),
        ],
        maxStrength: 1,
      },
    },

    {
      conditions: {
        skinSensitivity: "1004_1",
        skinType: "1002_1",
        representAcne: "1001_2",
      },
      outcome: {
        strengthLevel: 1,
        reasoning: "Depend on ACNE Type",
        recommended: ACNE_PRODUCTS["Acne1"].variation.find(
          (v) => v.key === "1B"
        ),
        alternatives: [
          ACNE_PRODUCTS["Acne1"].variation.find((v) => v.key === "1A"),
        ],
        maxStrength: 1,
      },
    },

    {
      conditions: {
        skinSensitivity: "1004_1",
        skinType: "1002_1",
        representAcne: "1001_3",
      },
      outcome: {
        strengthLevel: 1,
        reasoning: "Depend on ACNE Type",
        recommended: ACNE_PRODUCTS["Acne2"].variation.find(
          (v) => v.key === "2A"
        ),

        maxStrength: 1,
      },
    },

    {
      conditions: {
        skinSensitivity: "1004_1",
        skinType: "1002_1",
        representAcne: "1001_4",
      },
      outcome: {
        strengthLevel: 1,
        reasoning: "Depend on ACNE Type",
        recommended: ACNE_PRODUCTS["Acne3"].variation.find(
          (v) => v.key === "3A"
        ),
        alternatives: [
          ACNE_PRODUCTS["Acne3"].variation.find((v) => v.key === "3B"),
        ],
        maxStrength: 1,
      },
    },

    {
      conditions: {
        skinSensitivity: "1004_1",
        skinType: "1002_1",
        representAcne: "1001_5",
      },
      outcome: {
        strengthLevel: 1,
        reasoning: "Depend on ACNE Type",
        recommended: ACNE_PRODUCTS["Acne3"].variation.find(
          (v) => v.key === "3B"
        ),
        alternatives: [
          ACNE_PRODUCTS["Acne3"].variation.find((v) => v.key === "3A"),
        ],
        maxStrength: 1,
      },
    },

    {
      conditions: {
        skinSensitivity: "1004_1",
        skinType: "1002_2",
        representAcne: ["1001_1", "1001_2", "1001_3"],
      },
      outcome: {
        strengthLevel: 1,
        reasoning: "1B strength required for oily skin depending on acne type",
        recommended: ACNE_PRODUCTS["Acne2"].variation.find(
          (v) => v.key === "2A"
        ),
        maxStrength: 1,
      },
    },

    {
      conditions: {
        skinSensitivity: "1004_1",
        skinType: "1002_2",
        representAcne: ["1001_4"],
      },
      outcome: {
        strengthLevel: 1,
        reasoning: "depending on Choosen Acne Type ",
        recommended: ACNE_PRODUCTS["Acne3"].variation.find(
          (v) => v.key === "3A"
        ), // replaced 2B with 3A
        maxStrength: 1,
        alternatives: [
          ACNE_PRODUCTS["Acne3"].variation.find((v) => v.key === "3B"),
        ],
      },
    },

    {
      conditions: {
        skinSensitivity: "1004_1",
        skinType: "1002_2",
        representAcne: ["1001_5"],
      },
      outcome: {
        strengthLevel: 1,
        reasoning: "depending on Choosen Acne Type ",
        recommended: ACNE_PRODUCTS["Acne3"].variation.find(
          (v) => v.key === "3B"
        ),
        alternatives: ACNE_PRODUCTS["Acne3"].variation.filter(
          (v) => v.key !== "3A"
        ),
        maxStrength: 1,
      },
    },

    {
      conditions: {
        skinSensitivity: "1004_1",
        skinType: "1002_3",
        representAcne: ["1001_1", "1001_2"],
      },
      outcome: {
        strengthLevel: 1,
        reasoning: "1B Depending on Acne Type and skin sensitivity",
        recommended: ACNE_PRODUCTS["Acne1"].variation.find(
          (v) => v.key === "1A"
        ),
        maxStrength: 1,
      },
    },
    {
      conditions: {
        skinSensitivity: "1004_1",
        skinType: "1002_3",
        representAcne: ["1001_3", "1001_4", "1001_5"],
      },
      outcome: {
        strengthLevel: 1,
        reasoning: "Depending on Acne Type",
        recommended: ACNE_PRODUCTS["Acne3"].variation.find(
          (v) => v.key === "3B"
        ),
        maxStrength: 1,
      },
    },
    {
      conditions: {
        skinSensitivity: "1004_1",
        skinType: "1002_4",
        representAcne: ["1001_1"],
      },
      outcome: {
        strengthLevel: 1,
        reasoning: "Depending on Acne Type",
        recommended: ACNE_PRODUCTS["Acne2"].variation.find(
          (v) => v.key === "2A"
        ),

        maxStrength: 1,
      },
    },

    {
      conditions: {
        skinSensitivity: "1004_1",
        skinType: "1002_4",
        representAcne: ["1001_2"],
      },
      outcome: {
        strengthLevel: 1,
        reasoning: "Depending on Acne Type",
        recommended: ACNE_PRODUCTS["Acne2"].variation.find(
          (v) => v.key === "2A"
        ),

        maxStrength: 1,
      },
    },


    {
      conditions: {
        skinSensitivity: "1004_1",
        skinType: "1002_4",
        representAcne: ["1001_3"],
      },
      outcome: {
        strengthLevel: 1,
        reasoning: "Depending on Acne Type",
        recommended: ACNE_PRODUCTS["Acne2"].variation.find(
          (v) => v.key === "2A"
        ),

        maxStrength: 1,
      },
    },

    {
      conditions: {
        skinSensitivity: "1004_1",
        skinType: "1002_4",
        representAcne: ["1001_4"],
      },
      outcome: {
        strengthLevel: 1,
        reasoning: "Depending on Acne Type",
        recommended: ACNE_PRODUCTS["Acne3"].variation.find(
          (v) => v.key === "3A"
        ),
        alternatives: [ACNE_PRODUCTS["Acne3"].variation.find(
          (v) => v.key === "3B"
        )],
        maxStrength: 1,
      },
    },

    {
      conditions: {
        skinSensitivity: "1004_1",
        skinType: "1002_4",
        representAcne: ["1001_5"],
      },
      outcome: {
        strengthLevel: 1,
        reasoning: "Depending on Acne Type",
        recommended: ACNE_PRODUCTS["Acne3"].variation.find(
          (v) => v.key === "3B"
        ),
        alternatives: [ACNE_PRODUCTS["Acne3"].variation.find(
          (v) => v.key === "3A"
        )],
        maxStrength: 1,
      },
    },



    {
      conditions: {}, // Default case
      outcome: {
        strengthLevel: 2,
        reasoning: "2E strength recommended based on your skin profile",
        recommended: ACNE_PRODUCTS["Acne1"].variation.find(
          (v) => v.key === "1A"
        ),
        alternatives: ACNE_PRODUCTS["Acne1"].variation.filter(
          (v) => v.key !== "1B"
        ),
        maxStrength: 2,
      },
    },
  ],

  steps: {
    "form_id": 10,
    1: {
      id: "1000",
      type: "radio",
      title: "What are your skincare goals?",
      // subtitle: "Check all that apply",
      field: "skincareGoals",
      required: true,
      options: [
        {
          id: "1000_1",
          label: "Clear acne and breakouts",
        },
        {
          id: "1000_2",
          label: "Other",
          action: "showPopup",
          popupType: "otherGoals",
        },
      ],
    },

    2: {
      id: "1001",
      type: "radio-image",
      title: " Which of following best represents your acne ?",
      field: "representAcne",
      required: true,
      options: [
        {
          id: "1001_1",
          label: "Mild to Moderate Comedonal Acne",
          image: "/skin-care/mild_comedonal.png",
          // image: "/skin-care/moderate_comedonal.png",
          infoIcon: true,
          infoText: "Mostly small blackheads and whiteheads",
        },
        {
          id: "1001_2",
          label: "Severe Comedonal Acne",
          // image: "/skin-care/mild_comedonal.png",
          image: "/skin-care/moderate_comedonal.png",
          infoIcon: true,
          infoText: " Many blackheads and whiteheads across larger areas",
        },
        {
          id: "1001_3",
          label: "Mild Inflammatory acne",
          image: "/skin-care/mild_inflammatory.png",
          infoIcon: true,
          infoText: "A few small red pimples or pustules",
        },
        {
          id: "1001_4",
          label: "Moderate Inflammatory acne",
          image: "/skin-care/moderate_inflammatory.png",
          infoIcon: true,
          infoText: "Noticeable red, swollen pimples and pustules",
        },
        {
          id: "1001_5",
          label: "Severe Inflammatory acne",
          image: "/skin-care/severe_inflammatory.png",
          infoIcon: true,
          infoText: " Large, painful, red bumps or cysts",
        },
      ],
    },

    3: {
      id: "1002",
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
        { id: "1002_1", label: "Normal" },
        { id: "1002_2", label: "Oily" },
        { id: "1002_3", label: "Dry" },
        { id: "1002_4", label: "Both dry and oily" },
      ],
    },

    4: {
      id: "1003",
      type: "radio-text",
      title: "Are you currently using any hormonal birth control?",
      field: "usingBirthControl",
      textField: "birthControlDetails",
      required: true,
      options: [
        {
          id: "1003_1",
          label: "Yes",
          showTextInput: true,
          textPlaceholder: "Please specify the type of hormonal birth control...",
        },
        { id: "1003_2", label: "No" },
      ],
    },

    5: {
      id: "1004",
      type: "radio",
      title: "How sensitive is your skin?",
      field: "skinSensitivity",
      required: true,
      options: [
        {
          id: "1004_1",
          label:
            "Not sensitive-I can tolerate most skincare products without any concerns",
        },
        {
          id: "1004_2",
          label:
            "Occasionally sensitive- My skin is occasionally irritated by skincare products",
        },
        {
          id: "1004_3",
          label:
            "Very sensitive- My skin is frequently irritated by skincare products and I have to be careful with what I use",
        },
      ],
    },

    6: {
      id: "1005",
      type: "radio-text",
      title:
        "Do you have any allergies to medications, preservatives or specific ingredients?",
      field: "hasAllergies",
      textField: "allergyDetails",
      required: true,
      options: [
        { id: "1005_1", label: "No" },
        {
          id: "1005_2",
          label: "Yes",
          showTextInput: true,
          textPlaceholder: "Please specify your allergies...",
        },
      ],
    },

    7: {
      id: "1006",
      type: "checkbox",
      title: "Current Skincare Routine",
      // subtitle: "Check all that apply",
      field: "currentSkincareRoutine",
      required: true,
      exclusiveOptions: ["1006_1"], // If "none" is selected, clear others
      options: [
        { id: "1006_1", label: "None" },
        { id: "1006_2", label: "Cleanser" },
        { id: "1006_3", label: "Moisturizer" },
        { id: "1006_4", label: "Sunscreen (SPF)" },
        { id: "1006_5", label: "Exfoliator (AHA/BHA)" },
        { id: "1006_6", label: "Retinol or prescription retinoids" },
        {
          id: "1006_7",
          label: "Serums (Vitamin C, Hyaluronic Acid, Niacinamide, etc.)",
        },
      ],
    },

    8: {
      id: "1007",
      type: "radio",
      title: "Have you used prescription skincare before?",
      field: "hasPrescriptionExperience",
      required: true,
      conditionalNavigation: {
        "1007_1": 9, // Go to prescription types
        "1007_2": 10, // Skip to sunscreen
      },
      options: [
        { id: "1007_1", label: "Yes" },
        { id: "1007_2", label: "No" },
      ],
    },

    9: {
      id: "1008",
      type: "checkbox",
      title: "If yes, which ones?",
      subtitle: "Select all that apply",
      field: "prescriptionTypes",
      required: true,
      exclusiveOptions: ["1008_6"],
      textField: "prescriptionTypesOther",
      // conditionalTextField: {
      //   triggerValue: "1008_6",
      //   placeholder: "Please specify",
      //   required: true
      // },
      options: [
        { id: "1008_1", label: "Tretinoin (Retin-A)" },
        { id: "1008_2", label: "Benzoyl Peroxide" },
        { id: "1008_3", label: "Hydroquinone" },
        { id: "1008_4", label: "Azelaic Acid" },
        { id: "1008_5", label: "Antibiotic creams" },
        { id: "1008_6", label: "None of the above" },
      ],
    },

    10: {
      id: "1009",
      type: "radio",
      title: "Do you use sunscreen?",
      field: "usesSunscreen",
      required: true,
      conditionalActions: {
        "1009_2": {
          action: "showPopup",
          popupType: "sunscreenEducation",
        },
      },
      options: [
        { id: "1009_1", label: "Yes" },
        { id: "1009_2", label: "No" },
      ],
    },

    11: {
      id: "1010",
      type: "radio",
      title:
        "Are you currently pregnant, breastfeeding, or planning to become pregnant?",
      field: "isPregnantOrBreastfeeding",
      required: true,
      conditionalActions: {
        "1010_1": {
          action: "showPopup",
          popupType: "pregnancyBlocking",
        },
      },
      options: [
        { id: "1010_1", label: "Yes" },
        { id: "1010_2", label: "No" },
      ],
    },

    12: {
      id: "1011",
      type: "radio-text",
      title: "Do you take any medications?",
      subtitle:
        "This helps us ensure there are no interactions with skincare treatments.",
      field: "takingMedications",
      textField: "medicationDetails",
      required: true,
      options: [
        { id: "1011_1", label: "No" },
        {
          id: "1011_2",
          label: "Yes",
          showTextInput: true,
          textPlaceholder: "Please specify your medications...",
        },
      ],
    },

    13: {
      id: "1012",
      type: "radio-text",
      title: "Do you have any medical conditions we should be aware of?",
      subtitle:
        "Some conditions can affect your skin or how it reacts to treatments.",
      field: "hasMedicalConditions",
      textField: "medicalConditionDetails",
      required: true,
      options: [
        { id: "1012_1", label: "No" },
        {
          id: "1012_2",
          label: "Yes",
          showTextInput: true,
          textPlaceholder: "Please specify your medical conditions...",
        },
      ],
    },

    14: {
      id: "1013",
      type: "photo-upload",
      title: "Photo Upload",
      subtitle: "Please upload photos to help our healthcare providers assess your skin condition",
    },

    15: {
      id: "1014",
      type: "id-upload",
      title: "ID Verification",
      subtitle: "Please upload a clear photo of your government-issued ID for verification purposes",
    },

    16: {
      id: "1999",
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
    12: 90,
    13: 95,
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
        "This questionnaire is specifically designed for Acne. If you have other skin concerns, please exit and explore our full range of products on the skincare page.",
      buttons: [
        {
          label: "Go to Skincare Page",
          action: "redirect",
          url: "/skincare",
          primary: true,
        },
        {
          label: "Continue with Acne Quiz",
          action: "close",
          primary: false,
        },
      ],
    },
    sunscreenEducation: {
      title: "Did you know?",
      titleColor: "#C19A6B",
      message:
        "Using sunscreen daily is one of the most effective ways to protect acne-prone skin from further irritation and long-term damage. \nIt helps prevent post-acne marks from getting darker and supports the healing process. \nFor best results, apply sunscreen every day, rain or shine to keep your skin clear and protected.",
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

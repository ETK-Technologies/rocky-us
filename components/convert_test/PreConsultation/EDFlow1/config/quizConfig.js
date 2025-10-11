import { EDProducts } from "../../data/PreConsultationProductsData";

//  Quiz Configuration - Data-driven approach (ED flow)
export const quizConfig = {
  // Recommendation rules derived from the legacy `getRecommendedProduct()` logic.
  // NOTE: rules are data descriptors only. The recommendation engine should
  // create a shallow copy of the product (e.g. { ...product, selectedPreference })
  // instead of mutating the imported `EDProducts` objects.
  recommendationRules: [
    {
      conditions: {
        takenBefore: "no",
      },
      outcome: {
        recommended: EDProducts.varietyPackProduct,
        selectedPreference: "generic",
        alternatives: [EDProducts.viagraProduct, EDProducts.cialisProduct],
      },
    },

    {
      conditions: {
        takenBefore: "yes",
        frequency: "4_or_more",
        medicationTiming: "short-lasting",
      },
      outcome: {
        recommended: EDProducts.viagraProduct,
        selectedPreference: "generic",
        alternatives: [
          EDProducts.cialisProduct,
          EDProducts.varietyPackProduct,
          EDProducts.mounjaroProduct,
        ],
      },
    },

    {
      conditions: {
        takenBefore: "yes",
        frequency: ["2-3", "once"],
        medicationTiming: ["long-lasting"],
        brandPreference: "brand",
      },
      outcome: {
        recommended: EDProducts.cialisProduct,
        selectedPreference: "brand",
        alternatives: [
          EDProducts.viagraProduct,
          EDProducts.varietyPackProduct,
          EDProducts.mounjaroProduct,
        ],
      },
    },

    {
      conditions: {
        takenBefore: "yes",
        frequency: ["2-3", "once"],
        medicationTiming: ["long-lasting"],
        brandPreference: "generic",
      },
      outcome: {
        recommended: EDProducts.cialisProduct,
        selectedPreference: "generic",
        alternatives: [
          EDProducts.viagraProduct,
          EDProducts.varietyPackProduct,
          EDProducts.mounjaroProduct,
        ],
      },
    },

    {
      conditions: {
        takenBefore: "yes",
        medicationTiming: ["short-lasting"],
        brandPreference: "brand",
      }, // Default case
      outcome: {
        recommended: EDProducts.viagraProduct,
        selectedPreference: "brand",
        alternatives: [
          EDProducts.varietyPackProduct,
          EDProducts.mounjaroProduct,
        ],
      },
    },

    {
      conditions: {
        takenBefore: "yes",
        medicationTiming: ["short-lasting"],
        brandPreference: "generic",
      }, // Default case
      outcome: {
        recommended: EDProducts.viagraProduct,
        selectedPreference: "generic",
        alternatives: [
          EDProducts.varietyPackProduct,
          EDProducts.mounjaroProduct,
        ],
      },
    },

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
      id: "resultsLookingFor",
      type: "radio",
      title: "What bedroom boost are you looking for?",
      field: "resultsLookingFor",
      required: true,
      showSignIn: true,
      // show an informational popup after selection to mirror the design
      conditionalActions: {
        "getting-hard": { action: "showPopup", popupType: "benefits" },
        "staying-hard": { action: "showPopup", popupType: "benefits" },
        "more-confidence": { action: "showPopup", popupType: "benefits" },
        all: { action: "showPopup", popupType: "benefits" },
      },
      options: [
        { id: "getting-hard", label: "Getting hard" },
        { id: "staying-hard", label: "Staying hard" },
        { id: "more-confidence", label: "More confidence in bed" },
        { id: "all", label: "All of the above" },
      ],
    },

    2: {
      id: "frequency",
      type: "radio",
      title: "How often do you have sex?",
      field: "frequency",
      required: true,
      showSignIn: false,
      options: [
        { id: "once", label: "Once a week or less" },
        { id: "2-3", label: "2-3 times a week" },
        { id: "4_or_more", label: "4 or more times a week" },
      ],
    },

    3: {
      id: "symptomDisruption",
      type: "radio",
      title: "How often do symptoms disrupt your sex life?",
      field: "symptomDisruption",
      required: true,
      conditionalActions: {
        "pretty-often": { action: "showPopup", popupType: "notAlone" },
        occasionally: { action: "showPopup", popupType: "notAlone" },
        rarely: { action: "showPopup", popupType: "notAlone" },
        both: { action: "showPopup", popupType: "notAlone" },
      },
      options: [
        { id: "pretty-often", label: "Pretty often" },
        { id: "occasionally", label: "Occasionally" },
        { id: "rarely", label: "Rarely" },
      ],
    },

    4: {
      id: "takenBefore",
      type: "radio",
      title: "Have you taken ED meds before?",
      field: "takenBefore",
      required: true,
      options: [
        { id: "yes", label: "Yes" },
        { id: "no", label: "No" },
      ],
    },

    5: {
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
        { id: "", label: "Province" },
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

    6: {
      id: "dateOfBirth",
      type: "date",
      passIf: "authenticate",
      
      showMessage: "Good news! We have providers in your province",
      title: "Let us know your age",
      showSignIn: true,
      subtitle: "We need to know if you may be eligible for treatment",
      field: "dateOfBirth",
      required: true,
      placeholder: "MM-DD-YYYY",
    },

    7: {
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
       privacyNoteStyle:
        "bg-[#F8F8F8] p-[12px] rounded-[8px] text-[12px] font-medium text-[#00000099] flex items-center gap-2 justify-center",
      privacyNote:
        "Rocky takes your privacy seriously. We respect your privacy. All of your information is securely stored on our PIPEDA Compliant server.",
     
    },

    8: {
      id: "medicationTiming",
      type: "radio",
      title: "What kind of medication are you looking for?",
      field: "medicationTiming",
      required: true,
      options: [
        {
          id: "long-lasting",
          label: "Long-lasting (36 hours)",
        },
        {
          id: "short-lasting",
          label: "Short-lasting (4 hours)",
        },
      ],
    },

    9: {
      id: "brandPreference",
      type: "radio",
      title: "Do you prefer a brand name or generic?",
      field: "brandPreference",
      required: true,
      subtitle:
        "Generic offers the same ingredients and performance, but costs up to 68% less.",
      options: [
        {
          id: "generic",
          label: "Generic works for me (more bang for your buck)",
        },
        { id: "brand", label: "I prefer the brand name" },
      ],
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
  },

  // Progress mapping (8 steps) - values represent percent complete for each step
  progressMap: {
    1: 0,
    2: 25,
    3: 37,
    4: 50,
    5: 62,
    6: 75,
    7: 87,
    8: 92,
    9: 97,
  },

  // Step titles
  stepTitles: {
    1: "What You Want",
    2: "Frequency",
    3: "Symptoms",
    4: "You’re Not Alone",
    5: "Province",
    6: "Age",
    7: "Contact",
    8: "Medication",
    9: "Brand Preference",
  },

  // Popup configurations
  popups: {
    benefits: {
      contentAlign: "left",
      asPage: false,
      showTitles: false,
      component: "ProgressCycle",
      headerStyle:
        "subheaders-font text-[#31302F] text-[26px] md:text-[32px] mb-[24px] font-medium tracking-tight leading-[120%]",
      title: "of Rocky Patients perform better in bed. Here’s why: ",
      messageStyle:
        "text-[16px] font-medium max-w-lg  leading-[140%] mb-[24px]",
      message:
        "<span style='color:#AE7E56'>✓</span> Health Canada Approved medications \n <span style='color:#AE7E56'>✓</span> Personalized treatment plans \n <span style='color:#AE7E56'>✓</span> 24/7 medical support",
      image: "/ed-pre-consultation/benefits.png",
      imageStyle: "w-[335px] h-[324px] rounded-[32px] mb-4",
      buttons: [
        {
          label: "Continue",
          action: "continue",
          primary: true,
        },
      ],
    },

    notAlone: {
      asPage: false,
      contentAlign: "left",
      headerStyle:
        "headers-font text-[26px] text-[#814B00] md:text-[32px] leading-[120%] mb-[16px] mt-8",
      title: "You’re not alone.",
      messageStyle:
        "text-[26px] font-[450] md:text-[28px] leading-[140%] mb-[24px]",
      message: "Nearly half of Canadian men experience erectile dysfunction*",
      image: "/ed-pre-consultation/not-alone.png",
      imageStyle: "w-[335px] h-[324px] rounded-[0px] mb-4",
      buttons: [
        {
          label: "Continue",
          action: "continue",
          primary: true,
        },
      ],
      GroverText: true,
    },
  },
};

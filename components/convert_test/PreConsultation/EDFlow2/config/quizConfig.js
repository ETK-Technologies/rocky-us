import privacyPolicy from "@/app/privacy-policy/page";
import { EDProducts } from "../../data/PreConsultationProductsData";
import { progress } from "framer-motion";

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
        medicationTiming: ["long-lasting"],
      },
      outcome: {
        recommended: EDProducts.cialisProduct2,
        selectedPreference: "generic",
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
        frequency: ["2-3", "once", "4_or_more"],
        medicationTiming: ["long-lasting"],
      },
      outcome: {
        recommended: EDProducts.cialisProduct2,
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
        recommended: EDProducts.cialisProduct2,
        selectedPreference: "generic",
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
      id: "goalsForBetterSex",
      type: "checkbox",
      title: "What are your goals?",
      field: "goalsForBetterSex",
      subtitle:
        "<span class='text-[#757575] text-[14px]'>Select all that apply</span>",
      required: true,
      showSignIn: false,
      // show an informational popup after selection to mirror the design
      conditionalActions: {
        "that gets you hard": { action: "showPopup", popupType: "benefits" },
        "that keeps you hard": { action: "showPopup", popupType: "benefits" },
        "that gets you hard and keeps you hard": { action: "showPopup", popupType: "benefits" },
        "that gets you hard, keeps you hard and gives you more confidence in bed": { action: "showPopup", popupType: "benefits" },
      },
      options: [
        { id: "that gets you hard", label: "Getting hard" },
        { id: "that keeps you hard", label: "Staying hard" },
        { id: "that gets you hard and keeps you hard", label: "More confidence in bed" },
        { id: "that gets you hard, keeps you hard and gives you more confidence in bed", label: "All of the above" },
      ],
    },

    2: {
      id: "contactEmail",
      type: "form",
      passIf: "authenticate",
      title: "Let’s start your health profile",
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
      privacyNoteStyle:
        "bg-[#F8F8F8] p-[12px] rounded-[8px] text-[12px] font-medium text-[#00000099] flex items-center gap-2 justify-center",
      privacyNote:
        "Rocky takes your privacy seriously. We respect your privacy. All of your information is securely stored on our HIPAA Compliant server.",
      required: true,
    },

    3: {
      id: "userInfo",
      passIf: "authenticate",
      type: "form",
      title: "Answer a few questions to see if you’re eligble for treatmeent",
      fields: [
        {
          id: "sex",
          label: "Sex Assigned at Birth",
          type: "radio",
          options: [
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
          ],
          conditionalActions: {
            Female: { action: "showPopup", popupType: "WomenRestriction" },
          },
        },
        {
          id: "dateOfBirth",
          label: "Basic information",
          type: "date",
          placeholder: "MM/DD/YYYY",
        }
      ],
      privacyNoteStyle:
        "bg-[#F8F8F8] p-[12px] rounded-[8px] text-[12px] font-medium text-[#00000099] flex items-center gap-2 justify-center",

      privacyNote:
        "Rocky takes your privacy seriously. We respect your privacy. All of your information is securely stored on our HIPAA Compliant server.",
      required: true,
    },

    4: {
      id: "sexFrequency",
      type: "radio",
      title: "How often do you have sex?",
      field: "sexFrequency",
      required: true,
      showSignIn: false,
      // showMessage: "Promo applied: Free online assessment",
      options: [
        { id: "That helps you have amazing sex once a week or less", label: "Once a week or less" },
        { id: "That helps you have amazing sex 2-3 times a week", label: "2-3 times a week" },
        { id: "That helps you have amazing sex 4 or more times a week", label: "4 or more times a week" },
      ],
    },

    5: {
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
    6: {
      id: "medicationTiming",
      type: "radio",
      title: "Which of these best fits into your routine?",
      field: "medicationTiming",
      required: true,
      showSignIn: false,
      options: [
        { id: "short-lasting", label: "As-needed before sex" },
        {
          id: "long-lasting",
          label: "Once a day so I don’t have a plan ahead",
        },
      ],
    },

    7: {
      id: "brandPreference",
      type: "radio",
      title: "Do you prefer a brand name or generic?",
      field: "brandPreference",
      required: true,
      subtitle:
        "Generic offers the same ingredients and performance, but costs up to 68% less.",
      conditionalActions: {
        generic: { action: "showPopup", popupType: "WantSomeThing" },
        brand: { action: "showPopup", popupType: "WantSomeThing" },
      },
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
  },

  // Progress mapping (8 steps) - values represent percent complete for each step
  progressMap: {
    1: 0,
    2: 25,
    3: 37,
    4: 50,
    5: 62,
    6: 75,
    7: 88,
    8: 95,
  },

  // Step titles
  stepTitles: {
    1: "Goals",
    2: "Contact",
    3: "Basic Info",
    4: "Frequency",
    5: "Routine",
    6: "Brand Preference",
  },

  // Popup configurations
  popups: {
    benefits: {
      asPage: false,
      contentAlign: "left",
      component: "ProgressCycle",
      headerStyle:
        "subheaders-font text-[#31302F] text-[32px] mb-[24px] font-normal leading-[115%]",
      title: "of Rocky Patients perform better in bed.",
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
    },

    WomenRestriction: {
      asPage: false,
      contentAlign: "left",
      headerStyle:
        "headers-font text-[26px] text-red  leading-[120%] mb-[16px] mt-8",
      title: "We Are Sorry!",
      messageStyle:
        "text-[16px] mb-[24px]",
      message:
        "This service is for men only and we are therefore unable to assist you. If this is for your partner, please have them complete the process.",
      image: "/ed-pre-consultation/not-alone.png",
      imageStyle: "w-[335px] h-[324px] rounded-[0px] mb-4",
      buttons: [
        {
          label: "Cancel",
          action: "cancel",
          primary: true,
        },
      ],
    },
    WantSomeThing: {
      id: "WantSomeThing",
      asPage: true,
      isWL: false,
      progress: 98,
      contentAlign: "left",
      headerStyle:
        "headers-font text-[26px]  leading-[120%] mb-[24px] mt-[60px]",
      title: "You want something...",
      content: `<div class='flex justify-center items-start flex-col  gap-[16px]'>
                <div class="flex justify-center items-center gap-[8px]">
                  <div class="font-medium text-[16px] leading-[140%] ">✔</div>
                  <div class="font-medium text-[16px] leading-[140%] underline text-[#AE7E56]">[medicationTiming]</div>
                </div>
                <div class="flex justify-center items-center gap-[8px]">
                  <div class="font-medium text-[16px] leading-[140%] ">✔</div>
                  <div class="font-medium text-[16px] leading-[140%] underline text-[#AE7E56]">[goalsForBetterSex]</div>
                </div>
                <div class="flex justify-center items-center gap-[8px]">
                  <div class="font-medium text-[16px] leading-[140%] ">✔</div>
                  <div class="font-medium text-[16px] leading-[140%] underline text-[#AE7E56]">[how-often]</div>
                </div>

              </div>`,
      image: "/ed-pre-consultation/not-alone.png",
      imageStyle: "w-[335px] h-[324px] rounded-[0px] mb-4",
      buttons: [
        {
          label: "Continue",
          action: "continue",
          primary: true,
        },
      ],
    },
  },
};

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
      id: "mail&passwordForm",
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
      required: true,
      privacyNoteStyle:
        "bg-[#F8F8F8] p-[12px] rounded-[8px] text-[12px] font-medium text-[#00000099] flex items-center gap-2 justify-center",
      privacyNote:
        "Rocky takes your privacy seriously. We respect your privacy. All of your information is securely stored on our PIPEDA Compliant server.",

      required: true,
    },
    2: {
      id: "userInfo",
      passIf: "authenticate",
      type: "form",
      title: "Answer a few questions to see if you’re eligble for treatmeent",
      subtitle:
        "<span class='text-[#757575]'>It’s just like the intake forms at the doctor.</span>",
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
        },
        {
          id: "zip",
          type: "text",
          placeholder: "Postal Code",
        },

        {
          id: "Phone Number",

          type: "text",
          placeholder: "Phone Number",
        },
      ],
      privacyNoteStyle:
        "bg-[#F8F8F8] p-[12px] rounded-[8px] text-[12px] font-medium text-[#00000099] flex items-center gap-2 justify-center",
      privacyNote:
        "Rocky takes your privacy seriously. We respect your privacy. All of your information is securely stored on our PIPEDA Compliant server.",

      required: true,
    },
  },

  // Navigation configuration
  navigation: {
    1: 2,
    2: 3,
  },

  // Progress mapping (8 steps) - values represent percent complete for each step
  progressMap: {
    1: 75,
    2: 85,
    3: 92,
  },

  // Step titles
  stepTitles: {
    1: "Account",
    2: "UserInformation",
  },

  // Popup configurations
  popups: {
    WomenRestriction: {
      asPage: false,
      contentAlign: "left",
      headerStyle:
        "headers-font text-[26px] text-red  leading-[120%] mb-[16px] mt-8",
      title: "We Are Sorry!",
      messageStyle: "text-[16px] mb-[24px]",
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
  },
};

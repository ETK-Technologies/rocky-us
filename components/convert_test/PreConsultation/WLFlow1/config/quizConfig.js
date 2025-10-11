import { WLProducts } from "../../data/PreConsultationProductsData";
//  Quiz Configuration - Data-driven approach
export const quizConfig = {
  recommendationRules: [
    // Weight loss recommendation logic
    {
      conditions: {
        bmi: (bmi) => bmi < 27,
      },
      outcome: {
        recommended: null,
        alternatives: [],
        message: "You are not eligible for medical weight loss.",
      },
    },
    {
      conditions: {
        bmi: (bmi) => bmi >= 27,
        weightDuration: "less-than-6",
      },
      outcome: {
        recommended: WLProducts.RYBELSUS,
        alternatives: [WLProducts.OZEMPIC, WLProducts.WEGOVY],
      },
    },
    {
      conditions: {
        bmi: (bmi) => bmi >= 27,
      },
      outcome: {
        recommended: WLProducts.OZEMPIC,
        alternatives: [WLProducts.WEGOVY, WLProducts.MOUNJARO],
      },
    },
    {
      conditions: {}, // Default case
      outcome: {
        recommended: WLProducts.OZEMPIC,
        alternatives: [WLProducts.WEGOVY, WLProducts.MOUNJARO],
      },
    },
  ],

  steps: {
    1: {
      id: "topPriority",
      type: "checkbox",
      Qheader: true,
      title: "Which of these is your top priority?",
      field: "topPriority",
      required: true,
      conditionalActions: {
        "lose-weight": {
          action: "showPopup",
          popupType: "longTermBenefits",
        },
        "gain-muscle": {
          action: "showPopup",
          popupType: "longTermBenefits",
        },
        "improve-health": {
          action: "showPopup",
          popupType: "longTermBenefits",
        },
        "increase-confidence": {
          action: "showPopup",
          popupType: "longTermBenefits",
        },
        "increase-energy": {
          action: "showPopup",
          popupType: "longTermBenefits",
        },
      },

      options: [
        {
          id: "lose-weight",
          label: "Lose Weight",
        },
        {
          id: "gain-muscle",
          label: "Gain Muscle",
        },
        {
          id: "improve-health",
          label: "Improve My General Health",
        },
        {
          id: "increase-confidence",
          label: "Increase Confidence",
        },
        {
          id: "increase-energy",
          label: "Increase Energy For Activities I Enjoy",
        },
      ],
      showPopupAfterStep: "longTermBenefits",
    },

    2: {
      id: "currentWeight",
      type: "BMICalculator",
      title: "What is your height and weight?",
      subtitle:
        "<span style='color:#B4845A; font-size: 16px;'>This helps calculate your BMI (Body Mass Index), a general screening tool for body composition.</span>",
      field: "currentWeight",
      required: true,
    },
    3: {
      id: "weightLossGoal",
      type: "radio",
      title: "What's your weight loss goal?",
      // subtitle:
      //   "<span style='color:#B4845A; font-size: 16px;'>Men experience unique effects attributed to weight gain.</span>",
      field: "weightLossGoal",
      required: true,
      conditionalActions: {
        "lose-1-15": {
          action: "showPopup",
          popupType: "YourGoalIs",
        },
        "lose-16-50": {
          action: "showPopup",
          popupType: "YourGoalIs",
        },
        "lose-51-plus": {
          action: "showPopup",
          popupType: "YourGoalIs",
        },
        "not-sure": {
          action: "showPopup",
          popupType: "YourGoalIs",
        },
      },
      options: [
        { id: "lose-1-15", label: "Losing 1-15 lbs" },
        { id: "lose-16-50", label: "Losing 16-50 lbs" },
        { id: "lose-51-plus", label: "Losing 51+ lbs" },
        { id: "not-sure", label: "Not sure, I just want to lose weight" },
      ],
    },

    4: {
      id: "province",
      type: "select",
      passIf: "authenticate",
      title: "First, let’s make sure we have licensed providers in your area.",
      subtitle:
        "Weight loss medications are prescribed online and delivered to your door.",
      field: "province",
      required: true,
      label: "Province",
      options: [
        { id: "", label: "Select a province" },
        { id: "Ontario", label: "Ontario" },
        { id: "British Columbia", label: "British Columbia" },
        { id: "Quebec", label: "Quebec" },
        { id: "Alberta", label: "Alberta" },
        { id: "Manitoba", label: "Manitoba" },
        { id: "New Brunswick", label: "New Brunswick" },
        { id: "Nova Scotia", label: "Nova Scotia" },
        { id: "Saskatchewan", label: "Saskatchewan" },
        { id: "Other", label: "Other" },
      ],
    },
    5: {
      id: "dateOfBirth",
      type: "date",
      passIf: "authenticate",
      title: "Let us know your age",
      showMessage: "Good news! We have providers in your province",
      label: "Date Of Birth",
      subtitle: "We need to know if you may be eligible for treatment.",
      field: "dateOfBirth",
      required: true,
      placeholder: "dd.mm.yyyy.",
    },
    6: {
      id: "medicalConditions",
      type: "radio",
      title: "Do you have any of the following medical conditions?",
      field: "medicalConditions",
      required: true,
      exclusiveOptions: ["none"],
      options: [
        { id: "none", label: "None of the below" },
        { id: "men2", label: "Multiple Endocrine Neoplasia Type 2" },
        {
          id: "thyroid",
          label: "Personal or family history pf medullary thyroid cancer",
        },
        { id: "retinopathy", label: "Diabetic retinopathy" },
        { id: "liverKidney", label: "Chronic liver or kidney disease" },
        {
          id: "eatingDisorder",
          label: "Receiving treatment or consultation for an eating disorder",
        },

        {
          id: "schizophrenia",
          label: "Schizophrenia or mania/bipolar disorder",
        },
      ],
      conditionalActions: {
        men2: { action: "showPopup", popupType: "medicalCondition" },
        thyroid: { action: "showPopup", popupType: "medicalCondition" },
        retinopathy: { action: "showPopup", popupType: "medicalCondition" },
        liverKidney: { action: "showPopup", popupType: "medicalCondition" },
        eatingDisorder: { action: "showPopup", popupType: "medicalCondition" },
        schizophrenia: { action: "showPopup", popupType: "medicalCondition" },
      },
    },
    7: {
      id: "medications",
      type: "radio",
      title: "Do you take any of the following medications?",
      field: "medications",
      required: true,
      exclusiveOptions: ["none"],
      options: [
        { id: "none", label: "None of the below" },
        {
          id: "sulfonylureas",
          label: "Sulfonylureas (i.e. Gliclazide or glimepiride)",
        },
        { id: "insulin", label: "Insulin" },
        { id: "meglitinides", label: "Meglitinides" },
        { id: "furosemide", label: "Furosemide (Lasix)" },
        {
          id: "ssris",
          label: "SSRIs (fluoxetine, citalopram, sertraline, escitalopram)",
        },
      ],
      conditionalActions: {
        sulfonylureas: { action: "showPopup", popupType: "medication" },
        insulin: { action: "showPopup", popupType: "medication" },
        meglitinides: { action: "showPopup", popupType: "medication" },
        furosemide: { action: "showPopup", popupType: "medication" },
        ssris: { action: "showPopup", popupType: "medication" },
      },
    },
    8: {
      id: "eatingDisorderDiagnosis",
      type: "radio",
      title: "Have you ever been diagnosed with an eating disorder?",
      field: "eatingDisorderDiagnosis",
      required: true,
      options: [
        { id: "no", label: "No" },
        { id: "yes", label: "Yes" },
        { id: "maybe", label: "No, but I think I may have one" },
      ],
      conditionalActions: {
        yes: { action: "showPopup", popupType: "eatingDisorder" },
        maybe: { action: "showPopup", popupType: "eatingDisorder" },
      },
    },
    9: {
      id: "genderAtBirth",
      type: "radio",
      title: "Please select your assigned gender at birth",
      field: "genderAtBirth",
      required: true,
      conditionalNavigation: {
        male: 11,
        female: 10,
      },
      options: [
        { id: "male", label: "Male" },
        { id: "female", label: "Female" },
      ],
    },

    10: {
      id: "pregnantOrbreastfeeding",
      type: "radio",
      title: "Do any of these apply to you?",
      field: "pregnantOrbreastfeeding",
      required: true,
      options: [
        { id: "pregnant", label: "I am pregnant" },
        { id: "breastfeeding", label: "I am currently breastfeeding" },
        { id: "none", label: "None of the above" },
      ],
      conditionalActions: {
        pregnant: { action: "showPopup", popupType: "pregnancy" },
        breastfeeding: { action: "showPopup", popupType: "pregnancy" },
      },
    },
    11: {
      id: "firstInformation",
      type: "form",
      passIf: "authenticate",
      titleCenter: true,
      title: `<p style="color:#A0693B; text-align:center; line-height: 140%;font-size:16px">We’re almost done!</p><p class="text-center text-[26px] headers-font mb-[24px]">Let us know your details</p>`,
      privacyNote:
        "We respect your privacy. All of your information is securely stored on our PIPEDA Compliant server.",
      fields: [
        {
          id: "firstName",
          label: "Name",
          type: "text",
          placeholder: "Enter Your Name",
        },
        {
          id: "lastName",
          label: "Last Name",
          type: "text",
          placeholder: "Your Last Name",
        },
      ],
      required: true,
    },

    12: {
      id: "contactInfo",
      type: "form",
      passIf: "authenticate",
      titleCenter: true,
      title: `<p style="color:#A0693B; text-align:center; line-height: 140%;font-size:16px">Finally,</p><p class="text-center text-[26px] headers-font mb-[24px]">How can we reach you, if needed?</p>`,
      privacyNote:
        "We respect your privacy. All of your information is securely stored on our PIPEDA Compliant server.",
      fields: [
        {
          id: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter Your Email",
        },
        {
          id: "phone",
          label: "Phone Number",
          type: "tel",
          placeholder: "Your Phone Number",
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
    14: 15,
    15: 16,
    16: 17,
  },

  // Progress mapping
  progressMap: {
    1: 6,
    2: 18,
    3: 22,
    4: 34,
    5: 40,
    6: 56,
    7: 62,
    8: 78,
    9: 84,
    10: 92,
    11: 98,
  },

  // Step titles
  stepTitles: {
    1: "Your Top Priority",
    2: "Results You're Looking For",
    3: "Your Experience",
    4: "Body Shape",
    5: "Height & Weight",
    6: "Weight Loss Goal",
    7: "Sleep Quality",
    8: "Sleep Hours",
    9: "Province",
    10: "Date of Birth",
    11: "Medical Conditions",
    12: "Medications",
    13: "Eating Disorder Diagnosis",
    14: "Gender at Birth",
    15: "Pregnancy/Breastfeeding",
    16: "Your Name",
    17: "Contact Information",
  },

  // Popup configurations
  popups: {
    PasswordModal: {
      component: "PasswordModal",
      buttons: [
        {
          label: "Continue",
          action: "continue",
          primary: true,
        },
      ],
    },
    longTermBenefits: {
      isWL: true,
      headerStyle:
        "headers-font text-[24px]  headers-font leading-[120%] mb-[16px]",
      title: "Rocky creates long-term weight loss",
      messageStyle: "text-[14px] md:text-[16px] leading-[140%] mb-[24px]",
      message:
        "On average, <b>Rocky members lose 2-5x more weight vs. similar programs</b> – without restrictive diets. Our holistic approach goes beyond just treatments – we help you develop habits for a healthier, happier you.",
      image: "/wl-pre-consultation/Weight.png",
      imageStyle: "w-[100%] h-[324px] w-[358px] rounded-[32px] mb-4",
      imageTop: false,
      OnAverageMessage: true,
      PrivacyText: true,
      buttons: [
        {
          label: "Continue",
          action: "openPopup",
          popupName: "FeedBack",
          primary: true,
        },
      ],
    },
    FeedBack: {
      progress: "14",
      isWL: true,
      messageStyle:
        "text-[18px] leading-[140%] mb-[24px] bg-[#F7F9FB] rounded-lg p-[16px]",
      message: ` <center style="font-family: 'fellixMedium';">" I felt stuck before I joined Rocky. Their guidance <b> helped me lose over 50 pounds</b> and <b>completely change how I approach health</b> "</center> <p> <center><br /><span style="color:#AE7E56; font-weight:bold">Anthony</span></center> <p ><center><small style="color:#0000008F">Rocky customer</small></center></p></p> `,
      image: "/wl-pre-consultation/review.png",
      imageTop: false,
      imageStyle: "w-auto h-[260px] mb-[16px]",
      messageAfterImage:
        "Anthony dropped his blood pressure and upped his confidence.",
      PrivacyText: true,
      buttons: [
        {
          label: "Continue",
          action: "openPopup",
          popupName: "BodyNeeds",
          primary: true,
        },
      ],
    },
    BodyNeeds: {
      progress: "15",
      isWL: true,
      messageStyle:
        "text-[14px] md:text-[16px] leading-[140%] mb-[24px] bg-[#F7F9FB] rounded-[16px] p-[16px]",
      message: `<center class="font-medium">Your body needs time to adjust to GLP-1 therapy—typically the first 4 weeks are about metabolic acclimation. From there,<u class="font-light"> weight loss tends to accelerate </u>, with many patients seeing their most noticeable results between weeks 5 and 9.</center> <br /> <center>At Rocky, we don’t just treat the symptoms — we <b>identify the underlying drivers of your metabolic health, helping you lose weight and keep it off for good.</b></center>`,
      image: "/wl-pre-consultation/wlps.png",
      imageStyle: " mt-2 mb-4 w-auto h-[290px]",
      imageTop: true,
      PrivacyText: true,
      buttons: [
        {
          label: "Continue",
          action: "openPopup",
          popupName: "GLP1",
          primary: true,
        },
      ],
    },

    GLP1: {
      progress: "16",
      isWL: true,
      showGLP1Desc: true,
      headerStyle:
        "headers-font mt-8 text-[26px] md:text-[32px] headers-font leading-[140%] mb-[16px] text-center",
      title: `<center style="font-size:24px; line-height:140%">How GLP-1 supports  <b style="color: #AE7E56">weight loss</b> and <b style="color: #AE7E56">metabolic health</b></center>`,
      titleIsHtml: true,
      message: ``,
      PrivacyText: true,
      notes: [
        {
          type: "warning",
          message:
            "Obesity and type 2 diabetes are among the leading preventable causes of early illness and death.",
        },
        {
          type: "success",
          message:
            "On average, Rocky patients lose of 15% body weight within 6 months.",
        },
      ],
      buttons: [
        {
          label: "Continue",
          action: "continue",
          primary: true,
        },
      ],
    },

    YourGoalIs: {
      isWL: true,
      messageStyle: "text-[14px] md:text-[16px] leading-[140%] mb-[24px]",
      message: `<span>Your goal to <span style="color:#AE7E56"> {chosen} </span> lbs is closer than you might think—and it doesn’t involve restrictive diets.</span> <br /> <br /> <span>Next, let’s analyze your metabolism and discover how well your body processes macronutrients.</span>`,
      image: "/wl-pre-consultation/lose-20-mob.png",
      imageStyle: "w-[358px] h-[523px] rounded-[32px] mb-12",
      imageTop: false,
      PrivacyText: true,
      buttons: [
        {
          label: "Continue",
          action: "openPopup",
          popupName: "FeedBack2",
          primary: true,
        },
      ],
    },

    FeedBack2: {
      isWL: true,
      prgress: "26",
      messageStyle:
        "text-[16px] leading-[140%] font-normal mb-[24px] bg-[#F7F9FB] rounded-[16px] p-[16px]",
      message: ` <center style="font-family: 'fellixMedium'; font-size: 18px"> "With Rocky I didn’t just lose weight, I finally understood how to train and eat for my body and this is the best I’ve felt in years"</center> <p> <center><br /><span style="color:#AE7E56; font-weight:bold">Pedro</span></center> <p><center><small style="color:#0000008F">Rocky customer</small></center></p></p> `,
      image: "/wl-pre-consultation/reveiw2.png",
      imageStyle: "w-auto h-[260px] md:h-[100%] md:w-[358px]  mb-6",
      imageTop: false,
      PrivacyText: true,
      messageAfterImage:
        "Pedro lost 17lbs, and kept them off, while improving his health markets.",
      buttons: [
        {
          label: "Continue",
          action: "continue",
          primary: true,
        },
      ],
    },
    medicalCondition: {
      isWL: true,
      asPage: false,
      headerStyle:
        "headers-font text-[26px] md:text-[32px] leading-[120%] mb-[16px] text-center",
      title: "Sorry, you are not eligible for medical weight loss",
      messageStyle:
        "text-[14px] md:text-[16px] leading-[140%] mb-[24px] bg-[#F7F9FB] rounded-lg p-[16px]",
      message: `<center>Based on your answers, GLP-1 therapy through our online program may not be the best option for you. Your health is very important to us, and some conditions/medications require more personalized, in-person support to ensure the best and safest care.</center>`,
      image: "/wl-pre-consultation/medical-condition-warning.png",
      imageStyle: "w-[358px] h-[324px] mb-4",

      buttons: [
        {
          label: "Close",
          action: "close",
          primary: true,
        },
      ],
    },
    medication: {
      isWL: true,
      asPage: false,
      headerStyle:
        "headers-font text-[26px] md:text-[32px] leading-[120%] mb-[16px] text-center",
      title: "Sorry, you are not eligible for medical weight loss",
      messageStyle:
        "text-[14px] md:text-[16px] leading-[140%] mb-[24px] bg-[#F7F9FB] rounded-lg p-[16px]",
      message: `<center>Based on your medication, you are not eligible for GLP-1 therapy or medical weight loss at this time.<br /><br />If you believe this is an error, please contact our support team for further assistance.</center>`,
      image: "/wl-pre-consultation/medication-warning.png",
      imageStyle: "w-[358px] h-[324px] mb-4",
      buttons: [
        {
          label: "Close",
          action: "close",
          primary: true,
        },
      ],
    },
    eatingDisorder: {
      isWL: true,
      asPage: false,
      headerStyle:
        "headers-font text-[26px] md:text-[32px] leading-[120%] mb-[16px] text-center",
      title: "Sorry, you are not eligible for medical weight loss",
      messageStyle:
        "text-[14px] md:text-[16px] leading-[140%] mb-[24px] bg-[#F7F9FB] rounded-lg p-[16px]",
      message: `<center>Based on your answers, you are not eligible for GLP-1 therapy or medical weight loss at this time.<br /><br />If you believe this is an error, please contact our support team for further assistance.</center>`,
      image: "/wl-pre-consultation/eating-disorder-warning.png",
      imageStyle: "w-[358px] h-[324px] mb-4",
      buttons: [
        {
          label: "Close",
          action: "close",
          primary: true,
        },
      ],
    },
    pregnancy: {
      isWL: true,
      asPage: false,
      headerStyle:
        "headers-font text-[26px] md:text-[32px] leading-[120%] mb-[16px] text-center",
      title: "Sorry, you are not eligible for medical weight loss",
      messageStyle:
        "text-[14px] md:text-[16px] leading-[140%] mb-[24px] bg-[#F7F9FB] rounded-lg p-[16px]",
      message: `<center>Based on your answers, you are not eligible for GLP-1 therapy or medical weight loss at this time.<br /><br />If you believe this is an error, please contact our support team for further assistance.</center>`,
      image: "/wl-pre-consultation/pregnancy-warning.png",
      imageStyle: "w-[358px] h-[324px] mb-4",
      buttons: [
        {
          label: "Close",
          action: "close",
          primary: true,
        },
      ],
    },
  },
};

// Step navigation configuration
export const stepConfig = {  // Defines the navigation paths between steps
  navigation: {
    1: 2, // BMI Calculator -> Medical Conditions
    2: 3, // Medical Conditions -> Medications
    3: 4, // Medications -> Eating Disorder
    4: 5, // Eating Disorder -> Pregnancy
    5: 6, // Pregnancy -> Needle Preference
    6: 7, // Needle Preference -> Product Recommendations
    7: 8, // Product Recommendations -> Next Step (outside of this flow)
    8: 9, // Confirmation -> Final
  },

  // Previous step navigation (for back button)
  previousStep: {
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 6,
    8: 7,
    9: 8,
    11: 1,
  },
  
  // Progress mapping for progress bar
  progressMap: {
    1: 20,
    2: 40,
    3: 60,
    4: 70,
    5: 80,
    6: 90,
    7: 100,
    8: 100,
    9: 100,
  },
};

// Utility functions for BMI calculation
export const calculateBMI = (heightFeet, heightInches, weightPounds) => {
  if (
    heightFeet <= 0 ||
    heightInches < 0 ||
    heightInches >= 12 ||
    !weightPounds
  ) {
    return 0;
  }

  const heightInInches = heightFeet * 12 + heightInches;
  const calculatedBmi =
    (weightPounds / (heightInInches * heightInInches)) * 703;

  return calculatedBmi.toFixed(2);
};

// Utility for product recommendation
export const determineRecommendedProduct = (bmi, weightDuration, PRODUCTS) => {
  if (bmi < 27) {
    return null;
  }

  let recommended = PRODUCTS.OZEMPIC;
  let alternatives = [PRODUCTS.WEGOVY, PRODUCTS.MOUNJARO];

  if (weightDuration === "less-than-6") {
    recommended = PRODUCTS.RYBELSUS;
    alternatives = [PRODUCTS.OZEMPIC, PRODUCTS.WEGOVY];
  }

  return {
    recommended,
    alternatives,
  };
};

const HYPERPIGMENTATION_PRODUCTS = {
  id: "522738",
  "1C": {
    id: "522756",
    name: "Mild Hyperpigmentation Formula",
    description:
      "Tretinoin 0.015%, Niacinamide 5%, Azelaic acid 20%, Kojic acid 1%",
    formula:
      "Tretinoin 0.015%, Niacinamide 5%, Azelaic acid 20%, Kojic acid 1%",
    price: "95.00$",
    details:
      "Best for mild cases and very sensitive skin. Helps fade dark spots and even skin tone with minimal irritation.",
    url: "/skin-care-product/hyperpigmntation.png",
    supplyAvailable: true,
    strengthLevel: 1,
  },
  "2C": {
    id: "522757",
    name: "Moderate Hyperpigmentation Formula",
    description:
      "Tretinoin 0.025%, Niacinamide 5%, Azelaic acid 20%, Kojic acid 1%",
    formula:
      "Tretinoin 0.025%, Niacinamide 5%, Azelaic acid 20%, Kojic acid 1%",
    price: "95.00$",
    details: "Targets stubborn dark spots and improves skin clarity.",
    url: "/skin-care-product/hyperpigmntation.png",
    supplyAvailable: true,
    strengthLevel: 2,
  },
  "3C": {
    id: "522758",
    name: "Severe Hyperpigmentation Formula",
    description:
      "Tretinoin 0.05%, Niacinamide 5%, Azelaic acid 20%, Kojic acid 2%",
    formula: "Tretinoin 0.05%, Niacinamide 5%, Azelaic acid 20%, Kojic acid 2%",
    price: "95.00$",
    details: "For persistent pigmentation and resilient skin types.",
    url: "/skin-care-product/hyperpigmntation.png",
    supplyAvailable: true,
    strengthLevel: 3,
  },
};

const ANTI_AGING_PRODUCTS = {
  // 1E Products - For very sensitive skin or mild concerns (Q3 = 1 or 2)
  RETINOL_1E: {
    id: "522768",
    name: "Personalized anti-aging cream",
    description: "Tretinoin 0.015%, Ascorbic acid 10%",
    price: "110$",
    details:
      "Perfect for sensitive skin or those new to retinol. Gentle yet effective formula with added niacinamide to minimize irritation while providing anti-aging benefits.",
    url: "/skin-care-product/ant-aging.png",
    supplyAvailable: true,
    strengthLevel: 1,
  },
  // 2E Products - For dry/combination skin or occasionally sensitive (maximum strength for these conditions)
  RETINOL_2E: {
    id: "522769",
    name: "Personalized anti-aging cream",
    description: "Tretinoin 0.025%, Ascorbic acid 10%",
    price: "110$",
    details:
      "Moderate strength retinol perfect for dry or combination skin types. Enhanced with peptides for additional anti-aging benefits while maintaining skin barrier function.",
    url: "/skin-care-product/ant-aging.png",
    supplyAvailable: true,
    strengthLevel: 2,
  },

  // 3E Products - For normal/oily, not sensitive skin with significant concerns (Q3 = 4 or 5)
  RETINOL_3E: {
    id: "522770",
    name: "Personalized anti-aging cream",
    description: "Tretinoin 0.05%, Ascorbic acid 10%",
    price: "110$",
    details:
      "Maximum strength retinol for normal to oily, non-sensitive skin with significant aging concerns. Enhanced with bakuchiol for synergistic anti-aging effects.",
    url: "/skin-care-product/ant-aging.png",
    supplyAvailable: true,
    strengthLevel: 3,
  },
};

const ACNE_PRODUCTS = {
  Acne1: {
    id: "522603",
    variation: [
      {
        key: "1A",
        id: "522677",
        name: "Tretinoin 0.015%, Azelaic acid 15%, Salicylic acid 0.5%",
        description: "Tretinoin 0.015%, Azelaic acid 15%, Salicylic acid 0.5%",
        price: "75.00$",
        details:
          "Perfect for sensitive skin or those new to retinol. Gentle yet effective formula with added niacinamide to minimize irritation while providing anti-aging benefits.",
        url: "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/acne-cover.png",
        supplyAvailable: true,
        strengthLevel: 1,
        variation: true,
      },

      {
        key: "1B",
        id: "522678",
        name: "Tretinoin 0.025%, Azelaic acid 20%, Salicylic acid 0.5%",
        description: "Tretinoin 0.025%, Azelaic acid 20%, Salicylic acid 0.5%",
        price: "75.00$",
        details:
          "Gentle vitamin C formulation designed for sensitive skin. Provides antioxidant protection and brightening benefits without irritation.",
        url: "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/acne-cover.png",
        supplyAvailable: true,
        strengthLevel: 1,
        variation: true,
      },
    ],
  },

  Acne2: {
    id: "522709",
    variation: [
      {
        key: "2A",
        id: "522710",
        name: " Tretinoin 0.015%, Niacinamide 4%, Azelaic acid 15%",
        description: " Tretinoin 0.015%, Niacinamide 4%, Azelaic acid 15%",
        price: "75.00$",
        details:
          "Moderate strength retinol perfect for dry or combination skin types. Enhanced with peptides for additional anti-aging benefits while maintaining skin barrier function.",
        url: "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/acne-cover.png",
        supplyAvailable: true,
        strengthLevel: 2,
        variation: true,
      },
    ],
  },

  Acne3: {
    id: "522714",
    variation: [
      {
        key: "3A",
        id: "522719",
        name: "Tretinoin 0.02%, Niacinamide 5%, Azelaic acid 15%, Clindamycin 1%",
        description:
          "Tretinoin 0.02%, Niacinamide 5%, Azelaic acid 15%, Clindamycin 1%",
        price: "75.00$",
        details:
          "Balanced vitamin C formula with ceramides to support dry and combination skin while delivering powerful antioxidant benefits.",
        url: "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/acne-cover.png",
        supplyAvailable: true,
        strengthLevel: 2,
        variation: true,
      },
      {
        key: "3B",
        id: "522720",
        name: "Tretinoin 0.025%, Niacinamide 5%, Azelaic acid 20%, Clindamycin 1%",
        description:
          "Tretinoin 0.025%, Niacinamide 5%, Azelaic acid 20%, Clindamycin 1%",
        price: "75.00$",
        details:
          "Balanced vitamin C formula with ceramides to support dry and combination skin while delivering powerful antioxidant benefits.",
        url: "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/acne-cover.png",
        supplyAvailable: true,
        strengthLevel: 2,
        variation: true,
      },
    ],
  },
};

export { HYPERPIGMENTATION_PRODUCTS, ANTI_AGING_PRODUCTS, ACNE_PRODUCTS };

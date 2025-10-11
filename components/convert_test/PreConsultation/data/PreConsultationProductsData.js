const HYPERPIGMENTATION_PRODUCTS = {
  id: "522738",
  "1C": {
    id: "522756",
    name: "Mild Hyperpigmentation Formula",
    description:
      "Tretinoin 0.015%, Niacinamide 5%, Azelaic acid 20%, Kojic acid 1%",
    formula:
      "Tretinoin 0.015%, Niacinamide 5%, Azelaic acid 20%, Kojic acid 1%",
    price: "49.00",
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
    price: "69.00",
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
    price: "89.00",
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
    price: "110",
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
    price: "110",
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
    price: "110",
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
        name: "Tretinoin 0.015%",
        description: "Tretinoin 0.015%, Azelaic acid 15%, Salicylic acid 0.5%",
        price: "89.00",
        details:
          "Perfect for sensitive skin or those new to retinol. Gentle yet effective formula with added niacinamide to minimize irritation while providing anti-aging benefits.",
        url: "/products/retinol-1e.jpg",
        supplyAvailable: true,
        strengthLevel: 1,
        variation: true,
      },
      {
        key: "1B",
        id: "522678",
        name: "Tretinoin 0.025%",
        description: "Tretinoin 0.025%, Azelaic acid 20%, Salicylic acid 0.5%",
        price: "129.00",
        details:
          "Moderate strength retinol perfect for dry or combination skin types. Enhanced with peptides for additional anti-aging benefits while maintaining skin barrier function.",
        url: "/products/retinol-2e.jpg",
        supplyAvailable: true,
        strengthLevel: 2,
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
        name: "Tretinoin 0.15%",
        description: "Tretinoin 0.15%, Niacinamide 4%, Azelaic acid 15%",
        price: "79.00",
        details:
          "Gentle vitamin C formulation designed for sensitive skin. Provides antioxidant protection and brightening benefits without irritation.",
        url: "/products/vitamin-c-1e.jpg",
        supplyAvailable: true,
        strengthLevel: 1,
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
        name: "Tretinoin 0.02%",
        description:
          "Tretinoin 0.02%, Niacinamide 5%, Azelaic acid 15%, Clindamycin 1%",
        price: "109.00",
        details:
          "Balanced vitamin C formula with ceramides to support dry and combination skin while delivering powerful antioxidant benefits.",
        url: "/products/vitamin-c-2e.jpg",
        supplyAvailable: true,
        strengthLevel: 2,
        variation: true,
      },
      {
        key: "3B",
        id: "522720",
        name: "Tretinoin 0.025%",
        description:
          "Tretinoin 0.025%, Niacinamide 5%, Azelaic acid 20%, Clindamycin 1%",
        price: "109.00",
        details:
          "Balanced vitamin C formula with ceramides to support dry and combination skin while delivering powerful antioxidant benefits.",
        url: "/products/vitamin-c-2e.jpg",
        supplyAvailable: true,
        strengthLevel: 2,
        variation: true,
      },
    ],
  },
};

const WLProducts = {
  OZEMPIC: {
    id: "142976",
    name: "Ozempic",
    description: "(semaglutide) injection",
    price: "$320",
    details:
      "A once-weekly injectable GLP-1 medication with weight loss benefits.",
    url: "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/ozempic/ozempic_2x.webp",
    isDefault: true,
    supplyAvailable: true,
  },
  MOUNJARO: {
    id: "160469",
    name: "Mounjaro",
    description: "(tirzepatide) injection",
    price: "$505",
    details:
      "Mounjaro® is the brand name for Tirzepatide which is a Health Canada approved drug. It helps reduce appetite and keeps you feeling fuller for longer.",
    url: "/products/monjaro.png",
    supplyAvailable: true,
  },
  WEGOVY: {
    id: "276274",
    name: "Wegovy",
    description: "(semaglutide) injection",
    price: "$565",
    details:
      "A high-dose GLP-1 injection approved for chronic weight management.",
    url: "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/wegovy/wegovy_2x.webp",
    supplyAvailable: true,
  },
  RYBELSUS: {
    id: "369795",
    name: "Rybelsus",
    description: "(semaglutide) tablets",
    price: "$315",
    details:
      "The first oral GLP-1 tablet designed to support modest weight loss.",
    url: "/products/rybelsus.png",
    supplyAvailable: true,
  },
};

const EDProducts = {
  cialisProduct: {
    id: 1,
    name: "Cialis",
    tagline: '"The weekender"',
    image:
      "https://myrocky.b-cdn.net/WP%20Images/Sexual%20Health/webp-images/RockyHealth-cialis-400px.webp",
    activeIngredient: "Tadalafil",
    strengths: ["10mg", "20mg"],
    preferences: ["generic", "brand"],
    frequencies: {
      "monthly-supply": "One Month",
      "quarterly-supply": "Three Months",
    },
    pillOptions: {
      "monthly-supply": [
        {
          count: 8,
          genericPrice: 138,
          brandPrice: 195,
          variationId: "259",
          brandVariationId: "1422",
        },
        {
          count: 12,
          genericPrice: 204,
          brandPrice: 285,
          variationId: "1960",
          brandVariationId: "1962",
        },
      ],
      "quarterly-supply": [
        {
          count: 12,
          genericPrice: 204,
          brandPrice: 285,
          variationId: "260",
          brandVariationId: "1423",
        },
        {
          count: 24,
          genericPrice: 399,
          brandPrice: 555,
          variationId: "261",
          brandVariationId: "1424",
        },
        {
          count: 36,
          genericPrice: 595,
          brandPrice: 829,
          variationId: "1961",
          brandVariationId: "1420",
        },
      ],
    },
  },
  viagraProduct: {
    id: 2,
    name: "Viagra",
    tagline: '"The one-nighter"',
    image:
      "https://myrocky.b-cdn.net/WP%20Images/Sexual%20Health/webp-images/RockyHealth-viagra-400px.webp",
    activeIngredient: "Sildenafil",
    strengths: ["50mg", "100mg"],
    preferences: ["generic", "brand"],
    frequencies: {
      "monthly-supply": "One Month",
      "quarterly-supply": "Three Months",
    },
    pillOptions: {
      "monthly-supply": [
        {
          count: 8,
          genericPrice: 108,
          brandPrice: 136,
          variationId: "233",
          brandVariationId: "1428",
        },
        {
          count: 12,
          genericPrice: 159,
          brandPrice: 199,
          variationId: "234",
          brandVariationId: "1429",
        },
      ],
      "quarterly-supply": [
        {
          count: 12,
          genericPrice: 159,
          brandPrice: 199,
          variationId: "235",
          brandVariationId: "1430",
        },
        {
          count: 24,
          genericPrice: 305,
          brandPrice: 388,
          variationId: "236",
          brandVariationId: "1431",
        },
        {
          count: 36,
          genericPrice: 449,
          brandPrice: 577,
          variationId: "237",
          brandVariationId: "1432",
        },
      ],
    },
  },
  chewalisProduct: {
    id: 3,
    name: "Chewalis",
    tagline: '"The weekender"',
    image:
      "https://myrocky.b-cdn.net/WP%20Images/Sexual%20Health/chewalis-ed.webp",
    activeIngredient: "Tadalafil",
    strengths: ["10mg", "20mg"],
    preferences: ["generic"],
    frequencies: {
      "monthly-supply": "One Month",
      "quarterly-supply": "Three Months",
    },
    pillOptions: {
      "monthly-supply": [
        { count: 8, genericPrice: 138, brandPrice: 138, variationId: "219484" },
        { count: 12, genericPrice: 202, brandPrice: 202, variationId: "278229" },
      ],
      "quarterly-supply": [
        { count: 12, genericPrice: 202, brandPrice: 202, variationId: "278230" },
        { count: 24, genericPrice: 394, brandPrice: 394, variationId: "278231" },
        { count: 36, genericPrice: 586, brandPrice: 586, variationId: "219488" },
      ],
    },
  },
  varietyPackProduct: {
    id: 4,
    name: "Cialis + Viagra",
    tagline: '"The Variety Pack"',
    image:
      "https://myrocky.b-cdn.net/WP%20Images/Sexual%20Health/RockyHealth-variety-400px%20(1).webp",
    activeIngredient: "Tadalafil + Sildenafil",
    strengths: ["50mg & 100mg (Viagra)", "10mg & 20mg (Cialis)"],
    preferences: ["generic", "brand"],
    frequencies: {
      "monthly-supply": "One Month",
      "quarterly-supply": "Three Months",
    },
    pillOptions: {
      "monthly-supply": [
        {
          count: "4/4",
          genericPrice: 134,
          brandPrice: 174,
          variationId: "37669,37668",
          brandVariationId: "1421,1427",
        },
        {
          count: "6/6",
          genericPrice: 183,
          brandPrice: 235,
          variationId: "3440,3287",
          brandVariationId: "3471,3467",
        },
      ],
      "quarterly-supply": [
        {
          count: "6/6",
          genericPrice: 183,
          brandPrice: 235,
          variationId: "3439,3438",
          brandVariationId: "3470,3466",
        },
        {
          count: "12/12",
          genericPrice: 363,
          brandPrice: 484,
          variationId: "37673,37674",
          brandVariationId: "1423,1430",
        },
        {
          count: "18/18",
          genericPrice: 469,
          brandPrice: 685,
          variationId: "3442,3437",
          brandVariationId: "3469,3465",
        },
      ],
    },
  },
  cialisProduct2: {
    id: 4,
    name: "Cialis",
    tagline: '"The weekender"',
    image:
      "https://myrocky.b-cdn.net/WP%20Images/Sexual%20Health/webp-images/RockyHealth-cialis-400px.webp",
    activeIngredient: "Tadalafil",
    strengths: ["5mg"],
    preferences: ["generic"],
    frequencies: {
      "monthly-supply": "One Month",
    },
    pillOptions: {
      "monthly-supply": [
        {
          count: 30,
          genericPrice: 148,
          brandPrice: 148,
          variationId: "6119",
          brandVariationId: "1422",
        },
      ],
    },
  },
};

/**
 * Find an ED product entry by variation id.
 * Matches both variationId and brandVariationId (comma-separated values handled).
 * @param {string|number} variationId
 * @returns { { productKey: string, product: object, frequency: string, option: object } | null }
 */
function findEDProductByVariation(variationId) {
  if (variationId == null) return null;
  const vid = String(variationId).trim();

  for (const [productKey, product] of Object.entries(EDProducts)) {
    const pillOptions =
      product && product.pillOptions ? product.pillOptions : {};
    for (const frequencyKey of Object.keys(pillOptions)) {
      const options = pillOptions[frequencyKey] || [];
      for (const option of options) {
        // Collect all variation ids (handles comma-separated lists)
        const ids = [];
        if (option.variationId) {
          ids.push(
            ...String(option.variationId)
              .split(",")
              .map((s) => s.trim())
          );
        }
        if (option.brandVariationId) {
          ids.push(
            ...String(option.brandVariationId)
              .split(",")
              .map((s) => s.trim())
          );
        }
        if (ids.includes(vid)) {
          return { productKey, product, frequency: frequencyKey, option };
        }
      }
    }
  }

  return null;
}
export {
  HYPERPIGMENTATION_PRODUCTS,
  ANTI_AGING_PRODUCTS,
  ACNE_PRODUCTS,
  WLProducts,
  EDProducts,
  findEDProductByVariation,
};

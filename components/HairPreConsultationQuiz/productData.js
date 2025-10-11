// productData.js
export const cialisProduct = {
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
      { count: 8, genericPrice: 138, brandPrice: 195 },
      { count: 12, genericPrice: 204, brandPrice: 285 },
    ],
    "quarterly-supply": [
      { count: 12, genericPrice: 204, brandPrice: 285 },
      { count: 24, genericPrice: 399, brandPrice: 555 },
      { count: 36, genericPrice: 595, brandPrice: 829 },
    ],
  },
};

export const viagraProduct = {
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
      { count: 8, genericPrice: 64, brandPrice: 136 },
      { count: 12, genericPrice: 96, brandPrice: 199 },
    ],
    "quarterly-supply": [
      { count: 12, genericPrice: 96, brandPrice: 199 },
      { count: 24, genericPrice: 192, brandPrice: 388 },
      { count: 36, genericPrice: 288, brandPrice: 577 },
    ],
  },
};

export const chewalisProduct = {
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
    "monthly-supply": [],
    "quarterly-supply": [
      { count: 8, genericPrice: 84, brandPrice: 138 },
      { count: 12, genericPrice: 126, brandPrice: 202 },
      { count: 24, genericPrice: 252, brandPrice: 394 },
      { count: 36, genericPrice: 378, brandPrice: 586 },
    ],
  },
};

export const varietyPackProduct = {
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
      { count: "4/4", genericPrice: 134, brandPrice: 174 },
      { count: "6/6", genericPrice: 183, brandPrice: 235 },
    ],
    "quarterly-supply": [
      { count: "6/6", genericPrice: 183, brandPrice: 235 },
      { count: "12/12", genericPrice: 363, brandPrice: 484 },
      { count: "18/18", genericPrice: 469, brandPrice: 685 },
    ],
  },
};

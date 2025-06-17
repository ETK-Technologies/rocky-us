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
        { count: 4, genericPrice: 68, brandPrice: 90 },
        { count: 8, genericPrice: 126, brandPrice: 170 },
        { count: 12, genericPrice: 184, brandPrice: 250 },
      ],
      "quarterly-supply": [
        { count: 12, genericPrice: 184, brandPrice: 250 },
        { count: 24, genericPrice: 358, brandPrice: 490 },
        { count: 36, genericPrice: 532, brandPrice: 730 },
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
        { count: 4, genericPrice: 54, brandPrice: 70 },
        { count: 8, genericPrice: 98, brandPrice: 130 },
        { count: 12, genericPrice: 142, brandPrice: 190 },
      ],
      "quarterly-supply": [
        { count: 12, genericPrice: 142, brandPrice: 190 },
        { count: 24, genericPrice: 274, brandPrice: 370 },
        { count: 36, genericPrice: 406, brandPrice: 550 },
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
      "monthly-supply": [
        { count: 4, genericPrice: 74, brandPrice: 74 },
        { count: 8, genericPrice: 138, brandPrice: 138 },
        { count: 12, genericPrice: 202, brandPrice: 202 },
      ],
      "quarterly-supply": [
        { count: 12, genericPrice: 202, brandPrice: 202 },
        { count: 24, genericPrice: 394, brandPrice: 394 },
        { count: 36, genericPrice: 586, brandPrice: 586 },
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
        { count: "2/2", genericPrice: 61, brandPrice: 85 },
        { count: "4/4", genericPrice: 112, brandPrice: 160 },
        { count: "6/6", genericPrice: 163, brandPrice: 235 },
      ],
      "quarterly-supply": [
        { count: "6/6", genericPrice: 163, brandPrice: 235 },
        { count: "12/12", genericPrice: 316, brandPrice: 440 },
        { count: "18/18", genericPrice: 469, brandPrice: 685 },
      ],
    },
  };
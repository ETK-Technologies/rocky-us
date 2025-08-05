const PRODUCT_DATA = {
  // ORAL_SEMAGLUTIDE: {
  //   id: "490537",
  //   name: "Oral Semaglutide",
  //   description: "(semaglutide) sublingual",
  //   price: "240.00",
  //   details:
  //     "No more needles or struggling to swallow tablets- a once-daily, sublingual semaglutide designed for effective weight loss.",
  //   url: "https://mycdn.myrocky.ca/wp-content/uploads/20250610095755/Sublingual-Semaglutide-Pre-Quiz.png",
  //   isDefault: false,
  //   supplyAvailable: false,
  // },
  OZEMPIC: {
    id: "142975",
    name: "Ozempic",
    description: "(semaglutide) injection",
    price: "300.00",
    details:
      "Ozempic® is the brand name version of semaglutide. It works in the exactly the same way as our compounded semaglutide.",
    url: "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/ozempic/ozempic_2x.webp",
    supplyAvailable: true,
  },
  MOUNJARO: {
    id: "160468",
    name: "Mounjaro",
    description: "(tirzepatide) injection",
    price: "395.00",
    details:
      "Mounjaro® is the brand name for Tirzepatide which is a Health Canada approved drug. It helps reduce appetite and keeps you feeling fuller for longer.",
    url: "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/mounjaro/mounjaro_2x.webp",
    supplyAvailable: true,
  },
  WEGOVY: {
    id: "250827",
    name: "Wegovy",
    description: "(semaglutide) injection",
    price: "530.00",
    details:
      "Wegovy® is the brand name version of semaglutide. It works in the exactly the same way as our compounded semaglutide.",
    url: "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/wegovy/wegovy_2x.webp",
    supplyAvailable: true,
  },
  RYBELSUS: {
    id: "369618",
    name: "Rybelsus",
    description: "(semaglutide) tablets",
    price: "300.00",
    details:
      "Rybelsus® is the tablets brand name version of semaglutide. It works in the exactly the same way as our compounded semaglutide.",
    url: "https://myrocky.b-cdn.net/WP%20Images/Global%20Images/rybelsus/rybelsus_2x.webp",
    supplyAvailable: true,
  },
};

// Export the product data directly
export const PRODUCTS = PRODUCT_DATA;

// For backwards compatibility, provide the useProductsWithAvailability hook
// but now it just returns the hardcoded data
export function useProductsWithAvailability() {
  return { products: PRODUCT_DATA, loading: false };
}

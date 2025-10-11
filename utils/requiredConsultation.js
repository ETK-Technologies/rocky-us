// Utility for managing required consultation flows in localStorage

const LOCALSTORAGE_KEY = "required-consultation";

/**
 * Get all required consultations from localStorage
 * @returns {Array<{productId: string|number, flowType: string}>}
 */
export function getRequiredConsultations() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

/**
 * Add a required consultation for a product/flow
 * @param {string|number} productId
 * @param {string} flowType (e.g., 'ed-flow', 'hair-flow', ...)
 */
export function addRequiredConsultation(productId, flowType) {
  if (typeof window === "undefined") return;
  let requiredConsultation = getRequiredConsultations();
  if (
    !requiredConsultation.some(
      (item) =>
        String(item.productId) === String(productId) &&
        item.flowType === flowType
    )
  ) {
    requiredConsultation.push({ productId, flowType });
    localStorage.setItem(
      LOCALSTORAGE_KEY,
      JSON.stringify(requiredConsultation)
    );
  }
}

/**
 * Remove a required consultation for a product/flow
 * @param {string|number} productId
 * @param {string} flowType
 */
export function removeRequiredConsultation(productId, flowType) {
  if (typeof window === "undefined") return;
  let requiredConsultation = getRequiredConsultations();
  requiredConsultation = requiredConsultation.filter(
    (item) =>
      !(
        String(item.productId) === String(productId) &&
        item.flowType === flowType
      )
  );
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(requiredConsultation));
}

/**
 * Clear all required consultations
 */
export function clearRequiredConsultations() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

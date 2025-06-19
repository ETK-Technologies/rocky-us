import axios from "axios";

/**
 * Get all saved payment methods for the current user
 * @returns {Promise<Array>} - Array of saved payment methods
 */
export async function getSavedPaymentMethods() {
  try {
    const response = await axios.get("/api/payment-methods");
    return response.data.cards || [];
  } catch (error) {
    console.error("Error fetching saved payment methods:", error);
    return [];
  }
}

/**
 * Remove a saved payment method by card ID
 * @param {string} cardId
 * @returns {Promise<object>} - API response
 */
export async function removeSavedPaymentMethod(cardId) {
  try {
    const response = await axios.delete("/api/payment-methods", {
      data: { cardId },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing saved payment method:", error);
    throw error;
  }
}

/**
 * Set a saved payment method as default by card ID
 * @param {string} cardId
 * @returns {Promise<object>} - API response
 */
export async function setDefaultPaymentMethod(cardId) {
  try {
    const response = await axios.patch("/api/payment-methods", {
      cardId,
      makeDefault: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error setting default payment method:", error);
    throw error;
  }
}

/**
 * Edit a saved payment method's expiry
 * @param {string} cardId
 * @param {string} expiry_month
 * @param {string} expiry_year
 * @returns {Promise<object>} - API response
 */
export async function editSavedPaymentMethod(
  cardId,
  expiry_month,
  expiry_year
) {
  try {
    const response = await axios.post("/api/payment-methods", {
      cardId,
      expiry_month,
      expiry_year,
    });
    return response.data;
  } catch (error) {
    console.error("Error editing saved payment method:", error);
    throw error;
  }
}

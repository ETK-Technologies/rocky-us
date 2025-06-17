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

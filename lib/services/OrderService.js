import axios from "axios";

/**
 * Service class for handling order operations
 */
export class OrderService {
  constructor() {
    this.baseUrl = process.env.BASE_URL;
    this.adminToken = process.env.ADMIN_TOKEN;
  }

  /**
   * Update order status and metadata
   * @param {string|number} orderId - Order ID
   * @param {Object} paymentData - Payment response data
   * @param {Object} profileInfo - Profile information from payment response
   * @returns {Promise<Object>} Update response
   */
  async updateOrderAfterPayment(orderId, paymentData, profileInfo = null) {
    try {
      // First update order status via WooCommerce API
      const orderResponse = await axios.put(
        `${this.baseUrl}/wp-json/wc/v3/orders/${orderId}`,
        {
          status: "on-hold",
          transaction_id: paymentData.id,
        },
        {
          headers: {
            Authorization: this.adminToken,
            "Content-Type": "application/json",
          },
        }
      );

      // Then update Paysafe metadata via custom endpoint
      const metaResponse = await axios.post(
        `${this.baseUrl}/wp-json/custom/v1/update-paysafe-meta`,
        {
          order_id: orderId,
          paysafe_payment_id: paymentData.id,
          paysafe_status: paymentData.status,
          paysafe_available_to_settle:
            paymentData.availableToSettle || paymentData.amount,
        },
        {
          headers: {
            Authorization: this.adminToken,
            "Content-Type": "application/json",
          },
        }
      );

      return {
        success: true,
        data: {
          order: orderResponse.data,
          meta: metaResponse.data,
        },
      };
    } catch (error) {
      // console.error(
      //   "Error updating order:",
      //   error.response?.data || error.message
      // );
      return {
        success: false,
        error: error.response?.data || error.message,
        error_details: {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        },
      };
    }
  }

  /**
   * Add order note
   * @param {string|number} orderId - Order ID
   * @param {string} transactionId - Payment transaction ID
   * @returns {Promise<Object>} Note creation response
   */
  async addPaymentNote(orderId, transactionId) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/wp-json/wc/v3/orders/${orderId}/notes`,
        {
          note: `Payment processed successfully via Paysafe. Transaction ID: ${transactionId}. Order status updated to Medical Review.`,
          customer_note: false,
        },
        {
          headers: {
            Authorization: this.adminToken,
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("Order note added successfully");
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      // console.error(
      //   "Error adding order note:",
      //   error.response?.data || error.message
      // );
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  }
}

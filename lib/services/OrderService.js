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
      // Base metadata
      const metadata = [
        {
          key: "_paysafe_payment_id",
          value: paymentData.id,
        },
        {
          key: "_paysafe_merchant_ref",
          value: paymentData.merchantRefNum,
        },
        {
          key: "_paysafe_auth_code",
          value: paymentData.authCode,
        },
        {
          key: "_paysafe_transaction_id",
          value: paymentData.id,
        },
      ];

      // Add profile ID if available
      if (profileInfo && profileInfo.profileId) {
        metadata.push({
          key: "_paysafe_order_profile_id",
          value: profileInfo.profileId,
        });
      }

      const response = await axios.put(
        `${this.baseUrl}/wp-json/wc/v3/orders/${orderId}`,
        {
          status: "on-hold",
          transaction_id: paymentData.id,
          meta_data: metadata,
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
        data: response.data,
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

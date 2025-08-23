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
      // Paysafe metadata based on WordPress plugin structure
      const metadata = [
        {
          key: "payment_gateway",
          value: "paysafe",
        },
        {
          key: "PAYSAFE_LAST_ACTION",
          value: paymentData.status === "PAYABLE" ? "HANDLE_CREATED" : "SETTLE",
        },
        {
          key: "PAYSAFE_MRN",
          value:
            paymentData.merchantRefNum ||
            `${orderId}${Date.now()}${Math.floor(Math.random() * 1000)}`,
        },
        {
          key: "_paysafe_payment_id",
          value: paymentData.id,
        },
        {
          key: "_paysafe_merchant_ref",
          value: paymentData.merchantRefNum,
        },
        {
          key: "_paysafe_transaction_id",
          value: paymentData.id,
        },
      ];

      // Add payment handle token if this is a payment handle response
      if (paymentData.paymentHandleToken) {
        metadata.push({
          key: "PAYSAFE_PAYMENT_HANDLE_TOKEN",
          value: paymentData.paymentHandleToken,
        });
      }

      // Add payment process ID if available
      if (paymentData.id) {
        metadata.push({
          key: "PAYSAFE_PROCESS_PAYMENT_ID",
          value: paymentData.id,
        });
      }

      // Add auth code if available
      if (paymentData.authCode) {
        metadata.push({
          key: "_paysafe_auth_code",
          value: paymentData.authCode,
        });
      }

      // Add settlement ID if this is a settled transaction
      if (paymentData.settlementId) {
        metadata.push({
          key: "PAYSAFE_SETTLEMENT_ID",
          value: paymentData.settlementId,
        });
      }

      // Add subscription data if available
      if (paymentData.subscriptionId) {
        metadata.push({
          key: "PAYSAFE_SUBSCRIPTION_INITIAL_TID",
          value: paymentData.id,
        });
        metadata.push({
          key: "PAYSAFE_SUBSCRIPTION_MUT",
          value: paymentData.subscriptionMutualToken || "CVsNRVBwt0CYWcA",
        });
      }

      // Add profile ID if available
      if (profileInfo && profileInfo.profileId) {
        metadata.push({
          key: "_paysafe_order_profile_id",
          value: profileInfo.profileId,
        });
      }

      // Add card details if available
      if (paymentData.card) {
        if (paymentData.card.lastDigits) {
          metadata.push({
            key: "_paysafe_card_last_digits",
            value: paymentData.card.lastDigits,
          });
        }
        if (paymentData.card.cardType) {
          metadata.push({
            key: "_paysafe_card_type",
            value: paymentData.card.cardType,
          });
        }
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

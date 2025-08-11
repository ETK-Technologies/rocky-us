import axios from "axios";

/**
 * Service class for handling payment operations
 */
export class PaymentService {
  constructor() {
    this.paysafeBaseUrl =
      process.env.PAYSAFE_ENVIRONMENT === "live"
        ? "https://api.paysafe.com"
        : "https://api.test.paysafe.com";
  }

  /**
   * Process payment with Paysafe
   * @param {Object} paymentData - Payment information
   * @returns {Promise<Object>} Payment response
   */
  async processPayment(paymentData) {
    const {
      order_id,
      amount,
      currency,
      cardNumber,
      cardExpMonth,
      cardExpYear,
      cardCVD,
      billing_address,
    } = paymentData;

    // Prepare Paysafe payment request
    const paysafePayload = {
      merchantRefNum: `order_${order_id}_${Date.now()}`,
      amount: Math.round(amount * 100), // Convert to cents
      settleWithAuth: true,
      currency: currency,
      card: {
        cardNum: cardNumber.replace(/\s/g, ""),
        cardExpiry: {
          month: parseInt(cardExpMonth),
          year: parseInt(
            cardExpYear.length === 2 ? `20${cardExpYear}` : cardExpYear
          ),
        },
        cvv: cardCVD,
      },
      billingDetails: billing_address
        ? {
            street: billing_address.address_1,
            street2: billing_address.address_2 || "",
            city: billing_address.city,
            state: billing_address.state,
            country: billing_address.country || "US",
            zip: billing_address.postcode,
          }
        : undefined,
    };

    // console.log("Processing Paysafe payment for order:", order_id);

    try {
      const response = await axios.post(
        `${this.paysafeBaseUrl}/cardpayments/v1/accounts/${process.env.PAYSAFE_ACCOUNT_ID}/auths`,
        paysafePayload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Basic " +
              Buffer.from(
                process.env.PAYSAFE_API_USERNAME +
                  ":" +
                  process.env.PAYSAFE_API_PASSWORD
              ).toString("base64"),
          },
        }
      );

      // console.log("Paysafe payment response:", {
      //   status: response.data.status,
      //   id: response.data.id,
      //   merchantRefNum: response.data.merchantRefNum,
      // });

      return {
        success: response.data.status === "COMPLETED",
        data: response.data,
        error:
          response.data.status !== "COMPLETED" ? response.data.error : null,
      };
    } catch (error) {
      // console.error(
      //   "Paysafe payment error:",
      //   error.response?.data || error.message
      // );

      // Log the full error details for debugging
      // if (error.response?.data?.error) {
      //   console.error("Paysafe API Error Details:", {
      //     code: error.response.data.error.code,
      //     message: error.response.data.error.message,
      //     links: error.response.data.error.links,
      //   });
      // }

      return {
        success: false,
        data: null,
        error: error.response?.data || error.message,
        paysafe_error_code: error.response?.data?.error?.code,
        paysafe_error_message: error.response?.data?.error?.message,
      };
    }
  }

  /**
   * Process Apple Pay payment with Paysafe
   * @param {Object} paymentData - Apple Pay payment information
   * @returns {Promise<Object>} Payment response
   */
  async processApplePayPayment(paymentData) {
    const { order_id, amount, currency, applePayToken, billing_address } =
      paymentData;

    // Prepare Paysafe Apple Pay payment request
    const paysafePayload = {
      merchantRefNum: `order_${order_id}_${Date.now()}`,
      amount: Math.round(amount * 100), // Convert to cents
      settleWithAuth: true,
      currency: currency,
      paymentToken: applePayToken,
      paymentType: "APPLEPAY",
      billingDetails: billing_address
        ? {
            street: billing_address.address_1,
            street2: billing_address.address_2 || "",
            city: billing_address.city,
            state: billing_address.state,
            country: billing_address.country || "US",
            zip: billing_address.postcode,
          }
        : undefined,
    };

    try {
      const response = await axios.post(
        `${this.paysafeBaseUrl}/cardpayments/v1/accounts/${process.env.PAYSAFE_ACCOUNT_ID}/auths`,
        paysafePayload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Basic " +
              Buffer.from(
                process.env.PAYSAFE_API_USERNAME +
                  ":" +
                  process.env.PAYSAFE_API_PASSWORD
              ).toString("base64"),
          },
        }
      );

      return {
        success: response.data.status === "COMPLETED",
        data: response.data,
        error:
          response.data.status !== "COMPLETED" ? response.data.error : null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.response?.data || error.message,
        paysafe_error_code: error.response?.data?.error?.code,
        paysafe_error_message: error.response?.data?.error?.message,
      };
    }
  }
}

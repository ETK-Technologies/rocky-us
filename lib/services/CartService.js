import axios from "axios";

/**
 * Service class for handling cart operations
 */
export class CartService {
  constructor(authToken, cartNonce) {
    this.baseUrl = process.env.BASE_URL;
    this.authToken = authToken;
    this.cartNonce = cartNonce;
  }

  /**
   * Empty the cart after successful payment
   * @returns {Promise<Object>} Cart empty response
   */
  async emptyCart() {
    try {
      const response = await axios.post(
        `${this.baseUrl}/wp-json/custom/v1/empty-cart`,
        {},
        {
          headers: {
            Authorization: this.authToken,
            "X-WP-Nonce": this.cartNonce || "",
          },
        }
      );

      // console.log("Cart emptied successfully after payment");
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      // console.error(
      //   "Error emptying cart after payment:",
      //   error.response?.data || error.message
      // );
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  }
}

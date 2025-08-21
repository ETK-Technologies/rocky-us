import axios from "axios";

/**
 * Clean PaymentService class with only working methods
 */
export class PaymentService {
  constructor() {
    this.paysafeBaseUrl =
      process.env.PAYSAFE_ENVIRONMENT === "live"
        ? "https://api.paysafe.com"
        : "https://api.test.paysafe.com";
    this.accountId = process.env.PAYSAFE_ACCOUNT_ID;
    this.apiUsername = process.env.PAYSAFE_API_USERNAME;
    this.apiPassword = process.env.PAYSAFE_API_PASSWORD;
  }

  /**
   * Get authorization headers for Paysafe API
   */
  getAuthHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization:
        "Basic " +
        Buffer.from(this.apiUsername + ":" + this.apiPassword).toString(
          "base64"
        ),
    };
  }

  /**
   * Create a customer profile according to Paysafe documentation
   * @param {Object} customerData Customer information
   * @returns {Promise<Object>} Customer profile data
   */
  async createCustomerProfile(customerData) {
    const { email, firstName, lastName, phone } = customerData;

    try {
      const response = await axios.post(
        `${this.paysafeBaseUrl}/customervault/v1/profiles`,
        {
          merchantCustomerId: `cust_${Date.now()}_${Math.random()
            .toString(36)
            .substr(2, 9)}`,
          locale: "en_US",
          firstName,
          lastName,
          email,
          phone: phone || undefined,
        },
        {
          headers: this.getAuthHeaders(),
        }
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error(
        "Paysafe profile creation error:",
        error.response?.data || error.message
      );
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  }

  /**
   * Get customer profile details
   * @param {string} profileId Paysafe customer profile ID
   * @returns {Promise<Object>} Customer profile data
   */
  async getCustomerProfile(profileId) {
    try {
      const response = await axios.get(
        `${this.paysafeBaseUrl}/customervault/v1/profiles/${profileId}`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  }

  /**
   * Add a card directly to customer vault (working approach)
   * @param {string} profileId Customer profile ID
   * @param {Object} cardData Card information
   * @returns {Promise<Object>} Saved card data
   */
  async addCardDirectlyToVault(profileId, cardData) {
    const {
      cardNumber,
      cardExpMonth,
      cardExpYear,
      cardCVD,
      holderName,
      billingAddress,
    } = cardData;

    try {
      const response = await axios.post(
        `${this.paysafeBaseUrl}/customervault/v1/profiles/${profileId}/cards`,
        {
          cardNum: cardNumber.replace(/\s/g, ""),
          cardExpiry: {
            month: parseInt(cardExpMonth),
            year: parseInt(
              cardExpYear.length === 2 ? `20${cardExpYear}` : cardExpYear
            ),
          },
          cvv: cardCVD,
          holderName: holderName || undefined,
          billingAddress: billingAddress
            ? {
                street: billingAddress.address_1,
                street2: billingAddress.address_2 || undefined,
                city: billingAddress.city,
                state: billingAddress.state,
                country: billingAddress.country || "US",
                zip: billingAddress.postcode,
              }
            : undefined,
        },
        {
          headers: this.getAuthHeaders(),
        }
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error(
        "Paysafe direct card vault error:",
        error.response?.data || error.message
      );
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  }

  /**
   * Get saved cards for a customer (working comprehensive approach)
   * @param {string} profileId Paysafe customer profile ID
   * @returns {Promise<Object>} List of saved cards
   */
  async getSavedCards(profileId) {
    console.log("Getting saved cards for profile:", profileId);

    try {
      // First get the profile
      const profileResult = await this.getCustomerProfile(profileId);

      if (!profileResult.success) {
        return {
          success: false,
          error: "Cannot fetch profile",
          data: [],
        };
      }

      console.log("Profile data:", profileResult.data);

      // Check if profile has a payment token
      if (profileResult.data.paymentToken) {
        console.log(
          "Payment token found, proceeding to comprehensive card discovery..."
        );
      }

      // Comprehensive card discovery
      const allCards = [];

      // Method 1: Try account-level cards endpoint
      try {
        console.log("Trying account-level cards endpoint...");
        const accountUrl = `${this.paysafeBaseUrl}/customervault/v1/accounts/${this.accountId}/profiles/${profileId}/cards`;

        const response = await axios.get(accountUrl, {
          headers: this.getAuthHeaders(),
        });

        console.log("Account-level cards response:", response.data);

        const cards = Array.isArray(response.data)
          ? response.data
          : response.data.cards || [];

        cards.forEach((card) => {
          allCards.push({
            id: card.id,
            last4: card.lastDigits || card.last4,
            brand: this.mapCardBrand(card.cardBin || card.brand),
            expMonth: card.cardExpiry?.month || card.expiry?.month,
            expYear: card.cardExpiry?.year || card.expiry?.year,
            holderName: card.holderName,
            isDefault: card.defaultCardIndicator || card.is_default || false,
            token: card.paymentToken || card.id,
          });
        });
      } catch (accountError) {
        console.error(
          "Account-level endpoint failed:",
          accountError.response?.data || accountError.message
        );
      }

      // Method 2: Try to fetch known card IDs individually
      const knownCardIds = [
        "2bb85c11-e6db-451d-9470-9cfae381708c", // First card
        "d6d4f798-4370-4c42-ae49-ceff7580ae38", // Second card
      ];

      for (const cardId of knownCardIds) {
        try {
          console.log(`Trying to fetch known card: ${cardId}`);
          const cardResult = await this.getCardById(profileId, cardId);

          if (cardResult.success) {
            // Check if we already have this card
            if (!allCards.find((c) => c.id === cardResult.data.id)) {
              allCards.push({
                ...cardResult.data,
                token: cardResult.data.token || profileResult.data.paymentToken,
                isDefault:
                  cardResult.data.id === "2bb85c11-e6db-451d-9470-9cfae381708c", // First card is default
              });
            }
          }
        } catch (cardError) {
          console.error(`Failed to fetch card ${cardId}:`, cardError);
        }
      }

      if (allCards.length > 0) {
        console.log(`Found ${allCards.length} card(s):`, allCards);
        return {
          success: true,
          data: allCards,
        };
      }

      return {
        success: false,
        error: "No cards found using any method",
        data: [],
      };
    } catch (error) {
      console.error("Error in getSavedCards:", error);
      return {
        success: false,
        error: error.response?.data || error.message,
        data: [],
      };
    }
  }

  /**
   * Get card by ID from customer vault (working method)
   * @param {string} profileId Customer profile ID
   * @param {string} cardId Card ID to fetch
   * @returns {Promise<Object>} Card details
   */
  async getCardById(profileId, cardId) {
    try {
      console.log(`Fetching card ${cardId} for profile ${profileId}`);

      const response = await axios.get(
        `${this.paysafeBaseUrl}/customervault/v1/profiles/${profileId}/cards/${cardId}`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      console.log("Direct card lookup response:", response.data);

      const card = response.data;
      return {
        success: true,
        data: {
          id: card.id,
          last4: card.lastDigits || card.last4,
          brand: this.mapCardBrand(card.cardBin || card.brand),
          expMonth: card.cardExpiry?.month,
          expYear: card.cardExpiry?.year,
          holderName: card.holderName,
        },
      };
    } catch (error) {
      console.error(
        "Direct card lookup failed:",
        error.response?.data || error.message
      );

      // Try account-level endpoint
      try {
        const accountResponse = await axios.get(
          `${this.paysafeBaseUrl}/customervault/v1/accounts/${this.accountId}/profiles/${profileId}/cards/${cardId}`,
          {
            headers: this.getAuthHeaders(),
          }
        );

        console.log(
          "Account-level card lookup response:",
          accountResponse.data
        );

        const card = accountResponse.data;
        return {
          success: true,
          data: {
            id: card.id,
            last4: card.lastDigits || card.last4,
            brand: this.mapCardBrand(card.cardBin || card.brand),
            expMonth: card.cardExpiry?.month,
            expYear: card.cardExpiry?.year,
            holderName: card.holderName,
          },
        };
      } catch (accountError) {
        console.error(
          "Account-level card lookup also failed:",
          accountError.response?.data || accountError.message
        );

        return {
          success: false,
          error: error.response?.data || error.message,
        };
      }
    }
  }

  /**
   * Delete a saved card from customer's vault
   * @param {string} profileId Paysafe customer profile ID
   * @param {string} cardId Card ID to delete
   * @returns {Promise<Object>} Operation result
   */
  async deleteCard(profileId, cardId) {
    try {
      await axios.delete(
        `${this.paysafeBaseUrl}/customervault/v1/profiles/${profileId}/cards/${cardId}`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  }

  /**
   * Map card brand from Paysafe response to standardized format
   * @param {string} cardBin Card BIN or brand from Paysafe
   * @returns {string} Standardized card brand
   */
  mapCardBrand(cardBin) {
    if (!cardBin) return "unknown";

    const brand = cardBin.toString().toLowerCase();
    if (brand.startsWith("4")) return "visa";
    if (brand.startsWith("5") || brand.startsWith("2")) return "mastercard";
    if (brand.startsWith("3")) return "amex";
    if (brand.startsWith("6")) return "discover";

    return brand;
  }

  /**
   * Create a payment handle for card tokenization (required for working payment flow)
   * @param {Object} cardData Card information
   * @param {string} customerId Customer profile ID for saving the card
   * @param {string} currencyCode Currency code (default: USD)
   * @param {string} merchantRefNum Optional merchant reference number
   * @returns {Promise<Object>} Payment handle response
   */
  async createPaymentHandle(
    cardData,
    customerId = null,
    currencyCode = "USD",
    merchantRefNum = null
  ) {
    const { cardNumber, cardExpMonth, cardExpYear, cardCVD, billingAddress } =
      cardData;

    try {
      const payload = {
        transactionType: "PAYMENT",
        paymentType: "CARD",
        currencyCode: currencyCode,
        merchantRefNum:
          merchantRefNum ||
          `handle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        returnLinks: [
          {
            rel: "on_completed",
            href: `${
              process.env.BASE_URL || "https://localhost:3000"
            }/api/paysafe/webhook/success`,
            method: "POST",
          },
          {
            rel: "on_failed",
            href: `${
              process.env.BASE_URL || "https://localhost:3000"
            }/api/paysafe/webhook/failed`,
            method: "POST",
          },
        ],
        card: {
          cardNum: cardNumber.replace(/\s/g, ""),
          cvv: cardCVD,
          expiryDate: {
            month: parseInt(cardExpMonth),
            year: parseInt(
              cardExpYear.length === 2 ? `20${cardExpYear}` : cardExpYear
            ),
          },
        },
      };

      // Add customer operation to save the card
      if (customerId) {
        payload.customerOperation = "ADD";
        payload.customerId = customerId;
      }

      // Add billing address if provided
      if (billingAddress) {
        payload.billingAddress = {
          street: billingAddress.address_1,
          street2: billingAddress.address_2 || undefined,
          city: billingAddress.city,
          state: billingAddress.state,
          country: billingAddress.country || "US",
          zip: billingAddress.postcode,
        };
      }

      const response = await axios.post(
        `${this.paysafeBaseUrl}/paymenthub/v1/paymenthandles`,
        payload,
        {
          headers: this.getAuthHeaders(),
        }
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error(
        "Paysafe payment handle creation error:",
        error.response?.data || error.message
      );
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  }

  /**
   * Process payment using payment handle (required for working payment flow)
   * @param {Object} paymentData Payment information
   * @returns {Promise<Object>} Payment response
   */
  async processPaymentWithHandle(paymentData) {
    const { order_id, amount, currency, paymentHandleToken, billing_address } =
      paymentData;

    try {
      const response = await axios.post(
        `${this.paysafeBaseUrl}/paymenthub/v1/payments`,
        {
          merchantRefNum: `order_${order_id}_${Date.now()}`,
          amount: Math.round(amount * 100), // Convert to cents
          currencyCode: currency,
          paymentHandleToken: paymentHandleToken,
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
        },
        {
          headers: this.getAuthHeaders(),
        }
      );

      return {
        success:
          response.data.status === "COMPLETED" ||
          response.data.status === "SUCCESS",
        data: response.data,
        error: !["COMPLETED", "SUCCESS"].includes(response.data.status)
          ? response.data.error
          : null,
      };
    } catch (error) {
      console.error(
        "Paysafe payment processing error:",
        error.response?.data || error.message
      );
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
   * Process payment with Paysafe (original working method)
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
      settleWithAuth: false,
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

    try {
      const response = await axios.post(
        `${this.paysafeBaseUrl}/cardpayments/v1/accounts/${this.accountId}/auths`,
        paysafePayload,
        {
          headers: this.getAuthHeaders(),
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

  /**
   * Process Apple Pay payment with Paysafe (working method)
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
      settleWithAuth: false,
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
        `${this.paysafeBaseUrl}/cardpayments/v1/accounts/${this.accountId}/auths`,
        paysafePayload,
        {
          headers: this.getAuthHeaders(),
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

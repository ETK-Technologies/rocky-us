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
   * Get saved cards for a customer - supports both Payment Hub and Customer Vault APIs
   * @param {string} customerIdOrProfileId Paysafe customer ID or profile ID
   * @returns {Promise<Object>} List of saved cards
   */
  async getSavedCards(customerIdOrProfileId) {
    console.log(
      "Getting saved cards for customer/profile:",
      customerIdOrProfileId
    );

    // First try Customer Vault API (most likely approach for existing cards)
    const legacyResult = await this.getSavedCardsLegacy(customerIdOrProfileId);

    if (legacyResult.success && legacyResult.data.length > 0) {
      console.log("Found cards using Customer Vault API");
      return legacyResult;
    }

    console.log("No cards found in Customer Vault, trying Payment Hub API...");

    try {
      // Try Payment Hub API to get customer's saved payment handles
      const response = await axios.get(
        `${this.paysafeBaseUrl}/paymenthub/v1/customers/${customerIdOrProfileId}/paymenthandles`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      console.log("Payment Hub cards response:", response.data);

      const paymentHandles = Array.isArray(response.data)
        ? response.data
        : response.data.paymentHandles || [];

      const allCards = paymentHandles
        .filter((handle) => handle.paymentType === "CARD")
        .map((handle) => ({
          id: handle.id,
          last4: handle.card?.last4 || handle.card?.lastDigits,
          brand: this.mapCardBrand(handle.card?.brand || handle.card?.cardBin),
          expMonth:
            handle.card?.expiryDate?.month || handle.card?.cardExpiry?.month,
          expYear:
            handle.card?.expiryDate?.year || handle.card?.cardExpiry?.year,
          holderName: handle.card?.holderName,
          isDefault: handle.isDefault || false,
          token: handle.paymentHandleToken || handle.id,
        }));

      console.log(
        `Found ${allCards.length} card(s) from Payment Hub:`,
        allCards
      );

      return {
        success: true,
        data: allCards,
      };
    } catch (error) {
      console.error(
        "Error getting saved cards from Payment Hub:",
        error.response?.data || error.message
      );

      // If both APIs fail, return the legacy result (which includes proper error messaging)
      return legacyResult;
    }
  }

  /**
   * Legacy method to get saved cards using Customer Vault API
   * @param {string} profileId Paysafe customer profile ID
   * @returns {Promise<Object>} List of saved cards
   */
  async getSavedCardsLegacy(profileId) {
    console.log("Using Customer Vault API for profile:", profileId);

    try {
      // Try Customer Vault API endpoints
      const endpoints = [
        `${this.paysafeBaseUrl}/customervault/v1/accounts/${this.accountId}/profiles/${profileId}/cards`,
        `${this.paysafeBaseUrl}/customervault/v1/profiles/${profileId}/cards`,
      ];

      for (const endpoint of endpoints) {
        try {
          console.log("Trying endpoint:", endpoint);
          const response = await axios.get(endpoint, {
            headers: this.getAuthHeaders(),
          });

          const cards = Array.isArray(response.data)
            ? response.data
            : response.data.cards || [];

          if (cards.length > 0) {
            const allCards = cards.map((card) => ({
              id: card.id,
              last4: card.lastDigits || card.last4,
              brand: this.mapCardBrand(card.cardBin || card.brand),
              expMonth: card.cardExpiry?.month || card.expiry?.month,
              expYear: card.cardExpiry?.year || card.expiry?.year,
              holderName: card.holderName,
              isDefault: card.defaultCardIndicator || card.is_default || false,
              token: card.paymentToken || card.id,
            }));

            return {
              success: true,
              data: allCards,
            };
          }
        } catch (endpointError) {
          console.error(
            `Endpoint ${endpoint} failed:`,
            endpointError.response?.data || endpointError.message
          );
        }
      }

      return {
        success: false,
        error: "No cards found using any method",
        data: [],
      };
    } catch (error) {
      console.error("Error in getSavedCardsLegacy:", error);
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
   * @param {number} amount Payment amount in dollars (required for Payment Hub API)
   * @returns {Promise<Object>} Payment handle response
   */
  async createPaymentHandle(
    cardData,
    customerId = null,
    currencyCode = "USD",
    merchantRefNum = null,
    amount = 0
  ) {
    const { cardNumber, cardExpMonth, cardExpYear, cardCVD, billingAddress } =
      cardData;

    try {
      console.log("Creating payment handle with card data:", {
        cardNumber: cardNumber ? `****${cardNumber.slice(-4)}` : "undefined",
        cardExpMonth,
        cardExpYear,
        cardCVD: cardCVD ? "***" : "undefined",
        billingAddress,
      });

      const payload = {
        transactionType: "PAYMENT",
        paymentType: "CARD",
        amount: Math.round(amount * 100), // Convert to cents
        currencyCode: currencyCode,
        merchantRefNum:
          merchantRefNum || `${Date.now()}${Math.floor(Math.random() * 1000)}`, // Generate numeric MRN
        returnLinks: [
          {
            rel: "default",
            href: `${
              process.env.BASE_URL || "https://localhost:3000"
            }/api/paysafe/webhook/pay`,
            method: "POST",
          },
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
          cardExpiry: {
            month: parseInt(cardExpMonth),
            year: parseInt(
              cardExpYear.length === 2 ? `20${cardExpYear}` : cardExpYear
            ),
          },
        },
      };

      console.log("Payment handle payload:", JSON.stringify(payload, null, 2));

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
          merchantRefNum: `${order_id}${Date.now()}${Math.floor(
            Math.random() * 1000
          )}`,
          amount: Math.round(amount * 100), // Convert to cents
          currencyCode: currency,
          paymentHandleToken: paymentHandleToken,
          preAuth: true,
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
          response.data.status === "SUCCESS" ||
          response.data.status === "AUTHORIZED", // Authorization-only transactions
        data: response.data,
        error: !["COMPLETED", "SUCCESS", "AUTHORIZED"].includes(
          response.data.status
        )
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
   * Process payment with Paysafe using Payment Hub API for authorization-only
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

    try {
      // Step 1: Create payment handle first
      const cardData = {
        cardNumber,
        cardExpMonth,
        cardExpYear,
        cardCVD,
        billingAddress: billing_address,
      };

      const handleResult = await this.createPaymentHandle(
        cardData,
        null, // customerId - set to null if not saving card
        currency || "USD",
        `order_${order_id}_${Date.now()}`,
        amount
      );

      if (!handleResult.success) {
        return {
          success: false,
          data: null,
          error: handleResult.error,
          paysafe_error_code: handleResult.error?.error?.code,
          paysafe_error_message: handleResult.error?.error?.message,
        };
      }

      // The payment handle token might be in different fields depending on API response
      const paymentHandleToken =
        handleResult.data.paymentHandleToken ||
        handleResult.data.id ||
        handleResult.data.token;

      // Debug: Log the payment handle response to verify token
      console.log("Payment handle creation result:", handleResult.data);
      console.log("Payment handle token:", paymentHandleToken);

      if (!paymentHandleToken) {
        return {
          success: false,
          data: null,
          error: "Payment handle token not found in response",
        };
      }

      // Step 2: Process payment using Payment Hub API
      const paysafePayload = {
        merchantRefNum: `order_${order_id}_${Date.now()}`,
        amount: Math.round(amount * 100), // Convert to cents
        currencyCode: currency || "USD",
        dupCheck: false,
        preAuth: true,
        paymentHandleToken: paymentHandleToken,
      };

      // Add billing details if provided (required for AVS)
      if (billing_address) {
        paysafePayload.billingDetails = {
          street: billing_address.address_1,
          street2: billing_address.address_2 || undefined,
          city: billing_address.city,
          state: billing_address.state,
          country: billing_address.country || "US",
          zip: billing_address.postcode,
        };
      }

      console.log(
        "Payment request payload:",
        JSON.stringify(paysafePayload, null, 2)
      );

      const response = await axios.post(
        `${this.paysafeBaseUrl}/paymenthub/v1/payments`,
        paysafePayload,
        {
          headers: this.getAuthHeaders(),
        }
      );

      console.log("Payment response status:", response.data.status);
      console.log(
        "Payment response data:",
        JSON.stringify(response.data, null, 2)
      );

      return {
        success:
          response.data.status === "COMPLETED" ||
          response.data.status === "SUCCESS" ||
          response.data.status === "AUTHORIZED", // Authorization-only transactions
        data: response.data,
        error: !["COMPLETED", "SUCCESS", "AUTHORIZED"].includes(
          response.data.status
        )
          ? response.data.error
          : null,
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
        success:
          response.data.status === "COMPLETED" ||
          response.data.status === "AUTHORIZED", // Authorization-only transactions
        data: response.data,
        error: !["COMPLETED", "AUTHORIZED"].includes(response.data.status)
          ? response.data.error
          : null,
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

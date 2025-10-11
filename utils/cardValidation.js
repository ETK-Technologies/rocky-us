/**
 * Card validation utilities for checkout forms
 */

/**
 * Validates a credit card number using Luhn algorithm
 * @param {string} cardNumber - The card number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateCardNumber = (cardNumber) => {
  // Remove all non-digits
  const cleaned = cardNumber.replace(/\D/g, "");

  // Check if it's a reasonable length (13-19 digits)
  if (cleaned.length < 13 || cleaned.length > 19) {
    return false;
  }

  // Luhn algorithm
  let sum = 0;
  let isEven = false;

  // Process digits from right to left
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

/**
 * Validates expiry date format and future date
 * @param {string} expiry - Expiry date in MM/YY format
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateExpiryDate = (expiry) => {
  if (!expiry || expiry.length !== 5) {
    return false;
  }

  const [month, year] = expiry.split("/");

  if (!month || !year || month.length !== 2 || year.length !== 2) {
    return false;
  }

  const monthNum = parseInt(month);
  const yearNum = parseInt(`20${year}`);

  // Validate month (01-12)
  if (monthNum < 1 || monthNum > 12) {
    return false;
  }

  // Validate year (current year onwards)
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-11

  if (yearNum < currentYear) {
    return false;
  }

  // If it's the current year, check if month is not in the past
  if (yearNum === currentYear && monthNum < currentMonth) {
    return false;
  }

  return true;
};

/**
 * Validates CVC/CVV code
 * @param {string} cvc - The CVC code
 * @param {string} cardType - The card type (for length validation)
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateCVC = (cvc, cardType = "") => {
  if (!cvc || cvc.length < 3) {
    return false;
  }

  // Amex cards have 4-digit CVC, others have 3-digit
  const isAmex = cardType.toLowerCase() === "amex";
  const expectedLength = isAmex ? 4 : 3;

  return cvc.length === expectedLength && /^\d+$/.test(cvc);
};

/**
 * Gets card type from card number
 * @param {string} cardNumber - The card number
 * @returns {string} - Card type or "unknown"
 */
export const getCardType = (cardNumber) => {
  const cleaned = cardNumber.replace(/\D/g, "");

  const regexMap = {
    visa: /^4/,
    mastercard: /^5[1-5]|^2[2-7]/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/,
    dinersclub: /^3(?:0[0-5]|[68])/,
    jcb: /^(?:2131|1800|35)/,
  };

  for (const [type, regex] of Object.entries(regexMap)) {
    if (regex.test(cleaned)) {
      return type;
    }
  }

  return "unknown";
};

/**
 * Validates complete card information
 * @param {Object} cardData - Card data object
 * @param {string} cardData.cardNumber - Card number
 * @param {string} cardData.expiry - Expiry date
 * @param {string} cardData.cvc - CVC code
 * @returns {Object} - Validation result with isValid boolean and errors array
 */
export const validateCardData = ({ cardNumber, expiry, cvc }) => {
  const errors = [];

  if (!cardNumber || !validateCardNumber(cardNumber)) {
    errors.push("Invalid card number");
  }

  if (!expiry || !validateExpiryDate(expiry)) {
    errors.push("Invalid expiry date");
  }

  const cardType = getCardType(cardNumber);
  if (!cvc || !validateCVC(cvc, cardType)) {
    const expectedLength = cardType === "amex" ? 4 : 3;
    errors.push(`Invalid CVC (${expectedLength} digits required)`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    cardType,
  };
};

/**
 * Checks if payment method is valid (either saved card selected or new card completed)
 * @param {Object} paymentState - Payment state object
 * @param {Object|null} paymentState.selectedCard - Selected saved card
 * @param {string} paymentState.cardNumber - New card number
 * @param {string} paymentState.expiry - New card expiry
 * @param {string} paymentState.cvc - New card CVC
 * @returns {boolean} - True if payment method is valid
 */
export const isPaymentMethodValid = ({
  selectedCard,
  cardNumber,
  expiry,
  cvc,
}) => {
  // If a saved card is selected, payment method is valid
  if (selectedCard) {
    return true;
  }

  // If no saved card, check if new card is complete and valid
  const validation = validateCardData({ cardNumber, expiry, cvc });
  return validation.isValid;
};

/**
 * Gets validation message for the current payment state
 * @param {Object} paymentState - Payment state object
 * @returns {string} - Validation message
 */
export const getPaymentValidationMessage = ({
  selectedCard,
  cardNumber,
  expiry,
  cvc,
}) => {
  if (selectedCard) {
    return ""; // No message needed for valid saved card
  }

  const validation = validateCardData({ cardNumber, expiry, cvc });

  if (validation.isValid) {
    return ""; // No message needed for valid new card
  }

  // Return the first error message
  return validation.errors[0] || "Please complete your card information";
};

import { logger } from "@/utils/devLogger";

/**
 * Payment Error Handler Utility
 * Transforms technical payment errors into user-friendly messages
 */

/**
 * Check if an error is a WordPress critical error (usually bank-related)
 * @param {string} errorMessage - The error message to check
 * @returns {boolean} - True if it's a WordPress critical error
 */
export const isWordPressCriticalError = (errorMessage) => {
  if (!errorMessage || typeof errorMessage !== "string") return false;

  const criticalErrorIndicators = [
    "There has been a critical error on this website",
    "internal_server_error",
    "wordpress.org/documentation/article/faq-troubleshooting",
    "<p>There has been a critical error on this website.</p>",
    "critical error on this website",
  ];

  return criticalErrorIndicators.some((indicator) =>
    errorMessage.toLowerCase().includes(indicator.toLowerCase())
  );
};

/**
 * Check if an error is related to payment gateway/bank issues
 * @param {string} errorMessage - The error message to check
 * @returns {boolean} - True if it's a payment gateway error
 */
export const isPaymentGatewayError = (errorMessage) => {
  if (!errorMessage || typeof errorMessage !== "string") return false;

  const gatewayErrorIndicators = [
    "gateway",
    "payment processor",
    "bambora",
    "beanstream",
    "card declined",
    "insufficient funds",
    "invalid card",
    "payment failed",
    "transaction failed",
    "connection timeout",
    "service unavailable",
  ];

  return gatewayErrorIndicators.some((indicator) =>
    errorMessage.toLowerCase().includes(indicator.toLowerCase())
  );
};

/**
 * Transform technical payment errors into user-friendly messages
 * @param {string} errorMessage - The original error message
 * @param {object} errorDetails - Additional error details
 * @returns {string} - User-friendly error message
 */
export const transformPaymentError = (errorMessage, errorDetails = null) => {
  // Ensure errorMessage is always a string
  const safeErrorMessage = (errorMessage || "").toString();

  // Check if it's a WordPress critical error (usually bank-related)
  if (isWordPressCriticalError(safeErrorMessage)) {
    return "There is an issue with your payment method. Please contact your bank to ensure your card is authorized for online purchases, or try a different payment method.";
  }

  // Handle specific error codes first
  if (errorDetails && errorDetails.code) {
    switch (errorDetails.code) {
      case "internal_server_error":
        return "There is an issue with your payment method. Please contact your bank to ensure your card is authorized for online purchases, or try a different payment method.";
      case "payment_method_not_available":
        return "This payment method is temporarily unavailable. Please try a different card or payment method.";
      case "card_declined":
        return "Your card was declined by your bank. Please contact your bank or try a different payment method.";
      case "insufficient_funds":
        return "Your card was declined due to insufficient funds. Please try a different payment method.";
      default:
        break;
    }
  }

  // Handle common payment error messages
  const errorLower = safeErrorMessage.toLowerCase();

  if (errorLower.includes("declined") || errorLower.includes("card declined")) {
    return "Your card was declined by your bank. Please contact your bank or try a different payment method.";
  }

  // Handle specific "Invalid Card No" message
  if (errorLower.includes("invalid card no")) {
    return "Invalid card number. Please make sure you are using a valid card and check that all digits are entered correctly.";
  }

  // Handle other specific card validation errors
  if (errorLower.includes("invalid card number")) {
    return "Invalid card number. Please make sure you are using a valid card and check that all digits are entered correctly.";
  }

  if (
    errorLower.includes("invalid expiry") ||
    errorLower.includes("invalid exp")
  ) {
    return "Invalid expiry date.";
  }

  if (
    errorLower.includes("invalid cvv") ||
    errorLower.includes("invalid cvc") ||
    errorLower.includes("invalid security code")
  ) {
    return "Invalid security code. Please check the 3 or 4-digit code on the back (or front for Amex) of your card.";
  }

  if (errorLower.includes("expired") || errorLower.includes("invalid card")) {
    return "Your card information appears to be invalid or expired. Please check your card details and try again, or contact your bank.";
  }

  if (errorLower.includes("insufficient funds")) {
    return "Your card was declined due to insufficient funds. Please try a different payment method.";
  }

  if (errorLower.includes("maximum number of credit cards is reached")) {
    return "You have reached the maximum number of saved cards allowed. Please remove an existing card or use a different payment method.";
  }

  if (
    errorLower.includes("timeout") ||
    errorLower.includes("connection") ||
    errorLower.includes("socket hang up") ||
    errorLower.includes("504") ||
    errorLower.includes("gateway timeout")
  ) {
    return "Connection timeout occurred. Your payment may have been processed successfully. Please check your order status or contact support if you have any concerns.";
  }

  if (
    errorLower.includes("address verification failed") ||
    errorLower.includes("retry without avs")
  ) {
    return "Address verification failed. Please ensure your billing address matches exactly what your bank has on file, or contact your bank for assistance.";
  }

  // Check if it's a general payment gateway error
  if (isPaymentGatewayError(safeErrorMessage)) {
    return "There is an issue with your payment method. Please contact your bank to ensure your card is authorized for online purchases, or try a different payment method.";
  }

  // For any other errors, return the original server error message
  if (safeErrorMessage && safeErrorMessage.trim()) {
    return safeErrorMessage; // Show the actual server error
  }

  // Fallback message
  return "Unable to process payment at this time. Please contact your bank or try a different payment method.";
};

/**
 * Check if order status indicates successful payment
 * @param {string} status - The order status from WordPress
 * @returns {boolean} - True if payment was successful
 */
export const isSuccessfulOrderStatus = (status) => {
  const successStatuses = ["processing", "completed", "on-hold"];
  return successStatuses.includes(status);
};

/**
 * Check if order status indicates failed payment
 * @param {string} status - The order status from WordPress
 * @returns {boolean} - True if payment failed
 */
export const isFailedOrderStatus = (status) => {
  return status === "failed";
};

/**
 * Check if order status indicates pending payment
 * @param {string} status - The order status from WordPress
 * @returns {boolean} - True if payment is still pending
 */
export const isPendingOrderStatus = (status) => {
  return status === "pending";
};

/**
 * Get user-friendly message for order status
 * @param {string} status - The order status from WordPress
 * @returns {string} - User-friendly message
 */
export const getOrderStatusMessage = (status) => {
  if (isSuccessfulOrderStatus(status)) {
    return "Payment processed successfully";
  } else if (isFailedOrderStatus(status)) {
    return "Payment failed - please try another payment method";
  } else if (isPendingOrderStatus(status)) {
    return "Payment still pending - please try again";
  } else {
    return `Order status: ${status}`;
  }
};

/**
 * Safely parse JSON response with proper error handling
 * @param {Response} response - The fetch response object
 * @returns {Promise<object>} - Parsed JSON or error object
 */
export const safeParsePaymentResponse = async (response) => {
  try {
    // Check if response is JSON before parsing
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const jsonData = await response.json();

      // Check for server errors that might still have succeeded (500s, 504s, and internal_server_error)
      // Don't treat 400 errors as server errors - they have detailed failure info
      if (
        response.status >= 500 ||
        response.status === 504 ||
        jsonData.code === "internal_server_error"
      ) {
        return {
          success: false,
          // Prefer the transformed error message from backend, fallback to raw message or status
          error:
            jsonData.error ||
            jsonData.message ||
            `Server error: ${response.status}`,
          data: jsonData, // Include the parsed data for error checking
          isJsonError: true,
          responseOk: response.ok,
        };
      }

      // For 400 errors and other client errors, return as failed but include data for detailed error extraction
      if (!response.ok) {
        return {
          success: false,
          error:
            jsonData.error ||
            jsonData.message ||
            `Request failed with status code ${response.status}`,
          data: jsonData, // Include the parsed data for detailed error extraction
          isClientError: true,
          responseOk: response.ok,
        };
      }

      return {
        success: true,
        data: jsonData,
      };
    } else {
      // Handle non-JSON response
      const textResponse = await response.text();
      logger.error("Non-JSON payment response received:", textResponse);

      // Check if it's a timeout error (504 Gateway Timeout)
      if (response.status === 504) {
        return {
          success: false,
          error:
            "Gateway timeout - your payment may have been processed successfully. Please check your order status.",
          isNonJsonResponse: true,
          responseOk: response.ok,
          isTimeoutError: true,
        };
      }

      return {
        success: false,
        error: `Server returned non-JSON response: ${textResponse.substring(
          0,
          200
        )}`,
        isNonJsonResponse: true,
        responseOk: response.ok,
      };
    }
  } catch (parseError) {
    logger.error("Error parsing payment response:", parseError);

    // Check if it's a network/timeout error
    const errorMessage = (parseError.message || parseError.toString() || "")
      .toString()
      .toLowerCase();
    if (
      errorMessage.includes("socket hang up") ||
      errorMessage.includes("network error") ||
      errorMessage.includes("fetch failed") ||
      errorMessage.includes("timeout")
    ) {
      return {
        success: false,
        error:
          "Network timeout - your payment may have been processed successfully. Please check your order status.",
        isParseError: true,
        isTimeoutError: true,
        responseOk: response.ok,
      };
    }

    return {
      success: false,
      error: parseError.message,
      isParseError: true,
      responseOk: response.ok,
    };
  }
};

/**
 * Verify order status when JSON parsing fails but response seems successful
 * @param {string} orderId - The order ID to check
 * @param {string} orderKey - The order key (optional)
 * @returns {Promise<object>} - Order verification result
 */
export const verifyOrderStatus = async (orderId, orderKey = "") => {
  try {
    logger.log("Verifying order status after payment response issue");
    const orderCheckResponse = await fetch(`/api/order/status?id=${orderId}`);
    const orderStatus = await orderCheckResponse.json();

    if (isSuccessfulOrderStatus(orderStatus.status)) {
      logger.log("Order was successfully processed despite response issue");
      return {
        success: true,
        order_id: orderId,
        order_key: orderKey,
        order_status: orderStatus.status,
        message: getOrderStatusMessage(orderStatus.status),
        verifiedFromStatus: true,
      };
    } else if (isFailedOrderStatus(orderStatus.status)) {
      return {
        success: false,
        error: getOrderStatusMessage(orderStatus.status),
        order_status: orderStatus.status,
      };
    } else if (isPendingOrderStatus(orderStatus.status)) {
      return {
        success: false,
        error: getOrderStatusMessage(orderStatus.status),
        order_status: orderStatus.status,
        canRetry: true,
      };
    } else {
      return {
        success: false,
        error: `Unknown order status: ${orderStatus.status}`,
        order_status: orderStatus.status,
      };
    }
  } catch (statusError) {
    logger.error("Error verifying order status:", statusError);
    return {
      success: false,
      error: "Unable to verify payment status",
      statusCheckFailed: true,
    };
  }
};

/**
 * Extract specific payment failure message from detailed error response
 * @param {object} errorData - The parsed error response data
 * @returns {string|null} - Specific payment error message or null
 */
const extractPaymentFailureMessage = (errorData) => {
  logger.log("Extracting payment failure message from:", errorData);

  // First, check if we have a direct message field
  if (errorData && errorData.message && typeof errorData.message === "string") {
    logger.log("Found direct message field:", errorData.message);
    return errorData.message;
  }

  // Check if we have detailed payment failure information
  if (errorData && errorData.details) {
    const details = errorData.details;
    logger.log("Found details:", details);

    // Look for payment_result with failure details
    if (details.payment_result && details.payment_result.payment_details) {
      const paymentDetails = details.payment_result.payment_details;
      logger.log("Found payment details:", paymentDetails);

      // Find the message in payment details
      const messageDetail = paymentDetails.find(
        (detail) => detail.key === "message"
      );
      if (messageDetail && messageDetail.value) {
        logger.log("Found message detail:", messageDetail.value);
        return messageDetail.value;
      }
    }

    // Check if status is failed and we have order info
    if (details.status === "failed" && details.order_id) {
      logger.log(
        "Found failed status with order ID, returning generic message"
      );
      return "Payment failed - please check your card details and try again";
    }
  }

  logger.log("No payment failure message found");
  return null;
};

/**
 * Check if error response indicates internal server error that might still have succeeded
 * @param {object} parseResult - Result from safeParsePaymentResponse
 * @param {Response} response - The original response object
 * @returns {boolean} - True if we should check order status despite error
 */
const shouldCheckOrderStatusOnError = (parseResult, response) => {
  // Don't check order status for 400 errors with detailed payment failure info
  if (response.status === 400 && parseResult.data) {
    const specificMessage = extractPaymentFailureMessage(parseResult.data);
    if (specificMessage) {
      return false; // We have clear failure info, don't check status
    }
  }

  // Check for 500 internal server errors
  if (response.status === 500) {
    return true;
  }

  // Check for 504 Gateway Timeout errors (payment might still succeed)
  if (response.status === 504) {
    return true;
  }

  // Check for timeout-related errors that might still succeed
  if (parseResult.isTimeoutError) {
    return true;
  }

  if (parseResult.error) {
    const errorLower = (parseResult.error || "").toString().toLowerCase();
    if (
      errorLower.includes("socket hang up") ||
      errorLower.includes("504") ||
      errorLower.includes("gateway timeout") ||
      errorLower.includes("timeout") ||
      errorLower.includes("connection timeout")
    ) {
      return true;
    }
  }

  // Check for internal_server_error in the response data
  if (parseResult.data && parseResult.data.code === "internal_server_error") {
    return true;
  }

  // Check for internal_server_error in error message
  if (
    parseResult.error &&
    (parseResult.error || "")
      .toString()
      .toLowerCase()
      .includes("internal_server_error")
  ) {
    return true;
  }

  // Check for WordPress critical errors that might still succeed
  if (parseResult.error && isWordPressCriticalError(parseResult.error)) {
    return true;
  }

  return false;
};

/**
 * Handle payment response with comprehensive error handling and status verification
 * @param {Response} response - The fetch response object
 * @param {string} orderId - The order ID (required for status verification)
 * @param {string} orderKey - The order key (optional)
 * @returns {Promise<object>} - Processed payment result
 */
export const handlePaymentResponse = async (
  response,
  orderId,
  orderKey = ""
) => {
  // First, try to parse the response safely
  const parseResult = await safeParsePaymentResponse(response);

  if (parseResult.success) {
    // Successfully parsed JSON response
    return parseResult.data;
  }

  // Check for specific payment failure messages first (e.g., 400 errors with detailed info)
  if (parseResult.data) {
    logger.log(
      "Checking for specific payment failure message in:",
      parseResult.data
    );
    const specificMessage = extractPaymentFailureMessage(parseResult.data);
    if (specificMessage) {
      logger.log("Found specific payment failure message:", specificMessage);
      // Transform the specific message to be user-friendly
      const userFriendlyMessage = transformPaymentError(specificMessage);
      logger.log("Transformed to user-friendly message:", userFriendlyMessage);
      throw new Error(userFriendlyMessage);
    } else {
      logger.log("No specific payment failure message found");
    }
  }

  // Check if we should verify order status despite the error response
  // Only check status if we have an orderId (not applicable for regular checkout)
  const shouldCheckStatus =
    orderId &&
    (parseResult.responseOk ||
      shouldCheckOrderStatusOnError(parseResult, response));

  if (shouldCheckStatus) {
    logger.log(
      "Checking order status due to response issue (non-JSON, internal server error, or critical error)"
    );
    const statusResult = await verifyOrderStatus(orderId, orderKey);

    if (statusResult.success) {
      // Order was successful despite response parsing issues
      logger.log("Payment actually succeeded despite error response");
      return statusResult;
    } else if (statusResult.canRetry) {
      // Order is pending, allow retry
      const retryErrorMessage =
        typeof statusResult.error === "string"
          ? statusResult.error
          : statusResult.error?.message ||
            statusResult.error?.error?.message ||
            "Payment is pending. Please try again.";
      throw new Error(retryErrorMessage);
    } else {
      // Order failed - continue with original error
      logger.log("Order status confirms failure, showing original error");
    }
  }

  // Response was not OK and no successful status verification
  // Ensure we throw a string error, not an object
  const errorMessage =
    typeof parseResult.error === "string"
      ? parseResult.error
      : parseResult.error?.message ||
        parseResult.error?.error?.message ||
        "Payment failed. Please try again.";
  throw new Error(errorMessage);
};

/**
 * Log payment errors for debugging while showing user-friendly messages
 * @param {string} context - Context where the error occurred (e.g., 'checkout', 'saved-card-payment')
 * @param {Error|object} error - The original error object
 * @param {string} userMessage - The user-friendly message being shown
 */
export const logPaymentError = (context, error, userMessage) => {
  logger.error(`Payment Error [${context}]:`, {
    originalError: error.response?.data || error.message || error,
    userFriendlyMessage: userMessage,
    timestamp: new Date().toISOString(),
    context,
  });
};

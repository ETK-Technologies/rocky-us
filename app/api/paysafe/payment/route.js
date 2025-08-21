import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  validatePaymentInput,
  validateEnvironmentVariables,
  sanitizePaymentData,
} from "@/utils/validation";
import { PaymentService } from "@/lib/services/PaymentService";
import { OrderService } from "@/lib/services/OrderService";
import { CartService } from "@/lib/services/CartService";
import {
  PAYMENT_STATUS,
  RESPONSE_STATUS,
  ERROR_MESSAGES,
} from "@/lib/constants/payment";

// Environment variables are now handled by the services

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken");
    const userId = cookieStore.get("userId");

    if (!authToken || !userId) {
      return NextResponse.json(
        { success: false, message: ERROR_MESSAGES.NOT_AUTHENTICATED },
        { status: 401 }
      );
    }

    const requestData = await req.json();
    const {
      order_id,
      amount,
      currency = "USD",
      cardNumber,
      cardExpMonth,
      cardExpYear,
      cardCVD,
      billing_address,
      saveCard = false,
    } = requestData;

    // Validate input data
    const validation = validatePaymentInput(requestData);
    if (!validation.isValid) {
      // console.error("Payment validation failed:", validation.errors);
      return NextResponse.json(
        {
          success: false,
          message: ERROR_MESSAGES.INVALID_PAYMENT_DATA,
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // Log sanitized payment data for debugging
    // console.log(
    //   "Processing payment with data:",
    //   sanitizePaymentData(requestData)
    // );

    // Validate environment variables
    const envValidation = validateEnvironmentVariables();
    if (!envValidation.isValid) {
      // console.error("Missing environment variables:", envValidation.missing);
      return NextResponse.json(
        {
          success: false,
          message: ERROR_MESSAGES.SERVER_CONFIG_ERROR,
          missing_variables: envValidation.missing,
        },
        { status: 500 }
      );
    }

    // console.log("Environment validation passed");

    // Initialize services
    const paymentService = new PaymentService();
    const orderService = new OrderService();
    const cartService = new CartService(
      authToken.value,
      cookieStore.get("cart-nonce")?.value
    );

    // Handle profile creation and card saving logic
    let profileInfo = {};
    let cardSaveInfo = {};

    // Get or create Paysafe profile if saveCard is true
    let paysafeProfileId = cookieStore.get("paysafeProfileId")?.value;

    if (saveCard) {
      if (!paysafeProfileId) {
        // Create new profile
        const profileResult = await paymentService.createCustomerProfile({
          email: billing_address.email,
          firstName: billing_address.first_name,
          lastName: billing_address.last_name,
          phone: billing_address.phone,
        });

        if (profileResult.success) {
          paysafeProfileId = profileResult.data.id;
          profileInfo = {
            created: true,
            profileId: paysafeProfileId,
          };

          // Store profile ID in cookie
          cookieStore.set("paysafeProfileId", paysafeProfileId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          });
        } else {
          console.error("Failed to create profile:", profileResult.error);
          profileInfo = {
            created: false,
            error: profileResult.error,
          };
        }
      } else {
        profileInfo = {
          created: false,
          profileId: paysafeProfileId,
          existing: true,
        };
      }
    }

    // Create payment handle with card saving if profile exists
    let paymentHandleToken;
    if (saveCard && paysafeProfileId) {
      const handleResult = await paymentService.createPaymentHandle(
        {
          cardNumber,
          cardExpMonth,
          cardExpYear,
          cardCVD,
          billingAddress: billing_address,
        },
        paysafeProfileId,
        currency,
        `save_card_${order_id}_${Date.now()}`,
        amount
      );

      if (handleResult.success) {
        paymentHandleToken = handleResult.data.paymentHandleToken;
        cardSaveInfo = {
          willSave: true,
          paymentHandleCreated: true,
        };
      } else {
        console.error("Failed to create payment handle:", handleResult.error);
        cardSaveInfo = {
          willSave: false,
          error: handleResult.error,
        };
        // Fall back to regular payment without saving
      }
    }

    // Process payment using payment handle or regular method
    let paymentResult;
    if (paymentHandleToken) {
      paymentResult = await paymentService.processPaymentWithHandle({
        order_id,
        amount,
        currency,
        paymentHandleToken,
        billing_address,
      });
    } else {
      // Fall back to original method
      paymentResult = await paymentService.processPayment(requestData);
    }

    if (!paymentResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: ERROR_MESSAGES.PAYMENT_PROCESSING_FAILED,
          error: paymentResult.error,
          paysafe_error_code: paymentResult.paysafe_error_code,
          paysafe_error_message: paymentResult.paysafe_error_message,
          profile: profileInfo,
          cardSave: cardSaveInfo,
        },
        { status: 400 }
      );
    }

    // Payment successful - update order
    if (
      paymentResult.data.status === PAYMENT_STATUS.COMPLETED ||
      paymentResult.data.status === "SUCCESS"
    ) {
      // Update order with payment information
      const orderUpdateResult = await orderService.updateOrderAfterPayment(
        order_id,
        paymentResult.data,
        profileInfo // Pass the profile information
      );

      if (!orderUpdateResult.success) {
        return NextResponse.json(
          {
            success: false,
            order_id: order_id,
            payment_id: paymentResult.data.id,
            status: RESPONSE_STATUS.PAYMENT_SUCCESS_ORDER_UPDATE_FAILED,
            message: ERROR_MESSAGES.ORDER_UPDATE_FAILED,
            error: orderUpdateResult.error,
            error_details: orderUpdateResult.error_details,
            profile: profileInfo,
            cardSave: cardSaveInfo,
          },
          { status: 500 }
        );
      }

      // Try to save card after successful payment
      if (saveCard && paysafeProfileId) {
        if (paymentHandleToken) {
          // If payment handle was used, card should be automatically saved
          cardSaveInfo.saved = true;
          cardSaveInfo.method = "automatic_with_payment";
        } else {
          // If payment handle failed, try direct card vault after successful payment
          try {
            const cardSaveResult = await paymentService.addCardDirectlyToVault(
              paysafeProfileId,
              {
                cardNumber,
                cardExpMonth,
                cardExpYear,
                cardCVD,
                holderName: `${billing_address.first_name} ${billing_address.last_name}`,
                billingAddress: billing_address,
              }
            );

            if (cardSaveResult.success) {
              cardSaveInfo.saved = true;
              cardSaveInfo.method = "direct_vault_after_payment";
              cardSaveInfo.cardId = cardSaveResult.data.id;
            } else {
              cardSaveInfo.saved = false;
              cardSaveInfo.fallbackError = cardSaveResult.error;
            }
          } catch (fallbackError) {
            console.error(
              "Failed to save card using fallback method:",
              fallbackError
            );
            cardSaveInfo.saved = false;
            cardSaveInfo.fallbackError = fallbackError.message;
          }
        }
      }

      // Add order note (non-blocking)
      await orderService.addPaymentNote(order_id, paymentResult.data.id);

      // Empty cart (non-blocking)
      await cartService.emptyCart();

      return NextResponse.json({
        success: true,
        order_id: order_id,
        payment_id: paymentResult.data.id,
        status: RESPONSE_STATUS.SUCCESS,
        message: "Payment processed successfully",
        profile: profileInfo,
        cardSave: cardSaveInfo,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: `Payment failed: ${paymentResult.data.status}`,
          paysafe_error: paymentResult.error,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    // console.error("Payment processing error:", error.message);

    return NextResponse.json(
      {
        success: false,
        message: ERROR_MESSAGES.PAYMENT_PROCESSING_FAILED,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

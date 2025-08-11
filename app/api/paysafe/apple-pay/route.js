import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
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
      applePayToken,
      billing_address,
      saveCard = false,
    } = requestData;

    // Validate input data
    const validation = validatePaymentInput({
      ...requestData,
      cardNumber: "apple_pay", // Dummy value for validation
      cardExpMonth: "01",
      cardExpYear: "25",
      cardCVD: "123",
    });

    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: ERROR_MESSAGES.INVALID_PAYMENT_DATA,
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // Validate Apple Pay token
    if (!applePayToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Apple Pay token is required",
        },
        { status: 400 }
      );
    }

    // Validate environment variables
    const envValidation = validateEnvironmentVariables();
    if (!envValidation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: ERROR_MESSAGES.SERVER_CONFIG_ERROR,
          missing_variables: envValidation.missing,
        },
        { status: 500 }
      );
    }

    // Initialize services
    const paymentService = new PaymentService();
    const orderService = new OrderService();
    const cartService = new CartService(
      authToken.value,
      cookieStore.get("cart-nonce")?.value
    );

    // Process Apple Pay payment
    const paymentResult = await paymentService.processApplePayPayment({
      order_id,
      amount,
      currency,
      applePayToken,
      billing_address,
      saveCard,
    });

    if (!paymentResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: ERROR_MESSAGES.PAYMENT_PROCESSING_FAILED,
          error: paymentResult.error,
          paysafe_error_code: paymentResult.paysafe_error_code,
          paysafe_error_message: paymentResult.paysafe_error_message,
        },
        { status: 400 }
      );
    }

    // Payment successful - update order
    if (paymentResult.data.status === PAYMENT_STATUS.COMPLETED) {
      // Update order with payment information
      const orderUpdateResult = await orderService.updateOrderAfterPayment(
        order_id,
        paymentResult.data
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
          },
          { status: 500 }
        );
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
        message: "Apple Pay payment processed successfully",
        payment_method: "apple_pay",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: `Apple Pay payment failed: ${paymentResult.data.status}`,
          paysafe_error: paymentResult.error,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Apple Pay payment processing error:", error.message);

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

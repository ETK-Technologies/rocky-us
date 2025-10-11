# WooCommerce AJAX API Payment Implementation

## Overview

This document describes the implementation of the **WooCommerce AJAX API approach** for handling Stripe payments in the headless checkout system. This approach creates orders first, then processes payments through WooCommerce's official Stripe integration.

## Architecture

The implementation follows this workflow:

### **NEW SIMPLIFIED APPROACH** ⭐

1. **Process Payment**: Use `/api/woocommerce/stripe/process-payment` to handle complete flow
2. **Payment Confirmation**: Use Stripe Elements to confirm payment on frontend
3. **Order Status Update**: Update order status via WooCommerce AJAX API after successful payment

### **Previous Multi-Step Approach**

1. **Order Creation**: Create order in WooCommerce without payment processing
2. **PaymentIntent Creation**: Use WooCommerce AJAX API to create Stripe PaymentIntent
3. **Payment Confirmation**: Use Stripe Elements to confirm payment on frontend
4. **Order Status Update**: Update order status via WooCommerce AJAX API after successful payment

## API Endpoints

### 1. WooCommerce Stripe AJAX API Proxies

#### `/api/woocommerce/stripe/process-payment` ⭐ **PRIMARY ENDPOINT**

- **Purpose**: Complete payment processing via WooCommerce AJAX API
- **Method**: POST
- **Parameters**:
  - `payment_request_type`: Payment request type (default: "apple_pay")
  - `billing_address`: Billing address object
  - `shipping_address`: Shipping address object
- **Returns**: Complete payment data including order details, client_secret, and payment_intent_id

#### `/api/woocommerce/stripe/get-cart-details`

- **Purpose**: Gets cart details for Stripe payment requests
- **Method**: POST
- **Parameters**:
  - `payment_request_type`: Payment request type (default: "apple_pay")
  - `security`: Security nonce (auto-generated)

#### `/api/woocommerce/stripe/create-order`

- **Purpose**: Creates an order using WooCommerce's official Stripe integration
- **Method**: POST
- **Parameters**:
  - `payment_request_type`: Payment request type (default: "apple_pay")
  - `shipping_address`: Shipping address object
  - `billing_address`: Billing address object
  - `security`: Security nonce (auto-generated)

#### `/api/woocommerce/stripe/create-payment-intent`

- **Purpose**: Creates a Stripe PaymentIntent via WooCommerce AJAX API
- **Method**: POST
- **Parameters**:
  - `order_id`: WooCommerce order ID
  - `amount`: Payment amount in dollars
  - `currency`: Currency code (default: USD)
  - `customer_email`: Customer email address
  - `customer_name`: Customer full name
  - `billing_address`: Billing address object
  - `shipping_address`: Shipping address object

#### `/api/woocommerce/stripe/update-order-status`

- **Purpose**: Updates order status after payment confirmation
- **Method**: POST
- **Parameters**:
  - `order_id`: WooCommerce order ID
  - `payment_intent_id`: Stripe PaymentIntent ID
  - `payment_status`: Payment status from Stripe
  - `payment_method_id`: Stripe payment method ID
  - `customer_id`: Stripe customer ID

#### `/api/woocommerce/stripe/update-payment-intent`

- **Purpose**: Updates a PaymentIntent (for amount changes, etc.)
- **Method**: POST
- **Parameters**:
  - `payment_intent_id`: Stripe PaymentIntent ID
  - `order_id`: WooCommerce order ID
  - `amount`: New payment amount
  - `currency`: Currency code

## Security Features

### Nonce Generation

- Each AJAX API call includes a security nonce
- Nonces are generated using timestamp and action-based hashing
- Fallback nonce generation for development environments

### Authentication

- Uses WooCommerce REST API credentials for authentication
- Includes proper User-Agent headers for API identification
- 30-second timeout for API calls

## Payment Flow Implementation

### Frontend Flow (CheckoutPageContent.jsx)

```javascript
// Step 1: Create order without payment processing
const orderPayload = {
  ...dataToSend,
  payment_data: [], // Empty array - no payment processing
  origin: "headless",
};

const orderResponse = await fetch("/api/checkout", {
  method: "POST",
  body: JSON.stringify(orderPayload),
});

// Step 2: Create PaymentIntent via WooCommerce AJAX API
const paymentIntentResponse = await fetch(
  "/api/woocommerce/stripe/create-payment-intent",
  {
    method: "POST",
    body: JSON.stringify({
      order_id: order_id,
      amount: dataToSend.totalAmount,
      currency: "USD",
      customer_email: formData.billing_address.email,
      billing_address: formData.billing_address,
    }),
  }
);

// Step 3: Confirm payment with Stripe Elements
const { error, paymentIntent } = await stripe.confirmPayment({
  elements: stripeElements,
  confirmParams: {
    return_url: `${window.location.origin}/checkout/confirmation`,
    payment_method_data: {
      billing_details: {
        /* billing details */
      },
    },
  },
  redirect: "if_required",
});

// Step 4: Update order status
const updateResponse = await fetch(
  "/api/woocommerce/stripe/update-order-status",
  {
    method: "POST",
    body: JSON.stringify({
      order_id: order_id,
      payment_intent_id: paymentIntent.id,
      payment_status: paymentIntent.status,
    }),
  }
);
```

## Error Handling

### Enhanced Error Messages

The implementation includes specific error messages for different failure scenarios:

- **Nonce Errors**: "Security verification failed. Please refresh the page and try again."
- **Order Errors**: "Order not found. Please refresh the page and try again."
- **Amount Errors**: "Invalid payment amount. Please refresh the page and try again."
- **Payment Intent Errors**: "Payment succeeded but payment verification failed. Please contact support."

### Logging

Comprehensive logging is implemented for:

- Payment Intent creation success/failure
- Order status updates
- Payment confirmation results
- Error details for debugging

## Environment Variables

Required environment variables:

```env
BASE_URL=https://your-woocommerce-site.com
CONSUMER_KEY=your_woocommerce_consumer_key
CONSUMER_SECRET=your_woocommerce_consumer_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret
```

## Testing

### Test Scenarios

1. **New Card Payment**: Test with Stripe test cards
2. **Saved Card Payment**: Test with previously saved payment methods
3. **Free Order**: Test with 100% coupon discount orders
4. **Error Handling**: Test various error scenarios

### Test Cards

Use Stripe test card numbers:

- `4242424242424242` - Successful payment
- `4000000000000002` - Declined payment
- `4000000000009995` - Insufficient funds

## Benefits of This Approach

1. **Official Integration**: Uses WooCommerce's official Stripe plugin
2. **Order Integrity**: Orders are created before payment processing
3. **Error Recovery**: Failed payments don't create orphaned orders
4. **Subscription Support**: Built-in support for recurring payments
5. **Webhook Compatibility**: Works with WooCommerce Stripe webhooks
6. **Admin Visibility**: All payments visible in WooCommerce admin

## Troubleshooting

### Common Issues

1. **Nonce Verification Failed**

   - Check WooCommerce REST API credentials
   - Verify BASE_URL is correct
   - Ensure WordPress nonce generation is working

2. **PaymentIntent Creation Failed**

   - Verify Stripe plugin is active and configured
   - Check order exists in WooCommerce
   - Ensure proper AJAX action is registered

3. **Order Status Update Failed**
   - Verify PaymentIntent ID is correct
   - Check WooCommerce order exists
   - Ensure proper permissions for order updates

### Debug Mode

Enable detailed logging by checking browser console and server logs for:

- API request/response data
- Error details
- Payment flow progression

## Future Enhancements

1. **Webhook Integration**: Implement Stripe webhook handling
2. **Retry Logic**: Add automatic retry for failed API calls
3. **Caching**: Implement nonce caching for better performance
4. **Monitoring**: Add payment success/failure metrics

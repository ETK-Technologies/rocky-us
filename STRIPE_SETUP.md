# Stripe Integration Setup Guide

## Overview

This guide will help you complete the Stripe integration for your WooCommerce headless checkout system.

## Required Environment Variables

Add these to your `.env.local` file:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## Installation

1. Install Stripe SDK:

```bash
npm install stripe
```

2. Get your Stripe keys from: https://dashboard.stripe.com/apikeys

## Webhook Setup

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe/webhook`
3. Select these events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `payment_method.attached`
   - `customer.created`

## WooCommerce Stripe Plugin Configuration

1. Install WooCommerce Stripe Gateway plugin
2. Configure with same Stripe keys
3. Enable "Process payments via WooCommerce Store API"

## API Endpoints Created

### Payment Processing

- `POST /api/stripe/create-payment-intent` - Creates Stripe PaymentIntent
- `POST /api/stripe/customers` - Creates/manages Stripe customers
- `GET /api/stripe/payment-methods` - Fetches saved payment methods
- `DELETE /api/stripe/payment-methods` - Removes saved payment methods
- `POST /api/stripe/webhook` - Handles Stripe webhooks

## Frontend Integration

The frontend now:

1. Creates Stripe PaymentIntent for new payments
2. Uses actual client_secret in payment_data array
3. Fetches saved cards from Stripe API
4. Sends proper WooCommerce Store API format

## Payment Flow

1. **Frontend**: Creates PaymentIntent via `/api/stripe/create-payment-intent`
2. **Frontend**: Sends checkout data with Stripe client_secret to `/api/checkout`
3. **Backend**: Processes via WooCommerce Store API with Stripe payment_data
4. **WooCommerce**: Handles payment via Stripe plugin
5. **Stripe**: Sends webhook confirmation

## Testing

Use Stripe test card numbers:

- Success: `4242424242424242`
- Decline: `4000000000000002`
- 3D Secure: `4000000000003220`

## Security Notes

- Never expose secret keys in frontend code
- Validate webhook signatures
- Use HTTPS in production
- Set proper CORS policies

## Troubleshooting

1. **Payment fails**: Check Stripe dashboard logs
2. **Webhook errors**: Verify endpoint URL and signature
3. **Cards not saving**: Ensure customer creation works
4. **API errors**: Check environment variables

## Next Steps

1. Test with Stripe test cards
2. Configure webhooks
3. Test saved card functionality
4. Deploy and test in production with live keys

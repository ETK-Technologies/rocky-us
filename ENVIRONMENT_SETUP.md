# Environment Setup for Stripe Integration

## Required Environment Variables

To complete the Stripe integration, you need to add your Stripe API keys to your environment variables.

### Step 1: Get Your Stripe Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Copy your **Publishable key** (starts with `pk_test_` for test mode)
3. Copy your **Secret key** (starts with `sk_test_` for test mode)

### Step 2: Add to Environment File

Create or update your `.env.local` file in the root of your project:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### Step 3: Restart Development Server

After adding the environment variables, restart your development server:

```bash
npm run dev
```

## Testing

Use these Stripe test card numbers for testing:

- **Success**: `4242 4242 4242 4242`
- **Declined**: `4000 0000 0000 0002`
- **Requires Authentication**: `4000 0000 0000 3220`

Use any future expiry date and any 3-digit CVC.

## Current Error

If you see the error `TypeError: can't access property "match", pk is undefined`, it means the `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` environment variable is not set.

## Next Steps

1. Add the environment variables above
2. Restart your development server
3. Test the checkout flow
4. The payment should now confirm successfully and update the order status to "processing"

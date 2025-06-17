# VisiOpt Integration for Next.js

This directory contains components for integrating VisiOpt scripts into the Rocky Next.js application.

## Components

### Base Components

- **VisiOptScript.jsx**: The core script component that handles the VisiOpt script with configurable parameters
- **VisiOptProvider.jsx**: A provider component that manages all scripts and automatically loads the correct one based on the current page and URL parameters
- **config.js**: Central configuration for all VisiOpt scripts including defaults and debug settings

### Page-Specific Components

- **CheckoutScripts.jsx**: Script components for the checkout page with different flows (regular, smoking, ED)
- **ThankYouScript.jsx**: Script component for the order-received (thank you) page
- **EdFlowScripts.jsx**: Script components for the ED flow page with different variants (base, Viagra, Cialis)
- **LoginRegisterScripts.jsx**: Script components for the login/register page with different conditions
- **SmokingConsultationScripts.jsx**: Script component for the smoking consultation page post-checkout
- **WlPreConsultationScript.jsx**: Script component for the WL pre-consultation page
- **ZonnicProductScript.jsx**: Script component for the Zonnic product page
- **Bo2Script.jsx**: Script component for the BO2 page
- **EdPrelander2Script.jsx**: Script component for the ED Prelander2 page
- **EdPrelander3Script.jsx**: Script component for the ED Prelander3 page
- **EdPrelander4Script.jsx**: Script component for the ED Prelander4 page
- **EdPrelander5Script.jsx**: Script component for the ED Prelander5 page
- **EdPreConsultationScript.jsx**: Script component for the ED pre-consultation page

## Integration Methods

These components can be integrated in two ways:

1. **Global Provider**: The `VisiOptProvider` is added to the root layout and automatically loads the appropriate script for each page
2. **Page-Specific Components**: Each page can also include its specific script component for more direct control

## Configuration

All scripts use the same base VisiOpt code with different PIDs:

- `pid`: VisiOpt product ID (varies by page/flow)
- `wid`: VisiOpt website ID (default: 937)
- `flickerTime`: Time in ms for flicker effect (default: 4000)
- `flickerElement`: Element to apply flicker effect (default: 'html')

## Best Practices

1. **Suspense Boundaries**: All components using `useSearchParams()` are wrapped in Suspense boundaries to avoid CSR bailout errors
2. **Client Components**: All VisiOpt script components use the "use client" directive
3. **Centralized Config**: Default values and settings are managed in the config.js file
4. **Debug Mode**: Comprehensive logging when debug mode is enabled (turn off in production)

## Usage

```jsx
// Global usage (already added to root layout)
import { VisiOptProvider } from "@/components/VisiOpt";

// In root layout
<VisiOptProvider />;

// Page-specific usage (added to specific pages)
import { CheckoutScripts } from "@/components/VisiOpt";

// In checkout page
<CheckoutScripts />;
```

## Troubleshooting

If you encounter build errors:

1. **Headers Usage**: If using `headers()` in root layout causes static generation issues, configure routes in next.config.mjs
2. **useSearchParams Error**: All components using useSearchParams() must be wrapped in Suspense boundaries
3. **Script Loading**: Check browser console with debug=true in config.js to see if scripts are loading correctly

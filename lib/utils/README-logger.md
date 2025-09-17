# Secure Logger Utility

A secure, environment-aware logging utility that automatically redacts sensitive information and only shows logs in development mode.

## Features

- 🔒 **Automatic Data Redaction**: Sensitive fields like passwords, tokens, and credit card numbers are automatically redacted
- 🌍 **Environment Aware**: Only logs in development mode by default
- 📊 **Multiple Log Levels**: ERROR, WARN, INFO, DEBUG, TRACE
- 🎯 **Specialized Loggers**: Payment, API, and Order-specific logging methods
- ⚡ **Performance Optimized**: Minimal overhead in production
- 🔧 **Configurable**: Easy to customize for different environments

## Quick Start

```javascript
import { log, logPayment, logOrder, logError } from "@/lib/utils/logger";

// Basic logging
log.info("Application started");
log.error("Something went wrong", errorData);

// Specialized logging
logPayment("Payment processed", paymentData);
logOrder("Order created", orderData);
logError("API error", errorDetails);
```

## Log Levels

| Level | Description         | Development | Production |
| ----- | ------------------- | ----------- | ---------- |
| ERROR | Critical errors     | ✅          | ✅         |
| WARN  | Warnings            | ✅          | ❌         |
| INFO  | General information | ✅          | ❌         |
| DEBUG | Debug information   | ✅          | ❌         |
| TRACE | Very detailed info  | ✅          | ❌         |

## Specialized Loggers

### Payment Logger

```javascript
import { logPayment } from "@/lib/utils/logger";

// Automatically redacts sensitive payment data
logPayment("Processing payment", {
  cardNumber: "4242424242424242", // → [REDACTED]
  cvv: "123", // → [REDACTED]
  amount: 50.0, // → 50.00
  orderId: "order_123", // → order_123
});
```

### Order Logger

```javascript
import { logOrder } from "@/lib/utils/logger";

logOrder("Order created", {
  orderId: "order_123",
  total: 50.0,
  status: "pending",
});
```

### API Logger

```javascript
import { logApi } from "@/lib/utils/logger";

logApi("API request", {
  endpoint: "/api/checkout",
  method: "POST",
  status: 200,
});
```

## Configuration

### Environment Variables

```bash
# .env.local
LOG_LEVEL=DEBUG          # ERROR, WARN, INFO, DEBUG, TRACE
LOG_ENABLED=true         # Enable/disable logging
LOG_TIMESTAMP=true       # Show timestamps
LOG_CALLER=false         # Show file/line info (expensive)
```

### Programmatic Configuration

```javascript
import { log } from "@/lib/utils/logger";

// Update configuration
log.updateConfig({
  level: 2, // INFO level
  enableTimestamp: true,
  enableConsole: true,
});

// Enable/disable logging
log.setEnabled(true);

// Set log level
log.setLevel("DEBUG");
```

## Automatic Redaction

The logger automatically redacts sensitive information based on patterns:

- `password`, `secret`, `token`, `key`, `auth`
- `credit card`, `cvv`, `cvc`
- `ssn`, `social security`
- `api key`, `private key`, `client secret`

### Example Redaction

```javascript
// Input
logPayment("Payment data", {
  cardNumber: "4242424242424242",
  cvv: "123",
  apiKey: "sk_test_123",
  amount: 50.00,
  orderId: "order_123"
});

// Output (in development)
[2024-01-15T10:30:00.000Z] 💳 PAYMENT: Payment data {
  cardNumber: '[REDACTED]',
  cvv: '[REDACTED]',
  apiKey: '[REDACTED]',
  amount: 50.00,
  orderId: 'order_123'
}
```

## Migration from console.log

### Before

```javascript
console.log("Order created:", orderData);
console.error("Payment failed:", error);
console.warn("Deprecated API used");
```

### After

```javascript
import { logOrder, logError, logWarn } from "@/lib/utils/logger";

logOrder("Order created:", orderData);
logError("Payment failed:", error);
logWarn("Deprecated API used");
```

## Best Practices

### ✅ Do

- Use specialized loggers (`logPayment`, `logOrder`, `logApi`)
- Include context in log messages
- Use appropriate log levels
- Let the logger handle redaction

### ❌ Don't

- Log sensitive data manually
- Use console.log in production code
- Log large objects in production
- Forget to import the logger

## Examples

See `lib/utils/logger-examples.js` for comprehensive usage examples.

## Environment Behavior

| Environment | Console Output | Log Level | Timestamps |
| ----------- | -------------- | --------- | ---------- |
| Development | ✅             | DEBUG     | ✅         |
| Test        | ❌             | ERROR     | ❌         |
| Production  | ❌             | ERROR     | ❌         |

## Security

- Sensitive data is automatically redacted
- Logs are disabled in production by default
- No sensitive information is stored or transmitted
- Configurable redaction patterns

## Performance

- Minimal overhead in production (logs are disabled)
- Efficient redaction algorithms
- No string concatenation in production
- Lazy evaluation of log data

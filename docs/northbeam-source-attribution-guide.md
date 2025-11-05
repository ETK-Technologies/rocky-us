# Northbeam Source Attribution Implementation Guide

## Overview

This guide documents the comprehensive source attribution tracking system implemented for Northbeam. The system captures traffic sources from multiple channels (AWIN, Google Ads, Facebook, TikTok, UTM parameters, etc.) and passes them to Northbeam's attribution dashboard.

## Problem Statement

Previously, Northbeam was receiving purchase data but **without any source attribution**. This meant:
- ❌ AWIN affiliate sales showed as "Direct" or "Unknown"
- ❌ Paid ads (Google, Facebook, TikTok) weren't being attributed
- ❌ UTM campaigns weren't being tracked
- ❌ No visibility into which channels drive conversions

## Solution Architecture

### 1. Source Attribution Utility (`utils/sourceAttribution.js`)

A comprehensive utility that captures and persists traffic source data across:

#### Supported Traffic Sources

| Source Type | Parameters | Example |
|------------|-----------|---------|
| **AWIN Affiliate** | `?awc=...` | `?awc=123456789` |
| **Google Ads** | `?gclid=...` | `?gclid=CjwKCAiA...` |
| **Facebook/Meta** | `?fbclid=...` | `?fbclid=IwAR0...` |
| **TikTok Ads** | `?ttclid=...` | `?ttclid=7123456...` |
| **Microsoft Ads** | `?msclkid=...` | `?msclkid=abc123...` |
| **LinkedIn Ads** | `?li_fat_id=...` | `?li_fat_id=xyz789...` |
| **UTM Parameters** | `?utm_source=...&utm_medium=...&utm_campaign=...` | `?utm_source=google&utm_medium=cpc` |
| **Referral** | HTTP Referrer header | From external domains |
| **Direct** | No parameters | Direct navigation |

#### Data Captured

For each visitor, the system tracks:

```javascript
{
  source: "google",              // UTM source or derived source
  medium: "cpc",                 // UTM medium
  campaign: "summer_sale_2024",  // UTM campaign
  content: "banner_ad_1",        // UTM content
  term: "health_products",       // UTM term
  clickId: "CjwKCAiA...",       // Platform click ID
  clickIdType: "Google Ads",     // Detected platform
  awinAwc: "123456789",         // AWIN affiliate code
  referrer: "https://google.com/", // External referrer
  landingPage: "https://myrocky.com/ed", // First page visited
  firstTouchTime: "2024-01-15T10:30:00Z", // First visit
  lastTouchTime: "2024-01-15T11:45:00Z"   // Latest visit
}
```

#### Storage Mechanisms

Data is stored with **dual redundancy** for reliability:
1. **Cookies** (30-day expiration, SameSite=None for cross-domain)
2. **localStorage** (backup for cookie blockers)

### 2. Northbeam Integration

#### Enhanced Order Tags

Northbeam purchase events now include source attribution tags in the `order_tags` array:

```javascript
order_tags: [
  "Processing",              // Order status
  "OTC",                     // Lifecycle type
  "item-category-1:ED",      // Product category
  "source:AWIN",             // ← NEW: Traffic source
  "channel:Affiliate",       // ← NEW: Marketing channel
  "campaign:summer_sale_2024" // ← NEW: Campaign name (if available)
]
```

#### Source Name Derivation Logic

The system derives source names with this priority:

1. **AWIN** - If `awc` parameter is present → `source:AWIN`
2. **UTM Source** - If `utm_source` is set → `source:{utm_source}`
3. **Click ID** - If platform click ID detected → `source:Google Ads`, `source:Facebook`, etc.
4. **Referrer** - External domain → `source:google.com`, `source:facebook.com`, etc.
5. **Direct** - No attribution data → `source:Direct`

#### Channel Grouping

Channels are automatically classified based on source data:

| Channel | Detection Rules |
|---------|----------------|
| **Affiliate** | AWIN `awc` parameter present |
| **Paid Search** | `utm_medium=cpc/ppc` OR `gclid`/`msclkid` present |
| **Paid Social** | `utm_medium=social` OR `fbclid`/`ttclid` present |
| **Display** | `utm_medium=display/banner` |
| **Email** | `utm_medium=email` |
| **Organic Search** | Referrer from Google/Bing without click ID |
| **Social** | Referrer from social platforms |
| **Referral** | External referrer (not search or social) |
| **Direct** | No source data |

## Implementation Files

### Core Files

| File | Purpose |
|------|---------|
| `utils/sourceAttribution.js` | Source attribution capture & storage |
| `utils/northbeamEvents.js` | Northbeam tracking with source tags |
| `components/Layout/AttributionTracker.jsx` | Client-side attribution initialization |
| `components/Layout/ClientLayoutProvider.jsx` | App-wide attribution tracking |

### Modified Files

| File | Changes |
|------|---------|
| `utils/northbeamEvents.js` | Added source attribution tags to purchase events |
| `components/Layout/ClientLayoutProvider.jsx` | Added AttributionTracker component |

## Testing & Verification

### 1. Test Attribution Capture

Open your browser console and navigate to your site with UTM parameters:

```
https://myrocky.com/?utm_source=facebook&utm_medium=cpc&utm_campaign=test_campaign
```

Check console logs:
```
[Attribution] Captured attribution data
[Attribution] Initialized source attribution tracking
```

Verify in browser DevTools → Application → Cookies:
```
traffic_source = facebook
traffic_medium = cpc
traffic_campaign = test_campaign
```

### 2. Test AWIN Attribution

Navigate with AWIN parameter:
```
https://myrocky.com/?awc=123456789_somedata
```

Check cookies:
```
awin_awc = 123456789_somedata
awc = 123456789_somedata
_awin_awc = 123456789_somedata
```

### 3. Test Click IDs

Navigate with Google Ads click ID:
```
https://myrocky.com/?gclid=CjwKCAiAtest123
```

Check cookies:
```
traffic_click_id = CjwKCAiAtest123
traffic_click_id_type = Google Ads
```

### 4. Test Northbeam Purchase Event

Complete a test purchase and check browser console:

```javascript
[Northbeam] Attribution data: {
  source: "facebook",
  medium: "cpc",
  campaign: "test_campaign",
  awinAwc: "none",
  tags: ["source:facebook", "channel:Paid Social", "campaign:test_campaign"]
}

[Northbeam] Tracking purchase event for order: 12345
[Northbeam] ✅ Purchase event tracked successfully
```

### 5. Verify in Northbeam Dashboard

1. Log into your Northbeam dashboard
2. Navigate to **Attribution** or **Sources** view
3. Filter by recent dates
4. Look for orders with tags like:
   - `source:AWIN`
   - `source:facebook`
   - `channel:Affiliate`
   - `campaign:summer_sale_2024`

You should now see purchases attributed to their correct sources!

## Debug Mode

Enable detailed attribution logging by adding `?nb-debug=1` to the checkout URL:

```
https://myrocky.com/checkout?nb-debug=1
```

This will:
- Log full Northbeam payloads (with PII redacted)
- Expose `window.__NB_LAST_PAYLOAD` for inspection
- Show attribution data in console

## Common Scenarios

### Scenario 1: AWIN Affiliate Sale

**Journey:**
1. User clicks AWIN affiliate link: `https://myrocky.com/ed?awc=123456`
2. Attribution system captures `awc` parameter
3. User completes purchase
4. Northbeam receives: `order_tags: ["source:AWIN", "channel:Affiliate", ...]`

**Northbeam Result:** ✅ Sale attributed to AWIN

### Scenario 2: Facebook Ad Click → Purchase

**Journey:**
1. User clicks Facebook ad with UTM: `?utm_source=facebook&utm_medium=paid_social&utm_campaign=ed_promo`
2. Attribution captures all UTM params
3. User purchases later (within 30 days)
4. Northbeam receives: `order_tags: ["source:facebook", "channel:Paid Social", "campaign:ed_promo", ...]`

**Northbeam Result:** ✅ Sale attributed to Facebook campaign "ed_promo"

### Scenario 3: Google Ads → Purchase

**Journey:**
1. User clicks Google Ad: `?gclid=CjwKCAiA...`
2. Attribution captures `gclid`
3. User purchases
4. Northbeam receives: `order_tags: ["source:Google Ads", "channel:Paid Search", ...]`

**Northbeam Result:** ✅ Sale attributed to Google Ads

### Scenario 4: Multi-Touch Journey

**Journey:**
1. First visit from Google Organic (referrer = google.com)
2. Returns later via Facebook ad (`utm_source=facebook`)
3. Purchases on third visit

Attribution uses **last-touch** model, so:
- Northbeam receives: `order_tags: ["source:facebook", "channel:Paid Social", ...]`

**Northbeam Result:** ✅ Sale attributed to Facebook (last touch)

## Attribution Window

- **Cookie expiration:** 30 days
- **Attribution model:** Last-touch (most recent campaign gets credit)
- **First-touch data:** Stored separately for analysis

## API Reference

### `captureAttribution()`

Captures attribution data from current URL and stores it.

```javascript
import { captureAttribution } from "@/utils/sourceAttribution";

// Call on page load or navigation
const attribution = captureAttribution();
```

### `getAttributionData()`

Retrieves current attribution data from storage.

```javascript
import { getAttributionData } from "@/utils/sourceAttribution";

const data = getAttributionData();
console.log(data.source); // "facebook"
console.log(data.campaign); // "summer_sale"
```

### `getNorthbeamSourceTags()`

Returns formatted tags for Northbeam order_tags array.

```javascript
import { getNorthbeamSourceTags } from "@/utils/sourceAttribution";

const tags = getNorthbeamSourceTags();
// Returns: ["source:facebook", "channel:Paid Social", "campaign:summer_sale"]
```

### `deriveSourceName(attribution?)`

Derives a clean source name from attribution data.

```javascript
import { deriveSourceName } from "@/utils/sourceAttribution";

const sourceName = deriveSourceName();
// Returns: "AWIN" or "facebook" or "Google Ads" or "Direct"
```

### `deriveChannel(attribution?)`

Derives marketing channel from attribution data.

```javascript
import { deriveChannel } from "@/utils/sourceAttribution";

const channel = deriveChannel();
// Returns: "Affiliate" or "Paid Social" or "Paid Search" or "Direct"
```

## Troubleshooting

### Issue: Attribution data not captured

**Check:**
1. Open browser console and look for `[Attribution]` logs
2. Verify cookies are enabled
3. Check localStorage in DevTools → Application → Local Storage
4. Ensure HTTPS (required for SameSite=None cookies)

### Issue: AWIN sales still showing as Direct

**Check:**
1. Verify `awc` parameter is in the URL when affiliate link is clicked
2. Check cookies: `awc`, `_awin_awc`, and `awin_awc` should all be set
3. Verify purchase event includes `source:AWIN` tag in console logs
4. Confirm Northbeam API is receiving the tags (check network tab)

### Issue: Source tags not appearing in Northbeam

**Check:**
1. Add `?nb-debug=1` to checkout URL
2. Look for `order_tags` in console output
3. Verify source tags are in the payload
4. Check Northbeam API response (should be 200 OK)
5. Allow 24-48 hours for Northbeam to process new tag formats

### Issue: Attribution overwritten on revisit

**Expected behavior:** Last-touch attribution means the most recent source gets credit. This is intentional.

**If you need first-touch:** Use `firstTouchTime` and implement first-touch logic in your reporting.

## Future Enhancements

Potential improvements to consider:

1. **Multi-touch attribution** - Track full customer journey
2. **Custom attribution models** - Linear, time-decay, position-based
3. **Server-side tracking** - IP-based geo tracking, server-side GTM
4. **Attribution reports** - Dashboard showing source performance
5. **A/B test integration** - Track attribution by experiment variant

## Support

For questions or issues:
1. Check Northbeam logs in console (`?nb-debug=1`)
2. Review attribution data in browser DevTools
3. Contact Northbeam support for dashboard-specific questions

## Changelog

### 2024-11-05 - Initial Implementation
- Created `utils/sourceAttribution.js` for comprehensive source tracking
- Updated `utils/northbeamEvents.js` to include source attribution tags
- Added `components/Layout/AttributionTracker.jsx` for automatic capture
- Integrated with `ClientLayoutProvider` for app-wide tracking
- Support for AWIN, Google Ads, Facebook, TikTok, UTM parameters, and referrers
- 30-day attribution window with dual storage (cookies + localStorage)
- Last-touch attribution model


# Northbeam Custom Source Attribution - Quick Guide

## 🎯 Purpose

This system passes **custom/non-ad sources** to Northbeam - specifically sources you're already tracking that Northbeam doesn't automatically capture through ad platform integrations.

## ✅ What Gets Tracked

### Primary Use Case: AWIN Affiliate
```
User clicks AWIN link: https://myrocky.com/ed?awc=123456
                      ↓
System captures: awc parameter
                      ↓
Northbeam receives: source:AWIN, channel:Affiliate
```

### Other Custom Sources Tracked

| Use Case | URL Example | Tags Sent to Northbeam |
|----------|-------------|------------------------|
| **AWIN Affiliate** | `?awc=123456` | `source:AWIN`, `channel:Affiliate` |
| **Other Affiliates** | `?utm_source=impact&utm_medium=affiliate` | `source:impact`, `channel:Affiliate` |
| **Email Campaigns** | `?utm_source=newsletter&utm_medium=email` | `source:newsletter`, `channel:Email` |
| **Podcast/Audio** | `?utm_source=podcast_x&utm_medium=audio` | `source:podcast_x` |
| **Partners** | `?utm_source=healthsite&utm_medium=partner` | `source:healthsite`, `channel:Partner` |
| **Organic Search** | Referrer: `https://google.com` (no gclid) | `channel:Organic Search` |
| **Blog Referrals** | Referrer: `https://healthblog.com` | `source:healthblog.com`, `channel:Referral` |

## ❌ What Gets SKIPPED (Intentionally)

These sources are **NOT** passed to Northbeam because Northbeam already tracks them via direct integrations:

| Platform | Parameter | Why We Skip It |
|----------|-----------|----------------|
| Google Ads | `?gclid=...` | Northbeam auto-tracks via Google Ads integration |
| Facebook Ads | `?fbclid=...` | Northbeam auto-tracks via Facebook integration |
| TikTok Ads | `?ttclid=...` | Northbeam auto-tracks via TikTok integration |
| Microsoft Ads | `?msclkid=...` | Northbeam auto-tracks via Microsoft integration |
| Any Paid Ads | `?utm_medium=cpc/ppc/paid` | Northbeam already tracking these |

**Why skip them?** To avoid duplicating or conflicting with Northbeam's native ad platform tracking.

## 🧪 Testing

### Test AWIN Attribution (Your Main Use Case)

1. **Navigate with AWIN parameter:**
   ```
   https://myrocky.com/?awc=test123
   ```

2. **Check browser console (F12):**
   ```
   [Attribution] Captured attribution data
   ```

3. **Check cookies (DevTools → Application → Cookies):**
   ```
   awin_awc = test123
   ```

4. **Complete a test purchase:**
   ```javascript
   [Northbeam] Attribution data: {
     awinAwc: "test123",
     tags: ["source:AWIN", "channel:Affiliate"]
   }
   ```

5. **Verify in Northbeam dashboard (24-48 hours later):**
   - Look for order with `source:AWIN` tag
   - Should show in "Affiliate" channel

### Test Custom Source

1. **Navigate with custom UTM:**
   ```
   https://myrocky.com/?utm_source=newsletter&utm_medium=email&utm_campaign=summer_sale
   ```

2. **Complete purchase, console shows:**
   ```javascript
   tags: ["source:newsletter", "channel:Email", "campaign:summer_sale"]
   ```

### Test Ad Platform (Should Skip)

1. **Navigate with Google Ads click:**
   ```
   https://myrocky.com/?gclid=CjwKCAiA...&utm_source=google&utm_medium=cpc
   ```

2. **Complete purchase, console shows:**
   ```javascript
   tags: []  // Empty! Because Northbeam already tracking this
   ```

This is **correct behavior** - we're not duplicating Northbeam's ad tracking.

## 📊 Expected Results in Northbeam

### What You'll See for AWIN Sales
```
Attribution Dashboard:
├─ Source: AWIN
├─ Channel: Affiliate
└─ Tags: ["source:AWIN", "channel:Affiliate"]
```

### What You'll See for Email Campaigns
```
Attribution Dashboard:
├─ Source: newsletter
├─ Channel: Email  
└─ Tags: ["source:newsletter", "channel:Email", "campaign:summer_sale"]
```

### What You WON'T See (Because NB Already Tracking)
- Google Ads attribution - **Northbeam's native tracking handles this**
- Facebook attribution - **Northbeam's native tracking handles this**
- TikTok attribution - **Northbeam's native tracking handles this**

## 🔍 How It Works

### Smart Source Detection Logic

```javascript
// Capture attribution data
const attribution = getAttributionData();

// Check: Is this AWIN?
if (attribution.awinAwc) {
  return "AWIN";  // ✅ Send to Northbeam
}

// Check: Is this a paid ad platform?
if (source === "google" && medium === "cpc") {
  return null;  // ❌ Skip - Northbeam already tracking
}

// Check: Is this a custom source?
if (source === "newsletter" && medium === "email") {
  return "newsletter";  // ✅ Send to Northbeam
}

// Check: Is this organic search?
if (referrer === "google.com" && no gclid) {
  return "Organic Search";  // ✅ Send to Northbeam
}
```

### Integration with Northbeam

```javascript
// When purchase happens:
const tags = getNorthbeamSourceTags();
// Returns: ["source:AWIN", "channel:Affiliate"]

// Added to order_tags in Northbeam payload:
order_tags: [
  "Processing",           // Order status
  "OTC",                  // Lifecycle  
  "item-category-1:ED",   // Product
  "source:AWIN",         // ← Your custom source
  "channel:Affiliate"     // ← Your custom channel
]
```

## 💡 Common Scenarios

### Scenario 1: AWIN Affiliate Sale
```
User Journey:
1. Clicks AWIN affiliate link → ?awc=123456
2. Browses your site
3. Completes purchase

Northbeam Attribution:
✅ Source: AWIN
✅ Channel: Affiliate
```

### Scenario 2: Email Campaign → Google Ad → Purchase
```
User Journey:
1. Clicks email link → ?utm_source=newsletter
2. Later clicks Google Ad → ?gclid=abc123
3. Completes purchase

Northbeam Attribution:
✅ Source: Google (from Northbeam's native tracking)
✅ Channel: Paid Search (from Northbeam's native tracking)
❌ Email NOT attributed (last-touch model, Google Ad was more recent)
```

### Scenario 3: Organic Search → Purchase
```
User Journey:
1. Finds site via Google Search (no ad)
2. Browses and purchases

Northbeam Attribution:
✅ Channel: Organic Search
✅ No duplicate attribution from our system
```

## 🚀 What This Means for You

### AWIN Sales (Your Main Ask)
**Before:** Showing as "Direct" or "Unknown" in Northbeam  
**After:** ✅ Properly attributed to "AWIN" affiliate channel

### Other Benefits
- ✅ Track email campaign performance
- ✅ Track partnership/referral traffic
- ✅ Track organic search separately from paid
- ✅ Track any custom sources you add

### What Doesn't Change
- ✅ Ad platform tracking remains unchanged (still works via Northbeam integrations)
- ✅ No duplicate attribution
- ✅ No conflicts with existing tracking

## 🔧 Adding New Custom Sources

Want to track a new affiliate network or partner?

### Example: Add Impact.com Affiliate Tracking

1. **Capture the tracking parameter** (already handled by the system):
   ```
   https://myrocky.com/?utm_source=impact&utm_medium=affiliate&irclickid=xyz789
   ```

2. **System automatically**:
   - Captures `utm_source=impact`
   - Captures `utm_medium=affiliate`
   - Sends to Northbeam: `source:impact`, `channel:Affiliate`

3. **No code changes needed!** The system handles any custom UTM sources.

### Example: Track Podcast Traffic

```
URL: https://myrocky.com/?utm_source=joe_rogan_podcast&utm_medium=audio

Northbeam receives: 
- source:joe_rogan_podcast
- (no channel tag because "audio" isn't a standard channel)
```

## 📞 Support

**AWIN not showing in Northbeam?**
1. Test with `?awc=test123`
2. Check console for `[Northbeam] Attribution data`
3. Verify tags include `source:AWIN`
4. Wait 24-48 hours for Northbeam to process

**Want to add a new source?**
Just add UTM parameters to your links - the system handles the rest!

---

**Key Takeaway:** This system fills the gaps in Northbeam's tracking by adding AWIN and other custom sources, while intentionally avoiding duplicate attribution for ad platforms Northbeam already tracks natively.


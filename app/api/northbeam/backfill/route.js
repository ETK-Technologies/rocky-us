import { NextResponse } from "next/server";
import { logger } from "@/utils/devLogger";
import { api as wooApi } from "@/lib/woocommerce";

/**
 * POST /api/northbeam/backfill
 * Body: { order_ids: (number[]|string[]), dry_run?: boolean }
 * For each Woo order id, fetch order + forward to `/api/northbeam/orders`.
 */
export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const ids = Array.isArray(body?.order_ids) ? body.order_ids : [];
    const dryRun = Boolean(body?.dry_run);
    // Pass-through debug echo controls to internal NB orders route (URL param only)
    const debugParam = req.nextUrl?.searchParams?.get("debug") === "1";

    if (!ids.length) {
      return NextResponse.json(
        { error: "order_ids array required" },
        { status: 400 }
      );
    }

    // Validate Northbeam credentials exist early to fail fast if not configured
    const clientId = process.env.NB_CLIENT_ID || process.env.NORTHBEAM_CLIENT_ID;
    const apiKey = process.env.NB_API_KEY || process.env.NORTHBEAM_AUTH_TOKEN;
    if (!clientId || !apiKey) {
      return NextResponse.json(
        { error: "Northbeam configuration missing (NB_CLIENT_ID/NB_API_KEY)" },
        { status: 500 }
      );
    }

    // Helper: map Woo order to the shape our NB orders endpoint expects
    const mapWooToNorthbeamOrder = (order) => {
      const purchaseTotal = parseFloat(order?.total ?? 0) || 0;
      const tax = parseFloat(order?.total_tax ?? 0) || 0;
      const shipping = parseFloat(order?.shipping_total ?? 0) || 0;
      const discountAmount = parseFloat(order?.discount_total ?? 0) || 0;
      const email = order?.billing?.email || "";
      const phone = order?.billing?.phone || "";
      const name = `${order?.billing?.first_name || ""} ${order?.billing?.last_name || ""}`.trim();
      const status = String(order?.status || "");
      const timeCandidate =
        order?.date_paid_gmt ||
        order?.date_created_gmt ||
        order?.date_paid ||
        order?.date_completed ||
        order?.date_created;

      // Build product list
      const products = Array.isArray(order?.line_items)
        ? order.line_items.map((item) => {
            const unitPrice =
              (parseFloat(item?.total || 0) || 0) /
                Math.max(1, parseInt(item?.quantity || 1, 10) || 1) || 0;
            const variantId = item?.variation_id ? String(item.variation_id) : "";
            const base = {
              id: item?.sku || String(item?.product_id || ""),
              product_id: String(item?.product_id || ""),
              name: item?.name || "",
              quantity: parseInt(item?.quantity || 1, 10) || 1,
              price: unitPrice,
            };
            if (variantId) base.variant_id = variantId;
            return base;
          })
        : [];

      // Build tag helpers to mirror server route logic minimally
      const getStatusTag = (s) => {
        const map = {
          pending: "Pending",
          processing: "Processing",
          "on-hold": "On Hold",
          completed: "Completed",
          cancelled: "Cancelled",
          refunded: "Refunded",
          failed: "Failed",
        };
        return map[String(s || "").toLowerCase()] || "Pending";
      };
      const hasSubscription = products.some(
        (p) => /subscription/i.test(p?.name || "")
      );
      const lifecycle = hasSubscription
        ? order?.is_first_order
          ? "Subscription First Order"
          : "Subscription Recurring"
        : "OTC";

      // Shipping address
      const shippingAddress = order?.shipping
        ? {
            address1: order.shipping.address_1 || "",
            address2: order.shipping.address_2 || "",
            city: order.shipping.city || "",
            state: order.shipping.state || "",
            zip: order.shipping.postcode || "",
            country_code:
              order.shipping.country === "CA" ? "CAN" : order.shipping.country || "CAN",
          }
        : undefined;

      // Build canonical customer_id aligned with client/pixel and server route
      const rawCustomerId = order?.customer_id;
      const emailLower = (email || "").toString().trim().toLowerCase();
      const phoneDigits = (phone || "").toString().replace(/\D+/g, "");
      let canonicalCustomerId = "";
      if (rawCustomerId && Number(rawCustomerId) > 0) {
        canonicalCustomerId = `wc:${String(rawCustomerId)}`;
      } else if (emailLower) {
        canonicalCustomerId = `email:${emailLower}`;
      } else if (phoneDigits) {
        canonicalCustomerId = `phone:${phoneDigits}`;
      }

      return {
        order_id: String(order?.id),
        // Provide canonical id for parity with pixel and to override on server
        customer_id: canonicalCustomerId || String(order?.customer_id || email || ""),
        customer_id_canonical: canonicalCustomerId || String(order?.customer_id || email || ""),
        time_of_purchase: new Date(timeCandidate || order?.date_created || Date.now()).toISOString(),
        currency: order?.currency || "CAD",
        purchase_total: purchaseTotal,
        tax,
        shipping_cost: shipping,
        discount_codes: Array.isArray(order?.coupon_lines)
          ? order.coupon_lines.map((c) => c?.code).filter(Boolean)
          : [],
        discount_amount: discountAmount,
        customer_email: email,
        customer_phone_number: phone,
        customer_name: name,
        customer_ip_address: order?.customer_ip_address || "",
        is_recurring_order: Boolean(order?.is_recurring_order),
        order_tags: [getStatusTag(status), lifecycle],
        products,
        ...(shippingAddress ? { customer_shipping_address: shippingAddress } : {}),
      };
    };

    // Resolve same-origin base URL from incoming request to avoid external network hops
    let origin;
    try {
      origin = new URL(req.url).origin;
    } catch (_) {
      origin =
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.SITE_URL ||
        "http://localhost:3000";
    }

    // Process sequentially to avoid overwhelming Woo/NB; could batch if needed
    const results = [];
    for (const rawId of ids) {
      const id = String(rawId).trim();
      if (!/^[0-9]+$/.test(id)) {
        results.push({ id, status: "skipped", reason: "invalid_id" });
        continue;
      }

      try {
        // 1) Fetch Woo order
        const { data: order } = await wooApi.get(`orders/${id}`);
        if (!order?.id) {
          results.push({ id, status: "not_found" });
          continue;
        }

        // 2) Map to NB format our server accepts
        const mapped = mapWooToNorthbeamOrder(order);

        if (dryRun) {
          results.push({ id, status: "dry_run", payload_preview: { ...mapped, customer_email: "[redacted]", customer_phone_number: "[redacted]", customer_name: "[redacted]", customer_ip_address: "[redacted]" } });
          continue;
        }

        // 3) Send to our own NB endpoint (same-origin) to centralize logic/tags
        const internalUrl = `${origin}/api/northbeam/orders${debugParam ? "?debug=1" : ""}`;
        const headers = { "Content-Type": "application/json" };
        const res = await fetch(internalUrl, {
          method: "POST",
          headers,
          body: JSON.stringify({ orders: [mapped] }),
          // Avoid caching
          cache: "no-store",
        });

        if (!res.ok) {
          const text = await res.text();
          results.push({
            id,
            status: "failed",
            error: `${res.status} ${res.statusText}`,
            http_status: res.status,
            details: text,
          });
          continue;
        }

        const json = await res.json().catch(() => ({}));
        // If internal route echoed sanitized payload, surface it under payload_preview for convenience
        const payloadEcho = Array.isArray(json?.echo) && json.echo.length > 0 ? json.echo[0] : undefined;
        const resultEntry = { id, status: "ok", northbeam: json };
        if (payloadEcho) {
          resultEntry.payload_preview = payloadEcho;
        }
        results.push(resultEntry);
      } catch (err) {
        logger.error("[NB Backfill] Error processing order", id, err);
        results.push({ id, status: "error", error: err?.message || String(err) });
      }
    }

    const okCount = results.filter((r) => r.status === "ok").length;
    const failCount = results.filter((r) => r.status === "failed" || r.status === "error").length;
    return NextResponse.json({ success: true, dry_run: dryRun, totals: { count: ids.length, ok: okCount, failed: failCount }, results });
  } catch (error) {
    logger.error("[NB Backfill] Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}



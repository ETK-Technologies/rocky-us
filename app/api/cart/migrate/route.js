import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

const BASE_URL = process.env.BASE_URL;

/**
 * API endpoint for batch migrating cart items
 * Receives an array of cart items and adds them all at once to the server cart
 */
export async function POST(req) {
  try {
    console.log("Starting cart migration API endpoint");

    const { items } = await req.json();
    console.log(`Received cart items for migration:`, JSON.stringify(items));

    const cookieStore = await cookies();
    const encodedCredentials = cookieStore.get("authToken");

    console.log(
      "Authentication check:",
      encodedCredentials ? "Auth token present" : "Auth token missing"
    );

    if (!encodedCredentials) {
      console.log("Cart migration failed: User not authenticated");
      return NextResponse.json(
        {
          error: "User not authenticated",
        },
        { status: 401 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      console.log("Cart migration failed: No valid cart items provided");
      return NextResponse.json(
        {
          error: "No valid cart items provided",
        },
        { status: 400 }
      );
    }

    console.log(`Processing batch migration of ${items.length} cart items`);

    // FIRST STEP: Always fetch the cart first to get a nonce
    let currentNonce = "";

    try {
      console.log("Fetching cart to establish nonce...");
      const cartResponse = await axios.get(
        `${BASE_URL}/wp-json/wc/store/cart`,
        {
          headers: {
            Authorization: `${encodedCredentials.value}`,
          },
        }
      );

      // Extract nonce from response headers
      if (cartResponse.headers && cartResponse.headers.nonce) {
        currentNonce = cartResponse.headers.nonce;
        console.log("Got initial nonce from cart response");
        cookieStore.set("cart-nonce", currentNonce);
      } else {
        console.log(
          "No nonce in cart response headers, headers:",
          Object.keys(cartResponse.headers).join(", ")
        );
      }
    } catch (cartError) {
      console.error(
        "Error fetching cart to get initial nonce:",
        cartError.message,
        "\nResponse data:",
        cartError.response?.data || "No response data",
        "\nResponse status:",
        cartError.response?.status || "No status"
      );
      // Continue without a nonce and handle possible errors later
    }

    // Add items one by one in series (not parallel)
    let successfulItems = 0;
    let failedItems = 0;
    let lastError = null;
    let updatedCart = null;

    // Process each item in sequence
    for (const item of items) {
      try {
        console.log(`Attempting to add item to cart: ${item.productId}`);

        // Prepare headers with the current nonce if available
        const headers = {
          Authorization: `${encodedCredentials.value}`,
          "Content-Type": "application/json",
        };

        if (currentNonce) {
          headers["Nonce"] = currentNonce;
          headers["X-WC-Store-API-Nonce"] = currentNonce;
        }

        // Make the request to add the item
        const response = await axios.post(
          `${BASE_URL}/wp-json/wc/store/cart/add-item`,
          {
            id: item.productId,
            quantity: item.quantity,
            variation_id: item.variationId || undefined,
          },
          { headers }
        );

        // Store updated cart from successful response
        updatedCart = response.data;

        // Update nonce if available in response
        if (response.headers && response.headers.nonce) {
          currentNonce = response.headers.nonce;
          cookieStore.set("cart-nonce", currentNonce);
          console.log("Updated nonce from item add response");
        }

        successfulItems++;
        console.log(`Successfully added item ${item.productId} to cart`);
      } catch (err) {
        // Check if this is a nonce error and we need to retry
        const isNonceError =
          err.response?.data?.code === "woocommerce_rest_missing_nonce" ||
          (err.response?.data?.message &&
            err.response?.data?.message.includes("nonce"));

        if (isNonceError && !item.retried) {
          console.log(
            `Nonce error detected, retrying item ${item.productId} with direct approach...`
          );

          try {
            // For the very first request, WooCommerce might not require a nonce for cart creation
            // Try a direct request with just authentication
            const retryResponse = await axios.post(
              `${BASE_URL}/wp-json/wc/store/cart/add-item`,
              {
                id: item.productId,
                quantity: item.quantity,
                variation_id: item.variationId || undefined,
              },
              {
                headers: {
                  Authorization: `${encodedCredentials.value}`,
                  "Content-Type": "application/json",
                },
              }
            );

            // If successful, update nonce and cart
            if (retryResponse.headers && retryResponse.headers.nonce) {
              currentNonce = retryResponse.headers.nonce;
              cookieStore.set("cart-nonce", currentNonce);
              console.log("Got nonce from retry response");
            }

            updatedCart = retryResponse.data;
            successfulItems++;
            console.log(
              `Successfully added item ${item.productId} to cart on retry`
            );
            continue; // Skip the error handling below
          } catch (retryErr) {
            console.error(
              `Retry failed for item ${item.productId}:`,
              retryErr.message,
              "\nResponse data:",
              retryErr.response?.data || "No response data"
            );
          }
        }

        // Regular error handling
        failedItems++;
        lastError = err;
        console.error(
          `Error adding item ${item.productId} to cart:`,
          err.message,
          "\nResponse data:",
          err.response?.data || "No response data",
          "\nResponse status:",
          err.response?.status || "No status code"
        );
      }
    }

    // If all items failed, return an error
    if (successfulItems === 0 && failedItems > 0) {
      console.log("Cart migration failed: Could not add any items to cart");

      return NextResponse.json(
        {
          error: "Failed to migrate any cart items",
          details: lastError
            ? {
                message: lastError.message,
                response: lastError.response?.data || null,
                status: lastError.response?.status || null,
              }
            : null,
        },
        { status: 500 }
      );
    }

    // Return success or partial success
    console.log(
      `Cart migration completed: ${successfulItems}/${items.length} items migrated`
    );
    return NextResponse.json({
      success: true,
      message:
        failedItems > 0
          ? `Cart migration partially successful (${successfulItems}/${items.length} items migrated)`
          : "Cart migrated successfully",
      migrated_items: successfulItems,
      failed_items: failedItems,
      cart: updatedCart,
    });
  } catch (error) {
    console.error(
      "Cart migration error:",
      error.message,
      "\nResponse data:",
      error.response?.data || "No response data"
    );

    return NextResponse.json(
      {
        error: "Failed to migrate cart",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { api, fetchProductVariations } from "@/lib/woocommerce";
import { logger } from "@/utils/devLogger";

export async function GET(request) {
  try {
    // Get the product ID from the URL parameter
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("id") || "142977"; // Default to the problematic product

    logger.log(`[Debug API] Fetching info for product ID: ${productId}`);

    // Fetch the product
    try {
      const productResponse = await api.get(`products/${productId}`);
      const product = productResponse.data;

      // Check if this is a variable product or variable subscription product
      const isVariableProduct =
        product.type === "variable" || product.type === "variable-subscription";
      const hasVariations = product.variations && product.variations.length > 0;

      if (!isVariableProduct || !hasVariations) {
        return NextResponse.json({
          message: `Product ${productId} is not a variable product or has no variations`,
          product: {
            id: product.id,
            name: product.name,
            type: product.type,
            has_variations: hasVariations,
            num_variations: product.variations ? product.variations.length : 0,
          },
        });
      }

      // Determine product type from categories
      const categories = product.categories?.map((cat) => cat.slug) || [];
      let productType = "default";

      if (categories.includes("ed")) productType = "ed";
      else if (categories.includes("dhm-blend")) productType = "dhm-blend";
      else if (categories.includes("smoking")) productType = "smoking";
      else if (categories.includes("hair")) productType = "hair";
      else if (categories.includes("weight-loss")) productType = "weight-loss";

      logger.log(
        `[Debug API] Product type: ${productType}, Product variation count: ${product.variations.length}`
      );

      // For debugging, let's return the raw variations first
      try {
        const rawVariationsResponse = await api.get(
          `products/${product.id}/variations`,
          {
            per_page: 100,
          }
        );

        // Also get the formatted variations
        const formattedVariations = await fetchProductVariations(
          product.id,
          productType
        );

        // Return the product and its variations
        return NextResponse.json({
          product: {
            id: product.id,
            name: product.name,
            type: product.type,
            attributes: product.attributes,
            categories: product.categories,
            productType,
            variation_ids: product.variations,
          },
          raw_variations: rawVariationsResponse.data,
          formatted_variations: formattedVariations.map((variation) => ({
            id: variation.variation_id,
            price: variation.display_price,
            regular_price: variation.display_regular_price,
            attributes: variation.attributes,
          })),
        });
      } catch (variationsError) {
        logger.error(`[Debug API] Error fetching variations:`, variationsError);
        return NextResponse.json(
          {
            error: `Error fetching variations: ${variationsError.message}`,
            product: {
              id: product.id,
              name: product.name,
              type: product.type,
              attributes: product.attributes,
              categories: product.categories,
              productType,
            },
          },
          { status: 500 }
        );
      }
    } catch (productError) {
      logger.error(
        `[Debug API] Error fetching product ${productId}:`,
        productError
      );
      return NextResponse.json(
        { error: `Error fetching product: ${productError.message}`, productId },
        { status: 404 }
      );
    }
  } catch (error) {
    logger.error("[Debug API] Error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred fetching product data" },
      { status: 500 }
    );
  }
}

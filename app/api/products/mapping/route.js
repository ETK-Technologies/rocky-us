import { NextResponse } from "next/server";
import { wooApiGet } from "@/lib/woocommerce";

/**
 * Product mapping API endpoint
 * Returns a mapping of products with their IDs, names, slugs, and internal IDs
 */
export async function GET() {
  try {
    // Fetch products from WooCommerce
    const productsResponse = await wooApiGet("products", {
      per_page: 100, // Adjust based on your product catalog size
      status: "publish", // Only get published products
    });

    if (!productsResponse.ok) {
      throw new Error(
        `Failed to fetch products: ${productsResponse.statusText}`
      );
    }

    const products = await productsResponse.json();

    // Transform the response to include only necessary mapping data
    const productMappings = products.map((product) => {
      // Extract ED medication details if available
      const edDosage =
        product.meta_data?.find((meta) => meta.key === "ed_dosage")?.value ||
        null;
      const edMedication =
        product.meta_data?.find((meta) => meta.key === "ed_medication")
          ?.value || null;

      // Create compound key for ED products
      let internalId =
        product.meta_data?.find((meta) => meta.key === "internal_id")?.value ||
        null;

      // If this is an ED product and we have medication name and dosage, create a special key
      if (edMedication && edDosage) {
        const edKey = `${edMedication}-${edDosage}`
          .toLowerCase()
          .replace(/\s+/g, "-");
        // Add this as an additional internal ID
        if (!internalId) {
          internalId = edKey;
        }
      }

      return {
        id: product.id.toString(),
        name: product.name,
        slug: product.slug,
        internalId,
        // Include specific ED medication info if available
        edInfo: edMedication
          ? {
              medication: edMedication,
              dosage: edDosage,
            }
          : null,
      };
    });

    // Return the mappings
    return NextResponse.json({
      success: true,
      products: productMappings,
    });
  } catch (error) {
    console.error("Error fetching product mappings:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch product mappings",
      },
      { status: 500 }
    );
  }
}

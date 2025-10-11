import { fetchProductBySlug } from "@/lib/woocommerce";
import { logger } from "@/utils/devLogger";

export async function GET(request, { params }) {
  try {
    // Properly await params before accessing slug
    const { slug } = await params;

    if (!slug) {
      return Response.json({ error: "No slug provided" }, { status: 400 });
    }

    // Fetch product data
    const productData = await fetchProductBySlug(slug);

    if (!productData) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    } // Extract only the basic product information needed for initial rendering
    const basicProductInfo = {
      id: productData.id,
      name: productData.name,
      price: productData.price,
      image:
        productData.images && productData.images.length > 0
          ? productData.images[0].src
          : null,
      shortDescription: productData.short_description,
      categories: productData.categories || [], // Include categories data
    };

    return Response.json(basicProductInfo);
  } catch (error) {
    logger.error("Error fetching basic product info:", error);
    return Response.json(
      { error: "Failed to fetch basic product info" },
      { status: 500 }
    );
  }
}

import { fetchProductBySlug } from "@/lib/woocommerce";
import { api } from "@/lib/woocommerce";

export async function POST(request) {
  try {
    const body = await request.json();
    const { productIds = [], fallbackSlugs = [] } = body;

    let products = [];

    // First try to fetch by product IDs if provided
    if (productIds.length > 0) {
      try {
        const response = await api.get("products", {
          include: productIds.join(","),
          per_page: productIds.length,
          status: "publish",
          // Only fetch minimal fields needed for recommendation cards
          _fields: ["id", "name", "slug", "price", "images", "meta_data"].join(
            ","
          ),
        });

        products = response.data || [];
      } catch (error) {
        console.error("Error fetching products by IDs:", error);
      }
    }

    // If no products found, try fallback slugs
    if (products.length === 0 && fallbackSlugs.length > 0) {
      try {
        const slugPromises = fallbackSlugs.map(async (slug) => {
          try {
            const product = await fetchProductBySlug(slug);
            if (product) {
              // Return only minimal data needed for cards
              return {
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                images: product.images || [],
                meta_data: product.meta_data || [],
              };
            }
            return null;
          } catch (error) {
            console.error(`Error fetching ${slug}:`, error);
            return null;
          }
        });

        const fetchedProducts = await Promise.all(slugPromises);
        products = fetchedProducts.filter((p) => p !== null);
      } catch (error) {
        console.error("Error fetching fallback products:", error);
      }
    }

    return Response.json({
      success: true,
      products: products.slice(0, 3), // Limit to 3 products
      count: products.length,
    });
  } catch (error) {
    console.error("Error in recommended products API:", error);
    return Response.json(
      { success: false, error: "Failed to fetch recommended products" },
      { status: 500 }
    );
  }
}

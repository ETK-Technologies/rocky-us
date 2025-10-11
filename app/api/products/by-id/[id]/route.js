import { logger } from "@/utils/devLogger";
import { wooApiGet } from "@/lib/woocommerce";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return Response.json({ error: "No product ID provided" }, { status: 400 });
    }

    // Fetch minimal product fields from WooCommerce
    const response = await wooApiGet(`products/${id}`, {
      _fields: "id,name,categories,slug,sku",
    });

    if (!response.ok) {
      const text = await response.text();
      logger.error(
        `Error fetching product ${id} from WooCommerce: ${response.status} ${response.statusText}`,
        text
      );
      return Response.json(
        { error: "Failed to fetch product", details: text },
        { status: response.status }
      );
    }

    const product = await response.json();
    if (!product || !product.id) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    const productInfo = {
      id: product.id,
      name: product.name,
      categories: Array.isArray(product.categories)
        ? product.categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug }))
        : [],
    };

    return Response.json(productInfo);
  } catch (error) {
    logger.error("Error fetching product by ID:", error);
    return Response.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

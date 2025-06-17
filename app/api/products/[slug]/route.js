import { fetchProductBySlug } from "@/lib/woocommerce";
import {
  ProductFactory,
  CategoryHandlerFactory,
  VariationManager,
  adaptForProductPage,
} from "@/lib/models";

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
    }

    // Process the product data using the same flow as the page component
    const product = ProductFactory(productData);
    const categoryHandler = CategoryHandlerFactory(product);
    const variationManager = new VariationManager(product, categoryHandler);
    const pageProps = adaptForProductPage(
      product,
      categoryHandler,
      variationManager
    );

    return Response.json(pageProps);
  } catch (error) {
    console.error("Error fetching product:", error);
    return Response.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

import { api } from "@/lib/woocommerce";

export async function GET(request, { params }) {
  try {
    // Get product ID from the route parameter
    const { id } = await params;

    if (!id) {
      return Response.json(
        { error: "No product ID provided" },
        { status: 400 }
      );
    }

    // Fetch product data by ID
    const response = await api.get(`products/${id}`);
    const productData = response.data;

    if (!productData) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    // Extract product information including categories
    const productInfo = {
      id: productData.id,
      name: productData.name,
      price: productData.price,
      image:
        productData.images && productData.images.length > 0
          ? productData.images[0].src
          : null,
      shortDescription: productData.short_description,
      categories: productData.categories || [],
    };

    return Response.json(productInfo);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return Response.json(
      { error: "Failed to fetch product" },
      { status: error.response?.status || 500 }
    );
  }
}

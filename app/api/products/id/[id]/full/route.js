import { api } from "@/lib/woocommerce";
import { logger } from "@/utils/devLogger";

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

        // Fetch complete product data by ID
        const response = await api.get(`products/${id}`);
        const productData = response.data;

        if (!productData) {
            return Response.json({ error: "Product not found" }, { status: 404 });
        }

        // Return the complete product data without filtering
        return Response.json(productData);
    } catch (error) {
        logger.error("Error fetching full product data by ID:", error);
        return Response.json(
            { error: "Failed to fetch product" },
            { status: error.response?.status || 500 }
        );
    }
}

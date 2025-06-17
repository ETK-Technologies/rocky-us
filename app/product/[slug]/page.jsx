import { fetchProductBySlug } from "@/lib/woocommerce";
import ErrorPage from "@/components/Product/ErrorPage";
import ProductClientWrapper from "@/components/Product/ProductClientWrapper";
import logger from "@/lib/logger";
import { wooApiGet } from "@/lib/woocommerce";
import {
  ProductFactory,
  CategoryHandlerFactory,
  VariationManager,
  adaptForProductPage,
} from "@/lib/models";

// Add revalidation time (1 hour)
export const revalidate = 3600;

// Add generateStaticParams to pre-generate popular products
export async function generateStaticParams() {
  try {
    // Fetch all published products
    const response = await wooApiGet("products", {
      per_page: 100,
      status: "publish",
      _fields: "slug", // Only fetch slugs to minimize payload
    });

    if (!response.ok) {
      logger.error("Failed to fetch products for static generation");
      return [];
    }

    const products = await response.json();

    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    logger.error("Error in generateStaticParams:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;

    // Prevent processing of source map files
    if (slug.endsWith(".map")) {
      return {
        title: "Not Found",
        description: "The requested resource was not found.",
      };
    }

    const productData = await fetchProductBySlug(slug);

    if (!productData) {
      return {
        title: "Product Not Found",
        description: "The product you are looking for does not exist.",
      };
    }

    return {
      title: productData.name,
      description:
        productData.short_description || productData.description || "",
    };
  } catch (error) {
    logger.error("Error generating metadata", error);
    return {
      title: "Error",
      description: "There was an error loading the product.",
    };
  }
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  // Prevent processing of source map files
  if (slug.endsWith(".map")) {
    return <ErrorPage />;
  }

  if (!slug) {
    return <ErrorPage />;
  }

  try {
    // Pre-fetch product data at build time
    const productData = await fetchProductBySlug(slug);

    if (!productData) {
      return <ErrorPage />;
    }

    // Process the product data
    const product = ProductFactory(productData);
    const categoryHandler = CategoryHandlerFactory(product);
    const variationManager = new VariationManager(product, categoryHandler);
    const pageProps = adaptForProductPage(
      product,
      categoryHandler,
      variationManager
    );

    // Pass the pre-fetched data to the client component
    return <ProductClientWrapper slug={slug} initialData={pageProps} />;
  } catch (error) {
    logger.error("Error in ProductPage:", error);
    return <ErrorPage />;
  }
}

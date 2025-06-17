import Link from "next/link";

/**
 * ProductNotFound Component
 * Displayed when a product is not found
 */
const ProductNotFound = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Product not found
        </h1>
        <p className="text-gray-600 mb-6">
          We couldn't find the product you're looking for. It may have been
          removed or the URL might be incorrect.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#AE7E56] text-white py-2 px-6 rounded-lg hover:bg-[#94664A] transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default ProductNotFound;

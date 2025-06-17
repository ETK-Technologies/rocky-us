import Link from "next/link";

/**
 * ErrorPage Component
 * Displayed when there's an error loading a product
 */
const ErrorPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Error loading product
        </h1>
        <p className="text-gray-600 mb-6">
          There was an error loading the product. Please try again later or
          contact customer support if the problem persists.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="inline-block bg-[#AE7E56] text-white py-2 px-6 rounded-lg hover:bg-[#94664A] transition-colors"
          >
            Return to Home
          </Link>
          <a
            href="/contact-us"
            className="inline-block bg-white border border-[#AE7E56] text-[#AE7E56] py-2 px-6 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

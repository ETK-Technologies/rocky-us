"use client";

const ProductDetails = ({ sku, category, stockStatus }) => {
  return (
    <div className="mt-8 space-y-4">
      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Product Details
        </h2>
        <ul className="space-y-2 text-gray-600">
          <li>SKU: {sku || "N/A"}</li>
          <li>Category: {category || "N/A"}</li>
          <li>Stock Status: {stockStatus}</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetails;

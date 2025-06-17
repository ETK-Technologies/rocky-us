"use client";

const ProductInfo = ({ name, description }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">{name}</h1>
      <div
        className="text-sm text-gray-700"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default ProductInfo;

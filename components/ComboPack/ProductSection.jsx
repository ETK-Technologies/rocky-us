import Section from "../utils/Section";
import Product from "./Product";

const ProductSection = ({ products }) => {
  // Make sure we have products to display
  if (!products || products.length === 0) {
    return (
      <Section>
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold text-gray-700">
            No products available
          </h2>
        </div>
      </Section>
    );
  }

  return (
    <>
      {products.map((product, index) => (
        <Section bg={index % 2 === 0 ? `bg-gray-100` : ``} key={index}>
          <Product key={index} product={product} />
        </Section>
      ))}
    </>
  );
};

export default ProductSection;

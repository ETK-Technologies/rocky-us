import Link from "next/link";
import CustomImage from "../utils/CustomImage";

const MiniProductCard = ({ product }) => {
  return (
    <div className="text-center content-center w-1/2  lg:w-1/4 xl:1/4 md:1/2  mx-auto p-4 ">
      <div className="relative w-full aspect-square">
        <CustomImage
          src={product.img}
          alt={product.name || "Product image"}
          className={`object-contain`}
          fill
          priority={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={85}
          loading="lazy"
          fetchPriority="auto"
        />
      </div>
      <p className="block mt-4 text-2xl">{product.name}</p>
      <p className="text-sm text-gray-600">{product.size}</p>
      <div className="text-center">
        <Link
          href={`/product/` + product.name.toLowerCase()}
          className="bg-white w-full block mt-8 border-[#CCCCCC] border-[1px] text-black text-center content-center h-[44px] rounded-full"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default MiniProductCard;

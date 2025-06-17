"use client";
import CustomImage from "@/components/utils/CustomImage";

const ProductImage = ({ src, alt, priority = false, className = "" }) => {
  return (
    <div className="rounded-lg overflow-hidden w-full h-full flex items-center justify-center">
      {src ? (
        <div className="relative w-full aspect-square">
          <CustomImage
            src={src}
            alt={alt || "Product image"}
            className={`object-contain ${className}`}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
          />
        </div>
      ) : (
        <div className="bg-gray-200 w-full h-full aspect-square flex items-center justify-center">
          <p className="text-gray-500">No image available</p>
        </div>
      )}
    </div>
  );
};

export default ProductImage;

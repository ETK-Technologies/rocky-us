"use client";
import Image from "next/image";
import { useState } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CustomContainImage = ({ src, alt = "Image", className, ...props }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      src={src}
      alt={alt}
      className={cn(
        "object-contain duration-500 ease-in-out",
        isLoading ? "scale-110 blur-3xl sepia" : "scale-100 blur-0 sepia-0",
        className
      )}
      onLoad={() => setLoading(false)}
      {...props}
    />
  );
};

export default CustomContainImage;

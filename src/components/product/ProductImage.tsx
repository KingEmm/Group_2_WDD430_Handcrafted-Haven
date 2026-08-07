import Image from "next/image";
import type { Product } from "@/types";

// Owns the one policy decision about product images: seller-submitted (DB)
// products come from arbitrary hosts not in next/image's remotePatterns
// allowlist, so they render via a plain <img>; static catalog images go
// through next/image. Call sites just pass sizes/className.
export default function ProductImage({
  product,
  sizes,
  className = "",
  priority = false,
}: {
  product: Product;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  if (product.source === "db") {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- seller-submitted image host isn't in next/image's remotePatterns allowlist
      <img
        src={product.image}
        alt={product.name}
        className={`h-full w-full ${className}`}
      />
    );
  }

  return (
    <Image
      src={product.image}
      alt={product.name}
      fill
      sizes={sizes}
      className={className}
      priority={priority}
    />
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    addItem(product.slug);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <Link
      href={`/collection/${product.slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-beige/40">
        {product.source === "db" ? (
          // eslint-disable-next-line @next/next/no-img-element -- seller-submitted image host isn't in next/image's remotePatterns allowlist
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <button
          type="button"
          onClick={handleAddToCart}
          className="absolute inset-x-3 bottom-3 bg-charcoal/90 py-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-ivory opacity-0 transition-opacity duration-200 hover:bg-charcoal group-hover:opacity-100 focus-visible:opacity-100"
        >
          {added ? "Added" : "Add to Cart"}
        </button>
      </div>

      <div className="pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
          {product.category}
        </p>
        <h3 className="mt-2 font-[family-name:var(--font-heading)] text-xl leading-snug text-espresso">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-stone">by {product.artisan}</p>
        <p className="mt-3 text-sm font-medium tracking-wide text-espresso">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}

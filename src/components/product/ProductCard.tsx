import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/collection/${product.slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-beige/40">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
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

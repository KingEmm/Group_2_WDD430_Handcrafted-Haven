import type { Product } from "@/types";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="border border-beige py-24 text-center">
        <p className="font-[family-name:var(--font-heading)] text-2xl text-espresso">
          Nothing here yet
        </p>
        <p className="mx-auto mt-3 max-w-sm text-sm text-stone">
          No pieces match this category right now. Explore the full collection
          to see everything our makers have crafted.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}

import type { Product } from "@/types";
import ProductCard from "./ProductCard";
import EmptyState from "@/components/ui/EmptyState";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <EmptyState title="Nothing here yet">
        No pieces match this category right now. Explore the full collection to
        see everything our makers have crafted.
      </EmptyState>
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

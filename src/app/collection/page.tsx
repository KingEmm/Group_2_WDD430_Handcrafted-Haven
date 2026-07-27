import Container from "@/components/ui/Container";
import CategoryFilter from "@/components/product/CategoryFilter";
import ProductGrid from "@/components/product/ProductGrid";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import type { CategorySlug } from "@/types";

const VALID_CATEGORIES = new Set(CATEGORIES.map((c) => c.slug));

function parseCategory(value?: string): CategorySlug | null {
  return value && VALID_CATEGORIES.has(value as CategorySlug)
    ? (value as CategorySlug)
    : null;
}

export default async function CollectionPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = parseCategory(category);

  const products = active
    ? PRODUCTS.filter((p) => p.category === active)
    : PRODUCTS;

  const activeName = active
    ? CATEGORIES.find((c) => c.slug === active)?.name
    : null;

  return (
    <Container className="py-16 lg:py-24">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Our Collection
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-heading)] text-5xl leading-tight sm:text-6xl">
          {activeName ?? "The Collection"}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-stone">
          Furniture, ceramics, textiles and accessories — each piece made by
          hand and chosen for the story it carries.
        </p>
      </header>

      <div className="mt-12 flex flex-col gap-6 border-b border-beige pb-6 sm:flex-row sm:items-end sm:justify-between">
        <CategoryFilter active={active} />
        <p className="text-xs uppercase tracking-[0.15em] text-stone">
          {products.length} {products.length === 1 ? "piece" : "pieces"}
        </p>
      </div>

      <div className="mt-12">
        <ProductGrid products={products} />
      </div>
    </Container>
  );
}

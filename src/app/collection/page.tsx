import Container from "@/components/ui/Container";
import CategoryFilter from "@/components/product/CategoryFilter";
import PriceFilter from "@/components/product/PriceFilter";
import ProductGrid from "@/components/product/ProductGrid";
import { getAllProducts } from "@/lib/products";
import { CATEGORIES } from "@/data/categories";
import { parsePriceBand, matchesPriceBand } from "@/lib/filters";
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
  searchParams: Promise<{ category?: string; price?: string }>;
}) {
  const { category, price } = await searchParams;
  const active = parseCategory(category);
  const priceBand = parsePriceBand(price);

  const allProducts = await getAllProducts();
  const products = allProducts.filter((product) => {
    if (active && product.category !== active) return false;
    if (priceBand && !matchesPriceBand(product.price, priceBand)) return false;
    return true;
  });

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

      <div className="mt-12 flex flex-col gap-5 border-b border-beige pb-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <CategoryFilter active={active} price={priceBand?.slug ?? null} />
          <p className="text-xs uppercase tracking-[0.15em] text-stone">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </p>
        </div>
        <PriceFilter active={priceBand?.slug ?? null} category={active} />
      </div>

      <div className="mt-12">
        <ProductGrid products={products} />
      </div>
    </Container>
  );
}

import Link from "next/link";
import Container from "@/components/ui/Container";
import CategoryFilter from "@/components/product/CategoryFilter";
import ProductGrid from "@/components/product/ProductGrid";
import { getAllProducts } from "@/lib/products";
import { CATEGORIES } from "@/data/categories";
import type { CategorySlug } from "@/types";

const VALID_CATEGORIES = new Set(CATEGORIES.map((c) => c.slug));
const PAGE_SIZE = 12;

function parseCategory(value?: string): CategorySlug | null {
  return value && VALID_CATEGORIES.has(value as CategorySlug)
    ? (value as CategorySlug)
    : null;
}

export default async function CollectionPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const { category, page } = await searchParams;
  const active = parseCategory(category);

  const allProducts = await getAllProducts();
  const products = active
    ? allProducts.filter((p) => p.category === active)
    : allProducts;

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const currentPage = Math.min(
    Math.max(1, Number(page) || 1),
    totalPages,
  );
  const pagedProducts = products.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  function pageHref(targetPage: number): string {
    const params = new URLSearchParams();
    if (active) params.set("category", active);
    if (targetPage > 1) params.set("page", String(targetPage));
    const query = params.toString();
    return query ? `/collection?${query}` : "/collection";
  }

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
        <ProductGrid products={pagedProducts} />
      </div>

      {totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="mt-12 flex items-center justify-center gap-6"
        >
          {currentPage > 1 ? (
            <Link
              href={pageHref(currentPage - 1)}
              className="text-xs uppercase tracking-[0.15em] text-stone hover:text-espresso"
            >
              Previous
            </Link>
          ) : (
            <span className="text-xs uppercase tracking-[0.15em] text-stone/40">
              Previous
            </span>
          )}

          <p className="text-xs uppercase tracking-[0.15em] text-stone">
            Page {currentPage} of {totalPages}
          </p>

          {currentPage < totalPages ? (
            <Link
              href={pageHref(currentPage + 1)}
              className="text-xs uppercase tracking-[0.15em] text-stone hover:text-espresso"
            >
              Next
            </Link>
          ) : (
            <span className="text-xs uppercase tracking-[0.15em] text-stone/40">
              Next
            </span>
          )}
        </nav>
      )}
    </Container>
  );
}

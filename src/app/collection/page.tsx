import Link from "next/link";
import Container from "@/components/ui/Container";
import CategoryFilter from "@/components/product/CategoryFilter";
import PriceFilter from "@/components/product/PriceFilter";
import ProductGrid from "@/components/product/ProductGrid";
import { getAllProducts } from "@/lib/products";
import {
  categoryName,
  collectionHref,
  matchesPriceBand,
  parseCategory,
  parsePriceBand,
} from "@/lib/filters";

const PAGE_SIZE = 12;

export default async function CollectionPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; price?: string; page?: string }>;
}) {
  const { category, price, page } = await searchParams;
  const active = parseCategory(category);
  const priceBand = parsePriceBand(price);
  const activePrice = priceBand?.slug ?? null;

  const allProducts = await getAllProducts();
  const products = allProducts.filter((product) => {
    if (active && product.category !== active) return false;
    if (priceBand && !matchesPriceBand(product.price, priceBand)) return false;
    return true;
  });

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
    return collectionHref({ category: active, price: activePrice, page: targetPage });
  }

  const activeName = categoryName(active);

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
          <CategoryFilter active={active} price={activePrice} />
          <p className="text-xs uppercase tracking-[0.15em] text-stone">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </p>
        </div>
        <PriceFilter active={activePrice} category={active} />
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

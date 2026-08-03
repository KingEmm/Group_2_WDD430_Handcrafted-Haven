import Container from "@/components/ui/Container";
import SearchBar from "@/components/layout/SearchBar";
import ProductGrid from "@/components/product/ProductGrid";
import EmptyState from "@/components/ui/EmptyState";
import { getAllProducts } from "@/lib/products";
import { searchProducts } from "@/lib/filters";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const results = query ? searchProducts(await getAllProducts(), query) : [];

  return (
    <Container className="py-16 lg:py-24">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Search
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-heading)] text-5xl leading-tight sm:text-6xl">
          Find a piece
        </h1>
        <p className="mt-5 text-base leading-relaxed text-stone">
          Search the collection by product name, the maker behind it, or the
          materials it&apos;s made from.
        </p>
      </header>

      <div className="mt-10">
        <SearchBar initialQuery={query} />
      </div>

      {query && (
        <div className="mt-12">
          <p className="border-b border-beige pb-6 text-xs uppercase tracking-[0.15em] text-stone">
            {results.length} {results.length === 1 ? "result" : "results"} for
            &ldquo;{query}&rdquo;
          </p>
          <div className="mt-12">
            {results.length > 0 ? (
              <ProductGrid products={results} />
            ) : (
              <EmptyState title="No matches">
                We couldn&apos;t find anything for &ldquo;{query}&rdquo;. Try a
                different word, or browse the full collection.
              </EmptyState>
            )}
          </div>
        </div>
      )}
    </Container>
  );
}

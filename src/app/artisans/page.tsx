import Link from "next/link";
import Container from "@/components/ui/Container";
import EmptyState from "@/components/ui/EmptyState";
import { getSellersWithProducts } from "@/lib/sellers";

export default async function ArtisansPage() {
  const sellers = await getSellersWithProducts();

  return (
    <Container className="py-16 lg:py-24">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Our Makers
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-heading)] text-5xl leading-tight sm:text-6xl">
          Meet the Artisans
        </h1>
        <p className="mt-5 text-base leading-relaxed text-stone">
          The people behind every handcrafted piece in the collection.
        </p>
      </header>

      {sellers.length === 0 ? (
        <EmptyState title="No artisans have listed anything yet" className="mt-12">
          Check back soon as sellers add their first pieces.
        </EmptyState>
      ) : (
        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sellers.map((seller) => (
            <li key={seller.id}>
              <Link
                href={`/artisans/${seller.id}`}
                className="group block border border-beige p-6 transition-colors hover:border-gold"
              >
                <p className="font-[family-name:var(--font-heading)] text-2xl text-espresso group-hover:text-gold">
                  {seller.name}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.15em] text-stone">
                  {seller.productCount}{" "}
                  {seller.productCount === 1 ? "piece" : "pieces"} listed
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}

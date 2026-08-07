import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import ProductGrid from "@/components/product/ProductGrid";
import { getSellerProfile } from "@/lib/sellers";
import { formatMonthYear } from "@/lib/utils";

export default async function ArtisanProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const seller = await getSellerProfile(id);

  if (!seller) {
    notFound();
  }

  return (
    <Container className="py-16 lg:py-24">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Artisan
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-heading)] text-5xl leading-tight sm:text-6xl">
          {seller.name}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-stone">
          Member since {formatMonthYear(seller.memberSince)} ·{" "}
          {seller.products.length}{" "}
          {seller.products.length === 1 ? "piece" : "pieces"} listed
        </p>
      </header>

      <div className="mt-12">
        <ProductGrid products={seller.products} />
      </div>
    </Container>
  );
}

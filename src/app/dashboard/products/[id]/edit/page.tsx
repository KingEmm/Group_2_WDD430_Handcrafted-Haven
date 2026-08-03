import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import ProductForm from "@/components/forms/ProductForm";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";
import type { CategorySlug } from "@/types";

type ProductRow = {
  id: string;
  seller_id: string;
  name: string;
  category: CategorySlug;
  price: number;
  origin: string;
  image: string;
  description: string;
};

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();

  const [product] = session
    ? await sql<ProductRow[]>`
        SELECT id, seller_id, name, category, price, origin, image, description
        FROM products
        WHERE id = ${id}
      `
    : [];

  if (!product || product.seller_id !== session?.userId) {
    notFound();
  }

  return (
    <Container className="py-16 sm:py-24">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Artisan Studio
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-heading)] text-5xl">
          Edit Product
        </h1>
        <p className="mx-auto mt-4 max-w-md text-stone">
          Update the details for this listing.
        </p>
      </div>

      <div className="mt-12">
        <ProductForm product={product} />
      </div>
    </Container>
  );
}

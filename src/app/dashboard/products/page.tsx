import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import DeleteProductButton from "@/components/dashboard/DeleteProductButton";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";
import { formatPrice } from "@/lib/utils";

export default async function DashboardProductsPage() {
  const session = await getSession();

  const products = session
    ? await sql`
        SELECT id, slug, name, category, price, created_at
        FROM products
        WHERE seller_id = ${session.userId}
        ORDER BY created_at DESC
      `
    : [];

  return (
    <Container className="py-16 sm:py-24">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Artisan Studio
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-heading)] text-5xl">
            My Products
          </h1>
        </div>
        <Button href="/dashboard/products/new">Add Product</Button>
      </div>

      {products.length === 0 ? (
        <div className="mt-12 border border-beige py-24 text-center">
          <p className="font-[family-name:var(--font-heading)] text-2xl text-espresso">
            You haven&apos;t listed anything yet
          </p>
          <p className="mx-auto mt-3 max-w-sm text-sm text-stone">
            Add your first product to start building your storefront.
          </p>
        </div>
      ) : (
        <ul className="mt-12 divide-y divide-beige border-y border-beige">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex items-center justify-between gap-4 py-5"
            >
              <div>
                <p className="font-[family-name:var(--font-heading)] text-lg text-espresso">
                  {product.name}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-stone">
                  {product.category}
                </p>
              </div>
              <div className="flex items-center gap-6">
                <p className="whitespace-nowrap text-sm font-medium text-espresso">
                  {formatPrice(product.price)}
                </p>
                <DeleteProductButton id={product.id} name={product.name} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}

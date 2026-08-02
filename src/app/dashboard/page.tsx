import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";
import { formatPrice } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await getSession();

  const products = session
    ? await sql`
        SELECT name, price, created_at
        FROM products
        WHERE seller_id = ${session.userId}
        ORDER BY created_at DESC
      `
    : [];

  const totalValue = products.reduce((sum, p) => sum + p.price, 0);
  const newestProduct = products[0]?.name ?? "—";

  const stats = [
    { label: "Products Listed", value: products.length },
    { label: "Total Catalog Value", value: formatPrice(totalValue) },
    { label: "Newest Listing", value: newestProduct },
  ];

  return (
    <Container className="py-16 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
        Artisan Studio
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-heading)] text-5xl">
        Welcome back, {session?.name}
      </h1>
      <p className="mt-4 max-w-md text-stone">
        Here&apos;s a quick look at your storefront.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-beige p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-stone">
              {stat.label}
            </p>
            <p className="mt-3 truncate font-[family-name:var(--font-heading)] text-2xl text-espresso">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-4 sm:flex-row">
        <Button href="/dashboard/products/new">Add Product</Button>
        <Button href="/dashboard/products" variant="outline">
          Manage Products
        </Button>
      </div>
    </Container>
  );
}

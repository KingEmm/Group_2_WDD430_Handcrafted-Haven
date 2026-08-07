import Container from "@/components/ui/Container";
import EmptyState from "@/components/ui/EmptyState";
import { getSession } from "@/lib/session";
import { getSellerSales } from "@/lib/orders";
import { formatPrice } from "@/lib/utils";

const SALE_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export default async function SellerSalesPage() {
  const session = await getSession();

  const sales = session ? await getSellerSales(session.userId) : [];
  const totalRevenue = sales.reduce(
    (sum, sale) => sum + sale.unitPrice * sale.quantity,
    0,
  );

  return (
    <Container className="py-16 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
        Artisan Studio
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-heading)] text-5xl">
        Sales
      </h1>

      <div className="mt-12 border border-beige p-6 sm:w-fit">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-stone">
          Total Revenue
        </p>
        <p className="mt-3 font-[family-name:var(--font-heading)] text-2xl text-espresso">
          {formatPrice(totalRevenue)}
        </p>
      </div>

      {sales.length === 0 ? (
        <EmptyState title="No sales yet" className="mt-12">
          Sold items will show up here once a customer buys one of your
          products.
        </EmptyState>
      ) : (
        <ul className="mt-12 divide-y divide-beige border-y border-beige">
          {sales.map((sale, index) => (
            <li
              key={`${sale.orderId}-${sale.productSlug}-${index}`}
              className="flex items-center justify-between gap-4 py-5"
            >
              <div>
                <p className="font-[family-name:var(--font-heading)] text-lg text-espresso">
                  {sale.productName}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-stone">
                  Order #{sale.orderNumber} · {SALE_DATE_FORMATTER.format(sale.createdAt)}{" "}
                  · Qty {sale.quantity} · Ship to {sale.shippingCity},{" "}
                  {sale.shippingState}
                </p>
              </div>
              <p className="whitespace-nowrap text-sm font-medium text-espresso">
                {formatPrice(sale.unitPrice * sale.quantity)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}

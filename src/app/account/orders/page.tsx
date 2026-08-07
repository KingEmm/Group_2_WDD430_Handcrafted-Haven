import Link from "next/link";
import { redirect } from "next/navigation";
import Container from "@/components/ui/Container";
import EmptyState from "@/components/ui/EmptyState";
import { getSession } from "@/lib/session";
import { getOrdersByCustomerId } from "@/lib/orders";
import { formatPrice } from "@/lib/utils";

const ORDER_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default async function OrderHistoryPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const orders = await getOrdersByCustomerId(session.userId);

  return (
    <Container className="py-16 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
        Account
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-heading)] text-5xl">
        Order History
      </h1>

      {orders.length === 0 ? (
        <EmptyState title="No orders yet" className="mt-12">
          Your past orders will show up here once you make a purchase.
        </EmptyState>
      ) : (
        <ul className="mt-12 divide-y divide-beige border-y border-beige">
          {orders.map((order) => (
            <li key={order.id}>
              <Link
                href={`/orders/${order.id}`}
                className="flex items-center justify-between gap-4 py-5 transition-colors hover:bg-beige/20"
              >
                <div>
                  <p className="font-[family-name:var(--font-heading)] text-lg text-espresso">
                    Order #{order.orderNumber}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-stone">
                    {ORDER_DATE_FORMATTER.format(order.createdAt)} ·{" "}
                    {order.itemCount} {order.itemCount === 1 ? "item" : "items"}
                  </p>
                </div>
                <p className="whitespace-nowrap text-sm font-medium text-espresso">
                  {formatPrice(order.subtotal)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}

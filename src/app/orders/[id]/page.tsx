import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { getOrderById } from "@/lib/orders";
import { formatPrice } from "@/lib/utils";

const ORDER_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <Container className="py-16 sm:py-24">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Order Confirmed
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-heading)] text-5xl">
          Thank you, {order.customerName.split(" ")[0]}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-stone">
          Your order has been placed. A confirmation has been sent to{" "}
          {order.customerEmail}.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl border border-beige p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-beige pb-6">
          <p className="font-[family-name:var(--font-heading)] text-2xl text-espresso">
            Order #{order.orderNumber}
          </p>
          <p className="text-sm text-stone">
            {ORDER_DATE_FORMATTER.format(order.createdAt)}
          </p>
        </div>

        <ul className="mt-6 divide-y divide-beige">
          {order.items.map((item) => (
            <li
              key={item.slug}
              className="flex items-center justify-between gap-4 py-4"
            >
              <div>
                <p className="text-sm font-medium text-espresso">
                  {item.name}
                </p>
                <p className="mt-1 text-xs text-stone">
                  Qty {item.quantity} × {formatPrice(item.unitPrice)}
                </p>
              </div>
              <p className="whitespace-nowrap text-sm font-medium text-espresso">
                {formatPrice(item.unitPrice * item.quantity)}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-between border-t border-beige pt-4 text-sm">
          <span className="text-stone">Subtotal</span>
          <span className="font-medium text-espresso">
            {formatPrice(order.subtotal)}
          </span>
        </div>

        <div className="mt-8 border-t border-beige pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-stone">
            Shipping To
          </p>
          <p className="mt-2 text-sm text-espresso">
            {order.customerName}
            <br />
            {order.shippingAddress}
            <br />
            {order.shippingCity}, {order.shippingState}{" "}
            {order.shippingPostalCode}
            <br />
            {order.shippingCountry}
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Button href="/collection">Continue Shopping</Button>
      </div>
    </Container>
  );
}

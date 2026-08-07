"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ProductImage from "@/components/product/ProductImage";
import { useCart } from "@/context/CartContext";
import { formatPrice, resolveCartLines } from "@/lib/utils";

export default function CartPage() {
  const { items, subtotal, products, removeItem, setQuantity } = useCart();

  const lines = resolveCartLines(items, products);

  if (lines.length === 0) {
    return (
      <Container className="py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Your Cart
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-heading)] text-5xl">
          Cart
        </h1>
        <p className="mx-auto mt-4 max-w-md text-stone">
          Your cart is empty.
        </p>
        <Button href="/collection" className="mt-8">
          Browse the Collection
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-16 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
        Your Cart
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-heading)] text-5xl">
        Cart
      </h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_20rem]">
        <ul className="divide-y divide-beige border-y border-beige">
          {lines.map(({ item, product }) => (
            <li
              key={product.slug}
              className="flex gap-5 py-6 sm:gap-8"
            >
              <div className="relative h-28 w-24 flex-shrink-0 overflow-hidden bg-beige/40 sm:h-32 sm:w-28">
                <ProductImage
                  product={product}
                  sizes="112px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-lg leading-snug text-espresso">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-stone">
                      by {product.artisan}
                    </p>
                  </div>
                  <p className="whitespace-nowrap text-sm font-medium text-espresso">
                    {formatPrice(product.price * item.quantity)}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center border border-beige">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${product.name}`}
                      onClick={() => setQuantity(product.slug, item.quantity - 1)}
                      className="h-8 w-8 text-sm text-espresso transition-colors hover:bg-beige/40"
                    >
                      –
                    </button>
                    <span className="w-8 text-center text-sm">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${product.name}`}
                      onClick={() => setQuantity(product.slug, item.quantity + 1)}
                      className="h-8 w-8 text-sm text-espresso transition-colors hover:bg-beige/40"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(product.slug)}
                    className="text-xs uppercase tracking-[0.15em] text-stone underline-offset-4 transition-colors hover:text-espresso hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit border border-beige p-6">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl">
            Order Summary
          </h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-stone">Subtotal</dt>
              <dd className="font-medium text-espresso">
                {formatPrice(subtotal)}
              </dd>
            </div>
            <div className="flex justify-between text-stone">
              <dt>Shipping</dt>
              <dd>Free</dd>
            </div>
          </dl>
          <Button href="/checkout" className="mt-6 w-full justify-center">
            Checkout
          </Button>
        </aside>
      </div>
    </Container>
  );
}

"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import CheckoutForm from "@/components/forms/CheckoutForm";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <Container className="py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Checkout
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-heading)] text-5xl">
          Your Cart is Empty
        </h1>
        <p className="mx-auto mt-4 max-w-md text-stone">
          Add something to your cart before checking out.
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
        Checkout
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-heading)] text-5xl">
        Checkout
      </h1>

      <div className="mt-12">
        <CheckoutForm />
      </div>
    </Container>
  );
}

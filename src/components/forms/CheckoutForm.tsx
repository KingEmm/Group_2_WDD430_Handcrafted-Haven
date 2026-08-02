"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

type FormErrors = {
  name?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  form?: string;
};

export default function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, products, clearCart } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const lines = items
    .map((item) => {
      const product = products.find((p) => p.slug === item.slug);
      return product ? { item, product } : null;
    })
    .filter((line): line is { item: typeof items[number]; product: (typeof products)[number] } => line !== null);

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};

    if (!name.trim()) nextErrors.name = "Name is required.";
    if (!email) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!address.trim()) nextErrors.address = "Address is required.";
    if (!city.trim()) nextErrors.city = "City is required.";
    if (!state.trim()) nextErrors.state = "State is required.";
    if (!postalCode.trim()) nextErrors.postalCode = "Postal code is required.";
    if (!country.trim()) nextErrors.country = "Country is required.";

    // Cosmetic only — never sent to the server.
    if (!/^\d{13,19}$/.test(cardNumber.replace(/\s/g, ""))) {
      nextErrors.cardNumber = "Enter a valid card number.";
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      nextErrors.expiry = "Use MM/YY format.";
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      nextErrors.cvv = "Enter a valid CVV.";
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          address,
          city,
          state,
          postalCode,
          country,
          items: items.map((item) => ({
            slug: item.slug,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ form: data.error ?? "Something went wrong." });
        setIsSubmitting(false);
        return;
      }

      clearCart();
      router.push(`/orders/${data.orderId}`);
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-12 lg:grid-cols-[1fr_20rem]">
      <div className="flex flex-col gap-10">
        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-espresso">
            Shipping Details
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Input
                label="Full Name"
                id="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
                placeholder="Jane Doe"
              />
            </div>
            <div className="sm:col-span-2">
              <Input
                label="Email"
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                placeholder="you@example.com"
              />
            </div>
            <div className="sm:col-span-2">
              <Input
                label="Address"
                id="address"
                type="text"
                autoComplete="street-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                error={errors.address}
                placeholder="123 Maple Street"
              />
            </div>
            <Input
              label="City"
              id="city"
              type="text"
              autoComplete="address-level2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              error={errors.city}
              placeholder="Rexburg"
            />
            <Input
              label="State"
              id="state"
              type="text"
              autoComplete="address-level1"
              value={state}
              onChange={(e) => setState(e.target.value)}
              error={errors.state}
              placeholder="ID"
            />
            <Input
              label="Postal Code"
              id="postalCode"
              type="text"
              autoComplete="postal-code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              error={errors.postalCode}
              placeholder="83440"
            />
            <Input
              label="Country"
              id="country"
              type="text"
              autoComplete="country-name"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              error={errors.country}
              placeholder="United States"
            />
          </div>
        </div>

        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-espresso">
            Payment
          </h2>
          <p className="mt-2 text-xs text-stone">
            This is a demo checkout — no payment is actually processed.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Input
                label="Card Number"
                id="cardNumber"
                type="text"
                inputMode="numeric"
                autoComplete="cc-number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                error={errors.cardNumber}
                placeholder="4242 4242 4242 4242"
              />
            </div>
            <Input
              label="Expiry (MM/YY)"
              id="expiry"
              type="text"
              autoComplete="cc-exp"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              error={errors.expiry}
              placeholder="12/28"
            />
            <Input
              label="CVV"
              id="cvv"
              type="text"
              inputMode="numeric"
              autoComplete="cc-csc"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              error={errors.cvv}
              placeholder="123"
            />
          </div>
        </div>

        {errors.form && (
          <p className="text-sm text-red-500" role="alert">
            {errors.form}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-ivory transition-colors duration-200 hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Placing Order..." : "Place Order"}
        </button>
      </div>

      <aside className="h-fit border border-beige p-6">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl">
          Order Summary
        </h2>
        <ul className="mt-6 space-y-4 text-sm">
          {lines.map(({ item, product }) => (
            <li key={product.slug} className="flex justify-between gap-4">
              <span className="text-stone">
                {product.name} × {item.quantity}
              </span>
              <span className="whitespace-nowrap font-medium text-espresso">
                {formatPrice(product.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-between border-t border-beige pt-4 text-sm">
          <span className="text-stone">Subtotal</span>
          <span className="font-medium text-espresso">
            {formatPrice(subtotal)}
          </span>
        </div>
      </aside>
    </form>
  );
}

"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import { useCart } from "@/context/CartContext";
import { EMAIL_PATTERN, formatPrice, resolveCartLines } from "@/lib/utils";

type FormFields =
  | "name"
  | "email"
  | "address"
  | "city"
  | "state"
  | "postalCode"
  | "country"
  | "cardNumber"
  | "expiry"
  | "cvv";

type FormErrors = Partial<Record<FormFields, string>> & { form?: string };

const EMPTY_FORM: Record<FormFields, string> = {
  name: "",
  email: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

export default function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, products, clearCart } = useCart();

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const lines = resolveCartLines(items, products);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  }

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};

    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.email) {
      nextErrors.email = "Email is required.";
    } else if (!EMAIL_PATTERN.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.address.trim()) nextErrors.address = "Address is required.";
    if (!form.city.trim()) nextErrors.city = "City is required.";
    if (!form.state.trim()) nextErrors.state = "State is required.";
    if (!form.postalCode.trim())
      nextErrors.postalCode = "Postal code is required.";
    if (!form.country.trim()) nextErrors.country = "Country is required.";

    // Cosmetic only — never sent to the server.
    if (!/^\d{13,19}$/.test(form.cardNumber.replace(/\s/g, ""))) {
      nextErrors.cardNumber = "Enter a valid card number.";
    }
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) {
      nextErrors.expiry = "Use MM/YY format.";
    }
    if (!/^\d{3,4}$/.test(form.cvv)) {
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
        // Card fields are cosmetic — send only the shipping details.
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          address: form.address,
          city: form.city,
          state: form.state,
          postalCode: form.postalCode,
          country: form.country,
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
                value={form.name}
                onChange={handleChange}
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
                value={form.email}
                onChange={handleChange}
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
                value={form.address}
                onChange={handleChange}
                error={errors.address}
                placeholder="123 Maple Street"
              />
            </div>
            <Input
              label="City"
              id="city"
              type="text"
              autoComplete="address-level2"
              value={form.city}
              onChange={handleChange}
              error={errors.city}
              placeholder="Rexburg"
            />
            <Input
              label="State"
              id="state"
              type="text"
              autoComplete="address-level1"
              value={form.state}
              onChange={handleChange}
              error={errors.state}
              placeholder="ID"
            />
            <Input
              label="Postal Code"
              id="postalCode"
              type="text"
              autoComplete="postal-code"
              value={form.postalCode}
              onChange={handleChange}
              error={errors.postalCode}
              placeholder="83440"
            />
            <Input
              label="Country"
              id="country"
              type="text"
              autoComplete="country-name"
              value={form.country}
              onChange={handleChange}
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
                value={form.cardNumber}
                onChange={handleChange}
                error={errors.cardNumber}
                placeholder="4242 4242 4242 4242"
              />
            </div>
            <Input
              label="Expiry (MM/YY)"
              id="expiry"
              type="text"
              autoComplete="cc-exp"
              value={form.expiry}
              onChange={handleChange}
              error={errors.expiry}
              placeholder="12/28"
            />
            <Input
              label="CVV"
              id="cvv"
              type="text"
              inputMode="numeric"
              autoComplete="cc-csc"
              value={form.cvv}
              onChange={handleChange}
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

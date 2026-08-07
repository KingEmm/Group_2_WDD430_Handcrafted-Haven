import type { CartItem, Product } from "@/types";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  return priceFormatter.format(amount);
}

const monthYearFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
});

export function formatMonthYear(date: Date): string {
  return monthYearFormatter.format(date);
}

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value: string): boolean {
  return UUID_PATTERN.test(value);
}

export type CartLine = { item: CartItem; product: Product };

// Join cart items to their catalog product (O(1) lookups), dropping any whose
// product is missing. Shared by the cart and checkout views.
export function resolveCartLines(
  items: CartItem[],
  products: Product[],
): CartLine[] {
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  return items.flatMap((item) => {
    const product = bySlug.get(item.slug);
    return product ? [{ item, product }] : [];
  });
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isValidImageUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

import type { Product } from "@/types";

export const PRICE_BANDS = [
  { slug: "under-75", label: "Under $75", min: 0, max: 75 },
  { slug: "75-200", label: "$75 – $200", min: 75, max: 200 },
  { slug: "over-200", label: "Over $200", min: 200, max: Infinity },
] as const;

export type PriceBand = (typeof PRICE_BANDS)[number];
export type PriceBandSlug = PriceBand["slug"];

export function parsePriceBand(value?: string): PriceBand | null {
  return PRICE_BANDS.find((band) => band.slug === value) ?? null;
}

// min inclusive, max exclusive so adjacent bands never overlap.
export function matchesPriceBand(price: number, band: PriceBand): boolean {
  return price >= band.min && price < band.max;
}

export function searchProducts(products: Product[], query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return products;

  return products.filter((product) =>
    [
      product.name,
      product.description,
      product.category,
      product.artisan,
      product.origin,
    ]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}

// Builds a /collection URL that keeps whichever filters are set, so category
// and price selections compose instead of clobbering each other.
export function collectionHref(params: {
  category?: string | null;
  price?: string | null;
}): string {
  const searchParams = new URLSearchParams();
  if (params.category) searchParams.set("category", params.category);
  if (params.price) searchParams.set("price", params.price);
  const query = searchParams.toString();
  return query ? `/collection?${query}` : "/collection";
}

export type CategorySlug =
  | "furniture"
  | "ceramics"
  | "textiles"
  | "accessories";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  href: string;
  image: string;
}

export interface Feature {
  icon: "handmade" | "sustainable" | "durable" | "purpose";
  title: string;
  description: string;
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  artisan: string;
  origin: string;
  image: string;
  description: string;
  featured?: boolean;
  // Seller-submitted products come from the DB with an arbitrary image host,
  // so they can't go through next/image's remotePatterns allowlist like the
  // static catalog images can — components use this to pick <img> vs Image.
  source?: "static" | "db";
  // Only set for DB-backed products — the static catalog's "artisan" names
  // aren't real accounts, so there's nothing to link to.
  sellerId?: string;
}

export interface CartItem {
  slug: string;
  quantity: number;
}

export interface Review {
  id: string;
  productSlug: string;
  author: string;
  rating: number;
  body: string;
  createdAt: string;
}

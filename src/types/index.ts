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
}

export interface CartItem {
  slug: string;
  quantity: number;
}

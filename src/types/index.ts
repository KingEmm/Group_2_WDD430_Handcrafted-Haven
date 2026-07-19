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

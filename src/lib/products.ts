import sql from "@/lib/db";
import { PRODUCTS } from "@/data/products";
import type { Product } from "@/types";

export const ALLOWED_CATEGORIES = [
  "furniture",
  "ceramics",
  "textiles",
  "accessories",
];

type ProductRow = {
  slug: string;
  name: string;
  category: Product["category"];
  price: number;
  origin: string;
  image: string;
  description: string;
  featured: boolean;
  artisan: string;
};

function dbRowToProduct(row: ProductRow): Product {
  return { ...row, source: "db" };
}

export async function getAllProducts(): Promise<Product[]> {
  const rows = await sql<ProductRow[]>`
    SELECT p.slug, p.name, p.category, p.price, p.origin, p.image,
           p.description, p.featured, u.name AS artisan
    FROM products p
    JOIN users u ON u.id = p.seller_id
    ORDER BY p.created_at DESC
  `;

  return [...PRODUCTS, ...rows.map(dbRowToProduct)];
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  const staticMatch = PRODUCTS.find((p) => p.slug === slug);
  if (staticMatch) return staticMatch;

  const rows = await sql<ProductRow[]>`
    SELECT p.slug, p.name, p.category, p.price, p.origin, p.image,
           p.description, p.featured, u.name AS artisan
    FROM products p
    JOIN users u ON u.id = p.seller_id
    WHERE p.slug = ${slug}
  `;

  return rows[0] ? dbRowToProduct(rows[0]) : undefined;
}

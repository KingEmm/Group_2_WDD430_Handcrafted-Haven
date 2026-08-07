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
  seller_id: string;
};

const STATIC_BY_SLUG = new Map(PRODUCTS.map((p) => [p.slug, p]));

// Shared column list + join for a DB-backed product row, composed into each
// query below so the row shape is defined once. Callers append WHERE/ORDER BY.
function productSelect() {
  return sql`
    SELECT p.slug, p.name, p.category, p.price, p.origin, p.image,
           p.description, p.featured, p.seller_id, u.name AS artisan
    FROM products p
    JOIN users u ON u.id = p.seller_id
  `;
}

function dbRowToProduct({ seller_id, ...row }: ProductRow): Product {
  return { ...row, source: "db", sellerId: seller_id };
}

export async function getAllProducts(): Promise<Product[]> {
  const rows = await sql<ProductRow[]>`
    ${productSelect()}
    ORDER BY p.created_at DESC
  `;

  return [...PRODUCTS, ...rows.map(dbRowToProduct)];
}

// Resolve many slugs at once (static catalog in memory + one DB query for the
// rest), returning a slug→Product map. Avoids an N+1 when resolving a cart.
export async function getProductsBySlugs(
  slugs: string[],
): Promise<Map<string, Product>> {
  const result = new Map<string, Product>();
  const dbSlugs: string[] = [];

  for (const slug of slugs) {
    const staticMatch = STATIC_BY_SLUG.get(slug);
    if (staticMatch) result.set(slug, staticMatch);
    else dbSlugs.push(slug);
  }

  if (dbSlugs.length > 0) {
    const rows = await sql<ProductRow[]>`
      ${productSelect()}
      WHERE p.slug = ANY(${dbSlugs})
    `;
    for (const row of rows) result.set(row.slug, dbRowToProduct(row));
  }

  return result;
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  return (await getProductsBySlugs([slug])).get(slug);
}

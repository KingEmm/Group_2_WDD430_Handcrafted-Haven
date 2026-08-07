import sql from "@/lib/db";
import { isUuid } from "@/lib/utils";
import type { Product } from "@/types";

type SellerProductRow = {
  slug: string;
  name: string;
  category: Product["category"];
  price: number;
  origin: string;
  image: string;
  description: string;
  featured: boolean;
};

function toSellerProduct(
  row: SellerProductRow,
  artisan: string,
  sellerId: string,
): Product {
  return { ...row, source: "db", artisan, sellerId };
}

export type SellerListing = {
  id: string;
  name: string;
  memberSince: Date;
  productCount: number;
};

export async function getSellersWithProducts(
  limit?: number,
): Promise<SellerListing[]> {
  const rows = await sql<
    { id: string; name: string; created_at: Date; product_count: number }[]
  >`
    SELECT u.id, u.name, u.created_at, COUNT(p.id) AS product_count
    FROM users u
    JOIN products p ON p.seller_id = u.id
    WHERE u.role = 'seller'
    GROUP BY u.id, u.name, u.created_at
    ORDER BY u.created_at ASC
    ${limit ? sql`LIMIT ${limit}` : sql``}
  `;

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    memberSince: row.created_at,
    productCount: Number(row.product_count),
  }));
}

export type SellerProfile = {
  id: string;
  name: string;
  memberSince: Date;
  products: Product[];
};

export async function getSellerProfile(
  id: string,
): Promise<SellerProfile | null> {
  // Route params are arbitrary strings — querying a non-UUID id would
  // otherwise throw a Postgres error instead of a clean 404.
  if (!isUuid(id)) return null;

  // Both queries key only on ${id}, so run them in parallel.
  const [sellerRows, rows] = await Promise.all([
    sql<{ id: string; name: string; created_at: Date }[]>`
      SELECT id, name, created_at FROM users WHERE id = ${id} AND role = 'seller'
    `,
    sql<SellerProductRow[]>`
      SELECT slug, name, category, price, origin, image, description, featured
      FROM products
      WHERE seller_id = ${id}
      ORDER BY created_at DESC
    `,
  ]);

  const seller = sellerRows[0];
  if (!seller) return null;

  return {
    id: seller.id,
    name: seller.name,
    memberSince: seller.created_at,
    products: rows.map((row) => toSellerProduct(row, seller.name, seller.id)),
  };
}

import sql from "@/lib/db";

export class ReviewError extends Error {}

export type Review = {
  id: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: Date;
};

export async function getReviewsForProduct(slug: string): Promise<Review[]> {
  const rows = await sql`
    SELECT r.id, r.customer_id, u.name AS customer_name, r.rating, r.comment, r.created_at
    FROM reviews r
    JOIN users u ON u.id = r.customer_id
    WHERE r.product_slug = ${slug}
    ORDER BY r.created_at DESC
  `;

  return rows.map((row) => ({
    id: row.id,
    customerId: row.customer_id,
    customerName: row.customer_name,
    rating: row.rating,
    comment: row.comment,
    createdAt: row.created_at,
  }));
}

export async function hasPurchasedProduct(
  customerId: string,
  slug: string,
): Promise<boolean> {
  const [row] = await sql`
    SELECT 1
    FROM order_items oi
    JOIN orders o ON o.id = oi.order_id
    WHERE o.customer_id = ${customerId} AND oi.product_slug = ${slug}
    LIMIT 1
  `;

  return Boolean(row);
}

export async function createReview(
  customerId: string,
  slug: string,
  rating: number,
  comment: string,
): Promise<void> {
  const purchased = await hasPurchasedProduct(customerId, slug);
  if (!purchased) {
    throw new ReviewError("You can only review products you've purchased.");
  }

  try {
    await sql`
      INSERT INTO reviews (product_slug, customer_id, rating, comment)
      VALUES (${slug}, ${customerId}, ${rating}, ${comment})
    `;
  } catch (error) {
    const code = (error as { code?: string })?.code;
    if (code === "23505") {
      throw new ReviewError("You've already reviewed this product.");
    }
    throw error;
  }
}

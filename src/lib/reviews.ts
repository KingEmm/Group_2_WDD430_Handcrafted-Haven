import sql from "@/lib/db";
import type { Review } from "@/types";

type ReviewRow = {
  id: string;
  product_slug: string;
  author: string;
  rating: number;
  body: string;
  created_at: Date;
};

function rowToReview(row: ReviewRow): Review {
  return {
    id: row.id,
    productSlug: row.product_slug,
    author: row.author,
    rating: row.rating,
    body: row.body,
    createdAt: row.created_at.toISOString(),
  };
}

export async function getReviewsForProduct(slug: string): Promise<Review[]> {
  const rows = await sql<ReviewRow[]>`
    SELECT r.id, r.product_slug, r.rating, r.body, r.created_at, u.name AS author
    FROM reviews r
    JOIN users u ON u.id = r.user_id
    WHERE r.product_slug = ${slug}
    ORDER BY r.created_at DESC
  `;

  return rows.map(rowToReview);
}

export function averageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return total / reviews.length;
}

import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";
import { getProductBySlug } from "@/lib/products";

export async function POST(request: NextRequest) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: "You must be signed in to leave a review." },
      { status: 401 },
    );
  }

  try {
    const { slug, rating, body } = await request.json();

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { error: "Missing product." },
        { status: 400 },
      );
    }

    const ratingValue = Number(rating);
    if (!Number.isInteger(ratingValue) || ratingValue < 1 || ratingValue > 5) {
      return NextResponse.json(
        { error: "Rating must be a whole number from 1 to 5." },
        { status: 400 },
      );
    }

    const trimmedBody = typeof body === "string" ? body.trim() : "";
    if (!trimmedBody) {
      return NextResponse.json(
        { error: "Please add a few words about your experience." },
        { status: 400 },
      );
    }

    const product = await getProductBySlug(slug);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 },
      );
    }

    // One review per user per product — re-submitting updates the existing row.
    const [review] = await sql`
      INSERT INTO reviews (product_slug, user_id, rating, body)
      VALUES (${slug}, ${session.userId}, ${ratingValue}, ${trimmedBody})
      ON CONFLICT (product_slug, user_id)
      DO UPDATE SET rating = EXCLUDED.rating, body = EXCLUDED.body, created_at = now()
      RETURNING id
    `;

    return NextResponse.json(
      { message: "Review posted.", id: review.id },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create review error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

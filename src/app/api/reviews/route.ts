import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { createReview, ReviewError } from "@/lib/reviews";

export async function POST(request: NextRequest) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: "You must be signed in to leave a review." },
      { status: 401 },
    );
  }

  try {
    const { slug, rating, comment } = await request.json();

    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Missing product." }, { status: 400 });
    }

    const ratingValue = Number(rating);
    if (!Number.isInteger(ratingValue) || ratingValue < 1 || ratingValue > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5." },
        { status: 400 },
      );
    }

    if (!comment || typeof comment !== "string" || !comment.trim()) {
      return NextResponse.json(
        { error: "Enter a comment for your review." },
        { status: 400 },
      );
    }

    await createReview(session.userId, slug, ratingValue, comment.trim());

    return NextResponse.json({ message: "Review posted." }, { status: 201 });
  } catch (error) {
    if (error instanceof ReviewError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }

    console.error("Create review error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

import Link from "next/link";
import { getReviewsForProduct, averageRating } from "@/lib/reviews";
import { getSession } from "@/lib/session";
import ReviewList from "./ReviewList";
import ReviewForm from "@/components/forms/ReviewForm";
import StarRating from "@/components/ui/StarRating";

export default async function ProductReviews({ slug }: { slug: string }) {
  const [reviews, session] = await Promise.all([
    getReviewsForProduct(slug),
    getSession(),
  ]);
  const average = averageRating(reviews);

  return (
    <section className="mt-20 border-t border-beige pt-12">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl">
          Reviews
        </h2>
        {reviews.length > 0 && (
          <div className="flex items-center gap-3">
            <StarRating rating={average} />
            <span className="text-sm text-stone">
              {average.toFixed(1)} · {reviews.length}{" "}
              {reviews.length === 1 ? "review" : "reviews"}
            </span>
          </div>
        )}
      </div>

      <ReviewList reviews={reviews} />

      {session ? (
        <ReviewForm productSlug={slug} />
      ) : (
        <p className="mt-8 text-sm text-stone">
          <Link
            href="/login"
            className="border-b border-gold pb-0.5 text-espresso"
          >
            Sign in
          </Link>{" "}
          to leave a review.
        </p>
      )}
    </section>
  );
}

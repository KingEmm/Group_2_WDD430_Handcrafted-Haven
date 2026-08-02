import type { Review } from "@/lib/reviews";
import ReviewCard from "./ReviewCard";

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <p className="mt-3 text-sm text-stone">
        No reviews yet — be the first to share your thoughts.
      </p>
    );
  }

  return (
    <ul className="mt-6 divide-y divide-beige">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </ul>
  );
}

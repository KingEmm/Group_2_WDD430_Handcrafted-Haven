import type { Review } from "@/types";
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
    <div className="mt-2">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}

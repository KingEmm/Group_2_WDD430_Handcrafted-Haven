import type { Review } from "@/types";
import StarRating from "@/components/ui/StarRating";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="border-b border-beige py-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-espresso">{review.author}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.15em] text-stone">
            {dateFormatter.format(new Date(review.createdAt))}
          </p>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-stone">{review.body}</p>
    </article>
  );
}

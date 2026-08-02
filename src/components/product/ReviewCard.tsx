import { Star } from "lucide-react";
import type { Review } from "@/lib/reviews";

const REVIEW_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <li className="py-6">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < review.rating ? "fill-gold text-gold" : "text-beige"}
          />
        ))}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-espresso">
        {review.comment}
      </p>
      <p className="mt-3 text-xs uppercase tracking-[0.15em] text-stone">
        {review.customerName} · {REVIEW_DATE_FORMATTER.format(review.createdAt)}
      </p>
    </li>
  );
}

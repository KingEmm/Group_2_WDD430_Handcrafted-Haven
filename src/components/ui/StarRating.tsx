import { StarIcon } from "@/components/ui/icons";

export default function StarRating({
  rating,
  className = "",
  size = "h-4 w-4",
}: {
  rating: number;
  className?: string;
  size?: string;
}) {
  const rounded = Math.round(rating);

  return (
    <div
      role="img"
      aria-label={`Rated ${rating.toFixed(1)} out of 5 stars`}
      className={`flex items-center gap-0.5 text-gold ${className}`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon key={star} filled={star <= rounded} className={size} />
      ))}
    </div>
  );
}

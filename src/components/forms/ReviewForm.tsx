"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

export default function ReviewForm({ productSlug }: { productSlug: string }) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (rating < 1) {
      setError("Choose a rating.");
      return;
    }
    if (!comment.trim()) {
      setError("Enter a comment.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: productSlug, rating, comment }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Something went wrong.");
        setIsSubmitting(false);
        return;
      }

      setComment("");
      setRating(0);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 flex flex-col gap-4 border-t border-beige pt-8"
    >
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.15em] text-espresso">
          Your Rating
        </label>
        <div className="mt-2 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => {
            const value = i + 1;
            return (
              <button
                key={value}
                type="button"
                aria-label={`Rate ${value} out of 5`}
                onClick={() => setRating(value)}
              >
                <Star
                  size={22}
                  className={
                    value <= rating ? "fill-gold text-gold" : "text-beige"
                  }
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="comment"
          className="text-xs font-semibold uppercase tracking-[0.15em] text-espresso"
        >
          Your Review
        </label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border border-beige bg-ivory px-4 py-3 text-sm text-espresso placeholder:text-stone/60 focus:border-gold focus:outline-none"
          placeholder="Share your thoughts on this piece..."
        />
      </div>

      {error && (
        <p className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-fit items-center justify-center gap-2 bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-ivory transition-colors duration-200 hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Posting..." : "Post Review"}
      </button>
    </form>
  );
}

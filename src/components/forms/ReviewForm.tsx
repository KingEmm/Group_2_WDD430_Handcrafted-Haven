"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { StarIcon } from "@/components/ui/icons";

export default function ReviewForm({ productSlug }: { productSlug: string }) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (rating < 1) {
      setError("Please select a star rating.");
      return;
    }

    if (!body.trim()) {
      setError("Please add a few words about your experience.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: productSlug, rating, body }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }

      setBody("");
      setRating(0);
      setHover(0);
      setSuccess(true);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-xl" noValidate>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-espresso">
        Your rating
      </p>
      <div className="mt-2 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => {
              setRating(star);
              setSuccess(false);
            }}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            aria-pressed={rating === star}
            className="rounded-sm p-0.5 text-gold transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <StarIcon filled={star <= (hover || rating)} className="h-7 w-7" />
          </button>
        ))}
      </div>

      <label
        htmlFor="review-body"
        className="mt-6 block text-xs font-semibold uppercase tracking-[0.15em] text-espresso"
      >
        Your review
      </label>
      <textarea
        id="review-body"
        rows={4}
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
          setSuccess(false);
        }}
        placeholder="What did you think of this piece?"
        className="mt-2 w-full border border-beige bg-ivory px-4 py-3 text-sm text-espresso placeholder:text-stone/60 focus:border-gold focus:outline-none"
        aria-invalid={Boolean(error)}
      />

      {error && (
        <p className="mt-3 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
      {success && (
        <p className="mt-3 text-sm text-pine" role="status">
          Thank you — your review has been posted.
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 inline-flex items-center justify-center gap-2 bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-ivory transition-colors duration-200 hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Posting..." : "Post Review"}
      </button>
    </form>
  );
}

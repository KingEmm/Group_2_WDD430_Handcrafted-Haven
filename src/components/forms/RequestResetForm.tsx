"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";

export default function RequestResetForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-sm text-center">
        <p className="text-sm text-stone">
          If an account exists for{" "}
          <strong className="text-espresso">{email}</strong>, we&apos;ve sent
          a link to reset your password.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-sm flex-col gap-6"
      noValidate
    >
      <Input
        label="Email"
        id="email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error ?? undefined}
        placeholder="you@example.com"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-ivory transition-colors duration-200 hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send Reset Link"}
      </button>

      <p className="text-center text-sm text-stone">
        Remembered your password?{" "}
        <Link href="/login" className="font-semibold text-gold hover:text-gold-dark">
          Sign in
        </Link>
      </p>
    </form>
  );
}

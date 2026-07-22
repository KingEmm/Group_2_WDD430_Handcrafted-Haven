"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";

type FormErrors = {
  email?: string;
  password?: string;
};

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};

    if (!email) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // TODO: wire up to real authentication once the backend is in place.
    setIsSubmitting(true);
    console.log("Login submitted", { email });
    setTimeout(() => setIsSubmitting(false), 800);
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
        error={errors.email}
        placeholder="you@example.com"
      />

      <Input
        label="Password"
        id="password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        placeholder="Enter your password"
      />

      <div className="flex items-center justify-between text-xs">
        <label className="flex items-center gap-2 text-stone">
          <input
            type="checkbox"
            className="h-3.5 w-3.5 border-beige text-gold focus:ring-gold"
          />
          Remember me
        </label>
        <Link href="/reset-password" className="font-semibold text-gold hover:text-gold-dark">
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-ivory transition-colors duration-200 hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </button>

      <p className="text-center text-sm text-stone">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-gold hover:text-gold-dark">
          Create one
        </Link>
      </p>
    </form>
  );
}

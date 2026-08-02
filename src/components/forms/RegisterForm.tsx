"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  form?: string;
};

export default function RegisterForm({
  initialRole = "customer",
}: {
  initialRole?: "customer" | "seller";
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"customer" | "seller">(initialRole);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};

    if (!name.trim()) {
      nextErrors.name = "Name is required.";
    }

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

    if (confirmPassword !== password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ form: data.error ?? "Something went wrong." });
        setIsSubmitting(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-sm flex-col gap-6"
      noValidate
    >
      <Input
        label="Full Name"
        id="name"
        type="text"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
        placeholder="Jane Doe"
      />

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
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        placeholder="At least 6 characters"
      />

      <Input
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
        placeholder="Re-enter your password"
      />

      <fieldset className="flex flex-col gap-2">
        <legend className="text-xs font-semibold uppercase tracking-[0.15em] text-espresso">
          I am joining as a
        </legend>
        <div className="flex gap-4 text-sm text-stone">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="customer"
              checked={role === "customer"}
              onChange={() => setRole("customer")}
              className="h-3.5 w-3.5 border-beige text-gold focus:ring-gold"
            />
            Customer
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="seller"
              checked={role === "seller"}
              onChange={() => setRole("seller")}
              className="h-3.5 w-3.5 border-beige text-gold focus:ring-gold"
            />
            Artisan / Seller
          </label>
        </div>
      </fieldset>

      {errors.form && (
        <p className="text-sm text-red-500" role="alert">
          {errors.form}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-ivory transition-colors duration-200 hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Creating account..." : "Create Account"}
      </button>

      <p className="text-center text-sm text-stone">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-gold hover:text-gold-dark">
          Sign in
        </Link>
      </p>
    </form>
  );
}

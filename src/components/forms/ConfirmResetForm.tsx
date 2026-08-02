"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";

type FormErrors = {
  password?: string;
  confirmPassword?: string;
  form?: string;
};

export default function ConfirmResetForm({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};

    if (!password || password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    if (confirmPassword !== password) {
      nextErrors.confirmPassword = "Passwords don't match.";
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
      const response = await fetch("/api/auth/reset-password/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
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
        label="New Password"
        id="password"
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        placeholder="Enter a new password"
      />

      <Input
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
        placeholder="Re-enter your new password"
      />

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
        {isSubmitting ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}

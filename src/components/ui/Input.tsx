import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  error?: string;
};

export default function Input({ label, id, error, className = "", ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-[0.15em] text-espresso"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        className={`w-full border border-beige bg-ivory px-4 py-3 text-sm text-espresso placeholder:text-stone/60 focus:border-gold focus:outline-none ${
          error ? "border-red-400" : ""
        } ${className}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

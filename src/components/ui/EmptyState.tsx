import type { ReactNode } from "react";

export default function EmptyState({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`border border-beige py-24 text-center ${className}`}>
      <p className="font-[family-name:var(--font-heading)] text-2xl text-espresso">
        {title}
      </p>
      {/* div (not p) so callers can pass block content — CTA, list — without invalid nested HTML */}
      <div className="mx-auto mt-3 max-w-sm text-sm text-stone">{children}</div>
    </div>
  );
}

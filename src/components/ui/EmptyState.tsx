import type { ReactNode } from "react";

export default function EmptyState({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border border-beige py-24 text-center">
      <p className="font-[family-name:var(--font-heading)] text-2xl text-espresso">
        {title}
      </p>
      <p className="mx-auto mt-3 max-w-sm text-sm text-stone">{children}</p>
    </div>
  );
}

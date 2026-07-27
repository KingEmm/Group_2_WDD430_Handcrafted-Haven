import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import type { CategorySlug } from "@/types";

const filters: { slug: CategorySlug | null; label: string }[] = [
  { slug: null, label: "All" },
  ...CATEGORIES.map((c) => ({ slug: c.slug, label: c.name })),
];

export default function CategoryFilter({
  active,
}: {
  active: CategorySlug | null;
}) {
  return (
    <nav aria-label="Filter by category">
      <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
        {filters.map(({ slug, label }) => {
          const isActive = slug === active;
          return (
            <li key={slug ?? "all"}>
              <Link
                href={slug ? `/collection?category=${slug}` : "/collection"}
                aria-current={isActive ? "page" : undefined}
                className={`border-b pb-1 text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
                  isActive
                    ? "border-gold text-espresso"
                    : "border-transparent text-stone hover:text-espresso"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

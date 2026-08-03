import Link from "next/link";

export type FilterOption = { slug: string | null; label: string };

// Shared primitive behind CategoryFilter and PriceFilter: a row of links where
// the active one is underlined. Each concrete filter supplies its options and
// an href builder for its slice of the collection query.
export default function FilterNav({
  ariaLabel,
  options,
  active,
  hrefFor,
  className = "",
  linkClassName = "",
}: {
  ariaLabel: string;
  options: FilterOption[];
  active: string | null;
  hrefFor: (slug: string | null) => string;
  className?: string;
  linkClassName?: string;
}) {
  return (
    <nav aria-label={ariaLabel}>
      <ul className={`flex flex-wrap items-center gap-y-3 ${className}`}>
        {options.map(({ slug, label }) => {
          const isActive = slug === active;
          return (
            <li key={slug ?? "all"}>
              <Link
                href={hrefFor(slug)}
                aria-current={isActive ? "page" : undefined}
                className={`border-b pb-1 transition-colors ${linkClassName} ${
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

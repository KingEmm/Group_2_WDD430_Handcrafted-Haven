import Link from "next/link";
import { PRICE_BANDS, collectionHref } from "@/lib/filters";
import type { CategorySlug } from "@/types";

const filters: { slug: string | null; label: string }[] = [
  { slug: null, label: "Any price" },
  ...PRICE_BANDS.map((band) => ({ slug: band.slug, label: band.label })),
];

export default function PriceFilter({
  active,
  category = null,
}: {
  active: string | null;
  category?: CategorySlug | null;
}) {
  return (
    <nav aria-label="Filter by price">
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
        {filters.map(({ slug, label }) => {
          const isActive = slug === active;
          return (
            <li key={slug ?? "any"}>
              <Link
                href={collectionHref({ category, price: slug })}
                aria-current={isActive ? "page" : undefined}
                className={`border-b pb-1 text-xs font-medium tracking-[0.1em] transition-colors ${
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

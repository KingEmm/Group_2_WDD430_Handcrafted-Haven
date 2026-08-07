import { CATEGORIES } from "@/data/categories";
import { collectionHref } from "@/lib/filters";
import type { CategorySlug } from "@/types";
import FilterNav, { type FilterOption } from "./FilterNav";

const options: FilterOption[] = [
  { slug: null, label: "All" },
  ...CATEGORIES.map((c) => ({ slug: c.slug, label: c.name })),
];

export default function CategoryFilter({
  active,
  price = null,
}: {
  active: CategorySlug | null;
  price?: string | null;
}) {
  return (
    <FilterNav
      ariaLabel="Filter by category"
      options={options}
      active={active}
      hrefFor={(slug) => collectionHref({ category: slug, price })}
      className="gap-x-7"
      linkClassName="text-xs font-semibold uppercase tracking-[0.15em]"
    />
  );
}

import { PRICE_BANDS, collectionHref } from "@/lib/filters";
import type { CategorySlug } from "@/types";
import FilterNav, { type FilterOption } from "./FilterNav";

const options: FilterOption[] = [
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
    <FilterNav
      ariaLabel="Filter by price"
      options={options}
      active={active}
      hrefFor={(slug) => collectionHref({ category, price: slug })}
      className="gap-x-6"
      linkClassName="text-xs font-medium tracking-[0.1em]"
    />
  );
}

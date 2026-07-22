import Link from "next/link";
import Container from "@/components/ui/Container";
import CategoryCard from "./CategoryCard";
import { CATEGORIES } from "@/data/categories";
import { ArrowRightIcon } from "@/components/ui/icons";

export default function CollectionShowcase() {
  return (
    <section className="bg-ivory">
      <Container className="grid gap-10 py-16 lg:grid-cols-[1fr_2.4fr] lg:gap-14 lg:py-24">
        <div className="lg:max-w-xs">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Our Collection
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-4xl leading-tight sm:text-5xl">
            Pieces with a Story
          </h2>
          <p className="mt-5 text-base leading-relaxed text-stone">
            Furniture, ceramics, textiles and more — crafted to bring meaning
            and beauty into your life.
          </p>
          <Link
            href="/collection"
            className="group mt-6 inline-flex items-center gap-2 border-b border-gold pb-1 text-xs font-semibold uppercase tracking-[0.15em] text-espresso"
          >
            Shop All
            <ArrowRightIcon className="h-4 w-4 text-gold transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}

import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/types";
import { ArrowRightIcon } from "@/components/ui/icons";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={category.href}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      <div className="flex items-center gap-4 border border-beige p-3 sm:hidden">
        <div className="relative h-20 w-24 shrink-0 overflow-hidden">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-espresso">
            {category.name}
          </h3>
          <p className="mt-1 text-sm text-stone">{category.description}</p>
        </div>
        <ArrowRightIcon className="h-5 w-5 shrink-0 text-espresso" />
      </div>

      <div className="relative hidden sm:block">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(min-width: 1280px) 20vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex items-center justify-between bg-pine px-4 py-3 text-ivory">
          <span className="text-xs font-semibold uppercase tracking-[0.15em]">
            {category.name}
          </span>
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

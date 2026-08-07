import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";

export default function CraftHero() {
  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden bg-[#14110F]">
      {/* Background Image */}
      <Image
        src="/images/craftsmanship/hero-weaving.png"
        alt="Artisan weaving on a traditional loom"
        fill
        priority
        className="object-cover object-right"
      />

      {/* Dark Overlay — anchors text legibility on the left without washing
          out the photo on the right. */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#14110F]/90 via-[#14110F]/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl items-center px-6">
        <div className="max-w-2xl">

          {/* <span className="inline-block rounded-full border border-[#B88A4A]/40 bg-[#B88A4A]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#D8B27A]">
            Crafted by Human Hands
          </span> */}

          <h1 className="mt-8 font-serif text-5xl leading-tight text-white md:text-7xl">
            Crafted by
            <br />
            Human Hands.
          </h1>

          <div className="mt-8 h-px w-28 bg-[#B88A4A]" />

          <p className="mt-8 max-w-xl text-lg leading-8 text-gray-300 md:text-xl">
            Every handmade piece carries the patience, skill, and passion
            of its maker. Discover the stories, traditions, and techniques
            behind every creation.
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">

            <Link
              href="/collection"
              className="group inline-flex items-center justify-center gap-3 rounded-lg bg-[#B88A4A] px-8 py-4 text-base font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-[#A6783F]"
            >
              Explore Products

              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/artisans"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/10 px-8 py-4 text-base font-medium text-white transition-all duration-300 hover:border-[#B88A4A] hover:bg-white/20"
            >
              Meet the Artisans
            </Link>

          </div>

          {/* Stats */}
          {/* <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">

            <div>
              <h3 className="text-3xl font-semibold text-[#D8B27A]">
                250+
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Skilled Artisans
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-semibold text-[#D8B27A]">
                15+
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Craft Traditions
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-semibold text-[#D8B27A]">
                100%
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Handmade
              </p>
            </div>

          </div> */}

        </div>
      </div>

      {/* Bottom Fade — subtle blend into the cream section below. */}
      <div className="absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-[#FCFAF7] to-transparent" />
    </section>
  );
}
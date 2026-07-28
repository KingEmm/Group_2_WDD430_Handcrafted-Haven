import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#14110F]/95 via-[#14110F]/75 to-transparent" />

      {/* Decorative Glow */}
      <div className="absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#B88A4A]/10 blur-3xl" />

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
              href="/shop"
              className="group inline-flex items-center justify-center gap-3 rounded-lg bg-[#B88A4A] px-8 py-4 text-base font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-[#A6783F]"
            >
              Explore Products

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/artisans"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-[#B88A4A] hover:bg-white/10"
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

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-[#FCFAF7] to-transparent" />
    </section>
  );
}
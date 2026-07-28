// components/about/Hero.tsx

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#F6F2EC]">
      <div className="mx-auto grid min-h-[85vh] max-w-7xl grid-cols-1 overflow-hidden lg:grid-cols-2">

        {/* Left Content */}
        <div className="flex items-center px-6 py-20 sm:px-10 lg:px-16">
          <div className="max-w-xl">

            <p className="mb-5 font-semibold uppercase tracking-[0.25em] text-[#B88A4A]">
              About Us
            </p>

            <h1 className="font-serif text-5xl leading-tight text-[#2C241F] md:text-6xl lg:text-7xl">
              Crafted by hand.
              <br />
              Made to last.
            </h1>

            <div className="mt-8 h-1 w-20 rounded-full bg-[#B88A4A]" />

            <p className="mt-8 text-lg leading-8 text-[#766B63]">
              Artisané is more than a marketplace—it's a celebration of
              craftsmanship, heritage, and timeless design. We connect talented
              artisans with people who value authenticity, quality, and the
              stories behind every handmade creation.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <Link
                href="/collection"
                className="group inline-flex items-center gap-3 rounded-md bg-[#B88A4A] px-8 py-4 font-medium text-white transition-all duration-300 hover:bg-[#a6783f]"
              >
                Explore Collection

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>

              <Link
                href="/artisans"
                className="inline-flex items-center rounded-md border border-[#B88A4A] px-8 py-4 font-medium text-[#2C241F] transition duration-300 hover:bg-[#B88A4A] hover:text-white"
              >
                Meet Our Artisans
              </Link>

            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative min-h-[550px]">

          <Image
            src="/images/about/potter-hero.jpg"
            alt="Artisan shaping a ceramic bowl"
            fill
            priority
            className="object-cover object-right"
          />

          {/* Soft Fade */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F6F2EC] via-[#F6F2EC]/20 to-transparent lg:hidden" />

        </div>

      </div>
    </section>
  );
}
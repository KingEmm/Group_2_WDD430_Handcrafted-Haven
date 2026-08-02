// components/about/CTA.tsx

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#14110F] py-28">
      {/* Background Glow */}
      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-[#B88A4A]/10 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#B88A4A]/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="rounded-3xl border border-[#2F2A28] bg-[#1C1917]/80 p-12 backdrop-blur-sm md:p-20">

          <div className="mx-auto max-w-3xl text-center">

            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#B88A4A]/15">
                <Sparkles className="h-8 w-8 text-[#B88A4A]" />
              </div>
            </div>

            <p className="uppercase tracking-[0.35em] text-sm font-semibold text-[#B88A4A]">
              Start Your Journey
            </p>

            <h2 className="mt-6 font-serif text-4xl leading-tight text-white md:text-6xl">
              Bring timeless craftsmanship
              <br />
              into your everyday life.
            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-300">
              Every purchase supports talented artisans, preserves
              traditional craftsmanship, and helps handmade creativity
              thrive for future generations.
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">

              <Link
                href="/collection"
                className="group inline-flex items-center gap-3 rounded-lg bg-[#B88A4A] px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-[#A6783F]"
              >
                Explore Collection

                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/seller/register"
                className="rounded-lg border border-[#B88A4A] px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:bg-[#B88A4A]"
              >
                Become a Seller
              </Link>

            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-10 text-sm text-gray-400">

              <div>
                <span className="font-semibold text-[#B88A4A]">✔</span>{" "}
                Secure Shopping
              </div>

              <div>
                <span className="font-semibold text-[#B88A4A]">✔</span>{" "}
                Handmade Products
              </div>

              <div>
                <span className="font-semibold text-[#B88A4A]">✔</span>{" "}
                Worldwide Delivery
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
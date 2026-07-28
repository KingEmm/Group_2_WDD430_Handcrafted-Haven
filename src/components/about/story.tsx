import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Story() {
  return (
    <section className="bg-[#F6F2EC] py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

        {/* Image */}

        <div className="relative overflow-hidden rounded-2xl shadow-xl">

          <Image
            src="/images/about/ceramics.jpg"
            alt="Handcrafted ceramic collection"
            width={800}
            height={700}
            className="h-full w-full object-cover transition duration-700 hover:scale-105"
          />

        </div>

        {/* Content */}

        <div>

          <p className="mb-4 uppercase tracking-[0.35em] text-sm font-semibold text-[#B88A4A]">
            Our Story
          </p>

          <h2 className="font-serif text-5xl leading-tight text-[#2C241F]">
            Rooted in tradition.
            <br />
            Inspired by life.
          </h2>

          <div className="mt-6 h-1 w-20 rounded-full bg-[#B88A4A]" />

          <p className="mt-8 leading-8 text-[#766B63]">
            Artisané began with a simple belief that handmade creations
            deserve to be celebrated. Every handcrafted product carries
            the dedication, patience and creativity of the artisan behind it.
          </p>

          <p className="mt-6 leading-8 text-[#766B63]">
            Our marketplace bridges the gap between talented local
            craftsmen and customers seeking meaningful products.
            Rather than mass production, we value authenticity,
            sustainable practices and timeless design.
          </p>

          <p className="mt-6 leading-8 text-[#766B63]">
            Today, we proudly partner with artisans across different
            communities, giving their craftsmanship a global audience
            while preserving the cultural heritage behind every piece.
          </p>

          <Link
            href="/artisans"
            className="group mt-10 inline-flex items-center gap-3 border-b border-[#B88A4A] pb-2 font-medium text-[#2C241F]"
          >
            Meet Our Artisans

            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-2"
            />
          </Link>

        </div>

      </div>
    </section>
  );
}
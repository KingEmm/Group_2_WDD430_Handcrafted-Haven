import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function MadeWithHeart() {
  return (
    <section className="bg-[#FCFAF7] py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">

        {/* Content */}

        <div>

          <p className="mb-4 uppercase tracking-[0.35em] text-sm font-semibold text-[#B88A4A]">
            Handmade With Passion
          </p>

          <h2 className="font-serif text-5xl leading-tight text-[#2C241F]">
            Every Thread.
            <br />
            Every Detail.
            <br />
            Every Story.
          </h2>

          <div className="mt-6 h-1 w-20 rounded-full bg-[#B88A4A]" />

          <p className="mt-8 leading-8 text-[#766B63]">
            Behind every handcrafted piece is a person who has dedicated
            years to perfecting their craft. Every stitch, carving,
            weave and brushstroke reflects patience, creativity and
            tradition.
          </p>

          <p className="mt-6 leading-8 text-[#766B63]">
            We believe handmade products carry a story that factory-made
            goods simply cannot replicate. By choosing Artisané, you're
            supporting independent makers and helping preserve timeless
            craftsmanship for future generations.
          </p>

          <Link
            href="/collection"
            className="group mt-10 inline-flex items-center gap-3 rounded-md bg-[#B88A4A] px-8 py-4 font-medium text-white transition hover:bg-[#A6783F]"
          >
            Shop Handmade Products

            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />
          </Link>

        </div>

        {/* Image */}

        <div className="relative overflow-hidden rounded-2xl shadow-2xl">

          <Image
            src="/images/about/weaving.jpg"
            alt="Artisan weaving fabric"
            width={700}
            height={850}
            className="h-full w-full object-cover transition duration-700 hover:scale-105"
          />

        </div>

      </div>
    </section>
  );
}
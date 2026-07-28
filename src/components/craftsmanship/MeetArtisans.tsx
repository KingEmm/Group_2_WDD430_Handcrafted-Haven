import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const artisans = [
  {
    name: "John D'Souza",
    craft: "Master Potter",
    experience: "25 Years Experience",
    image: "/images/craftsmanship/philosophy.jpg",
  },
  {
    name: "Mei Lin",
    craft: "Textile Weaver",
    experience: "18 Years Experience",
    image: "/images/about/weaving.jpg",
  },
  {
    name: "Arjun Singh",
    craft: "Wood Carver",
    experience: "20 Years Experience",
    image: "/images/craftsmanship/artisans/woodcarver.jpg",
  },
  {
    name: "Isabella Tan",
    craft: "Jewelry Artisan",
    experience: "12 Years Experience",
    image: "/images/craftsmanship/artisans/jewelry.jpg",
  },
];

export default function MeetArtisans() {
  return (
    <section className="bg-[#FCFAF7] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-16 lg:grid-cols-[340px_1fr]">

          {/* Left Content */}

          <div>

            <p className="uppercase tracking-[0.35em] text-sm font-semibold text-[#B88A4A]">
              Meet The Makers
            </p>

            <h2 className="mt-4 font-serif text-5xl leading-tight text-[#2C241F]">
              The hands
              <br />
              behind every
              <br />
              masterpiece.
            </h2>

            <div className="mt-6 h-1 w-20 rounded-full bg-[#B88A4A]" />

            <p className="mt-8 leading-8 text-[#766B63]">
              Every handcrafted product begins with an artisan who has
              spent years mastering their craft. Meet the talented people
              preserving traditions while creating timeless pieces for
              modern living.
            </p>

            <Link
              href="/artisans"
              className="group mt-10 inline-flex items-center gap-3 text-[#B88A4A] font-medium"
            >
              View All Artisans

              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>

          </div>

          {/* Cards */}

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">

            {artisans.map((artisan) => (
              <article
                key={artisan.name}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                <div className="relative h-72 overflow-hidden">

                  <Image
                    src={artisan.image}
                    alt={artisan.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                </div>

                <div className="p-6">

                  <h3 className="text-xl font-semibold text-[#2C241F]">
                    {artisan.name}
                  </h3>

                  <p className="mt-2 text-[#B88A4A]">
                    {artisan.craft}
                  </p>

                  <p className="mt-3 text-sm text-[#766B63]">
                    {artisan.experience}
                  </p>

                  <Link
                    href={`/artisans/${artisan.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#2C241F]"
                  >
                    Read Story

                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </Link>

                </div>

              </article>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}
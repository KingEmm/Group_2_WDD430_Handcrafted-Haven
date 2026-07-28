import Image from "next/image";

export default function Philosophy() {
  return (
    <section className="bg-[#FCFAF7] py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">

        {/* Content */}

        <div>

          <p className="mb-4 uppercase tracking-[0.35em] text-sm font-semibold text-[#B88A4A]">
            Our Philosophy
          </p>

          <h2 className="font-serif text-5xl leading-tight text-[#2C241F]">
            Crafted with purpose.
            <br />
            Made to last.
          </h2>

          <div className="mt-6 h-1 w-20 rounded-full bg-[#B88A4A]" />

          <p className="mt-8 text-lg leading-8 text-[#766B63]">
            We believe true craftsmanship isn't measured by speed but by
            patience. Every stitch, carve, weave, and glaze reflects years
            of dedication, tradition, and mastery passed from one
            generation to the next.
          </p>

          <p className="mt-6 text-lg leading-8 text-[#766B63]">
            Our artisans carefully select sustainable materials and use
            time-honored techniques to create products that are not only
            beautiful but built to endure everyday life.
          </p>

          <p className="mt-6 text-lg leading-8 text-[#766B63]">
            Every handcrafted piece tells a unique story—one that connects
            the maker, the material, and the person who brings it home.
          </p>

          {/* Highlights */}

          <div className="mt-12 grid grid-cols-2 gap-8">

            <div>
              <h3 className="text-3xl font-semibold text-[#2C241F]">
                100%
              </h3>

              <p className="mt-2 text-[#766B63]">
                Handmade Products
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-semibold text-[#2C241F]">
                Eco
              </h3>

              <p className="mt-2 text-[#766B63]">
                Sustainable Materials
              </p>
            </div>

          </div>

        </div>

        {/* Image */}

        <div className="relative overflow-hidden rounded-3xl shadow-2xl">

          <Image
            src="/images/craftsmanship/philosophy.jpg"
            alt="Master artisan shaping pottery"
            width={700}
            height={850}
            className="h-full w-full object-cover transition duration-700 hover:scale-105"
          />

        </div>

      </div>
    </section>
  );
}
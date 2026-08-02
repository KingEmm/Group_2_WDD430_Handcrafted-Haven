import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { getSellersWithProducts } from "@/lib/sellers";

const MEMBER_SINCE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
});

export default async function MeetArtisans() {
  const sellers = await getSellersWithProducts();
  const featured = sellers.slice(0, 4);

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

          {featured.length === 0 ? (
            <div className="flex items-center justify-center rounded-2xl border border-dashed border-[#B88A4A]/30 bg-white p-12 text-center text-[#766B63]">
              No artisans have listed anything yet — check back soon.
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">

              {featured.map((seller) => (
                <article
                  key={seller.id}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >

                  <div className="relative h-72 overflow-hidden">

                    <ImagePlaceholder
                      label={seller.name}
                      className="h-full w-full transition duration-700 group-hover:scale-110"
                    />

                  </div>

                  <div className="p-6">

                    <h3 className="text-xl font-semibold text-[#2C241F]">
                      {seller.name}
                    </h3>

                    <p className="mt-2 text-[#B88A4A]">
                      {seller.productCount}{" "}
                      {seller.productCount === 1 ? "piece" : "pieces"} listed
                    </p>

                    <p className="mt-3 text-sm text-[#766B63]">
                      Member since {MEMBER_SINCE_FORMATTER.format(seller.memberSince)}
                    </p>

                    <Link
                      href={`/artisans/${seller.id}`}
                      className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#2C241F]"
                    >
                      View Storefront

                      <ArrowRight
                        size={16}
                        className="transition group-hover:translate-x-1"
                      />
                    </Link>

                  </div>

                </article>
              ))}

            </div>
          )}

        </div>

      </div>
    </section>
  );
}

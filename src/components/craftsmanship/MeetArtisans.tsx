import Link from "next/link";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { ArrowRightIcon } from "@/components/ui/icons";
import { getSellersWithProducts } from "@/lib/sellers";
import { formatMonthYear } from "@/lib/utils";

export default async function MeetArtisans() {
  const featured = await getSellersWithProducts(4);

  return (
    <section className="bg-[#FCFAF7] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-16 lg:grid-cols-[340px_1fr]">

          {/* Left Content */}

          <div>

            <p className="uppercase tracking-[0.35em] text-sm font-semibold text-gold">
              Meet The Makers
            </p>

            <h2 className="mt-4 font-serif text-5xl leading-tight text-espresso">
              The hands
              <br />
              behind every
              <br />
              masterpiece.
            </h2>

            <div className="mt-6 h-1 w-20 rounded-full bg-gold" />

            <p className="mt-8 leading-8 text-stone">
              Every handcrafted product begins with an artisan who has
              spent years mastering their craft. Meet the talented people
              preserving traditions while creating timeless pieces for
              modern living.
            </p>

            <Link
              href="/artisans"
              className="group mt-10 inline-flex items-center gap-3 text-gold font-medium"
            >
              View All Artisans

              <ArrowRightIcon className="h-[18px] w-[18px] transition group-hover:translate-x-1" />
            </Link>

          </div>

          {/* Cards */}

          {featured.length === 0 ? (
            <div className="flex items-center justify-center rounded-2xl border border-dashed border-gold/30 bg-white p-12 text-center text-stone">
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

                    <h3 className="text-xl font-semibold text-espresso">
                      {seller.name}
                    </h3>

                    <p className="mt-2 text-gold">
                      {seller.productCount}{" "}
                      {seller.productCount === 1 ? "piece" : "pieces"} listed
                    </p>

                    <p className="mt-3 text-sm text-stone">
                      Member since {formatMonthYear(seller.memberSince)}
                    </p>

                    <Link
                      href={`/artisans/${seller.id}`}
                      className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-espresso"
                    >
                      View Storefront

                      <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
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

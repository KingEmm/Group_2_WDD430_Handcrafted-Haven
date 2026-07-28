import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Pottery",
    description: "Hand-thrown ceramics crafted with timeless techniques.",
    image: "/images/products/ceramics.jpg",
    href: `/shop?category=pottery`,
  },
  {
    title: "Woodwork",
    description: "Beautiful furniture and décor carved from premium hardwood.",
    image: "/images/products/furniture.jpg",
    href: "/shop?category=woodwork",
  },
  {
    title: "Textiles",
    description: "Handwoven fabrics made from natural sustainable fibers.",
    image: "/images/products/textiles.jpg",
    href: "/shop?category=textiles",
  },
  {
    title: "Jewelry",
    description: "Elegant handcrafted jewelry made with exceptional attention to detail.",
    image: "/images/craftsmanship/artisans/jewelry.jpg",
    href: "/shop?category=jewelry",
  },
  {
    title: "Leather",
    description: "Premium leather goods that age beautifully over time.",
    image: "/images/products/accessories.jpg",
    href: "/shop?category=leather",
  },
  {
    title: "Painting",
    description: "Original artwork inspired by culture, heritage, and nature.",
    image: "/images/craftsmanship/categories/painting.jpg",
    href: "/shop?category=painting",
  },
];

export default function Categories() {
  return (
    <section className="bg-[#FCFAF7] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <p className="uppercase tracking-[0.35em] text-sm font-semibold text-[#B88A4A]">
            Featured Crafts
          </p>

          <h2 className="mt-4 font-serif text-5xl text-[#2C241F]">
            Discover Every
            <br />
            Craft Tradition.
          </h2>

          <p className="mt-8 text-lg leading-8 text-[#766B63]">
            Browse collections created by skilled artisans across a wide
            range of traditional crafts.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-80 overflow-hidden">

                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute bottom-8 left-8 right-8">

                  <h3 className="font-serif text-3xl text-white">
                    {category.title}
                  </h3>

                  <p className="mt-3 text-gray-200 leading-7">
                    {category.description}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 font-medium text-[#D8B27A]">
                    View Collection

                    <ArrowRight
                      size={18}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>

                </div>

              </div>
            </Link>
          ))}

        </div>

      </div>
    </section>
  );
}
import Image from "next/image";

const materials = [
  {
    title: "Sustainable Wood",
    description:
      "Responsibly sourced hardwood selected for its durability, character, and natural beauty.",
    image: "/images/craftsmanship/materials/wood.jpg",
  },
  {
    title: "Organic Cotton",
    description:
      "Soft, breathable fibers grown with environmentally conscious farming practices.",
    image: "/images/craftsmanship/materials/cotton.jpg",
  },
  {
    title: "Natural Clay",
    description:
      "Rich, natural clay carefully refined to create timeless ceramic pieces.",
    image: "/images/craftsmanship/materials/clay.jpg",
  },
  {
    title: "Bamboo",
    description:
      "A fast-growing renewable material valued for its strength and sustainability.",
    image: "/images/craftsmanship/materials/bamboo.jpg",
  },
];

export default function Materials() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <p className="uppercase tracking-[0.35em] text-sm font-semibold text-[#B88A4A]">
            Materials We Use
          </p>

          <h2 className="mt-4 font-serif text-5xl text-[#2C241F]">
            Rooted in Nature.
            <br />
            Chosen with Care.
          </h2>

          <p className="mt-8 text-lg leading-8 text-[#766B63]">
            Every handcrafted piece begins with carefully selected natural
            materials that balance beauty, durability, and sustainability.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {materials.map((material) => (
            <article
              key={material.title}
              className="group overflow-hidden rounded-2xl border border-[#EEE6DB] bg-[#FCFAF7] transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="relative h-60 overflow-hidden">

                <Image
                  src={material.image}
                  alt={material.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

              </div>

              <div className="p-6">

                <h3 className="text-2xl font-semibold text-[#2C241F]">
                  {material.title}
                </h3>

                <p className="mt-4 leading-7 text-[#766B63]">
                  {material.description}
                </p>

              </div>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
}
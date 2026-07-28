import {
  HandmadeIcon,
  SustainableIcon,
  DurableIcon,
  PurposeIcon,
} from "@/components/ui/icons";
import type { Feature } from "@/types";


const values: Feature[] = [
  {
    title: "Authenticity",
    description:
      "Every piece is handcrafted by skilled artisans using traditional techniques passed down through generations.",
    icon: "handmade",
  },
  {
    title: "Sustainability",
    description:
      "We embrace eco-friendly materials and responsible production practices that respect our planet.",
    icon: "sustainable",
  },
  {
    title: "Quality",
    description:
      "Every product is carefully inspected to ensure exceptional craftsmanship and lasting durability.",
    icon: "durable",
  },
  {
    title: "Community",
    description:
      "We support local artisans by helping them reach customers around the world while preserving their heritage.",
    icon: "purpose",
  },
];

const ICONS = {
  handmade: HandmadeIcon,
  sustainable: SustainableIcon,
  durable: DurableIcon,
  purpose: PurposeIcon,
};


export default function Values() {
  return (
    <section className="bg-[#FCFAF7] py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mb-16 text-center">

          <p className="mb-3 uppercase tracking-[0.35em] text-sm text-[#B88A4A]">
            Our Values
          </p>

          <h2 className="font-serif text-4xl md:text-5xl text-[#2C241F]">
            What We Believe
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[#766B63] leading-8">
            Every handcrafted product tells a story of passion,
            dedication and timeless artistry.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {values.map((value) => {
            const Icon = ICONS[value.icon];

            return (
              <article
                key={value.title}
                className="group rounded-2xl border border-[#DDD3C6] bg-white p-10 text-center transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#F6F2EC] transition duration-300 group-hover:bg-[#B88A4A]">

                  <Icon
                    className="h-9 w-9 text-[#B88A4A] transition duration-300 group-hover:text-white"
                  />

                </div>

                <h3 className="mb-4 font-serif text-2xl text-[#2C241F]">
                  {value.title}
                </h3>

                <p className="leading-8 text-[#766B63]">
                  {value.description}
                </p>

              </article>
            );
          })}

        </div>
      </div>
    </section>
  );
}
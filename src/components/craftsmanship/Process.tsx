import {
  Pencil,
  Leaf,
  Hand,
  Sparkles,
  SearchCheck,
  PackageCheck,
} from "lucide-react";

const steps = [
  {
    icon: Pencil,
    title: "Sketch",
    description:
      "Every masterpiece begins with an idea carefully sketched by the artisan.",
  },
  {
    icon: Leaf,
    title: "Select Materials",
    description:
      "We source sustainable, high-quality natural materials chosen for durability and beauty.",
  },
  {
    icon: Hand,
    title: "Handcrafted",
    description:
      "Each piece is shaped, woven, carved, or stitched entirely by skilled hands.",
  },
  {
    icon: Sparkles,
    title: "Finishing",
    description:
      "Every detail is refined with polishing, glazing, or hand finishing until perfect.",
  },
  {
    icon: SearchCheck,
    title: "Quality Check",
    description:
      "Every product undergoes careful inspection before it reaches your home.",
  },
  {
    icon: PackageCheck,
    title: "Delivered",
    description:
      "Thoughtfully packaged and shipped, ready to become part of your story.",
  },
];

export default function Process() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <p className="uppercase tracking-[0.35em] text-sm font-semibold text-[#B88A4A]">
            The Crafting Process
          </p>

          <h2 className="mt-4 font-serif text-5xl text-[#2C241F]">
            From Our Hands
            <br />
            To Your Home.
          </h2>

          <p className="mt-8 text-lg leading-8 text-[#766B63]">
            Every handcrafted product follows a thoughtful journey—from
            the first sketch to the final quality inspection—ensuring each
            piece reflects exceptional craftsmanship.
          </p>

        </div>

        <div className="relative mt-20">

          {/* Connecting Line */}
          <div className="absolute left-0 right-0 top-12 hidden h-[2px] bg-[#E5DDD2] lg:block" />

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={index}
                  className="group relative text-center"
                >
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-[#E5DDD2] bg-[#FCFAF7] shadow-sm transition duration-300 group-hover:-translate-y-2 group-hover:border-[#B88A4A] group-hover:bg-[#B88A4A]">

                    <Icon
                      size={32}
                      className="text-[#B88A4A] transition group-hover:text-white"
                    />

                  </div>

                  <div className="mx-auto mt-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#B88A4A] text-sm font-semibold text-white">
                    {index + 1}
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-[#2C241F]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#766B63]">
                    {step.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}
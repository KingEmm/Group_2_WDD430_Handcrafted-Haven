import Image from "next/image";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Thompson",
    location: "London, UK",
    image:"https://i.pravatar.cc/300?img=3",
    review:
      "The craftsmanship is beyond anything I've owned before. Every detail tells a story, and you can truly feel the care that went into creating it.",
  },
  {
    name: "Michael Carter",
    location: "Toronto, Canada",
    image: "https://i.pravatar.cc/300?img=1",
    review:
      "Buying handmade has completely changed how I shop. The quality is exceptional, and knowing my purchase supports artisans makes it even more meaningful.",
  },
  {
    name: "Emily Rodriguez",
    location: "Madrid, Spain",
    image: "https://i.pravatar.cc/300?img=6",
    review:
      "Beautifully packaged, beautifully made, and exactly as described. It's rare to find products that feel this personal and authentic.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <p className="uppercase tracking-[0.35em] text-sm font-semibold text-[#B88A4A]">
            Customer Stories
          </p>

          <h2 className="mt-4 font-serif text-5xl text-[#2C241F]">
            Loved by People
            <br />
            Around the World.
          </h2>

          <p className="mt-8 text-lg leading-8 text-[#766B63]">
            Every handcrafted piece becomes part of someone's story.
            Here's what our customers have to say.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {testimonials.map((item) => (
            <article
              key={item.name}
              className="group rounded-3xl border border-[#EEE6DB] bg-[#FCFAF7] p-8 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <Quote
                className="text-[#B88A4A]"
                size={42}
              />

              <div className="mt-6 flex">

                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className="fill-[#B88A4A] text-[#B88A4A]"
                  />
                ))}

              </div>

              <p className="mt-8 leading-8 text-[#766B63]">
                "{item.review}"
              </p>

              <div className="mt-10 flex items-center gap-4">

                <div className="relative h-16 w-16 overflow-hidden rounded-full">

                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />

                </div>

                <div>

                  <h3 className="font-semibold text-[#2C241F]">
                    {item.name}
                  </h3>

                  <p className="text-sm text-[#766B63]">
                    {item.location}
                  </p>

                </div>

              </div>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
}
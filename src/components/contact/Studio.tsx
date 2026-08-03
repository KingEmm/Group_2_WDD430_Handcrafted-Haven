import Image from "next/image";

export default function Studio() {
  return (
    <section className="bg-[#14110F] py-24">
      <div className="container mx-auto px-6">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Image */}

          <div className="relative h-[550px] overflow-hidden rounded-2xl">
            <Image
              src="/images/contact/studio.jpg"
              alt="Artisan workshop"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}

          <div>

            <p className="mb-4 uppercase tracking-[0.35em] text-sm font-semibold text-[#B88A4A]">
              Visit Our Studio
            </p>

            <h2 className="font-serif text-5xl leading-tight text-white">
              Every Masterpiece
              <br />
              Begins With A
              <br />
              Conversation.
            </h2>

            <p className="mt-8 leading-8 text-gray-300">
              Step into the world of Artisané and discover where
              creativity meets craftsmanship. Our workshop is home to
              talented artisans who transform natural materials into
              timeless handmade pieces with passion and precision.
            </p>

            <p className="mt-6 leading-8 text-gray-300">
              Whether you're interested in a custom creation, learning
              about our process, or simply exploring our collection,
              we'd love to welcome you.
            </p>

            <div className="mt-10">

              <div className="mb-6 flex items-center gap-4">

                <div className="h-3 w-3 rounded-full bg-[#B88A4A]" />

                <span className="text-gray-300">
                  Handmade with Care
                </span>

              </div>

              <div className="mb-6 flex items-center gap-4">

                <div className="h-3 w-3 rounded-full bg-[#B88A4A]" />

                <span className="text-gray-300">
                  Sustainable Materials
                </span>

              </div>

              <div className="flex items-center gap-4">

                <div className="h-3 w-3 rounded-full bg-[#B88A4A]" />

                <span className="text-gray-300">
                  Supporting Local Artisans
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
export default function Impact() {
  const stats = [
    {
      value: "250+",
      label: "Artisans",
      description: "Skilled makers from different communities.",
    },
    {
      value: "15+",
      label: "Countries",
      description: "Customers receiving handcrafted products worldwide.",
    },
    {
      value: "100%",
      label: "Handcrafted",
      description: "Every product is carefully made by hand.",
    },
    {
      value: "10K+",
      label: "Happy Customers",
      description: "People supporting handmade craftsmanship.",
    },
  ];

  return (
    <section className="bg-[#14110F] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <p className="mb-3 uppercase tracking-[0.35em] text-sm text-[#B88A4A]">
            Our Impact
          </p>

          <h2 className="font-serif text-5xl text-white">
            Crafting More Than Products
          </h2>

          <p className="mx-auto mt-6 max-w-3xl leading-8 text-gray-300">
            Every purchase supports independent artisans, preserves
            traditional craftsmanship, and helps build sustainable
            communities around the world.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#2F2A28] bg-[#1C1917] p-10 text-center transition duration-300 hover:-translate-y-2 hover:border-[#B88A4A]"
            >
              <h3 className="font-serif text-5xl text-[#B88A4A]">
                {stat.value}
              </h3>

              <h4 className="mt-4 text-xl font-semibold text-white">
                {stat.label}
              </h4>

              <p className="mt-4 leading-7 text-gray-400">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
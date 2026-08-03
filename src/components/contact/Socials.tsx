import Image from "next/image";
import Link from "next/link";

const socials = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: "https://cdn.simpleicons.org/instagram/FFFFFF",
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: "https://cdn.simpleicons.org/facebook/FFFFFF",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: "https://cdn.simpleicons.org/linkedin/FFFFFF",
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: "https://cdn.simpleicons.org/youtube/FFFFFF",
  },
];

export default function Socials() {
  return (
    <section className="bg-[#14110F] py-24">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B88A4A]">
            Follow Our Journey
          </p>

          <h2 className="mt-4 font-serif text-4xl text-white md:text-5xl">
            Stay Connected
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Discover new collections, meet our artisans, and follow the stories
            behind every handcrafted creation.
          </p>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8">
          {socials.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              className="group flex w-44 flex-col items-center rounded-2xl border border-[#2E2926] bg-[#1D1917] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#B88A4A]"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2B2521] transition-colors duration-300 group-hover:bg-[#B88A4A]">
                <Image
                  src={social.icon}
                  alt={social.name}
                  width={28}
                  height={28}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <span className="mt-6 text-lg font-medium text-white">
                {social.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
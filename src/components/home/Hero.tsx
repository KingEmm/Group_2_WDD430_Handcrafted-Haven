import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";

export default function Hero() {
  return (
    <section className="bg-charcoal text-ivory">
      <Container className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-14 lg:py-24">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Crafted by hand. Made to last.
          </p>
          <h1 className="mt-6 font-[family-name:var(--font-heading)] text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            Handmade.
            <br />
            Timeless.
            <br />
            Authentic.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/70">
            We celebrate the beauty of traditional craftsmanship and the
            stories behind every piece.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href="/collection" variant="primary">
              Explore Collection
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
            <Button href="/about" variant="outline-light">
              Our Story
            </Button>
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden lg:aspect-square">
          <Image
            src="/images/hero/hero.jpg"
            alt="Artisan shaping clay on a pottery wheel"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}

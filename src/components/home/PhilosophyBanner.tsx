import Container from "@/components/ui/Container";

export default function PhilosophyBanner() {
  return (
    <section className="bg-pine text-ivory">
      <Container className="py-16 text-center lg:py-20">
        <blockquote className="mx-auto max-w-3xl font-[family-name:var(--font-heading)] text-3xl italic leading-snug sm:text-4xl">
          “Craft is not just what we do, it&rsquo;s who we are.”
        </blockquote>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          — Our Philosophy
        </p>
      </Container>
    </section>
  );
}

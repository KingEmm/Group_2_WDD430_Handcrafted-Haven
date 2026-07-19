import Container from "@/components/ui/Container";
import type { Feature } from "@/types";
import {
  HandmadeIcon,
  SustainableIcon,
  DurableIcon,
  PurposeIcon,
} from "@/components/ui/icons";

const FEATURES: Feature[] = [
  {
    icon: "handmade",
    title: "Handmade",
    description: "Every piece is carefully crafted by skilled artisans.",
  },
  {
    icon: "sustainable",
    title: "Sustainable",
    description: "We use natural materials and eco-friendly practices.",
  },
  {
    icon: "durable",
    title: "Built to Last",
    description: "Timeless designs made with quality and care.",
  },
  {
    icon: "purpose",
    title: "Made with Purpose",
    description: "Supporting local artisans and preserving traditions.",
  },
];

const ICONS = {
  handmade: HandmadeIcon,
  sustainable: SustainableIcon,
  durable: DurableIcon,
  purpose: PurposeIcon,
};

export default function FeatureHighlights() {
  return (
    <section className="border-b border-beige bg-ivory">
      <Container className="py-14">
        <ul className="grid grid-cols-2 gap-y-10 sm:gap-x-8 lg:grid-cols-4 lg:divide-x lg:divide-beige">
          {FEATURES.map((feature) => {
            const Icon = ICONS[feature.icon];
            return (
              <li
                key={feature.title}
                className="flex flex-col items-center px-4 text-center lg:flex-row lg:items-start lg:gap-4 lg:text-left"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <Icon className="h-6 w-6" />
                </span>
                <div className="mt-4 lg:mt-0">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-espresso">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone">
                    {feature.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

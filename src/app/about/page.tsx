import Container from "@/components/ui/Container";
import Hero from "@/components/about/AboutHero";
import Values from "@/components/about/Values";
import Story from "@/components/about/story";
import Impact from "@/components/about/impact";
import MadeWithHeart from "@/components/about/MadeWithHeart";
import CTA from "@/components/about/CTA";

export default function AboutPage() {
  return (
    <Container className="py-6 text-center">
      <Hero />
      <Values />
      <Story />
      <Impact />
      <MadeWithHeart />
      <CTA />
    </Container>
  );
}

//     </Container>
//   );
// }

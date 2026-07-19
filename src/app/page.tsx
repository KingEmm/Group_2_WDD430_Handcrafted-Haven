import Hero from "@/components/home/Hero";
import FeatureHighlights from "@/components/home/FeatureHighlights";
import CollectionShowcase from "@/components/home/CollectionShowcase";
import PhilosophyBanner from "@/components/home/PhilosophyBanner";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureHighlights />
      <CollectionShowcase />
      <PhilosophyBanner />
      <Newsletter />
    </>
  );
}

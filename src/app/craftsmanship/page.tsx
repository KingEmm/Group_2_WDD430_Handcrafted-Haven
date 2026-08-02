import CraftHero from "@/components/craftsmanship/CraftHero";
import Philosophy from "@/components/craftsmanship/Philosophy";
import Process from "@/components/craftsmanship/Process";
import MeetArtisans from "@/components/craftsmanship/MeetArtisans";
import Materials from "@/components/craftsmanship/Materials";
import Categories from "@/components/craftsmanship/Categories";
import CTA from "@/components/about/CTA";
import Testimonials from "@/components/craftsmanship/Testimonials";
import "@/styles/swiper.css";


export default function CraftsmanshipPage() {
  return (
    <>
      <CraftHero />
      <Philosophy />
      <Process />
      <MeetArtisans />
      <Materials />
      <Categories />
      <Testimonials />
      <CTA />
    </>
  );
}

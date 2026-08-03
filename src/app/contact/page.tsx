import Container from "@/components/ui/Container";
// import Hero from "@/components/contact/Hero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import Studio from "@/components/contact/Studio";
import FAQ from "@/components/contact/FAQ";
import Socials from "@/components/contact/Socials";
// import CTA from "@/components/contact/CTA";


export default function ContactPage() {
  return (
    <Container className="py-24 text-center">
      <h1>hi</h1>
      {/* <Hero /> */}
      <section className="bg-[#FCFAF7] py-24">
        <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-2">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
    
      <Studio />
      <FAQ />
      <Socials />
      {/* <CTA /> */}
    </Container>
  );
}

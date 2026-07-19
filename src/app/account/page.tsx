import Container from "@/components/ui/Container";

export default function AccountPage() {
  return (
    <Container className="py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
        Account
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-heading)] text-5xl">
        My Account
      </h1>
      <p className="mx-auto mt-4 max-w-md text-stone">
        This page is coming soon.
      </p>
    </Container>
  );
}

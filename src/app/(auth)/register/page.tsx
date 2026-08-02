import Container from "@/components/ui/Container";
import RegisterForm from "@/components/forms/RegisterForm";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const initialRole = role === "seller" ? "seller" : "customer";

  return (
    <Container className="py-24">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Join Us
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-heading)] text-5xl">
          Create Account
        </h1>
        <p className="mx-auto mt-4 max-w-md text-stone">
          Join our community of artisans and collectors.
        </p>
      </div>

      <div className="mt-12">
        <RegisterForm initialRole={initialRole} />
      </div>
    </Container>
  );
}

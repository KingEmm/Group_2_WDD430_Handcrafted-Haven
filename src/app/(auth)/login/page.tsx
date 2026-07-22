import Container from "@/components/ui/Container";
import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <Container className="py-24">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Welcome Back
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-heading)] text-5xl">
          Sign In
        </h1>
        <p className="mx-auto mt-4 max-w-md text-stone">
          Sign in to manage your profile, track orders, and connect with
          artisans.
        </p>
      </div>

      <div className="mt-12">
        <LoginForm />
      </div>
    </Container>
  );
}

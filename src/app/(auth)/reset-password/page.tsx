import Container from "@/components/ui/Container";
import RequestResetForm from "@/components/forms/RequestResetForm";
import ConfirmResetForm from "@/components/forms/ConfirmResetForm";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <Container className="py-24">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Account
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-heading)] text-5xl">
          {token ? "Set a New Password" : "Reset Password"}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-stone">
          {token
            ? "Choose a new password for your account."
            : "Enter your email and we'll send you a link to reset your password."}
        </p>
      </div>

      <div className="mt-12">
        {token ? <ConfirmResetForm token={token} /> : <RequestResetForm />}
      </div>
    </Container>
  );
}

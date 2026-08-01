import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (session.role !== "seller") {
    return (
      <Container className="py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Artisan Studio
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-heading)] text-5xl">
          Access Denied
        </h1>
        <p className="mx-auto mt-4 max-w-md text-stone">
          This area is reserved for artisan accounts. Sign in with a seller
          account to manage your storefront and listings.
        </p>
        <Button href="/" className="mt-8">
          Back to Home
        </Button>
      </Container>
    );
  }

  return <>{children}</>;
}

import { redirect } from "next/navigation";
import Container from "@/components/ui/Container";
import { getSession } from "@/lib/session";

export default async function AccountPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <Container className="py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
        Account
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-heading)] text-5xl">
        My Account
      </h1>
      <div className="mx-auto mt-8 max-w-md border border-beige bg-ivory p-8 text-left">
        <p className="text-xs uppercase tracking-[0.15em] text-stone">Name</p>
        <p className="mt-1 mb-4 text-sm">{session.name}</p>
        <p className="text-xs uppercase tracking-[0.15em] text-stone">Email</p>
        <p className="mt-1 mb-4 text-sm">{session.email}</p>
        <p className="text-xs uppercase tracking-[0.15em] text-stone">
          Account Type
        </p>
        <p className="mt-1 text-sm capitalize">{session.role}</p>
      </div>
    </Container>
  );
}

import Link from "next/link";
import Logo from "./Logo";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";
import CartBadge from "./CartBadge";
import Container from "@/components/ui/Container";
import { SearchIcon, CartIcon } from "@/components/ui/icons";
import { getSession } from "@/lib/session";

export default async function Header() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-30 bg-charcoal text-ivory">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Logo />
        <Navbar />

        <div className="flex items-center gap-5">
          <Link
            href="/search"
            aria-label="Search"
            className="hidden transition-colors hover:text-gold sm:block"
          >
            <SearchIcon className="h-5 w-5" />
          </Link>
          <AccountMenu isLoggedIn={Boolean(session)} userName={session?.name} />
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative hidden transition-colors hover:text-gold sm:block"
          >
            <CartIcon className="h-5 w-5" />
            <CartBadge />
          </Link>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}

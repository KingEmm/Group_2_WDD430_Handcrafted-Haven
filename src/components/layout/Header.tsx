import Link from "next/link";
import Logo from "./Logo";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";
import Container from "@/components/ui/Container";
import { SearchIcon, UserIcon, CartIcon } from "@/components/ui/icons";

export default function Header() {
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
          <Link
            href="/account"
            aria-label="Account"
            className="hidden transition-colors hover:text-gold sm:block"
          >
            <UserIcon className="h-5 w-5" />
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative hidden transition-colors hover:text-gold sm:block"
          >
            <CartIcon className="h-5 w-5" />
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-ivory">
              0
            </span>
          </Link>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}

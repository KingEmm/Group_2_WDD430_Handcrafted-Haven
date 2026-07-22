import Link from "next/link";
import Container from "@/components/ui/Container";
import { FOOTER_COLUMNS } from "@/lib/constants";
import {
  InstagramIcon,
  FacebookIcon,
  PinterestIcon,
} from "@/components/ui/icons";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory/80">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <span className="font-[family-name:var(--font-heading)] text-2xl tracking-[0.28em] text-ivory">
              ARTISANÉ
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Crafted by hand. Made to last.
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-ivory">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-6 text-xs sm:flex-row">
          <p>© 2024 Artisané. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="#" aria-label="Instagram" className="hover:text-gold">
              <InstagramIcon className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Facebook" className="hover:text-gold">
              <FacebookIcon className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Pinterest" className="hover:text-gold">
              <PinterestIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

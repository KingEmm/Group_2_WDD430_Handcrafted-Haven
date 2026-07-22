"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-8">
        {NAV_LINKS.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative py-1 text-xs font-medium uppercase tracking-[0.15em] transition-colors hover:text-gold"
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-0.5 left-0 h-px w-full bg-gold" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

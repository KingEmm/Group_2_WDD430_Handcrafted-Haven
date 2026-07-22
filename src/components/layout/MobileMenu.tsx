"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import {
  MenuIcon,
  CloseIcon,
  SearchIcon,
  UserIcon,
  CartIcon,
} from "@/components/ui/icons";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="p-1"
      >
        <MenuIcon className="h-7 w-7" />
      </button>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-charcoal/60 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-4/5 max-w-xs flex-col bg-charcoal text-ivory transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="font-[family-name:var(--font-heading)] text-xl tracking-[0.28em]">
            ARTISANÉ
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="p-1"
          >
            <CloseIcon className="h-7 w-7" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex flex-col px-6 py-4">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`border-b border-ivory/10 py-4 text-sm uppercase tracking-[0.15em] transition-colors hover:text-gold ${
                  active ? "text-gold" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex items-center gap-6 px-6 py-6 text-ivory/80">
          <Link href="/search" onClick={() => setOpen(false)} aria-label="Search">
            <SearchIcon className="h-6 w-6" />
          </Link>
          <Link href="/account" onClick={() => setOpen(false)} aria-label="Account">
            <UserIcon className="h-6 w-6" />
          </Link>
          <Link href="/cart" onClick={() => setOpen(false)} aria-label="Cart">
            <CartIcon className="h-6 w-6" />
          </Link>
        </div>
      </aside>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserIcon } from "@/components/ui/icons";

type AccountMenuProps = {
  isLoggedIn: boolean;
  userName?: string;
};

export default function AccountMenu({ isLoggedIn, userName }: AccountMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setIsOpen(false);
      router.push("/");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="relative hidden sm:block" ref={menuRef}>
      <button
        type="button"
        aria-label="Account"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center transition-colors hover:text-gold"
      >
        <UserIcon className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-3 w-56 border border-beige bg-ivory py-2 text-espresso shadow-lg">
          {isLoggedIn ? (
            <>
              <div className="border-b border-beige px-4 py-3">
                <p className="text-xs uppercase tracking-[0.15em] text-stone">
                  Signed in as
                </p>
                <p className="mt-1 truncate text-sm font-semibold">
                  {userName}
                </p>
              </div>
              <Link
                href="/account"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 text-sm hover:bg-beige/40"
              >
                My Account
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 text-sm hover:bg-beige/40"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="block w-full px-4 py-2.5 text-left text-sm hover:bg-beige/40 disabled:opacity-60"
              >
                {isLoggingOut ? "Signing out..." : "Sign Out"}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 text-sm hover:bg-beige/40"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 text-sm hover:bg-beige/40"
              >
                Create an Account
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

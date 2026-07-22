import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Artisané — home"
      className={`flex items-center gap-2.5 ${className}`}
    >
      <span className="flex h-8 w-8 items-center justify-center border border-current font-[family-name:var(--font-heading)] text-lg leading-none">
        A
      </span>
      <span className="font-[family-name:var(--font-heading)] text-2xl tracking-[0.28em]">
        ARTISANÉ
      </span>
    </Link>
  );
}

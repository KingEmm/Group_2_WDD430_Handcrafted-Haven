import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "outline-light";

const base =
  "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-ivory hover:bg-gold-dark",
  outline: "border border-espresso/40 text-espresso hover:bg-espresso hover:text-ivory",
  "outline-light": "border border-ivory/50 text-ivory hover:bg-ivory hover:text-espresso",
};

type ButtonAsLink = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

export default function Button({
  href,
  variant = "primary",
  children,
  className = "",
  ...rest
}: ButtonAsLink & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

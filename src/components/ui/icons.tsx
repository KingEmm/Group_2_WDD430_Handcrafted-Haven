import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const SearchIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Base>
);

export const UserIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
  </Base>
);

export const CartIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 5h2l1.5 12h11L21 8H6" />
    <circle cx="9" cy="20" r="1" />
    <circle cx="18" cy="20" r="1" />
  </Base>
);

export const MenuIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Base>
);

export const CloseIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);

export const MailIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </Base>
);

export const HandmadeIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V12m0-2a1.5 1.5 0 0 1 3 0v5a5 5 0 0 1-5 5h-1.5a5 5 0 0 1-4-2l-3-4a1.6 1.6 0 0 1 2.6-1.8L8 14" />
  </Base>
);

export const SustainableIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 19c0-8 5-13 14-13 0 9-5 14-13 14" />
    <path d="M8 18c2-4 5-7 9-9" />
  </Base>
);

export const DurableIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z" />
  </Base>
);

export const PurposeIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 20s-7-4.4-7-9.5A3.5 3.5 0 0 1 12 8a3.5 3.5 0 0 1 7 2.5C19 15.6 12 20 12 20Z" />
  </Base>
);

export const InstagramIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="4" width="16" height="16" rx="4" />
    <circle cx="12" cy="12" r="3.5" />
    <circle cx="17" cy="7" r="0.5" fill="currentColor" />
  </Base>
);

export const FacebookIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M14 8h2V5h-2c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2l.5-3H14V8.5c0-.3.2-.5.5-.5Z" />
  </Base>
);

export const PinterestIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7c-2.2 0-4 1.6-4 3.8 0 1 .5 2 1.4 2.3.2.1.3 0 .3-.2l.1-.6c0-.2 0-.3-.1-.4a2 2 0 0 1-.4-1.2c0-1.5 1.2-2.7 3-2.7 1.6 0 2.6 1 2.6 2.4 0 1.8-.8 3.3-2 3.3-.6 0-1.1-.5-1-1.2l.4-1.7c.1-.5-.1-.9-.6-.9-.5 0-1 .5-1 1.3 0 .5.2.8.2.8l-.8 3.2c-.2.9 0 2 0 2.1 0 .1.1.1.2 0 .1 0 1-1.3 1.3-2.4l.4-1.5c.3.5 1 .9 1.7.9 2.2 0 3.7-2 3.7-4.6C16.8 8.8 14.8 7 12 7Z" />
  </Base>
);

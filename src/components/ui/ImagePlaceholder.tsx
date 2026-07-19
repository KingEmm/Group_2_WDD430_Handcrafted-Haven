export default function ImagePlaceholder({
  label,
  className = "",
  dark = false,
}: {
  label: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className={`relative flex items-center justify-center overflow-hidden ${
        dark
          ? "bg-espresso/40 text-ivory/50"
          : "bg-beige/50 text-stone"
      } ${className}`}
    >
      <svg
        className="absolute h-full w-full opacity-40"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      <span className="relative z-10 px-3 text-center text-[11px] font-medium uppercase tracking-[0.15em]">
        {label}
      </span>
    </div>
  );
}

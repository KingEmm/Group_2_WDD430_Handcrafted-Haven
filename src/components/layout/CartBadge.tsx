"use client";

import { useCart } from "@/context/CartContext";

export default function CartBadge() {
  const { itemCount } = useCart();

  if (itemCount === 0) return null;

  return (
    <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-ivory">
      {itemCount > 9 ? "9+" : itemCount}
    </span>
  );
}

"use client";

import { useState } from "react";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";

export default function ProductDetailActions({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem(product.slug, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-stretch">
      <div className="flex items-center border border-beige">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="h-12 w-12 text-espresso transition-colors hover:bg-beige/40"
        >
          –
        </button>
        <span className="w-10 text-center text-sm">{quantity}</span>
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => setQuantity((q) => q + 1)}
          className="h-12 w-12 text-espresso transition-colors hover:bg-beige/40"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className="flex-1 bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-ivory transition-colors duration-200 hover:bg-gold-dark"
      >
        {added ? "Added to Cart" : "Add to Cart"}
      </button>
    </div>
  );
}

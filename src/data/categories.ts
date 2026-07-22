import type { Category } from "@/types";

export const CATEGORIES: Category[] = [
  {
    slug: "furniture",
    name: "Furniture",
    description: "Timeless pieces made to elevate your space.",
    href: "/collection?category=furniture",
    image: "/images/products/furniture.jpg",
  },
  {
    slug: "ceramics",
    name: "Ceramics",
    description: "Handcrafted ceramics for everyday beauty.",
    href: "/collection?category=ceramics",
    image: "/images/products/ceramics.jpg",
  },
  {
    slug: "textiles",
    name: "Textiles",
    description: "Natural fabrics woven with care and intention.",
    href: "/collection?category=textiles",
    image: "/images/products/textiles.jpg",
  },
  {
    slug: "accessories",
    name: "Accessories",
    description: "Thoughtful details that complete your story.",
    href: "/collection?category=accessories",
    image: "/images/products/accessories.jpg",
  },
];

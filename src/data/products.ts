import type { Product } from "@/types";

const IMAGES: Record<Product["category"], string> = {
  furniture: "/images/products/furniture.jpg",
  ceramics: "/images/products/ceramics.jpg",
  textiles: "/images/products/textiles.jpg",
  accessories: "/images/products/accessories.jpg",
};

export const PRODUCTS: Product[] = [
  {
    slug: "oak-reading-chair",
    name: "Oak Reading Chair",
    category: "furniture",
    price: 640,
    artisan: "Elias Warren",
    origin: "Vermont, USA",
    image: IMAGES.furniture,
    description:
      "Hand-joined solid oak with a hand-rubbed oil finish, shaped for long afternoons with a good book.",
    featured: true,
  },
  {
    slug: "walnut-side-table",
    name: "Walnut Side Table",
    category: "furniture",
    price: 380,
    artisan: "Elias Warren",
    origin: "Vermont, USA",
    image: IMAGES.furniture,
    description:
      "A compact walnut table with tapered legs and a live edge that keeps the grain of the tree.",
  },
  {
    slug: "ash-bench",
    name: "Low Ash Bench",
    category: "furniture",
    price: 520,
    artisan: "Mara Fields",
    origin: "Oregon, USA",
    image: IMAGES.furniture,
    description:
      "A minimalist bench in pale ash, built with wedged through-tenons and no visible hardware.",
  },
  {
    slug: "stoneware-serving-bowl",
    name: "Stoneware Serving Bowl",
    category: "ceramics",
    price: 68,
    artisan: "Yuki Tanaka",
    origin: "Kyoto, Japan",
    image: IMAGES.ceramics,
    description:
      "Wheel-thrown stoneware finished in a soft ash glaze that pools quietly toward the base.",
    featured: true,
  },
  {
    slug: "matte-mug-set",
    name: "Matte Mug, Set of Two",
    category: "ceramics",
    price: 52,
    artisan: "Yuki Tanaka",
    origin: "Kyoto, Japan",
    image: IMAGES.ceramics,
    description:
      "A pair of hand-thrown mugs with an unglazed foot and a warm, earthen matte finish.",
  },
  {
    slug: "speckled-dinner-plates",
    name: "Speckled Dinner Plates",
    category: "ceramics",
    price: 96,
    artisan: "Nadia Rossi",
    origin: "Umbria, Italy",
    image: IMAGES.ceramics,
    description:
      "Four coupe plates in speckled clay, each one subtly different where the maker's hands passed.",
  },
  {
    slug: "handwoven-wool-throw",
    name: "Handwoven Wool Throw",
    category: "textiles",
    price: 180,
    artisan: "Sofia Marquez",
    origin: "Oaxaca, Mexico",
    image: IMAGES.textiles,
    description:
      "Loom-woven from undyed highland wool, finished with hand-knotted fringe along both ends.",
    featured: true,
  },
  {
    slug: "linen-table-runner",
    name: "Stonewashed Linen Runner",
    category: "textiles",
    price: 74,
    artisan: "Sofia Marquez",
    origin: "Oaxaca, Mexico",
    image: IMAGES.textiles,
    description:
      "Pure stonewashed linen with a soft, lived-in drape and hand-rolled hems.",
  },
  {
    slug: "indigo-cushion-cover",
    name: "Indigo Cushion Cover",
    category: "textiles",
    price: 58,
    artisan: "Amara Diallo",
    origin: "Dakar, Senegal",
    image: IMAGES.textiles,
    description:
      "Naturally dyed with indigo and block-printed by hand, so no two covers are quite alike.",
  },
  {
    slug: "leather-card-wallet",
    name: "Vegetable-Tanned Card Wallet",
    category: "accessories",
    price: 64,
    artisan: "Tomas Halvorsen",
    origin: "Bergen, Norway",
    image: IMAGES.accessories,
    description:
      "Saddle-stitched by hand from vegetable-tanned leather that patinas with everyday use.",
    featured: true,
  },
  {
    slug: "brass-key-ring",
    name: "Solid Brass Key Ring",
    category: "accessories",
    price: 28,
    artisan: "Tomas Halvorsen",
    origin: "Bergen, Norway",
    image: IMAGES.accessories,
    description:
      "Turned from solid brass on a hand lathe, weighted to sit comfortably in the pocket.",
  },
  {
    slug: "woven-market-tote",
    name: "Woven Market Tote",
    category: "accessories",
    price: 88,
    artisan: "Amara Diallo",
    origin: "Dakar, Senegal",
    image: IMAGES.accessories,
    description:
      "Hand-woven natural fibre with leather handles, roomy enough for a day at the market.",
  },
];

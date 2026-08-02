import type { Product } from "@/types";

// Each product gets its own image so cards read as a real, varied collection.
// Unsplash CDN (allowlisted in next.config.ts); shared crop params keep the
// 4:5 product cards consistent.
const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export const PRODUCTS: Product[] = [
  {
    slug: "oak-reading-chair",
    name: "Oak Reading Chair",
    category: "furniture",
    price: 640,
    artisan: "Elias Warren",
    origin: "Vermont, USA",
    image: img("1658211312038-4293c7bdd37e"),
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
    image: img("1766615984579-437770c9c145"),
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
    image: img("1620429408060-423d98bf9092"),
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
    image: img("1610128361323-6e941c97f023"),
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
    image: img("1495100497150-fe209c585f50"),
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
    image: img("1705948730553-3ea0c89ae6fb"),
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
    image: img("1675273316257-07bb9934b122"),
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
    image: img("1591625591034-75d303d2e1a4"),
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
    image: img("1629949009765-40fc74c9ec21"),
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
    image: img("1601592996763-f05c9c80a7f1"),
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
    image: img("1632849369576-06cb097fe68f"),
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
    image: img("1524679813234-66a389fe1a42"),
    description:
      "Hand-woven natural fibre with leather handles, roomy enough for a day at the market.",
  },
];

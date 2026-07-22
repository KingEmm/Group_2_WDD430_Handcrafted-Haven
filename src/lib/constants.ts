export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Collection", href: "/collection" },
  { label: "Craftsmanship", href: "/craftsmanship" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "All Collection", href: "/collection" },
      { label: "Furniture", href: "/collection?category=furniture" },
      { label: "Ceramics", href: "/collection?category=ceramics" },
      { label: "Textiles", href: "/collection?category=textiles" },
      { label: "Accessories", href: "/collection?category=accessories" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Story", href: "/about#story" },
      { label: "Journal", href: "/journal" },
      { label: "Sustainability", href: "/craftsmanship#sustainability" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "Care Guide", href: "/care-guide" },
    ],
  },
] as const;

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import ProductGrid from "@/components/product/ProductGrid";
import ProductDetailActions from "@/components/product/ProductDetailActions";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const category = CATEGORIES.find((c) => c.slug === product.category);
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug,
  ).slice(0, 4);

  return (
    <Container className="py-16 lg:py-24">
      <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.15em] text-stone">
        <Link href="/collection" className="hover:text-espresso">
          Collection
        </Link>
        {category && (
          <>
            <span className="mx-2">/</span>
            <Link href={category.href} className="hover:text-espresso">
              {category.name}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-espresso">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-beige/40">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
            {category?.name ?? product.category}
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl leading-tight sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-3 text-sm text-stone">
            by {product.artisan} · {product.origin}
          </p>
          <p className="mt-6 text-2xl font-medium tracking-wide text-espresso">
            {formatPrice(product.price)}
          </p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-stone">
            {product.description}
          </p>

          <ProductDetailActions product={product} />
        </div>
      </div>

      <section className="mt-20 border-t border-beige pt-12">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl">
          Reviews
        </h2>
        <p className="mt-3 text-sm text-stone">
          No reviews yet — be the first to share your thoughts.
        </p>
      </section>

      {relatedProducts.length > 0 && (
        <section className="mt-20 border-t border-beige pt-12">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl">
            You Might Also Like
          </h2>
          <div className="mt-8">
            <ProductGrid products={relatedProducts} />
          </div>
        </section>
      )}
    </Container>
  );
}

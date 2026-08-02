import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import Container from "@/components/ui/Container";
import ProductGrid from "@/components/product/ProductGrid";
import ProductDetailActions from "@/components/product/ProductDetailActions";
import ReviewList from "@/components/product/ReviewList";
import ReviewForm from "@/components/forms/ReviewForm";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { formatPrice } from "@/lib/utils";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { getSession } from "@/lib/session";
import { getReviewsForProduct, hasPurchasedProduct } from "@/lib/reviews";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = CATEGORIES.find((c) => c.slug === product.category);
  const allProducts = await getAllProducts();
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  const session = await getSession();
  const reviews = await getReviewsForProduct(product.slug);
  const hasReviewed = session
    ? reviews.some((review) => review.customerId === session.userId)
    : false;
  const hasPurchased = session
    ? await hasPurchasedProduct(session.userId, product.slug)
    : false;
  const averageRating = reviews.length
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

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
          {product.source === "db" ? (
            // eslint-disable-next-line @next/next/no-img-element -- seller-submitted image host isn't in next/image's remotePatterns allowlist
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          )}
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
            {category?.name ?? product.category}
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl leading-tight sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-3 text-sm text-stone">
            by{" "}
            {product.sellerId ? (
              <Link
                href={`/artisans/${product.sellerId}`}
                className="text-espresso hover:text-gold hover:underline"
              >
                {product.artisan}
              </Link>
            ) : (
              product.artisan
            )}{" "}
            · {product.origin}
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
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl">
            Reviews
          </h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-1.5 text-sm text-stone">
              <Star size={14} className="fill-gold text-gold" />
              <span>
                {averageRating.toFixed(1)} out of 5 · {reviews.length}{" "}
                {reviews.length === 1 ? "review" : "reviews"}
              </span>
            </div>
          )}
        </div>

        <ReviewList reviews={reviews} />

        {!session ? (
          <p className="mt-8 border-t border-beige pt-8 text-sm text-stone">
            <Link href="/login" className="font-semibold text-gold hover:text-gold-dark">
              Sign in
            </Link>{" "}
            to write a review.
          </p>
        ) : !hasPurchased ? (
          <p className="mt-8 border-t border-beige pt-8 text-sm text-stone">
            Purchase this product to leave a review.
          </p>
        ) : hasReviewed ? (
          <p className="mt-8 border-t border-beige pt-8 text-sm text-stone">
            You&apos;ve already reviewed this product.
          </p>
        ) : (
          <ReviewForm productSlug={product.slug} />
        )}
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

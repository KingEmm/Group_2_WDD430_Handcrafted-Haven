import Container from "@/components/ui/Container";
import ProductForm from "@/components/forms/ProductForm";

export default function NewProductPage() {
  return (
    <Container className="py-16 sm:py-24">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Artisan Studio
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-heading)] text-5xl">
          Add Product
        </h1>
        <p className="mx-auto mt-4 max-w-md text-stone">
          List a new piece for customers to discover.
        </p>
      </div>

      <div className="mt-12">
        <ProductForm />
      </div>
    </Container>
  );
}

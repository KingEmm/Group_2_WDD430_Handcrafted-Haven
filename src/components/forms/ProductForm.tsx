"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import { CATEGORIES } from "@/data/categories";
import type { CategorySlug } from "@/types";

type FormErrors = {
  name?: string;
  category?: string;
  price?: string;
  origin?: string;
  image?: string;
  description?: string;
  form?: string;
};

type EditableProduct = {
  id: string;
  name: string;
  category: CategorySlug;
  price: number;
  origin: string;
  image: string;
  description: string;
};

export default function ProductForm({
  product,
}: {
  product?: EditableProduct;
}) {
  const router = useRouter();
  const [name, setName] = useState(product?.name ?? "");
  const [category, setCategory] = useState<CategorySlug | "">(
    product?.category ?? "",
  );
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [origin, setOrigin] = useState(product?.origin ?? "");
  const [image, setImage] = useState(product?.image ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};

    if (!name.trim()) {
      nextErrors.name = "Product name is required.";
    }

    if (!category) {
      nextErrors.category = "Choose a category.";
    }

    const priceValue = Number(price);
    if (!price || !Number.isInteger(priceValue) || priceValue <= 0) {
      nextErrors.price = "Enter a whole number price greater than 0.";
    }

    if (!origin.trim()) {
      nextErrors.origin = "Origin is required.";
    }

    if (!image.trim()) {
      nextErrors.image = "Image URL is required.";
    }

    if (!description.trim()) {
      nextErrors.description = "Description is required.";
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        product ? `/api/products/${product.id}` : "/api/products",
        {
          method: product ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            category,
            price: Number(price),
            origin,
            image,
            description,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors({ form: data.error ?? "Something went wrong." });
        setIsSubmitting(false);
        return;
      }

      router.push("/dashboard/products");
      router.refresh();
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-xl flex-col gap-6"
      noValidate
    >
      <Input
        label="Product Name"
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
        placeholder="Oak Reading Chair"
      />

      <div className="flex flex-col gap-2">
        <label
          htmlFor="category"
          className="text-xs font-semibold uppercase tracking-[0.15em] text-espresso"
        >
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as CategorySlug)}
          className={`w-full border border-beige bg-ivory px-4 py-3 text-sm text-espresso focus:border-gold focus:outline-none ${
            errors.category ? "border-red-400" : ""
          }`}
          aria-invalid={Boolean(errors.category)}
        >
          <option value="" disabled>
            Select a category
          </option>
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-xs text-red-500" role="alert">
            {errors.category}
          </p>
        )}
      </div>

      <Input
        label="Price (USD)"
        id="price"
        type="number"
        min={1}
        step={1}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        error={errors.price}
        placeholder="640"
      />

      <Input
        label="Origin"
        id="origin"
        type="text"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        error={errors.origin}
        placeholder="Vermont, USA"
      />

      <Input
        label="Image URL"
        id="image"
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        error={errors.image}
        placeholder="https://..."
      />

      <div className="flex flex-col gap-2">
        <label
          htmlFor="description"
          className="text-xs font-semibold uppercase tracking-[0.15em] text-espresso"
        >
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full border border-beige bg-ivory px-4 py-3 text-sm text-espresso placeholder:text-stone/60 focus:border-gold focus:outline-none ${
            errors.description ? "border-red-400" : ""
          }`}
          placeholder="Hand-joined solid oak with a hand-rubbed oil finish..."
          aria-invalid={Boolean(errors.description)}
        />
        {errors.description && (
          <p className="text-xs text-red-500" role="alert">
            {errors.description}
          </p>
        )}
      </div>

      {errors.form && (
        <p className="text-sm text-red-500" role="alert">
          {errors.form}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-ivory transition-colors duration-200 hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting
          ? product
            ? "Saving Changes..."
            : "Adding Product..."
          : product
            ? "Save Changes"
            : "Add Product"}
      </button>
    </form>
  );
}

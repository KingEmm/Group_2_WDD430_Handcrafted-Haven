import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";
import { slugify } from "@/lib/utils";
import { ALLOWED_CATEGORIES, getAllProducts } from "@/lib/products";
import { PRODUCTS } from "@/data/products";

export async function GET() {
  const products = await getAllProducts();
  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: "You must be signed in." },
      { status: 401 },
    );
  }

  if (session.role !== "seller") {
    return NextResponse.json(
      { error: "Only seller accounts can add products." },
      { status: 403 },
    );
  }

  try {
    const { name, category, price, origin, image, description } =
      await request.json();

    if (!name || !category || !origin || !image || !description) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    if (!ALLOWED_CATEGORIES.includes(category)) {
      return NextResponse.json({ error: "Invalid category." }, { status: 400 });
    }

    const priceValue = Number(price);
    if (!Number.isInteger(priceValue) || priceValue <= 0) {
      return NextResponse.json(
        { error: "Price must be a positive whole number." },
        { status: 400 },
      );
    }

    const baseSlug = slugify(name);
    if (!baseSlug) {
      return NextResponse.json(
        { error: "Enter a valid product name." },
        { status: 400 },
      );
    }

    const staticSlugs = new Set(PRODUCTS.map((p) => p.slug));

    let slug = baseSlug;
    let suffix = 2;
    while (true) {
      const existing = staticSlugs.has(slug)
        ? [{ id: "static" }]
        : await sql`SELECT id FROM products WHERE slug = ${slug}`;
      if (existing.length === 0) break;
      slug = `${baseSlug}-${suffix}`;
      suffix += 1;
    }

    const [product] = await sql`
      INSERT INTO products (seller_id, slug, name, category, price, origin, image, description)
      VALUES (${session.userId}, ${slug}, ${name}, ${category}, ${priceValue}, ${origin}, ${image}, ${description})
      RETURNING id, slug, name, category, price, origin, image, description, created_at
    `;

    return NextResponse.json(
      { message: "Product created.", product },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

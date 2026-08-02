import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";
import { ALLOWED_CATEGORIES } from "@/lib/products";
import { isValidImageUrl } from "@/lib/utils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: "You must be signed in." },
      { status: 401 },
    );
  }

  const { id } = await params;

  const [product] = await sql`
    SELECT id, seller_id, slug, name, category, price, origin, image, description
    FROM products
    WHERE id = ${id}
  `;

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  if (product.seller_id !== session.userId) {
    return NextResponse.json(
      { error: "You can only view your own products." },
      { status: 403 },
    );
  }

  return NextResponse.json({ product });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: "You must be signed in." },
      { status: 401 },
    );
  }

  if (session.role !== "seller") {
    return NextResponse.json(
      { error: "Only seller accounts can edit products." },
      { status: 403 },
    );
  }

  const { id } = await params;

  const [existing] = await sql`SELECT seller_id FROM products WHERE id = ${id}`;

  if (!existing) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  if (existing.seller_id !== session.userId) {
    return NextResponse.json(
      { error: "You can only edit your own products." },
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

    if (!isValidImageUrl(image)) {
      return NextResponse.json(
        { error: "Enter a valid image URL." },
        { status: 400 },
      );
    }

    const priceValue = Number(price);
    if (!Number.isInteger(priceValue) || priceValue <= 0) {
      return NextResponse.json(
        { error: "Price must be a positive whole number." },
        { status: 400 },
      );
    }

    const [product] = await sql`
      UPDATE products
      SET name = ${name}, category = ${category}, price = ${priceValue},
          origin = ${origin}, image = ${image}, description = ${description}
      WHERE id = ${id}
      RETURNING id, slug, name, category, price, origin, image, description, created_at
    `;

    return NextResponse.json({ message: "Product updated.", product });
  } catch (error) {
    console.error("Update product error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: "You must be signed in." },
      { status: 401 },
    );
  }

  if (session.role !== "seller") {
    return NextResponse.json(
      { error: "Only seller accounts can delete products." },
      { status: 403 },
    );
  }

  const { id } = await params;

  const [product] = await sql`SELECT seller_id FROM products WHERE id = ${id}`;

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  if (product.seller_id !== session.userId) {
    return NextResponse.json(
      { error: "You can only delete your own products." },
      { status: 403 },
    );
  }

  await sql`DELETE FROM products WHERE id = ${id}`;

  return NextResponse.json({ message: "Product deleted." });
}

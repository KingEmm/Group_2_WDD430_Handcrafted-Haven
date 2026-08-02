import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";

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

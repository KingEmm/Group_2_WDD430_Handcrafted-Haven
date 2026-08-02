import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { createOrder, OrderError } from "@/lib/orders";

export async function POST(request: NextRequest) {
  try {
    const { name, email, address, city, state, postalCode, country, items } =
      await request.json();

    if (
      !name ||
      !email ||
      !address ||
      !city ||
      !state ||
      !postalCode ||
      !country
    ) {
      return NextResponse.json(
        { error: "All shipping fields are required." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 },
      );
    }

    if (
      !Array.isArray(items) ||
      items.length === 0 ||
      !items.every(
        (item) =>
          typeof item?.slug === "string" &&
          Number.isInteger(item?.quantity) &&
          item.quantity > 0,
      )
    ) {
      return NextResponse.json(
        { error: "Your cart is empty or invalid." },
        { status: 400 },
      );
    }

    const session = await getSession();

    const orderId = await createOrder(
      { name, email, address, city, state, postalCode, country },
      items,
      session?.userId ?? null,
    );

    return NextResponse.json({ orderId }, { status: 201 });
  } catch (error) {
    if (error instanceof OrderError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.error("Create order error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

import sql from "@/lib/db";
import { getProductBySlug } from "@/lib/products";

export type CheckoutItem = {
  slug: string;
  quantity: number;
};

export type ShippingDetails = {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export class OrderError extends Error {}

export type OrderSummary = {
  id: string;
  orderNumber: number;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  shippingCountry: string;
  subtotal: number;
  createdAt: Date;
  items: {
    slug: string;
    name: string;
    unitPrice: number;
    quantity: number;
    image: string;
  }[];
};

export async function createOrder(
  shipping: ShippingDetails,
  items: CheckoutItem[],
  customerId: string | null,
): Promise<string> {
  if (items.length === 0) {
    throw new OrderError("Your cart is empty.");
  }

  // Never trust client-supplied prices — resolve each item against the
  // real catalog (static + DB) so the charged total can't be manipulated.
  const resolvedItems = await Promise.all(
    items.map(async (item) => {
      const product = await getProductBySlug(item.slug);
      if (!product) {
        throw new OrderError(
          `One of the items in your cart is no longer available.`,
        );
      }
      return { product, quantity: item.quantity };
    }),
  );

  const subtotal = resolvedItems.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0,
  );

  const orderId = await sql.begin(async (tx) => {
    const [order] = await tx`
      INSERT INTO orders (
        customer_id, customer_name, customer_email, shipping_address,
        shipping_city, shipping_state, shipping_postal_code, shipping_country,
        subtotal
      )
      VALUES (
        ${customerId}, ${shipping.name}, ${shipping.email}, ${shipping.address},
        ${shipping.city}, ${shipping.state}, ${shipping.postalCode}, ${shipping.country},
        ${subtotal}
      )
      RETURNING id
    `;

    for (const { product, quantity } of resolvedItems) {
      await tx`
        INSERT INTO order_items (order_id, product_slug, product_name, unit_price, quantity, image)
        VALUES (${order.id}, ${product.slug}, ${product.name}, ${product.price}, ${quantity}, ${product.image})
      `;
    }

    return order.id;
  });

  return orderId;
}

export async function getOrderById(id: string): Promise<OrderSummary | null> {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return null;
  }

  const [order] = await sql`
    SELECT id, order_number, customer_name, customer_email, shipping_address,
           shipping_city, shipping_state, shipping_postal_code, shipping_country,
           subtotal, created_at
    FROM orders
    WHERE id = ${id}
  `;

  if (!order) return null;

  const items = await sql`
    SELECT product_slug AS slug, product_name AS name, unit_price, quantity, image
    FROM order_items
    WHERE order_id = ${id}
  `;

  return {
    id: order.id,
    orderNumber: order.order_number,
    customerName: order.customer_name,
    customerEmail: order.customer_email,
    shippingAddress: order.shipping_address,
    shippingCity: order.shipping_city,
    shippingState: order.shipping_state,
    shippingPostalCode: order.shipping_postal_code,
    shippingCountry: order.shipping_country,
    subtotal: order.subtotal,
    createdAt: order.created_at,
    items: items.map((item) => ({
      slug: item.slug,
      name: item.name,
      unitPrice: item.unit_price,
      quantity: item.quantity,
      image: item.image,
    })),
  };
}

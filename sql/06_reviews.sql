-- Product reviews, restricted to verified purchasers.
-- Safe to re-run: every statement is idempotent.
-- product_slug is a plain string, not a FK to products, since static
-- catalog items are reviewable too and aren't rows in that table.

CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_slug VARCHAR(255) NOT NULL,
  customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (product_slug, customer_id)
);

CREATE INDEX IF NOT EXISTS idx_reviews_product_slug ON reviews (product_slug);

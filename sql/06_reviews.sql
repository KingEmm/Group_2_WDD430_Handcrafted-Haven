-- Product reviews: a 1–5 star rating plus written feedback.
-- Keyed by product_slug (not a products FK) so both the static catalog
-- products and seller-created DB products can be reviewed — slugs are
-- globally unique across both. Safe to re-run: every statement is idempotent.

CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_slug VARCHAR(255) NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- One review per user per product; re-submitting updates it (see API upsert).
  UNIQUE (product_slug, user_id)
);

CREATE INDEX IF NOT EXISTS idx_reviews_product_slug ON reviews (product_slug);

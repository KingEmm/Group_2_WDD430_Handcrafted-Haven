-- Products created by sellers through the dashboard.
-- Safe to re-run: every statement is idempotent.
-- Note: artisan display name is intentionally not duplicated here — join
-- against users.name at query time so it stays in sync if a seller renames.

CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('furniture', 'ceramics', 'textiles', 'accessories')),
  price INTEGER NOT NULL CHECK (price > 0),
  origin VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_seller_id ON products (seller_id);

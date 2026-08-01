#!/usr/bin/env bash
# Starts the local Postgres container (if not already running) and applies
# schema.sql + seed.sql. Safe to re-run any time.
set -euo pipefail

cd "$(dirname "$0")/.."

DB_USER="haven"
DB_NAME="handcrafted_haven"

echo "Starting local Postgres (Docker)..."
docker compose up -d db

echo "Waiting for Postgres to be ready..."
until docker compose exec -T db pg_isready -U "$DB_USER" -d "$DB_NAME" >/dev/null 2>&1; do
  sleep 1
done

echo "Applying schema..."
docker compose exec -T db psql -U "$DB_USER" -d "$DB_NAME" -v ON_ERROR_STOP=1 -f - < sql/01_schema.sql
docker compose exec -T db psql -U "$DB_USER" -d "$DB_NAME" -v ON_ERROR_STOP=1 -f - < sql/03_products.sql

echo "Seeding test accounts..."
docker compose exec -T db psql -U "$DB_USER" -d "$DB_NAME" -v ON_ERROR_STOP=1 -f - < sql/02_seed.sql

cat <<'EOF'

Done. Local Postgres is ready at postgresql://haven:haven_dev@localhost:5432/handcrafted_haven

Test accounts (password for both: "password123"):
  customer@test.com  (role: customer)
  seller@test.com    (role: seller)
EOF

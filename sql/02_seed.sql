-- Local test accounts. Password for both: "password123"
-- crypt()/gen_salt('bf') produces a standard bcrypt hash ($2a$ prefix),
-- which bcryptjs (used by src/app/api/auth/login) verifies natively.

INSERT INTO users (name, email, password_hash, role)
VALUES
  ('Test Customer', 'customer@test.com', crypt('password123', gen_salt('bf')), 'customer'),
  ('Test Seller', 'seller@test.com', crypt('password123', gen_salt('bf')), 'seller')
ON CONFLICT (email) DO NOTHING;

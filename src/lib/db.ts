import postgres from "postgres";

declare global {
  // eslint-disable-next-line no-var
  var __sql: ReturnType<typeof postgres> | undefined;
}

const databaseUrl = process.env.DATABASE_URL;

// Fail loudly with a clear message instead of a cryptic "Invalid URL" crash
// (which surfaces only as an opaque Server Components 500). Most often this
// means the var is missing from the hosting platform's environment settings,
// or was added without redeploying.
if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL environment variable is not set. Add it to .env.local for " +
      "local development, or to the hosting platform's environment variables " +
      "(then redeploy) in production.",
  );
}

// Local/Docker Postgres has no SSL configured; cloud providers (Neon,
// Supabase, RDS, etc.) require it. Switching DATABASE_URL to a cloud host
// is enough to re-enable SSL — no code change needed.
let isLocalDatabase: boolean;
try {
  isLocalDatabase = /^(localhost|127\.0\.0\.1)$/.test(
    new URL(databaseUrl).hostname,
  );
} catch {
  // Don't include the value itself — it contains the DB password.
  throw new Error(
    "DATABASE_URL is set but is not a valid connection string. " +
      "Expected a postgresql://... URL.",
  );
}

// Reuse the connection across hot reloads in dev and across serverless
// invocations where possible, instead of opening a new one every time.
const sql =
  global.__sql ??
  postgres(databaseUrl, {
    ssl: isLocalDatabase ? false : "require",
    max: 5,
  });

if (process.env.NODE_ENV !== "production") {
  global.__sql = sql;
}

export default sql;

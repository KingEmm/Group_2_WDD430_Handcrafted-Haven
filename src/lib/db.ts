import postgres from "postgres";

declare global {
  // eslint-disable-next-line no-var
  var __sql: ReturnType<typeof postgres> | undefined;
}

const databaseUrl = process.env.DATABASE_URL!;

// Local/Docker Postgres has no SSL configured; cloud providers (Neon,
// Supabase, RDS, etc.) require it. Switching DATABASE_URL to a cloud host
// is enough to re-enable SSL — no code change needed.
const isLocalDatabase = /^(localhost|127\.0\.0\.1)$/.test(
  new URL(databaseUrl).hostname,
);

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

import postgres from "postgres";

declare global {
  // eslint-disable-next-line no-var
  var __sql: ReturnType<typeof postgres> | undefined;
}

// Reuse the connection across hot reloads in dev and across serverless
// invocations where possible, instead of opening a new one every time.
const sql =
  global.__sql ??
  postgres(process.env.DATABASE_URL!, {
    ssl: "require",
    max: 5,
  });

if (process.env.NODE_ENV !== "production") {
  global.__sql = sql;
}

export default sql;

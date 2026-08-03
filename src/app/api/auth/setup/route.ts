import { NextResponse } from "next/server";
import sql from "@/lib/db";

// One-time setup route to create the users table.
// Visit /api/auth/setup once after connecting the database, then this
// route can be safely deleted or left in place (it's idempotent).
export async function GET() {
  try {
    try {
      await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`;
    } catch (extError: unknown) {
      const code = (extError as { code?: string })?.code;
      if (code !== "23505") {
        throw extError;
      }
    }

    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'customer',
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `;

    return NextResponse.json({ message: "Users table is ready." });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: "Failed to set up the database." },
      { status: 500 },
    );
  }
}

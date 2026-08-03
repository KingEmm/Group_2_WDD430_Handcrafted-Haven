import crypto from "node:crypto";
import sql from "@/lib/db";

const TOKEN_TTL_MS = 1000 * 60 * 60; // 1 hour

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function createPasswordResetToken(
  userId: string,
): Promise<string> {
  // Invalidate any outstanding links for this user before issuing a new
  // one, so only the most recent reset request can ever be used.
  await sql`
    UPDATE password_reset_tokens
    SET used_at = now()
    WHERE user_id = ${userId} AND used_at IS NULL
  `;

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MS);

  await sql`
    INSERT INTO password_reset_tokens (user_id, token_hash, expires_at)
    VALUES (${userId}, ${hashToken(token)}, ${expiresAt})
  `;

  return token;
}

export async function consumePasswordResetToken(
  token: string,
): Promise<{ userId: string } | null> {
  const [record] = await sql`
    SELECT id, user_id
    FROM password_reset_tokens
    WHERE token_hash = ${hashToken(token)}
      AND used_at IS NULL
      AND expires_at > now()
  `;

  if (!record) return null;

  await sql`
    UPDATE password_reset_tokens SET used_at = now() WHERE id = ${record.id}
  `;

  return { userId: record.user_id };
}

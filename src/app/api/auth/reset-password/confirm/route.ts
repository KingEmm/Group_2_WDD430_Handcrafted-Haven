import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import sql from "@/lib/db";
import { consumePasswordResetToken } from "@/lib/password-reset";
import { createSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and new password are required." },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 },
      );
    }

    const consumed = await consumePasswordResetToken(token);

    if (!consumed) {
      return NextResponse.json(
        { error: "This reset link is invalid or has expired." },
        { status: 400 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [user] = await sql`
      UPDATE users
      SET password_hash = ${passwordHash}
      WHERE id = ${consumed.userId}
      RETURNING id, name, email, role
    `;

    await createSession({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return NextResponse.json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Reset confirm error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

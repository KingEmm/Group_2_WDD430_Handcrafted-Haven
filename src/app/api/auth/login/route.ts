import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import sql from "@/lib/db";
import { createSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    const [user] = await sql`
      SELECT id, name, email, password_hash, role
      FROM users
      WHERE email = ${normalizedEmail}
    `;

    // Deliberately vague error message so we don't reveal whether the
    // email exists in the system.
    const invalidCredentialsResponse = NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 },
    );

    if (!user) {
      return invalidCredentialsResponse;
    }

    const passwordsMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordsMatch) {
      return invalidCredentialsResponse;
    }

    await createSession({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return NextResponse.json(
      { message: "Signed in successfully.", user: { id: user.id, name: user.name, email: user.email, role: user.role } },
      { status: 200 },
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

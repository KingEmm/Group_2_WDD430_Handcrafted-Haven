import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";
import { createPasswordResetToken } from "@/lib/password-reset";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 },
      );
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    const [user] = await sql`
      SELECT id FROM users WHERE email = ${normalizedEmail}
    `;

    if (user) {
      const token = await createPasswordResetToken(user.id);
      // No email provider is configured yet — log the reset link so it can
      // be used locally/in review. Swap this for a real email send later.
      console.log(
        `Password reset requested for ${normalizedEmail}: /reset-password?token=${token}`,
      );
    }

    // Always return the same response whether or not the email exists, so
    // this endpoint can't be used to enumerate registered accounts.
    return NextResponse.json({
      message:
        "If an account exists for that email, a reset link has been generated.",
    });
  } catch (error) {
    console.error("Reset request error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

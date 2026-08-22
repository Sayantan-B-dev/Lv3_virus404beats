import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { verifySessionCookie, signSessionCookie } from "@/lib/auth";
import { isDbConfigured, getOtp, deleteOtp, incrementOtpAttempts, writeAuditLog } from "@/lib/db";
import { hashOtpCode } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("admin_session")?.value;

  if (!sessionCookie) {
    return new Response(JSON.stringify({ error: "No session" }), { status: 401 });
  }

  const session = await verifySessionCookie(sessionCookie);
  if (!session || session.stage !== "pending") {
    return new Response(JSON.stringify({ error: "Invalid session" }), { status: 403 });
  }

  const body = await request.json();
  const code = String(body.code ?? "");

  const otpRow = await getOtp(session.email);
  if (!otpRow) {
    return new Response(JSON.stringify({ error: "No OTP found" }), { status: 404 });
  }

  const expiresAt = Number(otpRow.expiresAt ?? 0);
  const attempts = Number(otpRow.attempts ?? 0);
  const otpId = Number(otpRow.id ?? 0);

  // Check expiry
  if (expiresAt < Date.now()) {
    await deleteOtp(otpId);
    return new Response(JSON.stringify({ error: "OTP expired" }), { status: 400 });
  }

  // Check attempts cap (5 max)
  if (attempts >= 5) {
    await deleteOtp(otpId);
    return new Response(JSON.stringify({ error: "Too many attempts" }), { status: 429 });
  }

  const expectedHash = hashOtpCode(code);
  const codeHash = String(otpRow.codeHash ?? "");
  if (codeHash !== expectedHash) {
    await incrementOtpAttempts(otpId);
    return new Response(JSON.stringify({ error: "Invalid OTP" }), { status: 401 });
  }

  // Verify success — upgrade session
  await deleteOtp(otpId);
  await writeAuditLog("auth.otp.verify", { email: session.email, success: true });

  const verifiedToken = await signSessionCookie(session.email, "verified");
  cookieStore.set("admin_session", verifiedToken, {
    httpOnly: true,
    secure: (process.env.SITE_URL ?? "").startsWith("https"),
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}

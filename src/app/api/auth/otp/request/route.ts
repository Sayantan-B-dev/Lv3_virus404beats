import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { Resend } from "resend";
import { isDbConfigured, storeOtp, getOtp, deleteOtp } from "@/lib/db";
import { hashOtpCode, isAllowedEmail } from "@/lib/auth";

const resend = new Resend(process.env.RESEND_API_KEY ?? "");

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("admin_session")?.value;

  if (!sessionCookie) {
    return new Response(JSON.stringify({ error: "No session" }), { status: 401 });
  }

  try {
    const { decodeJwt } = await import("jose");
    const payload = await decodeJwt(sessionCookie);
    const email = (payload.email as string) ?? "";
    if (!email || !(payload.stage === "pending")) {
      return new Response(JSON.stringify({ error: "Invalid session stage" }), { status: 403 });
    }

    // Rate limit: max 1 request per 60s per email (simplified: check existing recent OTP)
    const recent = await getOtp(email);
    const recentExpiresAt = Number(recent?.expiresAt ?? 0);
    if (recent && recentExpiresAt > Date.now()) {
      return new Response(JSON.stringify({ error: "OTP already sent. Check your inbox." }), { status: 429 });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const codeHash = hashOtpCode(code);
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    await storeOtp(email, codeHash, expiresAt);

    // Send email via Resend
    await resend.emails.send({
      from: "virus404 <hello@virus404beats.com>",
      to: process.env.OTP_EMAIL ?? email,
      subject: `Admin login OTP — ${code}`,
      html: `<p>Your OTP is: <strong>${code}</strong></p><p>Valid for 10 minutes. Do not share.</p>`,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message ?? "OTP request failed" }), { status: 500 });
  }
}

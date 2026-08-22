import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { Resend } from "resend";
import { storeOtp, getOtp } from "@/lib/db";
import { hashOtpCode, verifySessionCookie } from "@/lib/auth";

const resend = new Resend(process.env.RESEND_API_KEY ?? "");

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("admin_session")?.value;

  if (!sessionCookie) {
    return new Response(null, { status: 302, headers: { Location: "/admin/login?error=no_session" } });
  }

  try {
    const session = await verifySessionCookie(sessionCookie);
    if (!session || session.stage !== "pending") {
      return new Response(null, { status: 302, headers: { Location: "/admin/login?error=invalid_session" } });
    }

    const email = session.email;

    // Rate limit: max 1 request per 60s per email
    const recent = await getOtp(email);
    const recentExpiresAt = Number(recent?.expiresAt ?? 0);
    if (recent && recentExpiresAt > Date.now()) {
      return new Response(null, { status: 302, headers: { Location: "/admin/login?error=otp_already_sent" } });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const codeHash = hashOtpCode(code);
    const expiresAt = Date.now() + 10 * 60 * 1000;

    await storeOtp(email, codeHash, expiresAt);

    // Send email via Resend
    await resend.emails.send({
      from: "virus404 <hello@virus404beats.com>",
      to: process.env.OTP_EMAIL ?? email,
      subject: `Admin login OTP — ${code}`,
      html: `<p>Your OTP is: <strong>${code}</strong></p><p>Valid for 10 minutes. Do not share.</p>`,
    });

    // Redirect back to login with success message
    return new Response(null, { status: 302, headers: { Location: "/admin/login?error=otp_sent" } });
  } catch (e: any) {
    return new Response(null, { status: 302, headers: { Location: `/admin/login?error=${encodeURIComponent(e.message ?? "otp_failed")}` } });
  }
}

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT } from "jose";
import { isAllowedEmail, signSessionCookie } from "@/lib/auth";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

  if (!code || !state) {
    redirect("/admin/login?error=missing_params");
  }

  // Exchange code for token
  try {
    const tokenUrl = new URL("https://oauth2.googleapis.com/token");
    const tokenRes = await fetch(tokenUrl.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID ?? "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        redirect_uri: `${siteUrl}/api/auth/callback`,
        grant_type: "authorization_code",
      }),
    });
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token && !tokenData.id_token) {
      redirect("/admin/login?error=token_exchange_failed");
    }

    // Decode ID token to get email (using jose decodeJwt - no verification needed for our use since it came directly from Google over TLS with client_secret)
    const { decodeJwt } = await import("jose");
    const idToken = tokenData.id_token;
    const payload = decodeJwt(idToken) as { email?: string };
    const email = payload.email ?? "";

    if (!email || !isAllowedEmail(email)) {
      redirect("/admin/login?error=not_authorized");
    }

    // Issue pending session cookie (stage = pending, needs OTP)
    const token = await signSessionCookie(email, "pending");
    const cookieStore = await cookies();
    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: siteUrl.startsWith("https"),
      sameSite: "lax",
      path: "/",
      maxAge: 600, // 10 minutes
    });

    redirect("/admin/dashboard");
  } catch {
    redirect("/admin/login?error=auth_failed");
  }
}

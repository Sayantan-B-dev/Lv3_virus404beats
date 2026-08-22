import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isAllowedEmail, signSessionCookie } from "@/lib/auth";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");
  const errorDescription = url.searchParams.get("error_description");
  const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

  // Google returned an error directly
  if (error) {
    redirect(`/admin/login?error=${encodeURIComponent(error)}&detail=${encodeURIComponent(errorDescription ?? "")}`);
  }

  if (!code || !state) {
    redirect("/admin/login?error=missing_params");
  }

  // Exchange code for token
  const tokenUrl = new URL("https://oauth2.googleapis.com/token");
  const tokenRes = await fetch(tokenUrl.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code!,
      client_id: process.env.GOOGLE_CLIENT_ID ?? "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      redirect_uri: `${siteUrl}/api/auth/callback`,
      grant_type: "authorization_code",
    }),
  });

  const tokenData = await tokenRes.json();

  if (!tokenRes.ok || (!tokenData.access_token && !tokenData.id_token)) {
    const detail = tokenData.error_description ?? tokenData.error ?? JSON.stringify(tokenData);
    redirect(`/admin/login?error=token_exchange_failed&detail=${encodeURIComponent(detail)}`);
  }

  // Decode ID token to get email
  const { decodeJwt } = await import("jose");
  const idToken = tokenData.id_token;
  const payload = decodeJwt(idToken) as { email?: string };
  const email = payload.email ?? "";

  if (!email || !isAllowedEmail(email)) {
    redirect(`/admin/login?error=not_authorized&detail=${encodeURIComponent("Email: " + email)}`);
  }

  // Issue verified session cookie directly (no OTP)
  const token = await signSessionCookie(email, "verified");
  const cookieStore = await cookies();
  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: siteUrl.startsWith("https"),
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/admin/dashboard");
}

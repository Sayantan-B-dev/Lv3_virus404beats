import { redirect } from "next/navigation";
import { isAuthConfigured } from "@/lib/auth";

export async function GET() {
  if (!isAuthConfigured()) {
    return new Response("Auth not configured", { status: 500 });
  }
  const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const state = Math.random().toString(36).substring(2);
  // Store state in a temporary cookie? For simplicity, we'll include it in redirect URL and verify via callback
  // But for security, we should sign it. For now, we include state as query param in redirect
  const redirectUri = `${siteUrl}/api/auth/callback`;
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", clientId ?? "");
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid email profile");
  url.searchParams.set("state", state);
  url.searchParams.set("access_type", "offline");
  url.searchParams.set("prompt", "select_account");

  redirect(url.toString());
}

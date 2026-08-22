// src/lib/auth.ts — session, admin allowlist, OTP helpers (no external auth lib)
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { createHash } from "node:crypto";

const AUTH_SECRET = process.env.AUTH_SECRET;
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
const OTP_EMAIL = process.env.OTP_EMAIL ?? "";

export function isAuthConfigured(): boolean {
  return !!AUTH_SECRET && ADMIN_EMAILS.length > 0;
}

function getSecret() {
  if (!AUTH_SECRET) throw new Error("AUTH_SECRET not configured");
  return new TextEncoder().encode(AUTH_SECRET);
}

export function allowedAdminEmails(): string[] {
  return ADMIN_EMAILS;
}

export async function signSessionCookie(email: string, stage: "pending" | "verified" = "pending") {
  return await new SignJWT({ email, stage })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(getSecret());
}

export async function verifySessionCookie(token?: string) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: ["HS256"] });
    return payload as { email: string; stage: string; exp?: number };
  } catch {
    return null;
  }
}

export async function readSessionCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return null;
  return verifySessionCookie(token);
}

export function hashOtpCode(code: string): string {
  return createHash("sha256").update(code + (AUTH_SECRET ?? "")).digest("hex");
}

export function isAllowedEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.trim().toLowerCase());
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { readSessionCookie } from "@/lib/auth";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protect /admin/* routes
  if (pathname.startsWith("/admin")) {
    // Allow /admin/login
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }
    // Check session cookie
    const cookieHeader = request.headers.get("cookie") ?? "";
    const sessionMatch = cookieHeader.match(/admin_session=([^;]+)/);
    if (!sessionMatch) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    // Note: full cookie verification is done in route handlers; proxy just checks presence
    return NextResponse.next();
  }

  // Protect /api/admin/* routes
  if (pathname.startsWith("/api/admin")) {
    const cookieHeader = request.headers.get("cookie") ?? "";
    const sessionMatch = cookieHeader.match(/admin_session=([^;]+)/);
    if (!sessionMatch) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
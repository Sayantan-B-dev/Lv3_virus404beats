import { cookies } from "next/headers";
import { verifySessionCookie } from "@/lib/auth";
import { upsertContentOverride, getContentOverrides, writeAuditLog } from "@/lib/db";

export async function GET() {
  const cookieStore = await cookies();
  const session = await verifySessionCookie(cookieStore.get("admin_session")?.value);
  if (!session || session.stage !== "verified") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const overrides = await getContentOverrides();
  return Response.json({ overrides });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = await verifySessionCookie(cookieStore.get("admin_session")?.value);
  if (!session || session.stage !== "verified") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  await upsertContentOverride(body.key, body.value);
  await writeAuditLog("content.update", { key: body.key });
  return Response.json({ ok: true });
}

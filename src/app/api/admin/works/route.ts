import { cookies } from "next/headers";
import { verifySessionCookie } from "@/lib/auth";
import { createWork, getWorks, updateWork, deleteWork, writeAuditLog } from "@/lib/db";

export async function GET() {
  const cookieStore = await cookies();
  const session = await verifySessionCookie(cookieStore.get("admin_session")?.value);
  if (!session || session.stage !== "verified") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const works = await getWorks({ status: "draft" });
  return Response.json({ works });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = await verifySessionCookie(cookieStore.get("admin_session")?.value);
  if (!session || session.stage !== "verified") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const result = await createWork(body);
  await writeAuditLog("works.create", { id: result });
  return Response.json({ ok: true });
}

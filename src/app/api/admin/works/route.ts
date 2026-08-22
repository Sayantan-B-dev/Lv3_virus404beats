import { cookies } from "next/headers";
import { verifySessionCookie } from "@/lib/auth";
import { createWork, getWorks, updateWork, deleteWork, writeAuditLog } from "@/lib/db";

async function requireAdmin() {
  const cookieStore = await cookies();
  const session = await verifySessionCookie(cookieStore.get("admin_session")?.value);
  if (!session || session.stage !== "verified") return null;
  return session;
}

export async function GET() {
  if (!(await requireAdmin())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const works = await getWorks({ status: "draft" });
  return Response.json({ works });
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const result = await createWork(body);
  await writeAuditLog("works.create", { id: result });
  return Response.json({ ok: true });
}

export async function PUT(request: Request) {
  if (!(await requireAdmin())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  await updateWork(body.id, body);
  await writeAuditLog("works.update", { id: body.id });
  return Response.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (!(await requireAdmin())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  await deleteWork(body.id);
  await writeAuditLog("works.delete", { id: body.id });
  return Response.json({ ok: true });
}

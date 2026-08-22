import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { verifySessionCookie } from "@/lib/auth";
import { createBeat, getBeats, updateBeat, deleteBeat, writeAuditLog } from "@/lib/db";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  const session = await verifySessionCookie(token);
  if (!session || session.stage !== "verified") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const beats = await getBeats({ status: "draft" });
  return Response.json({ beats });
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  const session = await verifySessionCookie(token);
  if (!session || session.stage !== "verified") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  try {
    const body = await request.json();
    if (!body.title?.trim()) {
      return Response.json({ error: "Title is required" }, { status: 400 });
    }
    const id = await createBeat(body);
    await writeAuditLog("beats.create", { id, title: body.title });
    return Response.json({ id, ok: true });
  } catch (e: any) {
    return Response.json({ error: e.message ?? "Create failed" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  const session = await verifySessionCookie(token);
  if (!session || session.stage !== "verified") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  try {
    const body = await request.json();
    await updateBeat(body.id, body);
    await writeAuditLog("beats.update", { id: body.id });
    return Response.json({ ok: true });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  const session = await verifySessionCookie(token);
  if (!session || session.stage !== "verified") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  try {
    const body = await request.json();
    await deleteBeat(body.id);
    await writeAuditLog("beats.delete", { id: body.id });
    return Response.json({ ok: true });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

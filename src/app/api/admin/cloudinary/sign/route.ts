import { cookies } from "next/headers";
import { verifySessionCookie } from "@/lib/auth";
import { getSignedUploadParams, isCloudinaryConfigured } from "@/lib/cloudinary";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = await verifySessionCookie(cookieStore.get("admin_session")?.value);
  if (!session || session.stage !== "verified") return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
  if (!isCloudinaryConfigured()) return new Response(JSON.stringify({ error: "Cloudinary not configured" }), { status: 500, headers: { "Content-Type": "application/json" } });
  try {
    const body = await request.json();
    const params = getSignedUploadParams(body.publicId, {
      folder: body.folder ?? "virus404/beats",
      resourceType: body.resourceType ?? "video",
      tags: body.tags ?? ["virus404"],
    });
    return Response.json({ ...params, cloudName: params.params.folder ? undefined : process.env.CLOUDINARY_CLOUD_NAME, apiKey: params.apiKey });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}

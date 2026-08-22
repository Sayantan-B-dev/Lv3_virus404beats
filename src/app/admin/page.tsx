import { redirect } from "next/navigation";
import { readSessionCookie } from "@/lib/auth";

export default async function AdminPage() {
  const session = await readSessionCookie();
  if (!session || session.stage !== "verified") {
    redirect("/admin/login");
  }
  redirect("/admin/dashboard");
}

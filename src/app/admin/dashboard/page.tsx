import { Metadata } from "next";
import Link from "next/link";
import { readSessionCookie } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BeatsManager } from "@/components/admin/BeatsManager";
import { WorksManager } from "@/components/admin/WorksManager";
import { ContentManager } from "@/components/admin/ContentManager";

export const metadata: Metadata = {
  title: "Dashboard — virus404",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const session = await readSessionCookie();
  if (!session || session.stage !== "verified") {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-bg text-fg">
      <header className="border-b border-line px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-caps text-sm font-medium hover:text-muted transition-colors">virus404</Link>
          <span className="text-line">/</span>
          <span className="text-caps text-xs text-muted">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted">{session.email}</span>
          <a href="/api/auth/logout" className="text-xs border border-line px-3 py-1 rounded hover:border-fg transition-colors">Logout</a>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 border-r border-line px-4 py-8 shrink-0 hidden md:block">
          <nav className="flex flex-col gap-1">
            <a href="#beats" className="text-sm px-3 py-2 rounded hover:bg-bg-soft transition-colors text-fg">Beats</a>
            <a href="#works" className="text-sm px-3 py-2 rounded hover:bg-bg-soft transition-colors text-fg">Works</a>
            <a href="#content" className="text-sm px-3 py-2 rounded hover:bg-bg-soft transition-colors text-fg">Content</a>
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1 px-6 py-8 max-w-4xl">
          <h1 className="text-2xl font-medium mb-8 tracking-tight">Dashboard</h1>

          <section id="beats" className="mb-16">
            <BeatsManager />
          </section>

          <section id="works" className="mb-16">
            <WorksManager />
          </section>

          <section id="content" className="mb-16">
            <ContentManager />
          </section>
        </div>
      </div>
    </main>
  );
}

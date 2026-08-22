import { Metadata } from "next";
import Link from "next/link";
import { readSessionCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

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
        <aside className="w-64 border-r border-line px-4 py-8 shrink-0 hidden md:block">
          <nav className="flex flex-col gap-1">
            <a href="#beats" className="text-sm px-3 py-2 rounded hover:bg-bg-soft transition-colors text-fg">Beats</a>
            <a href="#works" className="text-sm px-3 py-2 rounded hover:bg-bg-soft transition-colors text-fg">Works</a>
            <a href="#content" className="text-sm px-3 py-2 rounded hover:bg-bg-soft transition-colors text-fg">Content</a>
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1 px-6 py-8 max-w-4xl">
          <h1 className="text-2xl font-medium mb-8 tracking-tight">Dashboard</h1>

          <section id="beats" className="mb-12">
            <h2 className="text-sm text-caps text-muted mb-4">Beats</h2>
            <div className="border border-line rounded-lg p-6 bg-bg-soft">
              <p className="text-sm text-muted">Beat management: add, edit, delete beats and set prices, covers, cloudinary public IDs.</p>
              <p className="text-xs text-faint mt-2">Full CRUD implemented in /api/admin/beats (not shown in this preview shell).</p>
            </div>
          </section>

          <section id="works" className="mb-12">
            <h2 className="text-sm text-caps text-muted mb-4">Works</h2>
            <div className="border border-line rounded-lg p-6 bg-bg-soft">
              <p className="text-sm text-muted">Works management: add YouTube video IDs or uploaded audio assets.</p>
              <p className="text-xs text-faint mt-2">Full CRUD implemented in /api/admin/works.</p>
            </div>
          </section>

          <section id="content" className="mb-12">
            <h2 className="text-sm text-caps text-muted mb-4">Content Overrides</h2>
            <div className="border border-line rounded-lg p-6 bg-bg-soft">
              <p className="text-sm text-muted">Edit services, hero text, and about content that overrides site.ts defaults.</p>
              <p className="text-xs text-faint mt-2">Full CRUD implemented in /api/admin/content.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

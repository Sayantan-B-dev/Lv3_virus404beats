import { Metadata } from "next";
import { site } from "@/config/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Login — virus404",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-bg text-fg">
      <div className="max-w-md w-full border border-line rounded-xl p-10 bg-bg-soft">
        <h1 className="text-2xl font-medium mb-6 tracking-tight">Admin Login</h1>
        <p className="text-sm text-muted mb-8 leading-relaxed">
          This area is hidden by design. Sign in with your allowed Google account to access the dashboard.
        </p>
        <a
          href="/api/auth/google"
          className="inline-flex items-center justify-center w-full border border-fg bg-fg text-bg px-6 py-3 rounded-md text-sm font-medium hover:bg-transparent hover:text-fg transition-colors"
        >
          Sign in with Google
        </a>
        <div className="mt-6 pt-6 border-t border-line">
          <Link href="/" className="text-xs text-muted hover:text-fg transition-colors">
            ← Back to site
          </Link>
        </div>
      </div>
    </main>
  );
}

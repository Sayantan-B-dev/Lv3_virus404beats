import { Metadata } from "next";
import Link from "next/link";
import { readSessionCookie } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin Login — virus404",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; detail?: string; stage?: string }>;
}) {
  const params = await searchParams;
  const error = params.error;
  const detail = params.detail;

  // Check if user already has a pending session (Google auth done, needs OTP)
  const session = await readSessionCookie();
  const needsOtp = session?.stage === "pending";

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-bg text-fg">
      <div className="max-w-md w-full border border-line rounded-xl p-10 bg-bg-soft">
        <h1 className="text-2xl font-medium mb-6 tracking-tight">Admin Login</h1>

        {error === "otp_sent" ? (
          <div className="mb-6 border border-green-500/30 bg-green-500/10 rounded-lg p-4">
            <p className="text-sm text-green-400 font-medium">OTP sent! Check your email.</p>
          </div>
        ) : error ? (
          <div className="mb-6 border border-red-500/30 bg-red-500/10 rounded-lg p-4">
            <p className="text-sm text-red-400 font-medium">{error.replace(/_/g, " ")}</p>
            {detail && <p className="text-xs text-red-400/70 mt-1 break-all">{detail}</p>}
          </div>
        ) : null}

        {needsOtp ? (
          <OtpForm email={session.email} />
        ) : (
          <>
            <p className="text-sm text-muted mb-8 leading-relaxed">
              This area is hidden by design. Sign in with your allowed Google account to access the dashboard.
            </p>
            <a
              href="/api/auth/google"
              className="inline-flex items-center justify-center w-full border border-fg bg-fg text-bg px-6 py-3 rounded-md text-sm font-medium hover:bg-transparent hover:text-fg transition-colors"
            >
              Sign in with Google
            </a>
          </>
        )}

        <div className="mt-6 pt-6 border-t border-line">
          <Link href="/" className="text-xs text-muted hover:text-fg transition-colors">
            ← Back to site
          </Link>
        </div>
      </div>
    </main>
  );
}

function OtpForm({ email }: { email: string }) {
  return (
    <div>
      <p className="text-sm text-muted mb-2 leading-relaxed">
        Signed in as <span className="text-fg font-medium">{email}</span>
      </p>
      <p className="text-sm text-muted mb-6 leading-relaxed">
        Enter the 6-digit OTP sent to your email.
      </p>
      <form action="/api/auth/otp/request" method="POST" className="mb-4">
        <button
          type="submit"
          className="text-xs border border-line px-4 py-2 rounded hover:border-fg transition-colors text-muted hover:text-fg"
        >
          Send OTP
        </button>
      </form>
      <form action="/api/auth/otp/verify" method="POST" className="flex flex-col gap-4">
        <input
          name="code"
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="000000"
          required
          className="w-full border border-line rounded-md px-4 py-3 bg-bg text-fg text-sm tracking-[0.5em] text-center placeholder:text-faint focus:outline-none focus:border-fg transition-colors"
        />
        <button
          type="submit"
          className="w-full border border-fg bg-fg text-bg px-6 py-3 rounded-md text-sm font-medium hover:bg-transparent hover:text-fg transition-colors"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
}

import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { signOutAction } from "@/lib/actions/auth";
import { isDemoEmail } from "@/lib/demo";
import { Wordmark } from "@/components/brand/wordmark";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const navLink =
    "rounded-md px-3 py-1.5 text-sm font-medium text-paper/70 transition hover:bg-paper/10 hover:text-paper";

  return (
    <div className="min-h-screen bg-paper">
      <header className="bg-pine">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-5">
            <Link href="/dashboard">
              <Wordmark light />
            </Link>
            <nav className="flex items-center gap-1">
              <Link href="/dashboard" className={navLink}>
                Ringkasan
              </Link>
              <Link href="/dashboard/services" className={navLink}>
                Layanan
              </Link>
              <Link href="/dashboard/bookings" className={navLink}>
                Booking
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-paper/70 sm:inline">
              {user.businessName}
            </span>
            <form action={signOutAction}>
              <button
                type="submit"
                className="rounded-md border border-paper/25 px-3 py-1.5 text-sm font-medium text-paper transition hover:bg-paper/10"
              >
                Keluar
              </button>
            </form>
          </div>
        </div>
        <div className="barber-stripe h-1 w-full" />
      </header>

      {isDemoEmail(user.email) && (
        <div className="border-b border-brass/30 bg-brass-soft">
          <div className="mx-auto max-w-6xl px-4 py-2 text-center text-xs text-ink/80">
            Kamu sedang di <strong className="font-semibold">mode demo</strong> —
            data bersifat read-only, perubahan tidak disimpan.
          </div>
        </div>
      )}
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}

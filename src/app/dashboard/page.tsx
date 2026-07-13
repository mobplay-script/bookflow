import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Dashboard — BookFlow",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">
        Halo, {user?.name} 👋
      </h1>
      <p className="mt-1 text-slate-600">
        Selamat datang di dashboard {user?.businessName}.
      </p>

      <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <p className="text-sm text-slate-500">
          Mulai dengan menyiapkan daftar layananmu. Menu Booking & Analitik
          menyusul (Fase 3–4).
        </p>
        <Link
          href="/dashboard/services"
          className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Kelola layanan
        </Link>
      </div>
    </div>
  );
}

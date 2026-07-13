import type { Metadata } from "next";
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
          Menu Layanan, Booking, dan Analitik akan hadir di sini (Fase 2–4).
        </p>
      </div>
    </div>
  );
}

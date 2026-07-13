import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { getDashboardData } from "@/lib/analytics";
import { formatRupiah } from "@/lib/format";
import { StatCard } from "@/components/dashboard/stat-card";
import { TrendChart } from "@/components/dashboard/trend-chart";
import { ServiceBarChart } from "@/components/dashboard/service-bar-chart";

export const metadata: Metadata = {
  title: "Dashboard — BookFlow",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const data = user
    ? await getDashboardData(user.id)
    : {
        totalRevenue: 0,
        totalBookings: 0,
        todayBookings: 0,
        avgValue: 0,
        trend: [],
        services: [],
      };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Halo, {user?.name} 👋
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Ringkasan performa {user?.businessName}.
        </p>
      </div>

      {/* Kartu metrik */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Total revenue"
          value={formatRupiah(data.totalRevenue)}
          hint="Dari booking selesai"
        />
        <StatCard label="Total booking" value={String(data.totalBookings)} />
        <StatCard label="Booking hari ini" value={String(data.todayBookings)} />
        <StatCard
          label="Rata-rata nilai"
          value={formatRupiah(data.avgValue)}
          hint="Per booking selesai"
        />
      </div>

      {data.totalBookings === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">
            Belum ada data booking. Analitik akan muncul setelah kamu mencatat
            booking pertama.
          </p>
          <Link
            href="/dashboard/bookings"
            className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Buat booking
          </Link>
        </div>
      ) : (
        <>
          <TrendChart data={data.trend} />
          <ServiceBarChart data={data.services} />
        </>
      )}
    </div>
  );
}

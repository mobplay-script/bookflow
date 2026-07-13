import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { getDashboardData } from "@/lib/analytics";
import { formatRupiah } from "@/lib/format";
import { StatCard } from "@/components/dashboard/stat-card";
import { TrendChart } from "@/components/dashboard/trend-chart";
import { ServiceBarChart } from "@/components/dashboard/service-bar-chart";
import { btnPrimary } from "@/lib/ui";

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
        <p className="eyebrow">Ringkasan</p>
        <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink">
          Halo, {user?.name}.
        </h1>
        <p className="mt-1 text-sm text-muted">
          Begini kondisi {user?.businessName} belakangan ini.
        </p>
      </div>

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
        <div className="rounded-xl border border-dashed border-hair bg-card p-10 text-center">
          <p className="text-sm text-muted">
            Belum ada catatan booking. Angka akan muncul setelah janji pertama
            tercatat.
          </p>
          <Link href="/dashboard/bookings" className={`${btnPrimary} mt-4`}>
            Catat booking
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

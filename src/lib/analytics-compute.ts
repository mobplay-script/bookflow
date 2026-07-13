// Logika agregasi dashboard — MURNI (tanpa Prisma/DB) supaya mudah di-unit-test.
// getDashboardData di analytics.ts hanya mengambil data lalu memanggil ini.

export type BookingForStats = {
  status: string;
  startTime: Date;
  service: { name: string; price: number };
};

export type TrendPoint = {
  date: string; // YYYY-MM-DD
  label: string; // dd/mm
  revenue: number;
  bookings: number;
};

export type ServiceStat = {
  name: string;
  bookings: number;
  revenue: number;
};

export type DashboardData = {
  totalRevenue: number;
  totalBookings: number;
  todayBookings: number;
  avgValue: number;
  trend: TrendPoint[]; // 30 hari terakhir (termasuk hari ini)
  services: ServiceStat[]; // top layanan by jumlah booking
};

// Kunci hari lokal "YYYY-MM-DD".
function dayKey(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function computeDashboard(
  bookings: BookingForStats[],
  now: Date,
): DashboardData {
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfToday = new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000);

  // Revenue = booking yang sudah SELESAI (DONE).
  const doneBookings = bookings.filter((b) => b.status === "DONE");
  const totalRevenue = doneBookings.reduce((sum, b) => sum + b.service.price, 0);
  const totalBookings = bookings.length;
  const todayBookings = bookings.filter(
    (b) => b.startTime >= startOfToday && b.startTime < endOfToday,
  ).length;
  const avgValue =
    doneBookings.length > 0 ? Math.round(totalRevenue / doneBookings.length) : 0;

  // Tren 30 hari (berdasarkan startTime): revenue dari DONE, jumlah dari semua.
  const buckets = new Map<string, TrendPoint>();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(startOfToday.getTime() - i * 24 * 60 * 60 * 1000);
    const key = dayKey(d);
    buckets.set(key, {
      date: key,
      label: `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`,
      revenue: 0,
      bookings: 0,
    });
  }
  for (const b of bookings) {
    const key = dayKey(b.startTime);
    const bucket = buckets.get(key);
    if (!bucket) continue; // di luar jendela 30 hari
    bucket.bookings += 1;
    if (b.status === "DONE") bucket.revenue += b.service.price;
  }
  const trend = Array.from(buckets.values());

  // Layanan terpopuler by jumlah booking.
  const svcMap = new Map<string, ServiceStat>();
  for (const b of bookings) {
    const name = b.service.name;
    const stat = svcMap.get(name) ?? { name, bookings: 0, revenue: 0 };
    stat.bookings += 1;
    if (b.status === "DONE") stat.revenue += b.service.price;
    svcMap.set(name, stat);
  }
  const services = Array.from(svcMap.values())
    .sort((a, b) => b.bookings - a.bookings)
    .slice(0, 6);

  return {
    totalRevenue,
    totalBookings,
    todayBookings,
    avgValue,
    trend,
    services,
  };
}

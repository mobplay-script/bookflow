import { describe, it, expect } from "vitest";
import { computeDashboard, type BookingForStats } from "@/lib/analytics-compute";

const now = new Date(2026, 6, 15, 12, 0, 0); // 15 Jul 2026, siang (lokal)
const at = (y: number, m: number, d: number, h: number): Date =>
  new Date(y, m, d, h, 0, 0);

// Fixture: 4 booking (3 DONE, 1 PENDING); satu DONE berada 40 hari lalu (di luar
// jendela tren 30 hari) untuk menguji exclusion.
const bookings: BookingForStats[] = [
  { status: "DONE", startTime: at(2026, 6, 15, 10), service: { name: "Potong", price: 50000 } },
  { status: "DONE", startTime: at(2026, 6, 12, 14), service: { name: "Creambath", price: 100000 } },
  { status: "PENDING", startTime: at(2026, 6, 15, 16), service: { name: "Potong", price: 50000 } },
  { status: "DONE", startTime: at(2026, 5, 5, 9), service: { name: "Potong", price: 50000 } }, // 5 Jun = 40 hari lalu
];

describe("computeDashboard", () => {
  const d = computeDashboard(bookings, now);

  it("menghitung revenue hanya dari booking DONE", () => {
    expect(d.totalRevenue).toBe(200000); // 50000 + 100000 + 50000
  });

  it("menghitung total booking (semua status)", () => {
    expect(d.totalBookings).toBe(4);
  });

  it("menghitung booking hari ini", () => {
    expect(d.todayBookings).toBe(2); // dua booking pada 15 Jul
  });

  it("menghitung rata-rata nilai (revenue / jumlah DONE, dibulatkan)", () => {
    expect(d.avgValue).toBe(66667); // 200000 / 3
  });

  it("tren selalu 30 titik", () => {
    expect(d.trend).toHaveLength(30);
  });

  it("tren mengecualikan booking di luar 30 hari", () => {
    const trendRevenue = d.trend.reduce((s, p) => s + p.revenue, 0);
    const trendBookings = d.trend.reduce((s, p) => s + p.bookings, 0);
    expect(trendRevenue).toBe(150000); // 50000 + 100000 (yang 40 hari lalu tidak dihitung)
    expect(trendBookings).toBe(3);
  });

  it("mengurutkan layanan terpopuler by jumlah booking", () => {
    expect(d.services[0].name).toBe("Potong");
    expect(d.services[0].bookings).toBe(3);
    expect(d.services).toHaveLength(2);
  });

  it("mengembalikan nol untuk data kosong (tanpa NaN)", () => {
    const empty = computeDashboard([], now);
    expect(empty.totalRevenue).toBe(0);
    expect(empty.avgValue).toBe(0);
    expect(empty.services).toEqual([]);
  });
});

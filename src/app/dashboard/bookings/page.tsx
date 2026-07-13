import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { createBooking } from "@/lib/actions/bookings";
import { BOOKING_STATUSES } from "@/lib/schemas";
import { BookingForm } from "@/components/bookings/booking-form";
import {
  BookingRowActions,
  BookingStatusSelect,
} from "@/components/bookings/booking-row-actions";
import { formatDateTime, BOOKING_STATUS_LABEL } from "@/lib/format";

export const metadata: Metadata = {
  title: "Booking — BookFlow",
};

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const statusFilter = (BOOKING_STATUSES as readonly string[]).includes(
    status ?? "",
  )
    ? (status as (typeof BOOKING_STATUSES)[number])
    : undefined;

  const user = await getCurrentUser();

  const [services, bookings] = user
    ? await Promise.all([
        prisma.service.findMany({
          where: { userId: user.id, isActive: true },
          orderBy: { name: "asc" },
          select: { id: true, name: true, price: true, isActive: true },
        }),
        prisma.booking.findMany({
          where: {
            userId: user.id,
            ...(statusFilter ? { status: statusFilter } : {}),
          },
          orderBy: { startTime: "desc" },
          include: { service: { select: { name: true } } },
        }),
      ])
    : [[], []];

  const filterTabs = [
    { key: undefined, label: "Semua" },
    ...BOOKING_STATUSES.map((st) => ({ key: st, label: BOOKING_STATUS_LABEL[st] })),
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow">Buku janji</p>
        <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink">
          Booking
        </h1>
        <p className="mt-1 text-sm text-muted">
          Catat dan pantau setiap janji pelanggan.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-hair bg-card p-6">
            <h2 className="mb-4 font-display text-base font-semibold text-ink">
              Buat booking
            </h2>
            {services.length === 0 ? (
              <p className="text-sm text-muted">
                Belum ada layanan aktif.{" "}
                <Link
                  href="/dashboard/services"
                  className="font-semibold text-pine underline-offset-2 hover:underline"
                >
                  Tambah layanan
                </Link>{" "}
                dulu untuk membuat booking.
              </p>
            ) : (
              <BookingForm
                action={createBooking}
                services={services}
                submitLabel="Simpan booking"
              />
            )}
          </div>
        </div>

        <div className="space-y-4 lg:col-span-2">
          <div className="flex flex-wrap gap-1.5">
            {filterTabs.map((tab) => {
              const active = statusFilter === tab.key;
              const href = tab.key
                ? `/dashboard/bookings?status=${tab.key}`
                : "/dashboard/bookings";
              return (
                <Link
                  key={tab.label}
                  href={href}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                    active
                      ? "bg-pine text-paper"
                      : "border border-hair bg-card text-muted hover:text-ink"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>

          {bookings.length === 0 ? (
            <div className="rounded-xl border border-dashed border-hair bg-card p-10 text-center">
              <p className="text-sm text-muted">
                {statusFilter
                  ? "Tidak ada booking dengan status ini."
                  : "Belum ada booking. Buat yang pertama lewat form di samping."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-hair bg-card">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-hair bg-paper/60">
                  <tr className="[&>th]:px-4 [&>th]:py-3">
                    <th className="eyebrow font-normal">Pelanggan</th>
                    <th className="eyebrow font-normal">Layanan</th>
                    <th className="eyebrow font-normal">Jadwal</th>
                    <th className="eyebrow font-normal">Status</th>
                    <th className="eyebrow text-right font-normal">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hair">
                  {bookings.map((b) => (
                    <tr key={b.id} className="transition hover:bg-paper/50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-ink">{b.customerName}</div>
                        {b.customerPhone && (
                          <div className="tnum text-xs text-faint">
                            {b.customerPhone}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted">{b.service.name}</td>
                      <td className="px-4 py-3 tnum text-muted">
                        {formatDateTime(b.startTime)}
                      </td>
                      <td className="px-4 py-3">
                        <BookingStatusSelect id={b.id} status={b.status} />
                      </td>
                      <td className="px-4 py-3">
                        <BookingRowActions id={b.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

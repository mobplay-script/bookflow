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
  // Next 16: searchParams adalah Promise.
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
        <h1 className="text-2xl font-bold text-slate-900">Booking</h1>
        <p className="mt-1 text-sm text-slate-600">
          Catat & kelola jadwal booking pelanggan.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Form buat booking */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-slate-900">
              Buat booking
            </h2>
            {services.length === 0 ? (
              <p className="text-sm text-slate-500">
                Belum ada layanan aktif.{" "}
                <Link
                  href="/dashboard/services"
                  className="font-medium text-indigo-600 underline underline-offset-2"
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

        {/* Daftar booking */}
        <div className="space-y-4 lg:col-span-2">
          {/* Filter status */}
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
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>

          {bookings.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <p className="text-sm text-slate-500">
                {statusFilter
                  ? "Tidak ada booking dengan status ini."
                  : "Belum ada booking. Buat booking pertamamu di form sebelah."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">Pelanggan</th>
                    <th className="px-4 py-3 font-medium">Layanan</th>
                    <th className="px-4 py-3 font-medium">Jadwal</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 text-right font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-900">
                          {b.customerName}
                        </div>
                        {b.customerPhone && (
                          <div className="text-xs text-slate-500">
                            {b.customerPhone}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{b.service.name}</td>
                      <td className="px-4 py-3 text-slate-600">
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

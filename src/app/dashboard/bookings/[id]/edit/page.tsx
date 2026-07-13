import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { updateBooking } from "@/lib/actions/bookings";
import {
  BookingForm,
  type ServiceOption,
} from "@/components/bookings/booking-form";
import { toDatetimeLocal } from "@/lib/format";

export const metadata: Metadata = {
  title: "Edit booking — BookFlow",
};

export default async function EditBookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();

  const booking = user
    ? await prisma.booking.findFirst({
        where: { id, userId: user.id },
        include: { service: { select: { id: true, name: true, price: true, isActive: true } } },
      })
    : null;

  if (!booking) notFound();

  const activeServices = await prisma.service.findMany({
    where: { userId: user!.id, isActive: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true, price: true, isActive: true },
  });

  const services: ServiceOption[] = activeServices.some((s) => s.id === booking.serviceId)
    ? activeServices
    : [booking.service, ...activeServices];

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <Link
          href="/dashboard/bookings"
          className="text-sm font-medium text-muted transition hover:text-ink"
        >
          ← Kembali ke Booking
        </Link>
        <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">
          Edit booking
        </h1>
      </div>

      <div className="rounded-xl border border-hair bg-card p-6">
        <BookingForm
          action={updateBooking.bind(null, booking.id)}
          services={services}
          defaultValues={{
            serviceId: booking.serviceId,
            customerName: booking.customerName,
            customerPhone: booking.customerPhone ?? "",
            startTime: toDatetimeLocal(booking.startTime),
            notes: booking.notes ?? "",
            status: booking.status,
          }}
          submitLabel="Simpan perubahan"
        />
      </div>
    </div>
  );
}

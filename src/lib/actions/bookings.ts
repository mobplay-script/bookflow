"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { bookingSchema, bookingStatusSchema } from "@/lib/schemas";

export type BookingFormState = {
  fieldErrors?: Record<string, string[]>;
  message?: string;
} | null;

function parseBooking(formData: FormData) {
  return bookingSchema.safeParse({
    serviceId: formData.get("serviceId"),
    customerName: formData.get("customerName"),
    customerPhone: formData.get("customerPhone"),
    startTime: formData.get("startTime"),
    notes: formData.get("notes"),
  });
}

// Pastikan service yang dipilih memang milik user ini.
async function assertServiceOwned(serviceId: string, userId: string) {
  const svc = await prisma.service.findFirst({
    where: { id: serviceId, userId },
    select: { id: true },
  });
  return Boolean(svc);
}

export async function createBooking(
  _prev: BookingFormState,
  formData: FormData,
): Promise<BookingFormState> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const parsed = parseBooking(formData);
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }
  const { serviceId, customerName, customerPhone, startTime, notes } = parsed.data;

  if (!(await assertServiceOwned(serviceId, user.id))) {
    return { fieldErrors: { serviceId: ["Layanan tidak valid"] } };
  }

  await prisma.booking.create({
    data: {
      userId: user.id,
      serviceId,
      customerName,
      customerPhone: customerPhone || null,
      startTime,
      notes: notes || null,
    },
  });

  revalidatePath("/dashboard/bookings");
  redirect("/dashboard/bookings");
}

export async function updateBooking(
  id: string,
  _prev: BookingFormState,
  formData: FormData,
): Promise<BookingFormState> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const parsed = parseBooking(formData);
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }
  const { serviceId, customerName, customerPhone, startTime, notes } = parsed.data;

  if (!(await assertServiceOwned(serviceId, user.id))) {
    return { fieldErrors: { serviceId: ["Layanan tidak valid"] } };
  }

  const statusParsed = bookingStatusSchema.safeParse(formData.get("status"));

  const result = await prisma.booking.updateMany({
    where: { id, userId: user.id },
    data: {
      serviceId,
      customerName,
      customerPhone: customerPhone || null,
      startTime,
      notes: notes || null,
      ...(statusParsed.success ? { status: statusParsed.data } : {}),
    },
  });
  if (result.count === 0) {
    return { message: "Booking tidak ditemukan." };
  }

  revalidatePath("/dashboard/bookings");
  redirect("/dashboard/bookings");
}

export async function updateBookingStatus(id: string, formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const statusParsed = bookingStatusSchema.safeParse(formData.get("status"));
  if (!statusParsed.success) return;

  await prisma.booking.updateMany({
    where: { id, userId: user.id },
    data: { status: statusParsed.data },
  });
  revalidatePath("/dashboard/bookings");
}

export async function deleteBooking(id: string) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  await prisma.booking.deleteMany({ where: { id, userId: user.id } });
  revalidatePath("/dashboard/bookings");
}

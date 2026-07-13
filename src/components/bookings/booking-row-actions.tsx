"use client";

import Link from "next/link";
import { deleteBooking, updateBookingStatus } from "@/lib/actions/bookings";
import { BOOKING_STATUSES } from "@/lib/schemas";
import { BOOKING_STATUS_LABEL } from "@/lib/format";

export function BookingStatusSelect({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  return (
    <form action={updateBookingStatus.bind(null, id)}>
      <select
        name="status"
        defaultValue={status}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 outline-none focus:border-slate-900"
        aria-label="Ubah status"
      >
        {BOOKING_STATUSES.map((st) => (
          <option key={st} value={st}>
            {BOOKING_STATUS_LABEL[st]}
          </option>
        ))}
      </select>
    </form>
  );
}

export function BookingRowActions({ id }: { id: string }) {
  return (
    <div className="flex items-center justify-end gap-1.5">
      <Link
        href={`/dashboard/bookings/${id}/edit`}
        className="rounded-md px-2 py-1 text-xs font-medium text-indigo-600 hover:bg-indigo-50"
      >
        Edit
      </Link>
      <form
        action={deleteBooking.bind(null, id)}
        onSubmit={(e) => {
          if (!confirm("Hapus booking ini? Tindakan ini tidak bisa dibatalkan.")) {
            e.preventDefault();
          }
        }}
      >
        <button
          type="submit"
          className="rounded-md px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
        >
          Hapus
        </button>
      </form>
    </div>
  );
}

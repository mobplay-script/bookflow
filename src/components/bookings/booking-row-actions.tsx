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
        className="rounded-md border border-hair bg-card px-2 py-1 text-xs font-medium text-ink outline-none transition focus:border-pine"
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
    <div className="flex items-center justify-end gap-1">
      <Link
        href={`/dashboard/bookings/${id}/edit`}
        className="rounded-md px-2 py-1 text-xs font-medium text-pine transition hover:bg-pine-soft"
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
          className="rounded-md px-2 py-1 text-xs font-medium text-brick transition hover:bg-brick/10"
        >
          Hapus
        </button>
      </form>
    </div>
  );
}

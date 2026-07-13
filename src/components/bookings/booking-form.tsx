"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { BookingFormState } from "@/lib/actions/bookings";
import { BOOKING_STATUSES } from "@/lib/schemas";
import { BOOKING_STATUS_LABEL, formatRupiah } from "@/lib/format";
import { inputClass, labelClass, btnPrimary } from "@/lib/ui";

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-1 text-xs text-brick">{errors[0]}</p>;
}

export type ServiceOption = {
  id: string;
  name: string;
  price: number;
  isActive: boolean;
};

type Props = {
  action: (state: BookingFormState, formData: FormData) => Promise<BookingFormState>;
  services: ServiceOption[];
  defaultValues?: {
    serviceId: string;
    customerName: string;
    customerPhone: string;
    startTime: string;
    notes: string;
    status: string;
  };
  submitLabel: string;
};

export function BookingForm({ action, services, defaultValues, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState<BookingFormState, FormData>(
    action,
    null,
  );
  const fieldErrors = state?.fieldErrors ?? {};
  const isEdit = Boolean(defaultValues);

  return (
    <form action={formAction} className="space-y-4">
      {state?.message && (
        <div className="rounded-lg border border-brick/30 bg-brick/5 px-3 py-2 text-sm text-brick">
          {state.message}
        </div>
      )}

      <div>
        <label htmlFor="serviceId" className={labelClass}>
          Layanan
        </label>
        <select
          id="serviceId"
          name="serviceId"
          defaultValue={defaultValues?.serviceId ?? ""}
          className={inputClass}
        >
          <option value="" disabled>
            — Pilih layanan —
          </option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} · {formatRupiah(s.price)}
              {s.isActive ? "" : " (nonaktif)"}
            </option>
          ))}
        </select>
        <FieldError errors={fieldErrors.serviceId} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="customerName" className={labelClass}>
            Nama pelanggan
          </label>
          <input
            id="customerName"
            name="customerName"
            type="text"
            defaultValue={defaultValues?.customerName}
            className={inputClass}
          />
          <FieldError errors={fieldErrors.customerName} />
        </div>
        <div>
          <label htmlFor="customerPhone" className={labelClass}>
            No. telepon <span className="text-faint">(opsional)</span>
          </label>
          <input
            id="customerPhone"
            name="customerPhone"
            type="tel"
            defaultValue={defaultValues?.customerPhone}
            className={inputClass}
          />
          <FieldError errors={fieldErrors.customerPhone} />
        </div>
      </div>

      <div>
        <label htmlFor="startTime" className={labelClass}>
          Tanggal &amp; jam
        </label>
        <input
          id="startTime"
          name="startTime"
          type="datetime-local"
          defaultValue={defaultValues?.startTime}
          className={inputClass}
        />
        <FieldError errors={fieldErrors.startTime} />
      </div>

      {isEdit && (
        <div>
          <label htmlFor="status" className={labelClass}>
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={defaultValues?.status}
            className={inputClass}
          >
            {BOOKING_STATUSES.map((st) => (
              <option key={st} value={st}>
                {BOOKING_STATUS_LABEL[st]}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="notes" className={labelClass}>
          Catatan <span className="text-faint">(opsional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={2}
          defaultValue={defaultValues?.notes}
          className={inputClass}
        />
        <FieldError errors={fieldErrors.notes} />
      </div>

      <div className="flex items-center gap-3 pt-1">
        <button type="submit" disabled={pending} className={btnPrimary}>
          {pending ? "Menyimpan…" : submitLabel}
        </button>
        {isEdit && (
          <Link
            href="/dashboard/bookings"
            className="text-sm font-medium text-muted hover:text-ink"
          >
            Batal
          </Link>
        )}
      </div>
    </form>
  );
}

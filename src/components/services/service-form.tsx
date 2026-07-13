"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { ServiceFormState } from "@/lib/actions/services";
import { inputClass, labelClass, btnPrimary } from "@/lib/ui";

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-1 text-xs text-brick">{errors[0]}</p>;
}

type Props = {
  action: (state: ServiceFormState, formData: FormData) => Promise<ServiceFormState>;
  defaultValues?: {
    name: string;
    durationMin: number;
    price: number;
    isActive: boolean;
  };
  submitLabel: string;
};

export function ServiceForm({ action, defaultValues, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState<ServiceFormState, FormData>(
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
        <label htmlFor="name" className={labelClass}>
          Nama layanan
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={defaultValues?.name}
          placeholder="mis. Potong Rambut"
          className={inputClass}
        />
        <FieldError errors={fieldErrors.name} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="durationMin" className={labelClass}>
            Durasi (menit)
          </label>
          <input
            id="durationMin"
            name="durationMin"
            type="number"
            min={5}
            max={1440}
            step={5}
            defaultValue={defaultValues?.durationMin ?? 30}
            className={inputClass}
          />
          <FieldError errors={fieldErrors.durationMin} />
        </div>
        <div>
          <label htmlFor="price" className={labelClass}>
            Harga (Rp)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min={0}
            step={1000}
            defaultValue={defaultValues?.price ?? 0}
            className={inputClass}
          />
          <FieldError errors={fieldErrors.price} />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-ink">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={defaultValues ? defaultValues.isActive : true}
          className="h-4 w-4 rounded border-hair text-pine focus:ring-pine"
        />
        Aktif (bisa dipilih saat booking)
      </label>

      <div className="flex items-center gap-3 pt-1">
        <button type="submit" disabled={pending} className={btnPrimary}>
          {pending ? "Menyimpan…" : submitLabel}
        </button>
        {isEdit && (
          <Link
            href="/dashboard/services"
            className="text-sm font-medium text-muted hover:text-ink"
          >
            Batal
          </Link>
        )}
      </div>
    </form>
  );
}

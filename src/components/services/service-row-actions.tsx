"use client";

import Link from "next/link";
import { deleteService, toggleService } from "@/lib/actions/services";

export function ServiceRowActions({
  id,
  isActive,
}: {
  id: string;
  isActive: boolean;
}) {
  return (
    <div className="flex items-center justify-end gap-1.5">
      <form action={toggleService.bind(null, id)}>
        <button
          type="submit"
          className="rounded-md px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100"
        >
          {isActive ? "Nonaktifkan" : "Aktifkan"}
        </button>
      </form>
      <Link
        href={`/dashboard/services/${id}/edit`}
        className="rounded-md px-2 py-1 text-xs font-medium text-indigo-600 hover:bg-indigo-50"
      >
        Edit
      </Link>
      <form
        action={deleteService.bind(null, id)}
        onSubmit={(e) => {
          if (!confirm("Hapus layanan ini? Tindakan ini tidak bisa dibatalkan.")) {
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

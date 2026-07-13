import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { createService } from "@/lib/actions/services";
import { ServiceForm } from "@/components/services/service-form";
import { ServiceRowActions } from "@/components/services/service-row-actions";
import { formatRupiah, formatDuration } from "@/lib/format";

export const metadata: Metadata = {
  title: "Layanan — BookFlow",
};

export default async function ServicesPage() {
  const user = await getCurrentUser();
  const services = user
    ? await prisma.service.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Layanan</h1>
        <p className="mt-1 text-sm text-slate-600">
          Daftar layanan yang bisa dipesan pelanggan.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Form tambah */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-slate-900">
              Tambah layanan
            </h2>
            <ServiceForm action={createService} submitLabel="Simpan layanan" />
          </div>
        </div>

        {/* Tabel */}
        <div className="lg:col-span-2">
          {services.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <p className="text-sm text-slate-500">
                Belum ada layanan. Tambahkan layanan pertamamu di form sebelah.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">Nama</th>
                    <th className="px-4 py-3 font-medium">Durasi</th>
                    <th className="px-4 py-3 font-medium">Harga</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 text-right font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {services.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {s.name}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {formatDuration(s.durationMin)}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {formatRupiah(s.price)}
                      </td>
                      <td className="px-4 py-3">
                        {s.isActive ? (
                          <span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                            Aktif
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                            Nonaktif
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <ServiceRowActions id={s.id} isActive={s.isActive} />
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

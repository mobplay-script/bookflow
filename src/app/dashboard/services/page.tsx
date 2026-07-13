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
        <p className="eyebrow">Katalog</p>
        <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink">
          Layanan
        </h1>
        <p className="mt-1 text-sm text-muted">
          Apa saja yang bisa dipesan pelanggan, lengkap dengan durasi dan harga.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-hair bg-card p-6">
            <h2 className="mb-4 font-display text-base font-semibold text-ink">
              Tambah layanan
            </h2>
            <ServiceForm action={createService} submitLabel="Simpan layanan" />
          </div>
        </div>

        <div className="lg:col-span-2">
          {services.length === 0 ? (
            <div className="rounded-xl border border-dashed border-hair bg-card p-10 text-center">
              <p className="text-sm text-muted">
                Belum ada layanan. Tambahkan yang pertama lewat form di samping.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-hair bg-card">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-hair bg-paper/60">
                  <tr className="[&>th]:px-4 [&>th]:py-3">
                    <th className="eyebrow font-normal">Nama</th>
                    <th className="eyebrow font-normal">Durasi</th>
                    <th className="eyebrow font-normal">Harga</th>
                    <th className="eyebrow font-normal">Status</th>
                    <th className="eyebrow text-right font-normal">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hair">
                  {services.map((s) => (
                    <tr key={s.id} className="transition hover:bg-paper/50">
                      <td className="px-4 py-3 font-medium text-ink">{s.name}</td>
                      <td className="px-4 py-3 tnum text-muted">
                        {formatDuration(s.durationMin)}
                      </td>
                      <td className="px-4 py-3 tnum text-muted">
                        {formatRupiah(s.price)}
                      </td>
                      <td className="px-4 py-3">
                        {s.isActive ? (
                          <span className="inline-flex rounded-full bg-pine-soft px-2 py-0.5 text-xs font-medium text-pine">
                            Aktif
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-hair/60 px-2 py-0.5 text-xs font-medium text-faint">
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

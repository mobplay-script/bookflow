import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { updateService } from "@/lib/actions/services";
import { ServiceForm } from "@/components/services/service-form";

export const metadata: Metadata = {
  title: "Edit layanan — BookFlow",
};

export default async function EditServicePage({
  params,
}: {
  // Next 16: params adalah Promise, wajib di-await.
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();

  const service = user
    ? await prisma.service.findFirst({ where: { id, userId: user.id } })
    : null;

  if (!service) notFound();

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <Link
          href="/dashboard/services"
          className="text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          ← Kembali ke Layanan
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">Edit layanan</h1>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <ServiceForm
          action={updateService.bind(null, service.id)}
          defaultValues={{
            name: service.name,
            durationMin: service.durationMin,
            price: service.price,
            isActive: service.isActive,
          }}
          submitLabel="Simpan perubahan"
        />
      </div>
    </div>
  );
}

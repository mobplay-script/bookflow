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
          className="text-sm font-medium text-muted transition hover:text-ink"
        >
          ← Kembali ke Layanan
        </Link>
        <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">
          Edit layanan
        </h1>
      </div>

      <div className="rounded-xl border border-hair bg-card p-6">
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

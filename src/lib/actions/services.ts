"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { serviceSchema } from "@/lib/schemas";
import { isDemoEmail, DEMO_READONLY_MSG } from "@/lib/demo";

export type ServiceFormState = {
  fieldErrors?: Record<string, string[]>;
  message?: string;
} | null;

function parseService(formData: FormData) {
  return serviceSchema.safeParse({
    name: formData.get("name"),
    durationMin: formData.get("durationMin"),
    price: formData.get("price"),
  });
}

export async function createService(
  _prev: ServiceFormState,
  formData: FormData,
): Promise<ServiceFormState> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (isDemoEmail(user.email)) return { message: DEMO_READONLY_MSG };

  const parsed = parseService(formData);
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  const isActive = formData.get("isActive") === "on";
  await prisma.service.create({
    data: { ...parsed.data, isActive, userId: user.id },
  });

  revalidatePath("/dashboard/services");
  redirect("/dashboard/services");
}

export async function updateService(
  id: string,
  _prev: ServiceFormState,
  formData: FormData,
): Promise<ServiceFormState> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (isDemoEmail(user.email)) return { message: DEMO_READONLY_MSG };

  const parsed = parseService(formData);
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  const isActive = formData.get("isActive") === "on";
  // where menyertakan userId → mencegah user mengubah layanan milik orang lain.
  const result = await prisma.service.updateMany({
    where: { id, userId: user.id },
    data: { ...parsed.data, isActive },
  });
  if (result.count === 0) {
    return { message: "Layanan tidak ditemukan." };
  }

  revalidatePath("/dashboard/services");
  redirect("/dashboard/services");
}

export async function deleteService(id: string) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (isDemoEmail(user.email)) return;

  await prisma.service.deleteMany({ where: { id, userId: user.id } });
  revalidatePath("/dashboard/services");
}

export async function toggleService(id: string) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (isDemoEmail(user.email)) return;

  const service = await prisma.service.findFirst({
    where: { id, userId: user.id },
    select: { isActive: true },
  });
  if (!service) return;

  await prisma.service.updateMany({
    where: { id, userId: user.id },
    data: { isActive: !service.isActive },
  });
  revalidatePath("/dashboard/services");
}

import { prisma } from "@/lib/prisma";
import { computeDashboard, type DashboardData } from "@/lib/analytics-compute";

export type {
  DashboardData,
  TrendPoint,
  ServiceStat,
} from "@/lib/analytics-compute";

export async function getDashboardData(userId: string): Promise<DashboardData> {
  const bookings = await prisma.booking.findMany({
    where: { userId },
    include: { service: { select: { name: true, price: true } } },
  });
  return computeDashboard(bookings, new Date());
}
